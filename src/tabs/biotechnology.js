/**
 * Biotechnology Tab Renderer
 * Presents Karnataka BioEconomy Report 2025 data
 * Covers sectoral composition, regional distribution, startups, and investment landscape
 */

import { getBiotechnologyData, getKarnatakaBaseline } from '../services/referenceData.js'
import { formatCurrency, formatNumber } from '../utils/formatting.js'
import { annotatedMetricCard, renderConfidenceStars } from '../utils/components.js'
import { createAnnotatedAreaChart } from '../utils/chartFactories.js'

function renderHorizontalBar(items, totalLabel) {
    const total = items.reduce((sum, i) => sum + i.value, 0)
    return `
        <div class="hz-bar-chart">
            <div class="hz-bar-track">
                ${items.map(i => `<div class="hz-bar-segment" style="width: ${(i.value / total * 100).toFixed(1)}%; background: ${i.color};" title="${i.name}: $${i.value}B (${(i.value / total * 100).toFixed(1)}%)"></div>`).join('')}
            </div>
            <div class="hz-bar-legend">
                ${items.map(i => `
                    <div class="hz-bar-legend-item">
                        <span class="hz-bar-swatch" style="background: ${i.color};"></span>
                        <span class="hz-bar-label">${i.name}</span>
                        <span class="hz-bar-value">$${i.value}B</span>
                        <span class="hz-bar-pct">${(i.value / total * 100).toFixed(1)}%</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `
}

function renderRegionalBars(clusters) {
    const max = Math.max(...clusters.map(d => d.share))
    return `
        <div class="regional-bars">
            ${clusters.map(d => `
                <div class="regional-bar-row">
                    <span class="regional-bar-name">${d.name}</span>
                    <div class="regional-bar-track">
                        <div class="regional-bar-fill" style="width: ${(d.share / max * 100).toFixed(1)}%; background: ${d.share > 10 ? '#E96337' : d.share > 3 ? '#E68634' : '#5BB9EC'};"></div>
                    </div>
                    <span class="regional-bar-value">$${d.value.toFixed(1)}B</span>
                    <span class="regional-bar-pct">${d.share}%</span>
                </div>
            `).join('')}
        </div>
    `
}

export async function renderBiotechnologyTab(appData) {
    try {
        const btData = getBiotechnologyData()
        const baseline = getKarnatakaBaseline()

        window.__kdem_initCharts = () => initBiotechnologyCharts(btData)

        const sectorItems = btData.sectors.map(s => ({ name: s.name, value: s.value, color: s.color }))

        return `
            <div class="biotechnology-tab">
                <div class="tab-header">
                    <h2>Biotechnology</h2>
                    <p class="tab-subtitle">Karnataka BioEconomy Report 2025 — A $${btData.currentValue} billion innovation economy powering India's biotech leadership</p>
                </div>

                <!-- SECTION 1: HEADLINE METRICS -->
                <div class="section-header">
                    <h3>Karnataka BioEconomy at a Glance</h3>
                    <p>Key metrics from the Karnataka BioEconomy Report 2025</p>
                </div>

                <div class="metrics-grid">
                    ${annotatedMetricCard({
                        label: 'BioEconomy Value 2025',
                        value: btData.currentValue,
                        unit: '+' + btData.growthRate + '% since 2023',
                        icon: '',
                        type: 'reported',
                        confidence: btData.confidence,
                        source: btData.source
                    })}
                    ${annotatedMetricCard({
                        label: 'Share of GSDP',
                        value: btData.gsdpShare,
                        unit: '2x national average',
                        icon: '',
                        type: 'reported',
                        confidence: btData.confidence,
                        source: btData.source
                    })}
                    ${annotatedMetricCard({
                        label: 'India Share',
                        value: btData.indiaShare,
                        unit: 'of $' + btData.indiaBioEconomy + 'B national',
                        icon: '',
                        type: 'reported',
                        confidence: btData.confidence,
                        source: btData.source
                    })}
                    ${annotatedMetricCard({
                        label: 'Active Startups',
                        value: btData.startups.cumulative,
                        unit: '+' + btData.startups.newIn2025 + ' in 2025',
                        icon: '',
                        type: 'reported',
                        confidence: btData.confidence,
                        source: btData.source
                    })}
                    ${annotatedMetricCard({
                        label: 'Investment (2024-25)',
                        value: btData.investments.totalValue,
                        unit: '~' + btData.investments.totalDeals + ' deals',
                        icon: '',
                        type: 'reported',
                        confidence: btData.confidence,
                        source: btData.source
                    })}
                    ${annotatedMetricCard({
                        label: 'Innovation Corridors',
                        value: 3,
                        unit: 'Mysuru, Belagavi, Dakshina Kannada',
                        icon: '',
                        type: 'reported',
                        confidence: btData.confidence,
                        source: btData.source
                    })}
                </div>

                <!-- SECTION 2: GROWTH TRAJECTORY -->
                <div class="section-header mt-4">
                    <h3>BioEconomy Growth Trajectory</h3>
                    <p>From $${btData.previousValues[2023]}B in 2023 to a projected $${btData.trajectory.conservativeTarget}-${btData.trajectory.optimisticTarget}B by 2032</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1;">
                        <div class="chart-container">
                            <canvas id="bt-growth-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: KBER 2025, ABLE Research ${renderConfidenceStars(btData.confidence)}</div>
                    </div>
                </div>

                <!-- SECTION 3: SECTORAL COMPOSITION -->
                <div class="section-header mt-4">
                    <h3>Sectoral Composition</h3>
                    <p>Four pillars of Karnataka's BioEconomy ($${btData.currentValue}B total)</p>
                </div>

                <div class="growth-chart-card" style="grid-column: 1 / -1;">
                    ${renderHorizontalBar(sectorItems, '$' + btData.currentValue + 'B')}
                    <div class="chart-source">Source: KBER 2025 ${renderConfidenceStars(btData.confidence)}</div>
                </div>

                <div class="pillars-grid">
                    ${btData.sectors.map(s => `
                        <div class="pillar-card">
                            <div class="pillar-card__header">
                                ${s.name}
                            </div>
                            <div class="pillar-card__value">$${s.value}B <span style="font-size: 0.8rem; color: #6b7280;">(${s.share.toFixed(1)}%)</span></div>
                            <div class="pillar-card__description">
                                ${s.description}. Grew ${s.growth.toFixed(1)}% YoY.
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- SECTION 4: REGIONAL DISTRIBUTION -->
                <div class="section-header mt-4">
                    <h3>Regional Distribution by Cluster</h3>
                    <p>BioEconomy activity mapped to Beyond Bengaluru clusters ($${btData.currentValue}B total)</p>
                </div>

                <div class="growth-chart-card" style="grid-column: 1 / -1;">
                    ${renderRegionalBars(btData.regional.clusters)}
                    <div class="chart-source">Source: KBER 2025, mapped to BB clusters ${renderConfidenceStars(3)}</div>
                </div>

                <!-- SECTION 5: STARTUP ECOSYSTEM -->
                <div class="section-header mt-4">
                    <h3>Biotech Startup Ecosystem</h3>
                    <p>${btData.startups.cumulative.toLocaleString()} active biotech startups and growing</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1;">
                        <div class="chart-container">
                            <canvas id="bt-startup-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: KBER 2025, ABLE Research ${renderConfidenceStars(btData.confidence)}</div>
                    </div>
                </div>

                <div class="metrics-grid" style="margin-top: 1rem;">
                    ${btData.startups.segmentBreakdown.slice(0, 4).map(seg => annotatedMetricCard({
                        label: seg.segment,
                        value: seg.share,
                        unit: '% of startups',
                        type: 'reported',
                        confidence: btData.confidence,
                        source: 'KBER 2025'
                    })).join('')}
                </div>

                <!-- SECTION 6: INVESTMENT LANDSCAPE -->
                <div class="section-header mt-4">
                    <h3>Investment Landscape</h3>
                    <p>$${btData.investments.totalValue}B invested across ~${btData.investments.totalDeals} deals in 2024-25</p>
                </div>

                <div class="table-scroll-wrapper">
                    <table class="projection-table">
                        <thead>
                            <tr>
                                <th>Sector</th>
                                <th>Share</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${btData.investments.sectorBreakdown.map(row => `
                                <tr>
                                    <td>${row.sector}</td>
                                    <td>${row.share}%</td>
                                    <td>~$${row.value}M</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="chart-source" style="margin-top: 0.5rem;">Source: KBER 2025, ABLE Research ${renderConfidenceStars(btData.confidence)}</div>

                <!-- SECTION 7: CONSOLIDATED PROJECTION -->
                <div class="section-header mt-4">
                    <h3>Biotechnology Projection to 2032</h3>
                </div>

                <div class="bb-cta">
                    <div class="bb-cta-content">
                        <h3>Biotechnology adds $${btData.currentValue}B today, projected to reach $${btData.trajectory.conservativeTarget}-${btData.trajectory.optimisticTarget}B by 2032</h3>
                        <p>
                            Combined with the Digital Economy ($${baseline.targetRevenue_USD_Bn}B conservative), Karnataka's total
                            tech economy could reach $${baseline.targetTotalTechEconomy_USD_Bn}B+ by 2032 — making it one of the largest
                            sub-national technology economies in Asia.
                        </p>
                        <a href="#" class="bb-cta-link" data-tab="overview">View Consolidated Overview</a>
                    </div>
                </div>

            </div>
        `
    } catch (error) {
        console.error('Error rendering Biotechnology tab:', error)
        return `
            <div class="biotechnology-tab">
                <div class="tab-header">
                    <h2>Biotechnology</h2>
                    <p class="error-message">Error loading biotechnology data. Please try again.</p>
                </div>
            </div>
        `
    }
}

/**
 * Initialize all Biotechnology tab charts
 */
function initBiotechnologyCharts(btData) {
    // 1. Growth Trajectory area chart
    createAnnotatedAreaChart('bt-growth-chart',
        btData.trajectory.labels,
        [
            { label: 'Actual (USD Bn)', data: btData.trajectory.actual, color: '#10B981' },
            { label: 'Projected (USD Bn)', data: btData.trajectory.projected, color: '#10B981', dashed: true }
        ],
        {
            todayLine: { index: 2, label: 'FY 2024-25' }
        }
    )

    // 2. Startup Ecosystem area chart
    const startupYears = btData.startups.yearlyData.map(d => String(d.year))
    const startupCumulative = btData.startups.yearlyData.map(d => d.cumulative)
    createAnnotatedAreaChart('bt-startup-chart',
        startupYears,
        [
            { label: 'Cumulative Startups', data: startupCumulative, color: '#10B981' }
        ],
        {}
    )

    // Wire up CTA link
    const ctaLink = document.querySelector('.bb-cta-link[data-tab="overview"]')
    if (ctaLink) {
        ctaLink.addEventListener('click', (e) => {
            e.preventDefault()
            window.KDEM.loadTab('overview')
        })
    }
}
