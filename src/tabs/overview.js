/**
 * Overview Tab Renderer
 * Shows 5-pillar framework and total digital economy metrics
 */

import { getVerticalOverview, getTotalMetrics } from '../services/dataService.js'

export async function renderOverviewTab(appData) {
    try {
        // Fetch overview data
        const verticalOverview = await getVerticalOverview(2030)
        const totalMetrics = await getTotalMetrics(2030)

        // Get core verticals
        const coreVerticals = appData.verticals.filter(v => v.category === 'core')

        return `
            <div class="overview-tab">
                <div class="tab-header">
                    <h2>Karnataka Digital Economy Overview</h2>
                    <p class="tab-subtitle">Building a $400 Billion Digital Economy by 2030</p>
                </div>

                <!-- Total Metrics Summary -->
                <div class="metrics-grid">
                    ${renderMetricCard('Total Revenue', totalMetrics.total_revenue_usd_bn, 'USD Billion', '$400B Target', 'revenue')}
                    ${renderMetricCard('Total Employment', totalMetrics.total_employment, 'Jobs', '5M Target', 'employment')}
                    ${renderMetricCard('Land Required', totalMetrics.total_land_sqft, 'Million Sq Ft', 'Infrastructure', 'land')}
                    ${renderMetricCard('Capital Investment', totalMetrics.total_capital_inr_cr, 'INR Crores', 'Investment', 'capital')}
                </div>

                <!-- 5-Pillar Framework -->
                <div class="section-header">
                    <h3>5-Pillar Digital Economy Framework</h3>
                    <p>Karnataka's digital economy is built on five core pillars, each contributing to the overall $400 billion vision</p>
                </div>

                <div class="pillars-grid">
                    ${coreVerticals.map(vertical => {
                        const data = verticalOverview.find(v => v.id === vertical.id) || {}
                        return renderPillarCard(vertical, data)
                    }).join('')}
                </div>

                <!-- Year-wise Growth Trends -->
                <div class="section-header mt-4">
                    <h3>Growth Trends & Projections</h3>
                    <p>Historical performance and future projections for India and Karnataka's digital economy</p>
                </div>

                <div class="growth-trends">
                    ${renderGrowthTrends()}
                </div>

                <!-- Vision Progress -->
                <div class="section-header mt-4">
                    <h3>Progress Towards 2030 Vision</h3>
                </div>

                <div class="vision-progress">
                    ${renderVisionProgress(totalMetrics)}
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

function renderMetricCard(label, value, unit, target, icon) {
    const formattedValue = formatNumber(value)

    const iconMap = {
        'revenue': '💰',
        'employment': '👥',
        'land': '🏗️',
        'capital': '💼'
    }

    return `
        <div class="metric-card">
            <div class="metric-icon">${iconMap[icon] || '📊'}</div>
            <div class="metric-content">
                <div class="metric-label">${label}</div>
                <div class="metric-value">${formattedValue}</div>
                <div class="metric-unit">${unit}</div>
                <div class="metric-target">${target}</div>
            </div>
        </div>
    `
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
                ${getVerticalDescription(vertical.id)}
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
                    <span class="metric-label-small">Land (M Sq Ft)</span>
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

function renderGrowthTrends() {
    // India Digital Economy Growth (2022-23 to 2029-30)
    const indiaDigitalEconomy = [
        { year: '2022-23', value: 402 },
        { year: '2023-24', value: 448 },
        { year: '2024-25', value: 529 },
        { year: '2025-26', value: 625 },
        { year: '2026-27', value: 740 },
        { year: '2027-28', value: 879 },
        { year: '2028-29', value: 1046 },
        { year: '2029-30', value: 1247 }
    ]

    // Karnataka IT Exports (2020-21 to 2024-25)
    const karnatakaITExports = [
        { year: '2020-21', value: 28.69 },
        { year: '2021-22', value: 34.94 },
        { year: '2022-23', value: 38.74 },
        { year: '2023-24', value: 48.89 },
        { year: '2024-25', value: 52.04 }
    ]

    // ESDM Market Revenue
    const esdmMarket = [
        { year: '2022-23', value: 24 },
        { year: '2024-25', value: 36.69 },
        { year: '2025-26', value: 43.74 }
    ]

    const maxIndiaValue = Math.max(...indiaDigitalEconomy.map(d => d.value))
    const maxKarnatakaValue = Math.max(...karnatakaITExports.map(d => d.value))
    const maxESDMValue = Math.max(...esdmMarket.map(d => d.value))

    return `
        <div class="growth-charts-grid">
            <!-- India Digital Economy Chart -->
            <div class="growth-chart-card">
                <h4>India Digital Economy Growth</h4>
                <p class="chart-subtitle">Projected to reach $1.2 Trillion by 2029-30</p>
                <div class="bar-chart">
                    ${indiaDigitalEconomy.map(data => {
                        const heightPx = ((data.value / maxIndiaValue) * 180).toFixed(1)
                        return `
                            <div class="bar-container">
                                <div class="bar-value">$${data.value}B</div>
                                <div class="bar" style="height: ${heightPx}px">
                                    <div class="bar-fill"></div>
                                </div>
                                <div class="bar-label">${data.year}</div>
                            </div>
                        `
                    }).join('')}
                </div>
                <div class="chart-source">Source: ICRIER estimates, MoSPI and IMF</div>
            </div>

            <!-- Karnataka IT Exports Chart -->
            <div class="growth-chart-card">
                <h4>Karnataka IT Exports</h4>
                <p class="chart-subtitle">Steady growth from $28.7B to $52B</p>
                <div class="bar-chart">
                    ${karnatakaITExports.map(data => {
                        const heightPx = ((data.value / maxKarnatakaValue) * 180).toFixed(1)
                        return `
                            <div class="bar-container">
                                <div class="bar-value">$${data.value.toFixed(1)}B</div>
                                <div class="bar" style="height: ${heightPx}px">
                                    <div class="bar-fill bar-fill-karnataka"></div>
                                </div>
                                <div class="bar-label">${data.year}</div>
                            </div>
                        `
                    }).join('')}
                </div>
                <div class="chart-source">Source: STPI Karnataka</div>
            </div>

            <!-- ESDM Market Chart -->
            <div class="growth-chart-card">
                <h4>India ESDM Market Revenue</h4>
                <p class="chart-subtitle">Rapid expansion in electronics manufacturing</p>
                <div class="bar-chart">
                    ${esdmMarket.map(data => {
                        const heightPx = ((data.value / maxESDMValue) * 180).toFixed(1)
                        return `
                            <div class="bar-container">
                                <div class="bar-value">$${data.value.toFixed(1)}B</div>
                                <div class="bar" style="height: ${heightPx}px">
                                    <div class="bar-fill bar-fill-esdm"></div>
                                </div>
                                <div class="bar-label">${data.year}</div>
                            </div>
                        `
                    }).join('')}
                </div>
                <div class="chart-source">Source: MEITY, IBEF, Care Edge</div>
            </div>
        </div>
    `
}

function renderVisionProgress(totalMetrics) {
    const revenueProgress = (totalMetrics.total_revenue_usd_bn / 400) * 100
    const employmentProgress = (totalMetrics.total_employment / 5000000) * 100

    return `
        <div class="progress-grid">
            <div class="progress-item">
                <div class="progress-header">
                    <span class="progress-label">Revenue Target Progress</span>
                    <span class="progress-percentage">${revenueProgress.toFixed(1)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${revenueProgress}%"></div>
                </div>
                <div class="progress-details">
                    <span>${formatNumber(totalMetrics.total_revenue_usd_bn)} USD Bn</span>
                    <span>of $400 Bn target</span>
                </div>
            </div>
            <div class="progress-item">
                <div class="progress-header">
                    <span class="progress-label">Employment Target Progress</span>
                    <span class="progress-percentage">${employmentProgress.toFixed(1)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${employmentProgress}%"></div>
                </div>
                <div class="progress-details">
                    <span>${formatNumber(totalMetrics.total_employment)} Jobs</span>
                    <span>of 5M target</span>
                </div>
            </div>
        </div>
    `
}

function getVerticalDescription(verticalId) {
    const descriptions = {
        'it-exports': 'Software product development and IT services for global markets. Includes GCCs, product companies, and services firms.',
        'it-domestic': 'Digital services for Indian businesses and government. Includes SaaS platforms, enterprise solutions, and govt tech.',
        'esdm': 'Electronic System Design & Manufacturing. Includes semiconductors, PCB manufacturing, and aerospace electronics.',
        'startups': 'Innovation ecosystem and early-stage ventures. Includes tech startups, incubators, and R&D centers.',
        'digitizing-sectors': 'Traditional sectors adopting digital technologies. Includes healthcare, education, agriculture, and finance digitization.'
    }
    return descriptions[verticalId] || ''
}

function formatNumber(value) {
    if (!value || value === 0) return '0'

    if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + 'M'
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + 'K'
    } else {
        return value.toFixed(2)
    }
}
