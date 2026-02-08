/**
 * Overview Tab Renderer
 * Redesigned to tell the story: Where Karnataka is Today → The Journey → The $400B Target
 * Uses ECharts (gauge, sankey, treemap, waterfall) + Chart.js (annotated area, doughnut)
 */

import { getVerticalOverview, getTotalMetrics, fetchConversionRatios, fetchTargets } from '../services/dataService.js'
import {
    getKarnatakaBaseline, getVerticalBaselines, getIndiaDigitalEconomyTimeline,
    getKarnatakaITExportsTimeline, getGDPComparisonTimeline,
    getRevenueWaterfall, getRevenueSankeyData, getRevenueTreemapData
} from '../services/referenceData.js'
import { formatNumber } from '../utils/formatting.js'
import { annotatedMetricCard, renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createDoughnutChart, createAnnotatedAreaChart, createAreaChart } from '../utils/chartFactories.js'
import { createSpeedometerGauge, createSankeyChart, createTreemapChart, createWaterfallChart } from '../utils/echartsFactories.js'

export async function renderOverviewTab(appData) {
    try {
        const [verticalOverview, totalMetrics, conversionRatios, allTargets] = await Promise.all([
            getVerticalOverview(2030),
            getTotalMetrics(2030),
            fetchConversionRatios(),
            fetchTargets({ year: 2030 })
        ])

        const coreVerticals = appData.verticals.filter(v => v.category === 'core')
        const baseline = getKarnatakaBaseline()
        const verticalBaselines = getVerticalBaselines()

        window.__kdem_initCharts = () => initAllCharts(verticalOverview, totalMetrics, baseline, verticalBaselines)

        return `
            <div class="overview-tab">
                <div class="tab-header">
                    <h2>Karnataka Digital Economy Overview</h2>
                    <p class="tab-subtitle">From $86B Today to $400B by 2030 — The Journey Ahead</p>
                </div>

                <!-- SECTION 1: WHERE WE ARE TODAY -->
                <div class="section-header">
                    <h3>Where Karnataka Stands Today</h3>
                    <p>Current digital economy baseline (FY 2024-25 estimates)</p>
                </div>

                <div class="metrics-grid">
                    ${annotatedMetricCard({
                        label: 'Current Digital Economy', value: baseline.currentTotalDigital_USD_Bn, unit: 'USD Billion',
                        icon: '📊', type: 'benchmark', confidence: 3,
                        source: baseline.source, target: '$400B by 2030',
                        formula: 'Sum of IT Exports + IT Domestic + ESDM + Startups + Digitizing'
                    })}
                    ${annotatedMetricCard({
                        label: 'Karnataka GSDP', value: baseline.currentGSDP_USD_Bn, unit: 'USD Billion',
                        icon: '🏛️', type: 'benchmark', confidence: 5,
                        source: 'MoSPI / RBI Handbook 2025',
                        formula: 'Digital economy = 26% of GSDP today → target 120%+'
                    })}
                    ${annotatedMetricCard({
                        label: 'IT Employment', value: baseline.currentITEmployment, unit: 'Jobs',
                        icon: '👥', type: 'benchmark', confidence: 4,
                        source: 'NASSCOM / STPI Karnataka', target: '5M by 2030',
                        formula: 'Current IT/ITES workforce in Karnataka'
                    })}
                    ${annotatedMetricCard({
                        label: 'Share of India IT', value: baseline.karnatakaITShareOfIndia_Pct, unit: '%',
                        icon: '🎯', type: 'benchmark', confidence: 5,
                        source: 'STPI Karnataka FY25',
                        formula: 'Karnataka IT exports / India total IT exports'
                    })}
                </div>

                <!-- SECTION 2: PROGRESS GAUGES — Today vs Target -->
                <div class="section-header mt-4">
                    <h3>Progress Towards 2030 Vision</h3>
                    <p>How far we've come and how far we need to go</p>
                </div>

                <div class="gauge-grid-echarts">
                    <div class="gauge-item-echarts">
                        <div id="revenue-speedometer" class="echart-container" style="height: 260px;"></div>
                        <div class="gauge-label">
                            <strong>$${baseline.currentTotalDigital_USD_Bn}B</strong> of $400B Revenue Target
                            <br/>${renderConfidenceStars(3)}
                        </div>
                    </div>
                    <div class="gauge-item-echarts">
                        <div id="employment-speedometer" class="echart-container" style="height: 260px;"></div>
                        <div class="gauge-label">
                            <strong>${formatNumber(baseline.currentITEmployment)}</strong> of 5M Employment Target
                            <br/>${renderConfidenceStars(4)}
                        </div>
                    </div>
                </div>

                <!-- SECTION 3: VERTICAL BASELINES — Current vs 2030 Target per pillar -->
                <div class="section-header mt-4">
                    <h3>The 5 Pillars: Current vs 2030 Target</h3>
                    <p>Each vertical's journey from today to the $400B goal</p>
                </div>

                <div class="pillars-grid">
                    ${coreVerticals.map(vertical => {
                        const target = verticalOverview.find(v => v.id === vertical.id) || {}
                        const current = verticalBaselines.find(v => v.id === vertical.id) || {}
                        return renderPillarCard(vertical, target, current)
                    }).join('')}
                </div>

                <!-- SECTION 4: WATERFALL — How the 5 verticals add up to $400B -->
                <div class="section-header mt-4">
                    <h3>Building to $400B: Revenue by Vertical</h3>
                    <p>How the five pillars combine to reach the target</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1; max-width: 700px; margin: 0 auto;">
                        <div id="revenue-waterfall" class="echart-container" style="height: 350px;"></div>
                        <div class="chart-source">Source: KDEM Target Database ${renderConfidenceStars(3)}</div>
                    </div>
                </div>

                <!-- SECTION 5: TREEMAP — Hierarchical composition -->
                <div class="section-header mt-4">
                    <h3>Revenue Composition: Verticals & Sub-sectors</h3>
                    <p>Relative size of each vertical and its sub-sectors in the $400B target</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1;">
                        <div id="revenue-treemap" class="echart-container" style="height: 450px;"></div>
                        <div class="chart-source">Source: KDEM Target Database ${renderConfidenceStars(3)}</div>
                    </div>
                </div>

                <!-- SECTION 6: SANKEY — Flow from target to verticals to geographies -->
                <div class="section-header mt-4">
                    <h3>Revenue Flow: Target → Verticals → Geographies</h3>
                    <p>How the $400B target distributes across verticals and geographic clusters</p>
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

                <!-- SECTION 9: Revenue Composition Doughnut -->
                <div class="section-header mt-4">
                    <h3>2030 Target: Revenue Composition</h3>
                    <p>How the 5 verticals contribute to the $400B target</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto;">
                        <div class="chart-container" style="height: 350px;">
                            <canvas id="revenue-composition-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: KDEM Target Database ${renderConfidenceStars(3)}</div>
                    </div>
                </div>

                <!-- SECTION 10: Conversion Ratios -->
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
                    <span class="metric-label-small">2030 Target</span>
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
                <h4>Karnataka IT Exports Trajectory</h4>
                <p class="chart-subtitle">From $52B today to $229B target by 2030</p>
                <div class="chart-container">
                    <canvas id="karnataka-it-exports-chart"></canvas>
                </div>
                <div class="chart-source">Source: STPI Karnataka ${renderConfidenceStars(4)}</div>
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

    createSpeedometerGauge('employment-speedometer', baseline.currentITEmployment, baseline.targetEmployment, 'Employment Progress', {
        unit: `${(baseline.currentITEmployment / 1000000).toFixed(1)}M / ${(baseline.targetEmployment / 1000000).toFixed(0)}M`
    })

    // 2. WATERFALL — How verticals add up
    const waterfallData = getRevenueWaterfall()
    createWaterfallChart('revenue-waterfall', waterfallData)

    // 3. TREEMAP — Hierarchical composition
    const treemapData = getRevenueTreemapData()
    createTreemapChart('revenue-treemap', treemapData)

    // 4. SANKEY — Flow from target to verticals to geographies
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

    const itTimeline = getKarnatakaITExportsTimeline()
    createAnnotatedAreaChart(
        'karnataka-it-exports-chart',
        itTimeline.labels,
        [
            { label: 'Actual (USD Bn)', data: itTimeline.actual, color: '#5BB9EC' },
            { label: 'Projected (USD Bn)', data: itTimeline.projected, color: '#5BB9EC', dashed: true }
        ],
        {
            targetLine: { value: itTimeline.target, label: `Target: $${itTimeline.target}B`, color: '#ef4444' },
            todayLine: { index: itTimeline.todayIndex, label: 'FY 2024-25' }
        }
    )

    // 6. GDP COMPARISON — plain area chart
    const gdpTimeline = getGDPComparisonTimeline()
    createAreaChart(
        'gdp-comparison-chart',
        gdpTimeline.labels,
        [
            { label: 'Karnataka GSDP (USD Bn)', data: gdpTimeline.karnatakaGSDP, color: '#5BB9EC' },
            { label: 'India GDP (USD Bn, scaled /10)', data: gdpTimeline.indiaGDP_scaled, color: '#E96337' }
        ]
    )

    // 7. DOUGHNUT — Revenue composition
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
}
