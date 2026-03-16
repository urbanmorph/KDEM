/**
 * Overview Tab Renderer
 * Redesigned to tell the story: Where Karnataka is Today → The Journey → The $329B Target
 * Uses ECharts (gauge, sankey, treemap, waterfall) + Chart.js (annotated area, doughnut)
 */

import { getVerticalOverview, getTotalMetrics, fetchTargets } from '../services/dataService.js'
import {
    getKarnatakaBaseline, getVerticalBaselines, getIndiaDigitalEconomyTimeline,
    getKarnatakaDigitalEconomyTimeline, getGDPComparisonTimeline,
    getRevenueWaterfall, getRevenueSankeyData, getRoadmapRevenueTrajectory,
    getBiotechnologyData, getCombinedRevenueWaterfall, getCombinedSankeyData, getCombinedTrajectory
} from '../services/referenceData.js'
import { formatNumber } from '../utils/formatting.js'
import { annotatedMetricCard, renderConfidenceStars } from '../utils/components.js'
import { Chart, destroyChart, createGradient, getResponsiveOptions } from '../utils/chartSetup.js'
import { createAnnotatedAreaChart, createAreaChart } from '../utils/chartFactories.js'
import { createSpeedometerGauge, createSankeyChart, createWaterfallChart } from '../utils/echartsFactories.js'

export async function renderOverviewTab(appData) {
    try {
        const [verticalOverview, totalMetrics, allTargets] = await Promise.all([
            getVerticalOverview(2030),
            getTotalMetrics(2030),
            fetchTargets({ year: 2030 })
        ])

        const pillarOrder = ['it-exports', 'it-domestic', 'esdm', 'digitizing-sectors', 'startups', 'biotechnology']
        const coreVerticals = appData.verticals
            .filter(v => v.category === 'core')
            .sort((a, b) => pillarOrder.indexOf(a.id) - pillarOrder.indexOf(b.id))
        const baseline = getKarnatakaBaseline()
        const verticalBaselines = getVerticalBaselines()

        window.__kdem_initCharts = () => initAllCharts(verticalOverview, totalMetrics, baseline, verticalBaselines)

        return `
            <div class="overview-tab">
                <!-- SECTION 1: ECONOMIC CONTEXT -->
                <div class="section-header">
                    <h3>A $345 Billion State Powering India's Digital Future</h3>
                    <p>Karnataka produces 8.5% of India's GDP and 38% of its digital exports</p>
                </div>

                <div class="economic-context">
                    <div class="growth-charts-grid">
                        <div class="growth-chart-card" style="grid-column: 1 / -1;">
                            <div class="chart-container">
                                <canvas id="gdp-comparison-chart"></canvas>
                            </div>
                            <div class="chart-source">Source: MoSPI, RBI Handbook 2025 ${renderConfidenceStars(5)}</div>
                        </div>
                    </div>
                </div>

                <!-- SECTION 2: PROGRESS GAUGES -->
                <div class="section-header mt-4">
                    <h3>Digital Economy: $${baseline.currentTotalDigital_USD_Bn}B Down, $${baseline.targetRevenue_USD_Bn - baseline.currentTotalDigital_USD_Bn}B to Go</h3>
                    <p>Karnataka's digital economy today versus the 2032 target</p>
                </div>

                <div class="gauge-grid-echarts">
                    <div class="gauge-item-echarts">
                        <div id="revenue-speedometer" class="echart-container" style="height: 260px;"></div>
                        <div class="gauge-label">
                            <strong>$${baseline.currentTotalDigital_USD_Bn}B</strong> of $${baseline.targetRevenue_USD_Bn}B Revenue Target
                            <br/><span class="scenario-range">Optimistic $${baseline.revenueScenarios.optimistic.total}B · Stretch $${baseline.revenueScenarios.stretch.total}B</span>
                            <br/>${renderConfidenceStars(3)}
                        </div>
                    </div>
                    <div class="gauge-item-echarts">
                        <div id="employment-speedometer" class="echart-container" style="height: 260px;"></div>
                        <div class="gauge-label">
                            <strong>${formatNumber(baseline.currentDigitalEmployment)}</strong> of ${((totalMetrics.total_employment || baseline.targetEmployment) / 1000000).toFixed(1)}M Employment Target
                            <br/><span style="font-size: 0.75rem; color: #6b7280;">AI-adjusted (medium scenario)</span>
                            <br/>${renderConfidenceStars(3)}
                        </div>
                    </div>
                </div>

                <!-- SECTION 3: GROWTH TRAJECTORIES -->
                <div class="section-header mt-4">
                    <h3>Riding a Decade of Compounding Growth</h3>
                    <p>India's digital economy is heading to $1.2T — Karnataka aims to capture a disproportionate share</p>
                </div>

                <div class="growth-trends">
                    ${renderGrowthCharts()}
                </div>

                <!-- SECTION 4: THE 5 PILLARS -->
                <div class="section-header mt-4">
                    <h3>Five Pillars + Biotechnology → $${baseline.targetTotalTechEconomy_USD_Bn}B</h3>
                    <p>Four digital revenue engines, one ecosystem accelerator, and one BioEconomy pillar — shown with conservative targets and scenario ranges</p>
                </div>

                <div class="pillars-grid">
                    ${coreVerticals.map(vertical => {
                        const target = verticalOverview.find(v => v.id === vertical.id) || {}
                        const current = verticalBaselines.find(v => v.id === vertical.id) || {}
                        return renderPillarCard(vertical, target, current)
                    }).join('')}
                    ${(() => {
                        const btBaseline = verticalBaselines.find(v => v.id === 'biotechnology')
                        if (!btBaseline) return ''
                        return renderPillarCard(
                            { id: 'biotechnology', name: 'Biotechnology', description: 'BioEconomy pillar — BioPharma, BioIndustrial, BioServices, BioAgri. Tracked via KBER 2025.' },
                            {},
                            btBaseline
                        )
                    })()}
                </div>

                <!-- SECTION 5: WATERFALL -->
                <div class="section-header mt-4">
                    <h3>How Five Streams Add Up to $${baseline.targetTotalTechEconomy_USD_Bn}B</h3>
                    <p>IT Exports carries half the digital weight, Biotechnology adds a separate $${baseline.targetBiotechnology_USD_Bn}B stream</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card chart-card-centered">
                        <div id="revenue-waterfall" class="echart-container" style="height: 350px;"></div>
                        <div class="chart-source">Source: KDEM Target Database ${renderConfidenceStars(3)}</div>
                    </div>
                </div>

                <!-- SECTION 6: SANKEY -->
                <div class="section-header mt-4">
                    <h3>Where the Money Lands: Bengaluru 85%, Beyond Bengaluru 15%</h3>
                    <p>$${baseline.targetTotalTechEconomy_USD_Bn}B flowing from verticals to geographies — Biotechnology's 36% Beyond Bengaluru share reshapes the balance</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1;">
                        <div id="revenue-sankey" class="echart-container" style="height: 420px;"></div>
                        <div class="chart-source">Source: KDEM Projection Model ${renderConfidenceStars(3)}</div>
                    </div>
                </div>

                <!-- BB CTA -->
                <div class="bb-cta">
                    <div class="bb-cta-content">
                        <h3>$64B+ Across Digital + Biotech Flows Beyond Bengaluru</h3>
                        <p>Biotechnology nearly doubles the Beyond Bengaluru opportunity. 167 companies already there. Rs 3,220 crore in ESDM investments. Six clusters from Mysuru to Kalaburagi building Karnataka's next frontier — not by replicating Bengaluru, but by digitalizing and bio-industrializing the industries already there.</p>
                        <a href="#" class="bb-cta-link" data-tab="clusters">Explore Beyond Bengaluru</a>
                    </div>
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

    if (current.isBiotechPillar) {
        const currentRev = current.current || 0
        const conservativeTarget = current.target || 0
        const growthMultiple = currentRev > 0 ? (conservativeTarget / currentRev).toFixed(1) : '—'
        return `
            <div class="pillar-card" style="background: linear-gradient(135deg, #ecfdf5, #f0fdf4);">
                <div class="pillar-header">
                    <h4>${vertical.name}</h4>
                    <span class="pillar-badge" style="background: #059669; color: white;">BioEconomy Pillar</span>
                </div>
                <div class="pillar-description">
                    ${vertical.description || ''}
                </div>
                <div class="pillar-metrics">
                    <div class="pillar-metric">
                        <span class="metric-label-small">Today</span>
                        <span class="metric-value-small">$${formatNumber(currentRev)}B</span>
                    </div>
                    <div class="pillar-metric">
                        <span class="metric-label-small">2032 Target</span>
                        <span class="metric-value-small">$${formatNumber(conservativeTarget)}B</span>
                    </div>
                    <div class="pillar-metric">
                        <span class="metric-label-small">Gap</span>
                        <span class="metric-value-small">$${formatNumber(conservativeTarget - currentRev)}B</span>
                    </div>
                    <div class="pillar-metric">
                        <span class="metric-label-small">Growth</span>
                        <span class="metric-value-small">${growthMultiple}x</span>
                    </div>
                </div>
                <div class="pillar-scenario-chips">
                    <span class="scenario-chip scenario-chip--conservative">$${conservativeTarget}B</span>
                    <span class="scenario-chip scenario-chip--optimistic">$${current.optimistic}B</span>
                </div>
                <div style="background: #d1fae5; padding: 8px 12px; border-radius: 4px; margin-top: 8px; font-size: 0.78rem; color: #065f46; line-height: 1.4;">
                    Tracked independently — KBER 2025. Not in digital economy total ($329B).
                </div>
                <div class="pillar-footer">
                    ${renderConfidenceStars(current.confidence || 4)}
                    <span class="pillar-source">${current.source || ''}</span>
                </div>
            </div>
        `
    }

    if (isEcosystem) {
        // Render ecosystem-focused card for Startups (no revenue in total)
        const eco = current.ecosystemMetrics || {}
        return `
            <div class="pillar-card pillar-card--ecosystem" style="background: linear-gradient(135deg, #faf5ff, #f5f3ff);">
                <div class="pillar-header">
                    <h4>${vertical.name}</h4>
                    <span class="pillar-badge" style="background: #8B5CF6; color: white;">Ecosystem Pillar</span>
                </div>
                <div class="pillar-description">
                    ${vertical.description || ''}
                </div>
                <div class="pillar-metrics">
                    <div class="pillar-metric">
                        <span class="metric-label-small">DPIIT Startups</span>
                        <span class="metric-value-small">${formatNumber(eco.dpiitCount || 0)}</span>
                    </div>
                    <div class="pillar-metric">
                        <span class="metric-label-small">Total Ecosystem</span>
                        <span class="metric-value-small">${eco.totalEstimate || 'N/A'}</span>
                    </div>
                    <div class="pillar-metric">
                        <span class="metric-label-small">Annual Funding</span>
                        <span class="metric-value-small">$${eco.annualFunding || 0}B</span>
                    </div>
                    <div class="pillar-metric">
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
                </div>
            </div>
        `
    }

    // Standard revenue pillar card
    const pillarColors = {
        'it-exports': '#E96337',
        'it-domestic': '#E68634',
        'esdm': '#5BB9EC',
        'digitizing-sectors': '#10B981',
        'startups': '#8B5CF6'
    }
    const borderColor = pillarColors[vertical.id] || '#E96337'
    const currentRev = current.current || 0
    // Use referenceData target (consistent with scenario data), fallback to DB
    const conservativeTarget = current.target || target.revenue_usd_bn || 0
    const pctProgress = conservativeTarget > 0 ? ((currentRev / conservativeTarget) * 100).toFixed(0) : 0
    const growthMultiple = currentRev > 0 ? (conservativeTarget / currentRev).toFixed(1) : '—'
    const hasScenarios = current.optimistic && current.stretch

    return `
        <div class="pillar-card">
            <div class="pillar-header">
                <h4>${vertical.name}</h4>
                <span class="pillar-badge" style="color: #5BB9EC; border-color: #5BB9EC; background: rgba(91, 185, 236, 0.12);">${growthMultiple}x growth needed</span>
            </div>
            <div class="pillar-description">
                ${vertical.description || ''}
            </div>
            <div class="pillar-metrics">
                <div class="pillar-metric">
                    <span class="metric-label-small">Today</span>
                    <span class="metric-value-small">$${formatNumber(currentRev)}B</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-label-small">2032 Target</span>
                    <span class="metric-value-small">$${formatNumber(conservativeTarget)}B</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-label-small">Gap</span>
                    <span class="metric-value-small">$${formatNumber(conservativeTarget - currentRev)}B</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-label-small">Employment Target</span>
                    <span class="metric-value-small">${formatNumber(target.employment || 0)}</span>
                </div>
            </div>
            ${hasScenarios ? `
            <div class="pillar-scenario-chips">
                <span class="scenario-chip scenario-chip--conservative">$${conservativeTarget}B</span>
                <span class="scenario-chip scenario-chip--optimistic">$${current.optimistic}B</span>
                <span class="scenario-chip scenario-chip--stretch">$${current.stretch}B</span>
            </div>
            ` : ''}
            <div class="pillar-progress">
                <div class="progress-bar-mini">
                    <div class="progress-fill-mini" style="width: ${Math.min(pctProgress, 100)}%"></div>
                </div>
                <span class="progress-text-mini">${pctProgress}% of conservative target</span>
            </div>
            <div class="pillar-footer">
                ${renderConfidenceStars(current.confidence || 3)}
                <span class="pillar-source">${current.source || ''}</span>
            </div>
        </div>
    `
}

function renderGrowthCharts() {
    return `
        <div class="growth-charts-grid">
            <div class="growth-chart-card" style="grid-column: 1 / -1;">
                <h4>India's Digital Economy: $529B and Accelerating</h4>
                <p class="chart-subtitle">IT ($283B) + ESDM + Digital Services — on track to $1.2 Trillion by 2029-30</p>
                <div class="chart-container">
                    <canvas id="india-digital-economy-chart"></canvas>
                </div>
                <div class="chart-source">Source: ICRIER estimates, MoSPI, IMF ${renderConfidenceStars(3)}</div>
            </div>

            <div class="growth-chart-card" style="grid-column: 1 / -1;">
                <h4>Karnataka's Share: $159B → $329B–$454B</h4>
                <p class="chart-subtitle">Three scenarios: Conservative, Optimistic, and Stretch</p>
                <div class="chart-container">
                    <canvas id="karnataka-digital-economy-chart"></canvas>
                </div>
                <div class="chart-source">Source: NASSCOM Strategic Review 2025, MeitY, KDEM Excel ${renderConfidenceStars(4)}</div>
            </div>

            <div class="growth-chart-card" style="grid-column: 1 / -1;">
                <h4>Total Tech Economy: Digital + Biotech → $414B+</h4>
                <p class="chart-subtitle">Two independent streams converging into one technology powerhouse</p>
                <div class="chart-container">
                    <canvas id="combined-tech-economy-chart"></canvas>
                </div>
                <div class="chart-source">Source: KDEM + KBER 2025 ${renderConfidenceStars(3)}</div>
            </div>
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

    // 2. WATERFALL — How verticals add up (combined with BT)
    const waterfallData = getCombinedRevenueWaterfall()
    createWaterfallChart('revenue-waterfall', waterfallData)

    // 3. SANKEY — Flow from target to verticals to geographies (combined with BT)
    const sankeyData = getCombinedSankeyData()
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
    const roadmap = getRoadmapRevenueTrajectory()
    // Pad scenario arrays to match KA timeline (11 points: 3 historical + 8 projected)
    const padded = (arr) => [null, null, null, ...arr]
    createAnnotatedAreaChart(
        'karnataka-digital-economy-chart',
        kaTimeline.labels,
        [
            { label: 'Actual (USD Bn)', data: kaTimeline.actual, color: '#5BB9EC' },
            { label: `Conservative ($${roadmap.scenarios.conservative.target}B)`, data: kaTimeline.projected, color: '#5BB9EC', dashed: true },
            { label: `Optimistic ($${roadmap.scenarios.optimistic.target}B)`, data: padded(roadmap.optimistic), color: '#E96337', dashed: true, fill: false, pointRadius: 0, borderWidth: 1.5, hideLabel: true },
            { label: `Stretch ($${roadmap.scenarios.stretch.target}B)`, data: padded(roadmap.stretch), color: '#10B981', dashed: true, fill: false, pointRadius: 0, borderWidth: 1.5, hideLabel: true }
        ],
        {
            targetLine: { value: kaTimeline.target, label: `Conservative: $${kaTimeline.target}B`, color: '#ef4444' },
            todayLine: { index: kaTimeline.todayIndex, label: 'FY 2024-25' }
        }
    )

    // 6. COMBINED TECH ECONOMY — Digital + Biotech stacked area
    const combinedData = getCombinedTrajectory()
    createAnnotatedAreaChart(
        'combined-tech-economy-chart',
        combinedData.labels,
        combinedData.datasets.map(ds => ({
            label: ds.label,
            data: ds.data,
            color: ds.color
        })),
        {
            todayLine: { index: combinedData.todayIndex, label: 'FY 2024-25' }
        }
    )

    // 7. GDP COMPARISON — custom chart: plots India GDP scaled /10 but shows actual values
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
                        clamp: true,
                        formatter: (value, context) => {
                            const ds = context.dataset
                            if (ds.actualValues) {
                                return `$${ds.actualValues[context.dataIndex].toLocaleString()}B`
                            }
                            return `$${value}B`
                        }
                    }
                },
                layout: {
                    padding: { right: 0, left: 0 }
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

    // BB CTA link handler
    const bbLink = document.querySelector('.bb-cta-link[data-tab="clusters"]')
    if (bbLink) {
        bbLink.addEventListener('click', (e) => {
            e.preventDefault()
            if (window.KDEM && window.KDEM.loadTab) {
                window.KDEM.loadTab('clusters')
            }
        })
    }
}
