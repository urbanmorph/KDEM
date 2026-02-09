/**
 * Overview Tab Renderer
 * Redesigned to tell the story: Where Karnataka is Today → The Journey → The $329B Target
 * Uses ECharts (gauge, sankey, treemap, waterfall) + Chart.js (annotated area, doughnut)
 */

import { getVerticalOverview, getTotalMetrics, fetchConversionRatios, fetchTargets } from '../services/dataService.js'
import {
    getKarnatakaBaseline, getVerticalBaselines, getIndiaDigitalEconomyTimeline,
    getKarnatakaDigitalEconomyTimeline, getGDPComparisonTimeline,
    getRevenueWaterfall, getRevenueSankeyData
} from '../services/referenceData.js'
import { formatNumber } from '../utils/formatting.js'
import { annotatedMetricCard, renderConfidenceStars } from '../utils/components.js'
import { Chart, destroyChart, createGradient, getResponsiveOptions } from '../utils/chartSetup.js'
import { createAnnotatedAreaChart, createAreaChart } from '../utils/chartFactories.js'
import { createSpeedometerGauge, createSankeyChart, createWaterfallChart } from '../utils/echartsFactories.js'

export async function renderOverviewTab(appData) {
    try {
        const [verticalOverview, totalMetrics, conversionRatios, allTargets] = await Promise.all([
            getVerticalOverview(2030),
            getTotalMetrics(2030),
            fetchConversionRatios(),
            fetchTargets({ year: 2030 })
        ])

        const pillarOrder = ['it-exports', 'it-domestic', 'esdm', 'digitizing-sectors', 'startups']
        const coreVerticals = appData.verticals
            .filter(v => v.category === 'core')
            .sort((a, b) => pillarOrder.indexOf(a.id) - pillarOrder.indexOf(b.id))
        const baseline = getKarnatakaBaseline()
        const verticalBaselines = getVerticalBaselines()

        window.__kdem_initCharts = () => initAllCharts(verticalOverview, totalMetrics, baseline, verticalBaselines)

        return `
            <div class="overview-tab">
                <div class="tab-header">
                    <h2>Karnataka Digital Economy Overview</h2>
                </div>

                <div class="metrics-grid">
                    ${annotatedMetricCard({
                        label: 'Current Digital Economy', value: baseline.currentTotalDigital_USD_Bn, unit: 'USD Billion',
                        icon: '📊', type: 'benchmark', confidence: 3,
                        source: baseline.source, target: `$${baseline.targetRevenue_USD_Bn}B by 2032`,
                        formula: 'Sum of IT Exports + IT Domestic + ESDM + Digitizing (Startup revenue excluded — embedded in IT figures)'
                    })}
                    ${annotatedMetricCard({
                        label: 'Karnataka GSDP', value: baseline.currentGSDP_USD_Bn, unit: 'USD Billion',
                        icon: '🏛️', type: 'benchmark', confidence: 5,
                        source: 'PRS India Budget Analysis 2025-26 (Rs 28.7L Cr @ Rs 83/$)',
                        formula: `Digital economy = ${Math.round(baseline.currentTotalDigital_USD_Bn / baseline.currentGSDP_USD_Bn * 100)}% of GSDP today`
                    })}
                    ${annotatedMetricCard({
                        label: 'Digital Economy Employment', value: baseline.currentDigitalEmployment, unit: 'Jobs',
                        icon: '👥', type: 'benchmark', confidence: 3,
                        source: baseline.source, target: `${((totalMetrics.total_employment || baseline.targetEmployment) / 1000000).toFixed(1)}M by 2032 (DB)`,
                        formula: 'IT Exports + IT Domestic + ESDM (startup employment excluded — overlaps with NASSCOM IT-BPM figures)'
                    })}
                    ${annotatedMetricCard({
                        label: "Share of India's Digital Economy", value: baseline.karnatakaDigitalShareOfIndia_Pct, unit: '%',
                        icon: '🎯', type: 'benchmark', confidence: 3,
                        source: baseline.source,
                        formula: 'Karnataka digital economy / India digital economy'
                    })}
                </div>

                <div class="error-band-note" style="background: #fef3c7; border-left: 4px solid #E68634; padding: 12px 16px; margin: -8px 0 16px 0; border-radius: 4px; font-size: 0.85rem; color: #92400e; line-height: 1.5;">
                    <strong>Note:</strong> Estimate range $${baseline.errorBand.low}-${baseline.errorBand.high}B. ${baseline.errorBand.note}
                    <br/><em style="font-size: 0.8rem; color: #a16207;">${baseline.startupNote}</em>
                </div>

                <!-- SECTION 2: VERTICAL BASELINES — The 5 Pillars -->
                <div class="section-header mt-4">
                    <h3>Mission of KDEM: The 5 Pillars</h3>
                    <p>4 revenue pillars + 1 ecosystem pillar on the journey to $${baseline.targetRevenue_USD_Bn}B</p>
                </div>

                <div class="pillars-grid">
                    ${coreVerticals.map(vertical => {
                        const target = verticalOverview.find(v => v.id === vertical.id) || {}
                        const current = verticalBaselines.find(v => v.id === vertical.id) || {}
                        return renderPillarCard(vertical, target, current)
                    }).join('')}
                </div>

                <!-- SECTION 3: PROGRESS GAUGES — Today vs Target -->
                <div class="section-header mt-4">
                    <h3>Progress Towards 2032 Vision</h3>
                    <p>How far we've come and how far we need to go</p>
                </div>

                <div class="gauge-grid-echarts">
                    <div class="gauge-item-echarts">
                        <div id="revenue-speedometer" class="echart-container" style="height: 260px;"></div>
                        <div class="gauge-label">
                            <strong>$${baseline.currentTotalDigital_USD_Bn}B</strong> of $${baseline.targetRevenue_USD_Bn}B Revenue Target
                            <br/>${renderConfidenceStars(3)}
                        </div>
                    </div>
                    <div class="gauge-item-echarts">
                        <div id="employment-speedometer" class="echart-container" style="height: 260px;"></div>
                        <div class="gauge-label">
                            <strong>${formatNumber(baseline.currentDigitalEmployment)}</strong> of ${((totalMetrics.total_employment || baseline.targetEmployment) / 1000000).toFixed(1)}M Employment Target
                            <br/><span style="font-size: 0.75rem; color: #6b7280;">AI-adjusted (medium scenario) — Source: DB targets</span>
                            <br/>${renderConfidenceStars(3)}
                        </div>
                    </div>
                </div>

                <!-- SECTION 4: WATERFALL — How the 4 revenue verticals add up to $329B -->
                <div class="section-header mt-4">
                    <h3>Building to $329B: Revenue by Vertical</h3>
                    <p>How the four revenue pillars combine to reach the FY 2031-32 target</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1; max-width: 700px; margin: 0 auto;">
                        <div id="revenue-waterfall" class="echart-container" style="height: 350px;"></div>
                        <div class="chart-source">Source: KDEM Target Database ${renderConfidenceStars(3)}</div>
                    </div>
                </div>

                <!-- SECTION 5: SANKEY — Flow from target to verticals to geographies -->
                <div class="section-header mt-4">
                    <h3>Revenue Flow: Target → Verticals → Geographies</h3>
                    <p>How the $329B target distributes across verticals and geographic clusters</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1;">
                        <div id="revenue-sankey" class="echart-container" style="height: 420px;"></div>
                        <div class="chart-source">Source: KDEM Apportionment Rules ${renderConfidenceStars(3)}</div>
                    </div>
                </div>

                <!-- SECTION 7: GROWTH TRAJECTORIES with annotations -->
                <div class="section-header mt-4">
                    <h3>Growth Trajectories & Projections</h3>
                    <p>Historical performance (solid) and future projections (dashed) with target lines</p>
                </div>

                <div class="growth-trends">
                    ${renderGrowthCharts()}
                </div>

                <!-- SECTION 8: ECONOMIC CONTEXT -->
                <div class="section-header mt-4">
                    <h3>Economic Context: GDP & GSDP</h3>
                    <p>India's GDP and Karnataka's contribution to the national economy</p>
                </div>

                <div class="economic-context">
                    <div class="growth-charts-grid">
                        <div class="growth-chart-card" style="grid-column: 1 / -1;">
                            <h4>GDP Comparison: India vs Karnataka</h4>
                            <p class="chart-subtitle">Karnataka contributes ~8.5% to India's GDP</p>
                            <div class="chart-container">
                                <canvas id="gdp-comparison-chart"></canvas>
                            </div>
                            <div class="chart-source">Source: MoSPI, RBI Handbook 2025 ${renderConfidenceStars(5)}</div>
                        </div>
                    </div>
                </div>

                <!-- SECTION 9: Conversion Ratios -->
                <div class="section-header mt-4">
                    <h3>Conversion Ratios (from Database)</h3>
                    <p>Industry-standard ratios used to cascade revenue → employment → land → capital</p>
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

function renderPillarCard(vertical, target, current) {
    const isEcosystem = current.isEcosystemPillar === true

    if (isEcosystem) {
        // Render ecosystem-focused card for Startups (no revenue in total)
        const eco = current.ecosystemMetrics || {}
        return `
            <div class="pillar-card pillar-card--ecosystem" style="border-left: 4px solid #8B5CF6; background: linear-gradient(135deg, #faf5ff, #f5f3ff);">
                <div class="pillar-header">
                    <h4>${vertical.name}</h4>
                    <span class="pillar-badge" style="background: #8B5CF6; color: white;">Ecosystem Pillar</span>
                </div>
                <div class="pillar-description">
                    ${vertical.description || ''}
                </div>
                <div class="pillar-metrics">
                    <div class="pillar-metric">
                        <span class="metric-icon-small">🚀</span>
                        <span class="metric-label-small">DPIIT Startups</span>
                        <span class="metric-value-small">${formatNumber(eco.dpiitCount || 0)}</span>
                    </div>
                    <div class="pillar-metric">
                        <span class="metric-icon-small">🏢</span>
                        <span class="metric-label-small">Total Ecosystem</span>
                        <span class="metric-value-small">${eco.totalEstimate || 'N/A'}</span>
                    </div>
                    <div class="pillar-metric">
                        <span class="metric-icon-small">💰</span>
                        <span class="metric-label-small">Annual Funding</span>
                        <span class="metric-value-small">$${eco.annualFunding || 0}B</span>
                    </div>
                    <div class="pillar-metric">
                        <span class="metric-icon-small">🦄</span>
                        <span class="metric-label-small">Unicorns</span>
                        <span class="metric-value-small">${eco.unicorns || 0} (${eco.soonicorns || 0} soonicorns)</span>
                    </div>
                </div>
                <div style="background: #ede9fe; padding: 8px 12px; border-radius: 4px; margin-top: 8px; font-size: 0.78rem; color: #5b21b6; line-height: 1.4;">
                    Revenue embedded in IT Exports/Domestic (NASSCOM figures include startup companies). Tracked as ecosystem health metrics.
                </div>
                <div class="pillar-footer">
                    ${renderConfidenceStars(current.confidence || 3)}
                    <span class="pillar-source">${eco.source || current.source || ''}</span>
                    <a href="#" class="view-details-link" data-vertical="${vertical.id}">View Details →</a>
                </div>
            </div>
        `
    }

    // Standard revenue pillar card
    const targetRev = target.revenue_usd_bn || 0
    const currentRev = current.current || 0
    const pctProgress = targetRev > 0 ? ((currentRev / targetRev) * 100).toFixed(0) : 0
    const gap = targetRev - currentRev
    const growthMultiple = currentRev > 0 ? (targetRev / currentRev).toFixed(1) : '—'

    return `
        <div class="pillar-card">
            <div class="pillar-header">
                <h4>${vertical.name}</h4>
                <span class="pillar-badge">${growthMultiple}x growth needed</span>
            </div>
            <div class="pillar-description">
                ${vertical.description || ''}
            </div>
            <div class="pillar-metrics">
                <div class="pillar-metric">
                    <span class="metric-icon-small">📊</span>
                    <span class="metric-label-small">Today</span>
                    <span class="metric-value-small">$${formatNumber(currentRev)}B</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-icon-small">🎯</span>
                    <span class="metric-label-small">2032 Target</span>
                    <span class="metric-value-small">$${formatNumber(targetRev)}B</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-icon-small">📈</span>
                    <span class="metric-label-small">Gap</span>
                    <span class="metric-value-small">$${formatNumber(gap)}B</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-icon-small">👥</span>
                    <span class="metric-label-small">Employment Target</span>
                    <span class="metric-value-small">${formatNumber(target.employment || 0)}</span>
                </div>
            </div>
            <div class="pillar-progress">
                <div class="progress-bar-mini">
                    <div class="progress-fill-mini" style="width: ${Math.min(pctProgress, 100)}%"></div>
                </div>
                <span class="progress-text-mini">${pctProgress}% of target</span>
            </div>
            <div class="pillar-footer">
                ${renderConfidenceStars(current.confidence || 3)}
                <span class="pillar-source">${current.source || ''}</span>
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
                <div class="chart-source">Source: ICRIER estimates, MoSPI, IMF ${renderConfidenceStars(3)}</div>
            </div>

            <div class="growth-chart-card">
                <h4>Karnataka's Digital Economy Trajectory</h4>
                <p class="chart-subtitle">4 revenue verticals (excl. Startups): from $106B (FY22) → $159B today (FY25) → $329B target (FY32)</p>
                <div class="chart-container">
                    <canvas id="karnataka-digital-economy-chart"></canvas>
                </div>
                <div class="chart-source">Source: NASSCOM Strategic Review 2025, MeitY, KDEM Excel ${renderConfidenceStars(4)}</div>
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

function initAllCharts(verticalOverview, totalMetrics, baseline, verticalBaselines) {
    // 1. SPEEDOMETER GAUGES — Current vs Target
    const revenuePct = (baseline.currentTotalDigital_USD_Bn / baseline.targetRevenue_USD_Bn) * 100
    createSpeedometerGauge('revenue-speedometer', baseline.currentTotalDigital_USD_Bn, baseline.targetRevenue_USD_Bn, 'Revenue Progress', {
        unit: `$${baseline.currentTotalDigital_USD_Bn}B / $${baseline.targetRevenue_USD_Bn}B`
    })

    const dbTargetEmployment = totalMetrics.total_employment || baseline.targetEmployment
    createSpeedometerGauge('employment-speedometer', baseline.currentDigitalEmployment, dbTargetEmployment, 'Employment Progress', {
        unit: `${(baseline.currentDigitalEmployment / 1000000).toFixed(1)}M / ${(dbTargetEmployment / 1000000).toFixed(1)}M`
    })

    // 2. WATERFALL — How verticals add up
    const waterfallData = getRevenueWaterfall()
    createWaterfallChart('revenue-waterfall', waterfallData)

    // 3. SANKEY — Flow from target to verticals to geographies
    const sankeyData = getRevenueSankeyData()
    createSankeyChart('revenue-sankey', sankeyData.nodes, sankeyData.links)

    // 5. ANNOTATED AREA CHARTS — Growth trajectories with target lines
    const indiaTimeline = getIndiaDigitalEconomyTimeline()
    createAnnotatedAreaChart(
        'india-digital-economy-chart',
        indiaTimeline.labels,
        [
            { label: 'Actual (USD Bn)', data: indiaTimeline.actual, color: '#E96337' },
            { label: 'Projected (USD Bn)', data: indiaTimeline.projected, color: '#E96337', dashed: true }
        ],
        {
            targetLine: { value: indiaTimeline.target, label: `Target: $${indiaTimeline.target}B`, color: '#ef4444' },
            todayLine: { index: indiaTimeline.todayIndex, label: 'FY 2024-25' }
        }
    )

    const kaTimeline = getKarnatakaDigitalEconomyTimeline()
    createAnnotatedAreaChart(
        'karnataka-digital-economy-chart',
        kaTimeline.labels,
        [
            { label: 'Actual (USD Bn)', data: kaTimeline.actual, color: '#5BB9EC' },
            { label: 'Projected (USD Bn)', data: kaTimeline.projected, color: '#5BB9EC', dashed: true }
        ],
        {
            targetLine: { value: kaTimeline.target, label: `Target: $${kaTimeline.target}B`, color: '#ef4444' },
            todayLine: { index: kaTimeline.todayIndex, label: 'FY 2024-25' }
        }
    )

    // 6. GDP COMPARISON — custom chart: plots India GDP scaled /10 but shows actual values
    const gdpTimeline = getGDPComparisonTimeline()
    const gdpCanvas = document.getElementById('gdp-comparison-chart')
    if (gdpCanvas) {
        destroyChart('gdp-comparison-chart')
        const gdpCtx = gdpCanvas.getContext('2d')
        const gdpResponsive = getResponsiveOptions()
        const indiaActual = gdpTimeline.indiaGDP_actual

        new Chart(gdpCanvas, {
            type: 'line',
            data: {
                labels: gdpTimeline.labels,
                datasets: [
                    {
                        label: 'Karnataka GSDP (USD Bn)',
                        data: gdpTimeline.karnatakaGSDP,
                        borderColor: '#5BB9EC',
                        backgroundColor: createGradient(gdpCtx, '#5BB9EC'),
                        fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#5BB9EC'
                    },
                    {
                        label: 'India GDP (USD Bn, scaled /10)',
                        data: gdpTimeline.indiaGDP_scaled,
                        borderColor: '#E96337',
                        backgroundColor: createGradient(gdpCtx, '#E96337'),
                        fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#E96337',
                        actualValues: indiaActual
                    }
                ]
            },
            options: {
                ...gdpResponsive,
                plugins: {
                    ...gdpResponsive.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const ds = context.dataset
                                if (ds.actualValues) {
                                    return `${ds.label.replace(' (USD Bn, scaled /10)', '')}: $${ds.actualValues[context.dataIndex].toLocaleString()}B`
                                }
                                return `${ds.label}: $${context.parsed.y}B`
                            }
                        }
                    },
                    datalabels: {
                        display: window.innerWidth >= 768,
                        color: '#202124',
                        font: { size: 10, weight: '600' },
                        anchor: 'end',
                        align: 'top',
                        formatter: (value, context) => {
                            const ds = context.dataset
                            if (ds.actualValues) {
                                return `$${ds.actualValues[context.dataIndex].toLocaleString()}B`
                            }
                            return `$${value}B`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: (v) => `$${v}B` },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: { grid: { display: false } }
                }
            }
        })
    }

}
