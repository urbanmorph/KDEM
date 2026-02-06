/**
 * Vertical Detail Tab Renderer
 * Shows detailed metrics for a specific vertical (IT Exports, IT Domestic, ESDM, Startups)
 * All data from Supabase backend - no hardcoded values
 */

import { getVerticalDetails, fetchConversionRatios } from '../services/dataService.js'
import { formatNumber } from '../utils/formatting.js'
import { annotatedMetricCard, renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createDoughnutChart } from '../utils/chartFactories.js'

export async function renderVerticalTab(verticalId, appData) {
    try {
        const [details, conversionRatios] = await Promise.all([
            getVerticalDetails(verticalId, 2030),
            fetchConversionRatios(verticalId)
        ])
        const vertical = details.vertical

        // Store chart init function for main.js to call after DOM insertion
        window.__kdem_initCharts = () => initVerticalCharts(details, conversionRatios)

        return `
            <div class="vertical-tab">
                <div class="tab-header">
                    <h2>${vertical.name}</h2>
                    <p class="tab-subtitle">${vertical.description || ''}</p>
                </div>

                <!-- Overview Metrics -->
                <div class="metrics-grid">
                    ${annotatedMetricCard({
                        label: 'Revenue', value: details.totals.revenue_usd_bn, unit: 'USD Billion',
                        icon: '💰', type: 'target', confidence: 4,
                        source: 'KDEM Target Database (Supabase)',
                        formula: 'Sum of geographic revenue targets'
                    })}
                    ${annotatedMetricCard({
                        label: 'Employment', value: details.totals.employment, unit: 'Jobs',
                        icon: '👥', type: 'computed', confidence: 3,
                        source: 'Computed from conversion ratios',
                        formula: `Revenue × employment ratio per vertical`
                    })}
                    ${annotatedMetricCard({
                        label: 'Land', value: details.totals.land_sqft, unit: 'Sq Ft',
                        icon: '🏗️', type: 'computed', confidence: 3,
                        source: 'Industry standard: 200 sq ft/employee',
                        formula: 'Employment × 200 sq ft per employee'
                    })}
                    ${annotatedMetricCard({
                        label: 'Capital', value: details.totals.capital_inr_cr, unit: 'INR Crores',
                        icon: '💼', type: 'computed', confidence: 2,
                        source: 'Computed from land + geography premiums',
                        formula: 'Land costs × geography multiplier'
                    })}
                </div>

                <!-- Geographic Distribution Chart -->
                <div class="section-header mt-4">
                    <h3>Geographic Distribution</h3>
                    <p>Breakdown of ${vertical.name} across Karnataka's clusters</p>
                </div>

                ${details.geographicBreakdown.length > 0 ? `
                    <div class="growth-charts-grid">
                        <div class="growth-chart-card" style="grid-column: 1 / -1;">
                            <h4>Revenue by Geography</h4>
                            <div class="chart-container" style="height: ${Math.max(250, details.geographicBreakdown.length * 40)}px;">
                                <canvas id="vertical-geo-chart"></canvas>
                            </div>
                            <div class="chart-source">Source: KDEM Target Database (Supabase)</div>
                        </div>
                    </div>
                ` : ''}

                <!-- Geographic Breakdown Table -->
                <div class="geographic-breakdown">
                    ${renderGeographicBreakdown(details.geographicBreakdown)}
                </div>

                <!-- Factor Cascade Visualization -->
                ${details.totals.revenue_usd_bn > 0 ? `
                    <div class="section-header mt-4">
                        <h3>Factor Cascade</h3>
                        <p>How revenue cascades to employment, land, and capital</p>
                    </div>
                    <div class="cascade-viz">
                        ${renderFactorCascade(details.totals, conversionRatios)}
                    </div>
                ` : ''}

                <!-- Sub-sectors (if applicable) -->
                ${verticalId === 'esdm' ? renderESDMSubsectors(appData) : ''}
                ${verticalId === 'digitizing-sectors' ? renderDigitizingSectors(appData) : ''}

                <!-- Apportionment Rules -->
                <div class="section-header mt-4">
                    <h3>Default Apportionment Rules</h3>
                    <p>Historical distribution patterns for this vertical</p>
                </div>

                <div class="apportionment-table">
                    ${renderApportionmentTable(details.apportionmentRules)}
                </div>

                <!-- Conversion Ratios -->
                ${conversionRatios && conversionRatios.length > 0 ? `
                    <div class="section-header mt-4">
                        <h3>Conversion Ratios</h3>
                        <p>Industry-standard ratios used to cascade targets for this vertical</p>
                    </div>
                    <div class="conversion-info">
                        ${renderConversionTable(conversionRatios)}
                    </div>
                ` : ''}
            </div>
        `
    } catch (error) {
        console.error(`Error rendering ${verticalId} tab:`, error)
        return `
            <div class="error-message">
                <h3>Unable to load ${verticalId} data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderGeographicBreakdown(breakdown) {
    if (!breakdown || breakdown.length === 0) {
        return `
            <div class="no-data-message">
                <p>No geographic distribution data available yet. This will be populated when targets are set in the admin interface.</p>
            </div>
        `
    }

    return `
        <div class="table-scroll-wrapper">
            <table class="data-table">
            <thead>
                <tr>
                    <th>Geography</th>
                    <th>Tier</th>
                    <th>Revenue (USD Bn)</th>
                    <th>Employment</th>
                    <th>Land (Sq Ft)</th>
                    <th>Capital (Cr)</th>
                </tr>
            </thead>
            <tbody>
                ${breakdown.map(item => `
                    <tr>
                        <td><strong>${item.geography.name}</strong></td>
                        <td><span class="tier-badge ${item.geography.tier}">${item.geography.tier || 'N/A'}</span></td>
                        <td>${formatNumber(item.revenue_usd_bn)}</td>
                        <td>${formatNumber(item.employment)}</td>
                        <td>${formatNumber(item.land_sqft)}</td>
                        <td>${formatNumber(item.capital_inr_cr)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        </div>
    `
}

function renderApportionmentTable(rules) {
    if (!rules || rules.length === 0) {
        return `<div class="no-data-message"><p>No apportionment rules defined.</p></div>`
    }

    return `
        <div class="table-scroll-wrapper">
            <table class="data-table">
            <thead>
                <tr>
                    <th>From Geography</th>
                    <th>To Geography</th>
                    <th>Allocation %</th>
                    <th>Basis</th>
                    <th>Confidence</th>
                </tr>
            </thead>
            <tbody>
                ${rules.slice(0, 10).map(rule => `
                    <tr>
                        <td>${rule.from_geography_id}</td>
                        <td><strong>${rule.to_geography_id}</strong></td>
                        <td>${rule.percentage_allocation}%</td>
                        <td>${rule.basis || 'Historical'}</td>
                        <td>${renderConfidenceStars(rule.confidence_rating || 3)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        </div>
    `
}

function renderConversionTable(ratios) {
    return `
        <div class="table-scroll-wrapper">
            <table class="data-table">
            <thead>
                <tr>
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
    `
}

function renderFactorCascade(totals, conversionRatios) {
    const empRatio = conversionRatios.find(r =>
        (r.from_metric === 'revenue' || r.from_factor_id === 'revenue') &&
        (r.to_metric === 'employment' || r.to_factor_id === 'labour')
    )
    const landRatio = conversionRatios.find(r =>
        (r.from_metric === 'employment' || r.from_factor_id === 'labour') &&
        (r.to_metric === 'land' || r.to_factor_id === 'land')
    )

    return `
        <div class="cascade-steps">
            <div class="cascade-step">
                <div class="cascade-value">${formatNumber(totals.revenue_usd_bn)} USD Bn</div>
                <div class="cascade-label">Revenue</div>
            </div>
            <div class="cascade-arrow">
                <span class="cascade-formula">${empRatio ? `× ${empRatio.ratio || empRatio.conversion_ratio} emp/$1M` : '→'}</span>
            </div>
            <div class="cascade-step">
                <div class="cascade-value">${formatNumber(totals.employment)}</div>
                <div class="cascade-label">Employment</div>
            </div>
            <div class="cascade-arrow">
                <span class="cascade-formula">${landRatio ? `× ${landRatio.ratio || landRatio.conversion_ratio} sq ft/emp` : '→'}</span>
            </div>
            <div class="cascade-step">
                <div class="cascade-value">${formatNumber(totals.land_sqft)} sq ft</div>
                <div class="cascade-label">Land</div>
            </div>
            <div class="cascade-arrow">
                <span class="cascade-formula">× geo premium</span>
            </div>
            <div class="cascade-step">
                <div class="cascade-value">${formatNumber(totals.capital_inr_cr)} Cr</div>
                <div class="cascade-label">Capital</div>
            </div>
        </div>
    `
}

function renderESDMSubsectors(appData) {
    const esdmSubs = appData.verticals.filter(v => v.parent_id === 'esdm')

    return `
        <div class="section-header mt-4">
            <h3>ESDM Sub-sectors</h3>
            <p>Specialized manufacturing segments within ESDM</p>
        </div>
        <div class="subsectors-grid">
            ${esdmSubs.map(sub => `
                <div class="subsector-card">
                    <h4>${sub.name}</h4>
                    <p>${sub.description || 'Sub-sector of ESDM'}</p>
                </div>
            `).join('')}
        </div>
    `
}

function renderDigitizingSectors(appData) {
    const digitizing = appData.verticals.filter(v => v.category === 'digitizing')

    return `
        <div class="section-header mt-4">
            <h3>Newly Digitizing Sectors</h3>
            <p>Traditional sectors undergoing digital transformation</p>
        </div>
        <div class="subsectors-grid">
            ${digitizing.map(sector => `
                <div class="subsector-card">
                    <h4>${sector.name}</h4>
                    <p>${sector.description || ''}</p>
                </div>
            `).join('')}
        </div>
    `
}

function initVerticalCharts(details, conversionRatios) {
    // Geographic Distribution Doughnut Chart
    if (details.geographicBreakdown.length > 0) {
        const geoLabels = details.geographicBreakdown.map(g => g.geography.name)
        const geoRevenues = details.geographicBreakdown.map(g => g.revenue_usd_bn)
        const totalRev = geoRevenues.reduce((a, b) => a + b, 0)
        const geoColors = details.geographicBreakdown.map(g => {
            const tier = g.geography.tier || ''
            if (tier.includes('tier1')) return CHART_COLORS.tiers[0]
            if (tier.includes('tier2')) return CHART_COLORS.tiers[1]
            if (tier.includes('tier3')) return CHART_COLORS.tiers[2]
            return CHART_COLORS.verticals[0]
        })

        createDoughnutChart('vertical-geo-chart', geoLabels, geoRevenues, geoColors, `$${totalRev.toFixed(0)}B`)
    }
}
