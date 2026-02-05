/**
 * Overview Tab Renderer
 * Shows 5-pillar framework and total digital economy metrics
 */

import { getVerticalOverview, getTotalMetrics } from '../services/dataService.js'
import {
    Chart,
    BarController,
    LineController,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

// Register only the Chart.js components we need (bar and line charts)
Chart.register(
    BarController,
    LineController,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
)

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

                <!-- Economic Context -->
                <div class="section-header mt-4">
                    <h3>Economic Context: GDP & GSDP</h3>
                    <p>India's GDP and Karnataka's contribution to the national economy</p>
                </div>

                <div class="economic-context">
                    ${renderEconomicContext()}
                </div>

                <!-- India IT Market Breakdown -->
                <div class="section-header mt-4">
                    <h3>India IT Market: Exports vs Domestic</h3>
                    <p>Comparison of India's IT services export and domestic market</p>
                </div>

                <div class="it-market-breakdown">
                    ${renderITMarketBreakdown()}
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
    // Initialize charts after DOM is rendered
    setTimeout(() => initializeCharts(), 0)

    return `
        <div class="growth-charts-grid">
            <!-- India Digital Economy Chart -->
            <div class="growth-chart-card">
                <h4>India Digital Economy Growth</h4>
                <p class="chart-subtitle">Projected to reach $1.2 Trillion by 2029-30</p>
                <div class="chart-container">
                    <canvas id="india-digital-economy-chart"></canvas>
                </div>
                <div class="chart-source">Source: ICRIER estimates, MoSPI and IMF</div>
            </div>

            <!-- Karnataka IT Exports Chart -->
            <div class="growth-chart-card">
                <h4>Karnataka IT Exports</h4>
                <p class="chart-subtitle">Steady growth from $28.7B to $52B</p>
                <div class="chart-container">
                    <canvas id="karnataka-it-exports-chart"></canvas>
                </div>
                <div class="chart-source">Source: STPI Karnataka</div>
            </div>

            <!-- ESDM Market Chart -->
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

function initializeCharts() {
    // India Digital Economy Growth (2022-23 to 2029-30)
    const indiaDigitalEconomy = {
        labels: ['2022-23', '2023-24', '2024-25', '2025-26', '2026-27', '2027-28', '2028-29', '2029-30'],
        values: [402, 448, 529, 625, 740, 879, 1046, 1247]
    }

    // Karnataka IT Exports (2020-21 to 2024-25)
    const karnatakaITExports = {
        labels: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
        values: [28.69, 34.94, 38.74, 48.89, 52.04]
    }

    // ESDM Market Revenue
    const esdmMarket = {
        labels: ['2022-23', '2024-25', '2025-26'],
        values: [24, 36.69, 43.74]
    }

    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: { size: 14 },
                bodyFont: { size: 13 },
                callbacks: {
                    label: function(context) {
                        return '$' + context.parsed.y + 'B'
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '$' + value + 'B'
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }

    // India Digital Economy Chart
    const indiaCtx = document.getElementById('india-digital-economy-chart')
    if (indiaCtx) {
        new Chart(indiaCtx, {
            type: 'bar',
            data: {
                labels: indiaDigitalEconomy.labels,
                datasets: [{
                    data: indiaDigitalEconomy.values,
                    backgroundColor: '#E96337',
                    borderRadius: 4,
                    barThickness: 40
                }]
            },
            options: commonOptions
        })
    }

    // Karnataka IT Exports Chart
    const karnatakaCtx = document.getElementById('karnataka-it-exports-chart')
    if (karnatakaCtx) {
        new Chart(karnatakaCtx, {
            type: 'bar',
            data: {
                labels: karnatakaITExports.labels,
                datasets: [{
                    data: karnatakaITExports.values,
                    backgroundColor: '#5BB9EC',
                    borderRadius: 4,
                    barThickness: 40
                }]
            },
            options: commonOptions
        })
    }

    // ESDM Market Chart
    const esdmCtx = document.getElementById('esdm-market-chart')
    if (esdmCtx) {
        new Chart(esdmCtx, {
            type: 'bar',
            data: {
                labels: esdmMarket.labels,
                datasets: [{
                    data: esdmMarket.values,
                    backgroundColor: '#8B5CF6',
                    borderRadius: 4,
                    barThickness: 40
                }]
            },
            options: commonOptions
        })
    }
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

function renderEconomicContext() {
    // Initialize chart after DOM render
    setTimeout(() => initializeEconomicChart(), 0)

    return `
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
    `
}

function renderITMarketBreakdown() {
    // Initialize chart after DOM render
    setTimeout(() => initializeITMarketChart(), 0)

    return `
        <div class="growth-charts-grid">
            <div class="growth-chart-card" style="grid-column: 1 / -1;">
                <h4>India IT Market: Exports vs Domestic Services</h4>
                <p class="chart-subtitle">IT Exports significantly larger than domestic market</p>
                <div class="chart-container">
                    <canvas id="it-market-chart"></canvas>
                </div>
                <div class="chart-source">Source: Industry estimates</div>
            </div>
        </div>
    `
}

function initializeEconomicChart() {
    const ctx = document.getElementById('gdp-comparison-chart')
    if (!ctx) return

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
            datasets: [{
                label: 'India GDP (USD Billion)',
                data: [2690, 3190, 3260, 3600, 3790],
                borderColor: '#E96337',
                backgroundColor: 'rgba(233, 99, 55, 0.1)',
                yAxisID: 'y',
                tension: 0.4
            }, {
                label: 'Karnataka GSDP (USD Billion)',
                data: [222, 270, 281, 306, 331],
                borderColor: '#5BB9EC',
                backgroundColor: 'rgba(91, 185, 236, 0.1)',
                yAxisID: 'y1',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'India GDP (USD Billion)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'B'
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Karnataka GSDP (USD Billion)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'B'
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    })
}

function initializeITMarketChart() {
    const ctx = document.getElementById('it-market-chart')
    if (!ctx) return

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2019-20', '2020-21', '2021-22', '2022-23'],
            datasets: [{
                label: 'IT Exports (USD Billion)',
                data: [147, 150, 170, 193],
                backgroundColor: '#E96337',
                borderRadius: 4
            }, {
                label: 'IT Domestic (USD Billion)',
                data: [44, 46, 57, 53],
                backgroundColor: '#5BB9EC',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.y + 'B'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'B'
                        }
                    }
                }
            }
        }
    })
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
