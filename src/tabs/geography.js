/**
 * Geography Tab Renderer
 * Beyond Bengaluru: unified view of all clusters as a single entity
 * Bengaluru: individual geography view
 */

import { getGeographyOverview } from '../services/dataService.js'
import {
    getBBHeadlineMetrics, getBBTractionData, getBBVerticalStrengths,
    getBBEsdmInvestments, getBBPolicies, getBBSuccessStories,
    getBBDigitizingProximity, getBBProjections
} from '../services/referenceData.js'
import { formatNumber } from '../utils/formatting.js'
import { annotatedMetricCard, renderConfidenceStars } from '../utils/components.js'
import { createStackedBarChart, createRadarChart, createHorizontalBarChart } from '../utils/chartFactories.js'
import { createTreemapChart } from '../utils/echartsFactories.js'

export async function renderGeographyTab(geographyId, appData) {
    if (geographyId === 'clusters') {
        return renderBeyondBengaluru(appData)
    } else {
        return renderBengaluruPlaceholder()
    }
}

function renderBengaluruPlaceholder() {
    return `
        <div class="geography-tab">
            <div class="tab-header">
                <h2>Bengaluru</h2>
                <p class="tab-subtitle">Coming Soon — Deep dive into Karnataka's existing digital hub</p>
            </div>
            <div class="no-data-message" style="padding: 3rem; text-align: center;">
                <p style="font-size: 1.1rem; color: var(--text-secondary);">The Bengaluru dashboard is being built. Check back soon.</p>
            </div>
        </div>
    `
}

async function renderBeyondBengaluru(appData) {
    try {
        const headlines = getBBHeadlineMetrics()
        const traction = getBBTractionData()
        const verticals = getBBVerticalStrengths()
        const esdm = getBBEsdmInvestments()
        const policies = getBBPolicies()
        const stories = getBBSuccessStories()
        const proximity = getBBDigitizingProximity()
        const projections = getBBProjections()

        window.__kdem_initCharts = () => {
            initBBCharts(traction, verticals, esdm, proximity)
            setupProjectionModals(projections)
        }

        return `
            <div class="clusters-tab">
                <div class="tab-header">
                    <h2>Beyond Bengaluru</h2>
                    <p class="tab-subtitle">Not replicating Bengaluru — digitalizing the industries already there</p>
                </div>

                <!-- SECTION 1: Thesis + Headline Metrics -->
                <div class="section-header">
                    <h3>Six Clusters, One Thesis: Digitalize What Exists</h3>
                    <p>Mysuru, Mangaluru, Hubballi-Dharwad-Belagavi, Tumakuru, Kalaburagi, and Shivamogga — each with industries waiting for a digital layer</p>
                </div>

                <div class="metrics-grid">
                    ${annotatedMetricCard({
                        label: 'Companies Established (3 Years)',
                        value: headlines.totalCompanies,
                        unit: '114 new + 36 expanded',
                        icon: '',
                        type: 'actual',
                        confidence: 4,
                        source: headlines.newCompanies.source
                    })}
                    ${annotatedMetricCard({
                        label: 'Jobs Created (3 Years)',
                        value: headlines.totalJobs,
                        unit: 'Direct employment',
                        icon: '',
                        type: 'actual',
                        confidence: 4,
                        source: headlines.newCompanies.source
                    })}
                    ${annotatedMetricCard({
                        label: 'ESDM Investment Pipeline',
                        value: headlines.esdmInvestmentPipeline.value,
                        unit: 'Rs Crore committed',
                        icon: '',
                        type: 'actual',
                        confidence: 3,
                        source: headlines.esdmInvestmentPipeline.source
                    })}
                    ${annotatedMetricCard({
                        label: 'Cluster Seed Fund',
                        value: headlines.clusterSeedFund.value,
                        unit: 'Rs Crore (Rs 25 Cr for Mangaluru)',
                        icon: '',
                        type: 'benchmark',
                        confidence: 5,
                        source: headlines.clusterSeedFund.source
                    })}
                </div>

                <!-- SECTION 2: Traction -->
                <div class="section-header mt-4">
                    <h3>150 Companies in 3 Years: It's Already Happening</h3>
                    <p>New setups and expansions across Mysuru, Mangaluru, and Hubballi-Dharwad-Belagavi</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card">
                        <h4>New Companies by Cluster</h4>
                        <div class="chart-container">
                            <canvas id="bb-new-companies-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: ${traction.source} ${renderConfidenceStars(traction.confidence)}</div>
                    </div>
                    <div class="growth-chart-card">
                        <h4>Jobs Created by Year</h4>
                        <div class="chart-container">
                            <canvas id="bb-jobs-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: ${traction.source} ${renderConfidenceStars(traction.confidence)}</div>
                    </div>
                </div>

                <div class="bb-traction-tables">
                    <div>
                        <h4>New Companies (Last 3 Years)</h4>
                        ${renderTractionTable(traction.newCompanies)}
                    </div>
                    <div>
                        <h4>Expanded Companies (Last 3 Years)</h4>
                        ${renderTractionTable(traction.expandedCompanies)}
                    </div>
                </div>

                <!-- SECTION 3: Projections -->
                <div class="section-header mt-4">
                    <h3>$10.8B Today, $33B–$50B by 2032</h3>
                    <p>Three scenarios: Conservative ($${projections.scenarios.conservative.bbTotal}B at ${projections.scenarios.conservative.bbShare}%), Optimistic ($${projections.scenarios.optimistic.bbTotal}B), Stretch ($${projections.scenarios.stretch.bbTotal}B)</p>
                </div>

                ${renderProjectionTable(projections)}

                <!-- Info Modal (rendered once, content swapped by JS) -->
                <div class="info-modal-overlay" id="info-modal-overlay">
                    <div class="info-modal">
                        <div class="info-modal-header">
                            <h4 id="info-modal-title"></h4>
                            <button class="info-modal-close" id="info-modal-close">&times;</button>
                        </div>
                        <div class="info-modal-body" id="info-modal-body"></div>
                    </div>
                </div>

                <!-- SECTION 4: ESDM Deep Dive -->
                <div class="section-header mt-4">
                    <h3>The Rs 3,220 Crore Bet on Manufacturing</h3>
                    <p>ESDM is the strongest Beyond Bengaluru vertical — six committed investments, 688 acres of dedicated land</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card chart-card-centered">
                        <h4>ESDM Investment by Company</h4>
                        <div class="chart-container">
                            <canvas id="bb-esdm-investments-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: ${esdm.source} ${renderConfidenceStars(esdm.confidence)}</div>
                    </div>
                </div>

                ${renderEsdmTable(esdm)}

                <div class="loi-section">
                    <h4>EMC 2.0 Clusters (Dedicated ESDM Land)</h4>
                    <div class="emc-clusters">
                        ${esdm.emcClusters.map(c => `
                            <div class="emc-card">
                                <div class="emc-name">${c.name}</div>
                                <div class="emc-value">${c.acres} acres</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${esdm.lois.length > 0 ? `
                    <div class="loi-section">
                        <h4>Letters of Intent (Last 1 Year)</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                            ${esdm.lois.map(l => `<span class="cluster-company-pill">${l.company} <span style="opacity: 0.6; font-size: 0.75rem;">(${l.location})</span></span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- SECTION 5: Digitizing Sectors Proximity -->
                <div class="section-header mt-4">
                    <h3>Seven Industries Ready to Go Digital</h3>
                    <p>Each cluster's existing industrial base creates natural demand — EV in HDB, fintech in Mangaluru, agritech in Kalaburagi</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1;">
                        <h4>Revenue Potential by Sub-Sector</h4>
                        <div id="bb-proximity-treemap" class="echart-container" style="height: 420px;"></div>
                        <div class="chart-source">Source: ${proximity.source} ${renderConfidenceStars(proximity.confidence)}</div>
                    </div>
                </div>

                <div class="proximity-legend">
                    <span class="proximity-legend-label">Industry proximity:</span>
                    <span class="proximity-legend-item"><span class="proximity-legend-dot" style="background: #16a34a;"></span> 5 — Anchor companies operating</span>
                    <span class="proximity-legend-item"><span class="proximity-legend-dot" style="background: #2563eb;"></span> 4 — Strong industrial heritage</span>
                    <span class="proximity-legend-item"><span class="proximity-legend-dot" style="background: #d97706;"></span> 3 — Institutional base, early digital</span>
                </div>

                <div class="proximity-cards">
                    ${proximity.opportunities.map(o => renderProximityCard(o)).join('')}
                </div>

                <!-- SECTION 6: Vertical Opportunity Matrix -->
                <div class="section-header mt-4">
                    <h3>Strength Across All Five Verticals</h3>
                    <p>ESDM and digitizing sectors lead, but IT exports, fintech, and startups are building momentum too</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card chart-card-centered">
                        <h4>Vertical Strength by Cluster</h4>
                        <div class="chart-container">
                            <canvas id="bb-vertical-radar-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: KDEM research & policy analysis ${renderConfidenceStars(3)}</div>
                    </div>
                </div>

                <div class="vertical-strength-cards">
                    ${verticals.map(v => renderVerticalStrengthCard(v)).join('')}
                </div>

                <!-- SECTION 7: Policy & Schemes -->
                <div class="section-header mt-4">
                    <h3>Rs 2,000 Crore in Policy Firepower</h3>
                    <p>LEAP, IT Policy incentives, GCC spoke-shore strategy, and cluster seed funds</p>
                </div>

                ${renderPoliciesTable(policies)}

                <!-- SECTION 8: Success Stories -->
                <div class="section-header mt-4">
                    <h3>From 40 Employees to 850: The Stories That Prove It</h3>
                    <p>Real companies, real jobs, real proof that beyond Bengaluru works</p>
                </div>

                <div class="stories-grid">
                    ${stories.map(s => renderStoryCard(s)).join('')}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering Beyond Bengaluru:', error)
        return `
            <div class="error-message">
                <h3>Unable to load Beyond Bengaluru data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderTractionTable(rows) {
    return `
        <div class="table-scroll-wrapper">
            <table class="data-table" style="font-size: 0.85rem;">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Mysuru</th>
                        <th>Mangaluru</th>
                        <th>HDB</th>
                        <th>Jobs</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(r => `
                        <tr>
                            <td><strong>${r.year}</strong></td>
                            <td>${r.mysuru}</td>
                            <td>${r.mangaluru}</td>
                            <td>${r.hdb}</td>
                            <td>${formatNumber(r.employment)}</td>
                            <td><strong>${r.total}</strong></td>
                        </tr>
                    `).join('')}
                    <tr style="font-weight: 700; border-top: 2px solid var(--primary-color);">
                        <td>Total</td>
                        <td>${rows.reduce((s, r) => s + r.mysuru, 0)}</td>
                        <td>${rows.reduce((s, r) => s + r.mangaluru, 0)}</td>
                        <td>${rows.reduce((s, r) => s + r.hdb, 0)}</td>
                        <td>${formatNumber(rows.reduce((s, r) => s + r.employment, 0))}</td>
                        <td>${rows.reduce((s, r) => s + r.total, 0)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
}

function renderVerticalStrengthCard(v) {
    const strengthColors = {
        'Very Strong': '#16a34a',
        'Strong': '#2563eb',
        'Moderate-Strong': '#d97706'
    }
    const color = strengthColors[v.strength] || '#6b7280'

    return `
        <div class="strength-card" style="border-left-color: ${color};">
            <div class="strength-card-header">
                <h4>${v.vertical}</h4>
                <span class="strength-badge" style="background: ${color};">${v.strength}</span>
            </div>
            <div class="strength-detail">
                <strong>Clusters:</strong> ${v.clusters}
            </div>
            <div class="strength-detail">
                ${v.signal}
            </div>
            ${v.companies.length > 0 ? `
                <div class="strength-companies">
                    ${v.companies.map(c => `<span class="cluster-company-pill">${c}</span>`).join('')}
                </div>
            ` : ''}
            <div class="strength-share">
                BB share of KDEM target: <strong>${v.bbShareOfTarget}</strong> ${renderConfidenceStars(v.confidence)}
            </div>
        </div>
    `
}

function renderEsdmTable(esdm) {
    return `
        <div class="table-scroll-wrapper" style="margin-top: 1rem;">
            <table class="data-table" style="font-size: 0.85rem;">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Investment</th>
                        <th>Jobs</th>
                        <th>Sector</th>
                    </tr>
                </thead>
                <tbody>
                    ${esdm.committed.map(c => `
                        <tr>
                            <td><strong>${c.company}</strong></td>
                            <td>${c.location}</td>
                            <td>${c.investment ? `Rs ${formatNumber(c.investment)} Cr` : '---'}</td>
                            <td>${c.jobs}</td>
                            <td>${c.sector}</td>
                        </tr>
                    `).join('')}
                    <tr style="font-weight: 700; border-top: 2px solid var(--primary-color);">
                        <td colspan="2">Total Committed</td>
                        <td>Rs ${formatNumber(esdm.totalInvestment)} Cr</td>
                        <td colspan="2">3,100+ direct jobs</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
}

function renderPoliciesTable(policies) {
    return `
        <div class="table-scroll-wrapper">
            <table class="data-table" style="font-size: 0.85rem;">
                <thead>
                    <tr>
                        <th>Scheme</th>
                        <th>Allocation</th>
                        <th>Target / Impact</th>
                        <th>Confidence</th>
                    </tr>
                </thead>
                <tbody>
                    ${policies.map(p => `
                        <tr>
                            <td><strong>${p.name}</strong></td>
                            <td>${p.allocation}</td>
                            <td>${p.target}</td>
                            <td>${renderConfidenceStars(p.confidence)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `
}

function getStoryHeroMetric(story) {
    const heroMap = {
        'EG A/S Mysuru': { value: '21x', label: 'Growth from 40 to 850 employees' },
        'Chamarajanagar': { value: '70%', label: 'Women workforce' },
        'ARAI Mandya': { value: 'Rs 500 Cr', label: 'Investment commitment' }
    }
    for (const key of Object.keys(heroMap)) {
        if (story.title.includes(key)) {
            return heroMap[key]
        }
    }
    return null
}

function renderStoryCard(story) {
    const hero = getStoryHeroMetric(story)
    return `
        <div class="story-card">
            ${hero ? `
                <div class="story-hero-metric">
                    <span class="story-hero-value">${hero.value}</span>
                    <span class="story-hero-label">${hero.label}</span>
                </div>
            ` : ''}
            <div class="story-title">${story.title}</div>
            <div class="story-subtitle">${story.subtitle}</div>
            <div class="story-body">${story.description}</div>
            <div class="story-metrics-grid">
                ${story.metrics.map(m => `
                    <div class="story-metric-item">
                        <div class="story-metric-label">${m.label}</div>
                        <div class="story-metric-value">${m.value}</div>
                    </div>
                `).join('')}
            </div>
            <div class="story-significance">${story.significance}</div>
            <div class="story-source">${story.source} ${renderConfidenceStars(story.confidence)}</div>
        </div>
    `
}

function renderProximityCard(opp) {
    const proximityColors = { 5: '#16a34a', 4: '#2563eb', 3: '#d97706', 2: '#9ca3af' }
    const color = proximityColors[opp.proximity] || '#6b7280'
    const dots = Array.from({ length: 5 }, (_, i) =>
        `<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 2px; background: ${i < opp.proximity ? '#fff' : 'rgba(255,255,255,0.3)'};"></span>`
    ).join('')

    return `
        <div class="strength-card" style="border-left-color: ${color};">
            <div class="strength-card-header">
                <h4>${opp.group}</h4>
                <span class="strength-badge" style="background: ${color};">Proximity: ${dots}</span>
            </div>
            <div class="strength-detail">
                <strong>Revenue potential:</strong> ${opp.targetRevenue} &nbsp;|&nbsp; <strong>Jobs:</strong> ${opp.targetJobs}
            </div>
            <div class="strength-detail">
                <strong>Clusters:</strong> ${opp.clusters.join(', ')}
            </div>
            <div class="strength-detail">
                ${opp.rationale}
            </div>
            <div class="strength-companies">
                ${opp.subsectors.map(s => `<span class="cluster-company-pill">${s}</span>`).join('')}
            </div>
            <div class="strength-share" style="opacity: 0.7; font-size: 0.8rem;">
                Existing: ${opp.existing}
            </div>
        </div>
    `
}

function renderProjectionTable(proj) {
    const totalFY25 = proj.rows.reduce((s, r) => s + r.fy25_bb, 0)
    const totalFY32 = proj.rows.reduce((s, r) => s + r.fy32_bb, 0)
    const totalOptimistic = proj.rows.reduce((s, r) => s + (r.fy32_optimistic || r.fy32_bb), 0)
    const totalStretch = proj.rows.reduce((s, r) => s + (r.fy32_stretch || r.fy32_bb), 0)
    const sc = proj.scenarios

    return `
        <div class="table-scroll-wrapper">
            <table class="projection-table">
                <thead>
                    <tr>
                        <th>Vertical</th>
                        <th>BB FY25</th>
                        <th>Conservative</th>
                        <th class="scenario-col scenario-col--optimistic">Optimistic</th>
                        <th class="scenario-col scenario-col--stretch">Stretch</th>
                        <th>CAGR</th>
                        <th>Driver</th>
                    </tr>
                </thead>
                <tbody>
                    ${proj.rows.map((r, i) => `
                        <tr>
                            <td>
                                ${r.vertical}
                                <button class="info-icon-btn" data-projection-idx="${i}">i</button>
                            </td>
                            <td>$${r.fy25_bb.toFixed(1)}B</td>
                            <td>$${r.fy32_bb.toFixed(1)}B</td>
                            <td class="scenario-col scenario-col--optimistic">$${(r.fy32_optimistic || r.fy32_bb).toFixed(1)}B</td>
                            <td class="scenario-col scenario-col--stretch">$${(r.fy32_stretch || r.fy32_bb).toFixed(1)}B</td>
                            <td><span class="projection-cagr">${r.cagr}%</span></td>
                            <td><span class="projection-driver">${r.driver}</span></td>
                        </tr>
                    `).join('')}
                    <tr class="projection-total-row">
                        <td>Total BB</td>
                        <td>$${totalFY25.toFixed(1)}B</td>
                        <td>$${totalFY32.toFixed(1)}B</td>
                        <td class="scenario-col scenario-col--optimistic">$${totalOptimistic.toFixed(1)}B</td>
                        <td class="scenario-col scenario-col--stretch">$${totalStretch.toFixed(1)}B</td>
                        <td><span class="projection-cagr">17.2%</span></td>
                        <td></td>
                    </tr>
                    <tr class="projection-leap-row">
                        <td>
                            With LEAP boost
                            <button class="info-icon-btn" data-projection-idx="leap">i</button>
                        </td>
                        <td></td>
                        <td>$${proj.leap.with.bbTotal.toFixed(1)}B</td>
                        <td class="scenario-col scenario-col--optimistic"></td>
                        <td class="scenario-col scenario-col--stretch"></td>
                        <td colspan="2"><span class="projection-driver">+$${proj.leap.increment}B from startup & digitizing acceleration</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="scenario-legend-row">
            <span class="scenario-legend-chip" style="border-color: #5BB9EC;">Conservative: $${sc.conservative.bbTotal}B (${sc.conservative.bbShare}% of $${sc.conservative.totalKDE}B)</span>
            <span class="scenario-legend-chip" style="border-color: #E96337;">Optimistic: $${sc.optimistic.bbTotal}B (${sc.optimistic.bbShare}% of $${sc.optimistic.totalKDE}B)</span>
            <span class="scenario-legend-chip" style="border-color: #10B981;">Stretch: $${sc.stretch.bbTotal}B (${sc.stretch.bbShare}% of $${sc.stretch.totalKDE}B)</span>
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.78rem; color: var(--text-secondary);">
            Source: ${proj.source} ${renderConfidenceStars(proj.confidence)}
            <span style="margin-left: 0.5rem; opacity: 0.7;">Click <em>i</em> for methodology and sources</span>
        </div>
    `
}

function setupProjectionModals(projections) {
    const overlay = document.getElementById('info-modal-overlay')
    const titleEl = document.getElementById('info-modal-title')
    const bodyEl = document.getElementById('info-modal-body')
    const closeBtn = document.getElementById('info-modal-close')

    if (!overlay) return

    // Close handlers
    closeBtn.addEventListener('click', () => overlay.classList.remove('active'))
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active')
    })
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') overlay.classList.remove('active')
    })

    // Info icon click handlers
    document.querySelectorAll('.info-icon-btn[data-projection-idx]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation()
            const idx = btn.dataset.projectionIdx

            let title, methodology, sources, confidence
            if (idx === 'leap') {
                title = 'LEAP Impact Methodology'
                methodology = projections.leap.methodology
                sources = projections.leap.sources
                confidence = projections.leap.confidence
            } else {
                const row = projections.rows[parseInt(idx)]
                title = `${row.vertical} — Projection Methodology`
                methodology = row.methodology
                sources = row.sources
                confidence = row.confidence
            }

            titleEl.textContent = title
            bodyEl.innerHTML = `
                <h5>Methodology</h5>
                <p>${methodology}</p>
                <h5>Sources</h5>
                <ul class="info-modal-sources">
                    ${sources.map(s => `<li>${s}</li>`).join('')}
                </ul>
                <div class="info-modal-confidence">
                    Confidence: ${renderConfidenceStars(confidence)}
                </div>
            `
            overlay.classList.add('active')
        })
    })
}

function initBBCharts(traction, verticals, esdm, proximity) {
    // 1. New Companies stacked bar chart
    const years = traction.newCompanies.map(r => r.year)
    createStackedBarChart('bb-new-companies-chart', years, [
        { label: 'Mysuru', data: traction.newCompanies.map(r => r.mysuru), backgroundColor: '#E96337' },
        { label: 'Mangaluru', data: traction.newCompanies.map(r => r.mangaluru), backgroundColor: '#5BB9EC' },
        { label: 'HDB', data: traction.newCompanies.map(r => r.hdb), backgroundColor: '#E68634' }
    ])

    // 2. Jobs created bar chart (combined new + expanded)
    const combinedJobs = traction.newCompanies.map((r, i) => ({
        year: r.year,
        newJobs: r.employment,
        expandedJobs: traction.expandedCompanies[i].employment
    }))
    createStackedBarChart('bb-jobs-chart', combinedJobs.map(r => r.year), [
        { label: 'New Companies', data: combinedJobs.map(r => r.newJobs), backgroundColor: '#E96337' },
        { label: 'Expansions', data: combinedJobs.map(r => r.expandedJobs), backgroundColor: '#5BB9EC' }
    ])

    // 3. Vertical strength radar
    const strengthMap = { 'Very Strong': 5, 'Strong': 4, 'Moderate-Strong': 3, 'Moderate': 2, 'Nascent': 1 }
    const radarLabels = verticals.map(v => v.vertical)
    createRadarChart('bb-vertical-radar-chart', radarLabels, [
        {
            label: 'BB Strength',
            data: verticals.map(v => (strengthMap[v.strength] || 2) * 20)
        }
    ])

    // 4. ESDM investments horizontal bar
    const esdmWithInvestment = esdm.committed.filter(c => c.investment)
    createHorizontalBarChart(
        'bb-esdm-investments-chart',
        esdmWithInvestment.map(c => `${c.company} (${c.location})`),
        esdmWithInvestment.map(c => c.investment),
        '#E96337'
    )

    // 5. Digitizing sectors proximity treemap
    if (proximity) {
        const treemapData = proximity.opportunities.map(o => {
            // Parse "$4-6B" → midpoint 5
            const nums = o.targetRevenue.match(/[\d.]+/g)
            const midRevenue = nums.length >= 2
                ? (parseFloat(nums[0]) + parseFloat(nums[1])) / 2
                : parseFloat(nums[0])
            return {
                name: o.group,
                value: midRevenue,
                _actual: midRevenue
            }
        })

        createTreemapChart('bb-proximity-treemap', treemapData)
    }
}
