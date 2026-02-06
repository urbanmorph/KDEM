/**
 * Factors of Production Tab Renderer
 * Shows Land, Labour, Capital, and Organisation metrics
 * All data from Supabase backend - no hardcoded values
 */

import { fetchFactorSummary, fetchConversionRatios } from '../services/dataService.js'
import { formatNumber } from '../utils/formatting.js'
import { renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createRadarChart } from '../utils/chartFactories.js'

export async function renderFactorsTab(appData) {
    try {
        const [factorSummary, conversionRatios] = await Promise.all([
            fetchFactorSummary(),
            fetchConversionRatios()
        ])

        // Store chart init function for main.js to call after DOM insertion
        window.__kdem_initCharts = () => initFactorCharts(conversionRatios)

        return `
            <div class="factors-tab">
                <div class="tab-header">
                    <h2>Factors of Production</h2>
                    <p class="tab-subtitle">Land, Labour, Capital, and Organisation - The four pillars of economic development</p>
                </div>

                <!-- Factors Overview -->
                <div class="factors-grid">
                    ${appData.factors.map(factor => renderFactorCard(factor, factorSummary)).join('')}
                </div>

                <!-- Factor Relationships -->
                <div class="section-header mt-4">
                    <h3>Cross-Factor Dependencies</h3>
                    <p>How factors of production interact and depend on each other</p>
                </div>

                <div class="dependencies-info">
                    ${renderDependencies(conversionRatios)}
                </div>

                <!-- Conversion Ratios from Database -->
                <div class="section-header mt-4">
                    <h3>Conversion Ratios (from Database)</h3>
                    <p>Industry-standard ratios used to cascade targets - loaded from Supabase</p>
                </div>

                <div class="conversion-info">
                    ${renderConversionTable(conversionRatios)}
                </div>

                <!-- Conversion Ratio Comparison Chart -->
                ${conversionRatios && conversionRatios.length > 0 ? `
                    <div class="section-header mt-4">
                        <h3>Employment Ratio Comparison</h3>
                        <p>How revenue-to-employment ratios vary across verticals</p>
                    </div>
                    <div class="growth-charts-grid">
                        <div class="growth-chart-card" style="grid-column: 1 / -1;">
                            <div class="chart-container">
                                <canvas id="conversion-ratio-chart"></canvas>
                            </div>
                            <div class="chart-source">Source: KDEM Conversion Ratios Database (Supabase)</div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `
    } catch (error) {
        console.error('Error rendering factors tab:', error)
        return `
            <div class="error-message">
                <h3>Unable to load factors data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderFactorCard(factor, summary) {
    const icons = {
        'land': '🏗️',
        'labour': '👥',
        'capital': '💼',
        'organisation': '⚙️'
    }

    return `
        <div class="factor-card">
            <div class="factor-icon">${icons[factor.id] || '📊'}</div>
            <h3>${factor.name}</h3>
            <p class="factor-description">${factor.description || ''}</p>
            <div class="factor-metrics">
                <div class="factor-metric">
                    <span class="label">Primary Metrics:</span>
                    <span class="value">${factor.metrics ? factor.metrics.join(', ') : 'N/A'}</span>
                </div>
            </div>
        </div>
    `
}

function renderDependencies(conversionRatios) {
    // Build dependency descriptions from actual conversion ratios data
    const empRatios = conversionRatios.filter(r =>
        (r.from_metric === 'revenue' || r.from_factor_id === 'revenue') &&
        (r.to_metric === 'employment' || r.to_factor_id === 'labour')
    )
    const landRatios = conversionRatios.filter(r =>
        (r.from_metric === 'employment' || r.from_factor_id === 'labour') &&
        (r.to_metric === 'land' || r.to_factor_id === 'land')
    )
    const capitalRatios = conversionRatios.filter(r =>
        (r.from_metric === 'land' || r.from_factor_id === 'land') &&
        (r.to_metric === 'capital' || r.to_factor_id === 'capital')
    )

    const empRatioStr = empRatios.length > 0
        ? empRatios.map(r => `${r.vertical_id || 'All'}: ${r.ratio || r.conversion_ratio} ${r.unit || ''}`).join(', ')
        : 'See conversion ratios table'

    const landRatioStr = landRatios.length > 0
        ? landRatios.map(r => `${r.ratio || r.conversion_ratio} ${r.unit || ''}`).join(', ')
        : 'See conversion ratios table'

    return `
        <div class="dependencies-grid">
            <div class="dependency-card">
                <h4>Revenue → Labour</h4>
                <p>Revenue targets drive employment requirements based on industry-specific ratios.</p>
                <p class="detail"><strong>Ratios:</strong> ${empRatioStr}</p>
            </div>
            <div class="dependency-card">
                <h4>Labour → Land</h4>
                <p>Employment numbers determine infrastructure needs.</p>
                <p class="detail"><strong>Ratios:</strong> ${landRatioStr}</p>
            </div>
            <div class="dependency-card">
                <h4>Land → Capital</h4>
                <p>Land acquisition and infrastructure development require capital investment. Costs vary by geography.</p>
            </div>
            <div class="dependency-card">
                <h4>Organisation → All Factors</h4>
                <p>Institutional readiness enables efficient utilization of land, labour, and capital. Policy framework impacts all factor productivity.</p>
            </div>
        </div>
    `
}

function renderConversionTable(ratios) {
    if (!ratios || ratios.length === 0) {
        return `<div class="no-data-message"><p>No conversion ratios in database. Seed the conversion_ratios table.</p></div>`
    }

    return `
        <div class="table-scroll-wrapper">
            <table class="data-table">
            <thead>
                <tr>
                    <th>Vertical</th>
                    <th>From Metric</th>
                    <th>To Metric</th>
                    <th>Ratio</th>
                    <th>Unit</th>
                    <th>Source</th>
                    <th>Confidence</th>
                </tr>
            </thead>
            <tbody>
                ${ratios.map(r => `
                    <tr>
                        <td><strong>${r.vertical_id || 'All'}</strong></td>
                        <td>${r.from_metric || r.from_factor_id || ''}</td>
                        <td>${r.to_metric || r.to_factor_id || ''}</td>
                        <td>${r.ratio || r.conversion_ratio || ''}</td>
                        <td>${r.unit || ''}</td>
                        <td>${r.source || ''}</td>
                        <td>${renderConfidenceStars(r.confidence_rating || 3)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        </div>
        <p class="conversion-note">
            <strong>Note:</strong> These conversion ratios are loaded from the KDEM Supabase database and are used to auto-calculate factor targets when revenue targets are set.
        </p>
    `
}

function initFactorCharts(conversionRatios) {
    // Employment Ratio Comparison as Radar Chart
    const empRatios = conversionRatios.filter(r =>
        (r.from_metric === 'revenue' || r.from_factor_id === 'revenue') &&
        (r.to_metric === 'employment' || r.to_factor_id === 'labour')
    )

    if (empRatios.length > 0) {
        const labels = empRatios.map(r => r.vertical_id || 'All')
        const data = empRatios.map(r => parseFloat(r.ratio || r.conversion_ratio || 0))

        createRadarChart('conversion-ratio-chart', labels, [
            { label: 'Employment per $1M Revenue', data }
        ])
    }
}
