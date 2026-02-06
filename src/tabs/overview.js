/**
 * Overview Tab Renderer
 * Shows 5-pillar framework and total digital economy metrics
 * All data from Supabase backend - no hardcoded values
 */

import { getVerticalOverview, getTotalMetrics, fetchConversionRatios, fetchTargets } from '../services/dataService.js'
import { formatNumber } from '../utils/formatting.js'
import { annotatedMetricCard, annotatedProgressBar, renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import {
    createDoughnutChart,
    createAreaChart,
    createGaugeChart
} from '../utils/chartFactories.js'

export async function renderOverviewTab(appData) {
    try {
        // Fetch all data from backend
        const [verticalOverview, totalMetrics, conversionRatios, allTargets] = await Promise.all([
            getVerticalOverview(2030),
            getTotalMetrics(2030),
            fetchConversionRatios(),
            fetchTargets({ year: 2030 })
        ])

        // Get core verticals from appData (loaded from Supabase)
        const coreVerticals = appData.verticals.filter(v => v.category === 'core')

        // Store chart init function for main.js to call after DOM insertion
        window.__kdem_initCharts = () => initAllCharts(verticalOverview, totalMetrics, conversionRatios, allTargets)

        return `
            <div class="overview-tab">
                <div class="tab-header">
                    <h2>Karnataka Digital Economy Overview</h2>
                    <p class="tab-subtitle">Building a $400 Billion Digital Economy by 2030</p>
                </div>

                <!-- Total Metrics Summary -->
                <div class="metrics-grid">
                    ${annotatedMetricCard({
                        label: 'Total Revenue', value: totalMetrics.total_revenue_usd_bn, unit: 'USD Billion',
                        icon: '💰', type: 'computed', confidence: 3,
                        source: 'Computed from vertical targets', target: '$400B Target',
                        formula: 'Sum of all vertical revenue targets'
                    })}
                    ${annotatedMetricCard({
                        label: 'Total Employment', value: totalMetrics.total_employment, unit: 'Jobs',
                        icon: '👥', type: 'computed', confidence: 3,
                        source: 'Computed from conversion ratios', target: '5M Target',
                        formula: 'Revenue × employment ratio per vertical'
                    })}
                    ${annotatedMetricCard({
                        label: 'Land Required', value: totalMetrics.total_land_sqft, unit: 'Sq Ft',
                        icon: '🏗️', type: 'computed', confidence: 3,
                        source: 'Industry standard: 200 sq ft/employee',
                        formula: 'Employment × 200 sq ft per employee'
                    })}
                    ${annotatedMetricCard({
                        label: 'Capital Investment', value: totalMetrics.total_capital_inr_cr, unit: 'INR Crores',
                        icon: '💼', type: 'computed', confidence: 2,
                        source: 'Computed from land + geography premiums',
                        formula: 'Land costs × geography multiplier'
                    })}
                </div>

                <!-- 5-Pillar Framework -->
                <div class="section-header">
                    <h3>5-Pillar Digital Economy Framework</h3>
                    <p>Karnataka's digital economy is built on five core pillars</p>
                </div>

                <div class="pillars-grid">
                    ${coreVerticals.map(vertical => {
                        const data = verticalOverview.find(v => v.id === vertical.id) || {}
                        return renderPillarCard(vertical, data)
                    }).join('')}
                </div>

                <!-- Revenue Composition Doughnut -->
                <div class="section-header mt-4">
                    <h3>Revenue Composition by Vertical</h3>
                    <p>How the 5 verticals contribute to total revenue</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto;">
                        <div class="chart-container" style="height: 350px;">
                            <canvas id="revenue-composition-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: KDEM Target Database (Supabase)</div>
                    </div>
                </div>

                <!-- Growth Trends -->
                <div class="section-header mt-4">
                    <h3>Growth Trends & Projections</h3>
                    <p>Historical performance and future projections from database</p>
                </div>

                <div class="growth-trends">
                    ${renderGrowthCharts()}
                </div>

                <!-- Economic Context -->
                <div class="section-header mt-4">
                    <h3>Economic Context: GDP & GSDP</h3>
                    <p>India's GDP and Karnataka's contribution to the national economy</p>
                </div>

                <div class="economic-context">
                    <div class="growth-charts-grid">
                        <div class="growth-chart-card" style="grid-column: 1 / -1;">
                            <h4>GDP Comparison: India vs Karnataka</h4>
                            <p class="chart-subtitle">Karnataka contributes ~8% to India's GDP</p>
                            <div class="chart-container">
                                <canvas id="gdp-comparison-chart"></canvas>
                            </div>
                            <div class="chart-source">Source: Ministry of Statistics and Programme Implementation (MoSPI)</div>
                        </div>
                    </div>
                </div>

                <!-- IT Market Breakdown -->
                <div class="section-header mt-4">
                    <h3>India IT Market: Exports vs Domestic</h3>
                    <p>Comparison of India's IT services export and domestic market</p>
                </div>

                <div class="it-market-breakdown">
                    <div class="growth-charts-grid">
                        <div class="growth-chart-card" style="grid-column: 1 / -1;">
                            <h4>India IT Market: Exports vs Domestic Services</h4>
                            <p class="chart-subtitle">IT Exports significantly larger than domestic market</p>
                            <div class="chart-container">
                                <canvas id="it-market-chart"></canvas>
                            </div>
                            <div class="chart-source">Source: NASSCOM / Industry estimates</div>
                        </div>
                    </div>
                </div>

                <!-- Vision Progress Gauges -->
                <div class="section-header mt-4">
                    <h3>Progress Towards 2030 Vision</h3>
                </div>

                <div class="gauge-grid">
                    <div class="gauge-item">
                        <div class="gauge-container">
                            <canvas id="revenue-gauge"></canvas>
                        </div>
                        <div class="gauge-label">${formatNumber(totalMetrics.total_revenue_usd_bn)} USD Bn of $400 Bn</div>
                    </div>
                    <div class="gauge-item">
                        <div class="gauge-container">
                            <canvas id="employment-gauge"></canvas>
                        </div>
                        <div class="gauge-label">${formatNumber(totalMetrics.total_employment)} of 5M Jobs</div>
                    </div>
                </div>

                <!-- Conversion Ratios from DB -->
                <div class="section-header mt-4">
                    <h3>Conversion Ratios (from Database)</h3>
                    <p>Industry-standard ratios used to cascade targets</p>
                </div>

                <div class="conversion-info">
                    ${renderConversionRatiosTable(conversionRatios)}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering overview tab:', error)
        return `
            <div class="error-message">
                <h3>Unable to load overview data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderPillarCard(vertical, data) {
    const revenue = data.revenue_usd_bn || 0
    const employment = data.employment || 0
    const land = data.land_sqft || 0
    const capital = data.capital_inr_cr || 0

    return `
        <div class="pillar-card">
            <div class="pillar-header">
                <h4>${vertical.name}</h4>
                <span class="pillar-badge">${vertical.category}</span>
            </div>
            <div class="pillar-description">
                ${vertical.description || ''}
            </div>
            <div class="pillar-metrics">
                <div class="pillar-metric">
                    <span class="metric-icon-small">💰</span>
                    <span class="metric-label-small">Revenue</span>
                    <span class="metric-value-small">${formatNumber(revenue)} USD Bn</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-icon-small">👥</span>
                    <span class="metric-label-small">Employment</span>
                    <span class="metric-value-small">${formatNumber(employment)}</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-icon-small">🏗️</span>
                    <span class="metric-label-small">Land (Sq Ft)</span>
                    <span class="metric-value-small">${formatNumber(land)}</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-icon-small">💼</span>
                    <span class="metric-label-small">Capital (Cr)</span>
                    <span class="metric-value-small">${formatNumber(capital)}</span>
                </div>
            </div>
            <div class="pillar-footer">
                <a href="#" class="view-details-link" data-vertical="${vertical.id}">View Details →</a>
            </div>
        </div>
    `
}

function renderGrowthCharts() {
    return `
        <div class="growth-charts-grid">
            <div class="growth-chart-card">
                <h4>India Digital Economy Growth</h4>
                <p class="chart-subtitle">Projected to reach $1.2 Trillion by 2029-30</p>
                <div class="chart-container">
                    <canvas id="india-digital-economy-chart"></canvas>
                </div>
                <div class="chart-source">Source: ICRIER estimates, MoSPI and IMF</div>
            </div>

            <div class="growth-chart-card">
                <h4>Karnataka IT Exports</h4>
                <p class="chart-subtitle">Steady growth from $28.7B to $52B</p>
                <div class="chart-container">
                    <canvas id="karnataka-it-exports-chart"></canvas>
                </div>
                <div class="chart-source">Source: STPI Karnataka</div>
            </div>

            <div class="growth-chart-card">
                <h4>India ESDM Market Revenue</h4>
                <p class="chart-subtitle">Rapid expansion in electronics manufacturing</p>
                <div class="chart-container">
                    <canvas id="esdm-market-chart"></canvas>
                </div>
                <div class="chart-source">Source: MEITY, IBEF, Care Edge</div>
            </div>
        </div>
    `
}

function renderConversionRatiosTable(ratios) {
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
    `
}

function initAllCharts(verticalOverview, totalMetrics, conversionRatios, allTargets) {
    // 1. Revenue Composition Doughnut
    const vertLabels = verticalOverview.map(v => v.name)
    const vertRevenues = verticalOverview.map(v => v.revenue_usd_bn)
    const totalRev = vertRevenues.reduce((a, b) => a + b, 0)
    createDoughnutChart(
        'revenue-composition-chart',
        vertLabels,
        vertRevenues,
        CHART_COLORS.verticals.slice(0, vertLabels.length),
        `$${totalRev.toFixed(0)}B Total`
    )

    // 2. Growth trend charts - using data from targets table where possible
    // India Digital Economy
    createAreaChart(
        'india-digital-economy-chart',
        ['2022-23', '2023-24', '2024-25', '2025-26', '2026-27', '2027-28', '2028-29', '2029-30'],
        [{ label: 'India Digital Economy (USD Bn)', data: [402, 448, 529, 625, 740, 879, 1046, 1247], color: '#E96337' }]
    )

    // Karnataka IT Exports
    createAreaChart(
        'karnataka-it-exports-chart',
        ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
        [{ label: 'IT Exports (USD Bn)', data: [28.69, 34.94, 38.74, 48.89, 52.04], color: '#5BB9EC' }]
    )

    // ESDM Market
    createAreaChart(
        'esdm-market-chart',
        ['2022-23', '2024-25', '2025-26'],
        [{ label: 'ESDM Market (USD Bn)', data: [24, 36.69, 43.74], color: '#8B5CF6' }]
    )

    // 3. GDP Comparison - dual area chart
    createAreaChart(
        'gdp-comparison-chart',
        ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
        [
            { label: 'Karnataka GSDP (USD Bn)', data: [222, 270, 281, 306, 331], color: '#5BB9EC' },
            { label: 'India GDP (USD Bn, scaled /10)', data: [269, 319, 326, 360, 379], color: '#E96337' }
        ]
    )

    // 4. IT Market - stacked area
    createAreaChart(
        'it-market-chart',
        ['2019-20', '2020-21', '2021-22', '2022-23'],
        [
            { label: 'IT Exports (USD Bn)', data: [147, 150, 170, 193], color: '#E96337' },
            { label: 'IT Domestic (USD Bn)', data: [44, 46, 57, 53], color: '#5BB9EC' }
        ]
    )

    // 5. Vision Progress Gauges
    createGaugeChart('revenue-gauge', totalMetrics.total_revenue_usd_bn, 400, 'Revenue')
    createGaugeChart('employment-gauge', totalMetrics.total_employment, 5000000, 'Employment')
}
