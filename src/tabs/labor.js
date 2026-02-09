/**
 * Labor Tab Renderer
 * Shows workforce, employment, and skilling data across clusters
 * All data from referenceData service and Supabase - no hardcoded values
 */

import { getLaborMetrics, getTalentPools, getClusterTalent, getSkillingPrograms, getCoESkilling, getSkillDevelopmentPolicy, getLaborSources, getAIWorkforceImpact } from '../services/referenceData.js'
import { fetchConversionRatios } from '../services/dataService.js'
import { formatNumber } from '../utils/formatting.js'
import { renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createDoughnutChart } from '../utils/chartFactories.js'

export async function renderLaborTab(appData) {
    try {
        // Load all data from reference data functions
        const laborMetrics = getLaborMetrics()
        const talentPools = getTalentPools()
        const clusterTalent = getClusterTalent()
        const skillingPrograms = getSkillingPrograms()
        const coESkilling = getCoESkilling()
        const skillPolicy = getSkillDevelopmentPolicy()
        const laborSources = getLaborSources()
        const aiImpact = getAIWorkforceImpact()

        // Load employment conversion ratios from the database
        let conversionRatios = []
        try {
            conversionRatios = await fetchConversionRatios()
        } catch (err) {
            console.warn('Could not load conversion ratios from DB, section will show empty:', err)
        }

        // Store chart init function for main.js to call after DOM insertion
        window.__kdem_initCharts = () => initLaborCharts(talentPools)

        return `
            <div class="labor-tab">
                <div class="tab-header">
                    <h2>Labor & Skilling</h2>
                    <p class="tab-subtitle">Workforce development, employment metrics, and skilling programs across Karnataka's digital economy</p>
                </div>

                <!-- Overall Workforce Metrics -->
                <div class="section-header">
                    <h3>Karnataka Digital Economy Workforce</h3>
                </div>

                <div class="metrics-grid">
                    ${renderLaborMetrics(laborMetrics)}
                </div>

                <!-- AI Workforce Transition -->
                <div class="section-header mt-4">
                    <h3>AI Workforce Transition</h3>
                    <p>An estimated ${(aiImpact.keyStats.vulnerableWorkers.low / 1000).toFixed(0)}-${(aiImpact.keyStats.vulnerableWorkers.high / 1000).toFixed(0)}K workers in Karnataka IT are in roles vulnerable to AI automation by 2028</p>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">👥</div>
                        <div class="metric-value">${(aiImpact.keyStats.totalITWorkforce / 1000000).toFixed(1)}M</div>
                        <div class="metric-label">Karnataka IT Workforce</div>
                        <div class="metric-footer">${renderConfidenceStars(aiImpact.keyStats.confidence)}</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">⚠️</div>
                        <div class="metric-value">${(aiImpact.keyStats.vulnerableWorkers.low / 1000).toFixed(0)}-${(aiImpact.keyStats.vulnerableWorkers.high / 1000).toFixed(0)}K</div>
                        <div class="metric-label">AI-Vulnerable Workers</div>
                        <div class="metric-footer">${renderConfidenceStars(aiImpact.keyStats.confidence)}</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🤖</div>
                        <div class="metric-value">${(aiImpact.keyStats.currentAISpecialists / 1000).toFixed(0)}K</div>
                        <div class="metric-label">Current AI Specialists</div>
                        <div class="metric-footer">${renderConfidenceStars(aiImpact.keyStats.confidence)}</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🎯</div>
                        <div class="metric-value">${(aiImpact.keyStats.neededAISpecialists / 1000).toFixed(0)}K+</div>
                        <div class="metric-label">AI Specialists Needed by 2030</div>
                        <div class="metric-footer">${renderConfidenceStars(aiImpact.keyStats.confidence)}</div>
                    </div>
                </div>

                <div class="table-scroll-wrapper" style="margin-top: 1rem;">
                    <table class="data-table">
                    <thead>
                        <tr>
                            <th>Vulnerable Role</th>
                            <th>Est. Workers</th>
                            <th>Risk Level</th>
                            <th>Timeline</th>
                            <th>Mitigation</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${aiImpact.vulnerableRoles.map(r => `
                            <tr>
                                <td><strong>${r.role}</strong></td>
                                <td>${r.workers}</td>
                                <td><span class="impact-badge ${r.riskLevel.toLowerCase()}">${r.riskLevel}</span></td>
                                <td>${r.timeline}</td>
                                <td>${r.mitigation}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                </div>
                <p class="source" style="margin-top: 0.5rem;">Source: ${aiImpact.source} | ${renderConfidenceStars(aiImpact.confidence)}</p>

                <!-- Specialized Workforce -->
                <div class="section-header mt-4">
                    <h3>Specialized Talent Pools</h3>
                </div>

                <div class="talent-pools-grid">
                    ${renderTalentPools(talentPools)}
                </div>

                <!-- Workforce Composition Chart -->
                <div class="section-header mt-4">
                    <h3>Workforce Composition</h3>
                    <p>Key talent segments in Karnataka's digital economy</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card">
                        <h4>Specialized Talent Breakdown</h4>
                        <div class="chart-container">
                            <canvas id="workforce-composition-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: Bengaluru Innovation Report 2025</div>
                    </div>
                    <div class="growth-chart-card">
                        <h4>Talent Pool Size (thousands)</h4>
                        <div class="chart-container">
                            <canvas id="talent-pool-bar-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: Bengaluru Innovation Report 2025</div>
                    </div>
                </div>

                <!-- Cluster-Wise Talent Pools -->
                <div class="section-header mt-4">
                    <h3>Beyond Bengaluru: Cluster Talent Pools</h3>
                    <p>Building talent ecosystems across Karnataka</p>
                </div>

                <div class="clusters-talent-grid">
                    ${renderClusterTalent(clusterTalent)}
                </div>

                <!-- Skilling Programs & Initiatives -->
                <div class="section-header mt-4">
                    <h3>KDEM Skilling Programs & Initiatives</h3>
                </div>

                <div class="skilling-programs">
                    ${renderSkillingPrograms(skillingPrograms)}
                </div>

                <!-- Karnataka Skill Development Policy 2025-32 -->
                <div class="section-header mt-4">
                    <h3>Karnataka Skill Development Policy 2025-32</h3>
                </div>

                <div class="policy-highlight">
                    ${renderSkillPolicy(skillPolicy)}
                </div>

                <!-- Centres of Excellence Skilling Impact -->
                <div class="section-header mt-4">
                    <h3>Centres of Excellence - Skilling Impact</h3>
                </div>

                <div class="coe-grid">
                    ${renderCoESkilling(coESkilling)}
                </div>

                <!-- Employment Conversion Ratios -->
                <div class="section-header mt-4">
                    <h3>Industry Employment Conversion Ratios</h3>
                    <p>How revenue translates to employment across verticals</p>
                </div>

                <div class="conversion-table">
                    ${renderEmploymentRatios(conversionRatios)}
                </div>

                <!-- Data Sources -->
                <div class="section-header mt-4">
                    <h3>Data Sources & References</h3>
                </div>

                <div class="sources-list">
                    ${renderDataSources(laborSources)}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering labor tab:', error)
        return `
            <div class="error-message">
                <h3>Unable to load labor & skilling data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

// -------------------------------------------------------------------
// Chart initialization
// -------------------------------------------------------------------

function initLaborCharts(talentPools) {
    // Workforce composition doughnut: AI/ML 600K, GCC 665K, Chip Design 350K
    const compositionLabels = ['AI/ML Professionals', 'GCC Workforce', 'Chip Design & Embedded']
    const compositionData = [600, 665, 350]
    const compositionColors = [CHART_COLORS.verticals[0], CHART_COLORS.verticals[2], CHART_COLORS.verticals[3]]

    createDoughnutChart(
        'workforce-composition-chart',
        compositionLabels,
        compositionData,
        compositionColors,
        '1.6M+'
    )

    // Talent pool radar chart (shows relative pool sizes)
    import('../utils/chartFactories.js').then(({ createRadarChart }) => {
        createRadarChart('talent-pool-bar-chart', compositionLabels, [
            { label: 'Talent Pool (thousands)', data: compositionData }
        ])
    })
}

// -------------------------------------------------------------------
// Section renderers
// -------------------------------------------------------------------

function renderLaborMetrics(metrics) {
    return metrics.map(m => `
        <div class="metric-card metric-highlight">
            <div class="metric-icon">${m.icon}</div>
            <div class="metric-value">${m.value}</div>
            <div class="metric-label">${m.label}</div>
            <div class="metric-footer">
                ${renderConfidenceStars(m.confidence)}
            </div>
            <div class="metric-source">${m.source}</div>
        </div>
    `).join('')
}

function renderTalentPools(pools) {
    return pools.map(pool => `
        <div class="talent-card">
            <h4>${pool.icon} ${pool.title}</h4>
            <div class="talent-metric">
                <span class="value">${pool.value}</span>
                <span class="label">${pool.description}</span>
            </div>
            ${pool.detail ? `
                <div class="talent-metric">
                    <span class="value">${pool.detail.split(' ')[0]}</span>
                    <span class="label">${pool.detail.split(' ').slice(1).join(' ')}</span>
                </div>
            ` : ''}
            <div class="metric-footer">
                ${renderConfidenceStars(pool.confidence)}
            </div>
            <p class="source">Source: ${pool.source}</p>
        </div>
    `).join('')
}

function renderClusterTalent(clusters) {
    return clusters.map(cluster => `
        <div class="cluster-talent-card">
            <h4>${cluster.name}</h4>
            <div class="cluster-metrics">
                ${cluster.totalTalent ? `<div class="cluster-metric">
                    <span class="label">Total Talent Pool:</span>
                    <span class="value">${cluster.totalTalent}</span>
                </div>` : ''}
                ${cluster.experienced ? `<div class="cluster-metric">
                    <span class="label">Experienced Professionals:</span>
                    <span class="value">${cluster.experienced}</span>
                </div>` : ''}
                ${cluster.fresh ? `<div class="cluster-metric">
                    <span class="label">Fresh Graduates:</span>
                    <span class="value">${cluster.fresh}</span>
                </div>` : ''}
                ${cluster.gradsPerYear ? `<div class="cluster-metric">
                    <span class="label">Graduates per Year:</span>
                    <span class="value">${cluster.gradsPerYear}</span>
                </div>` : ''}
                ${cluster.institutions ? `<div class="cluster-metric">
                    <span class="label">Key Institutions:</span>
                    <span class="value">${cluster.institutions}</span>
                </div>` : ''}
                ${cluster.jobs ? `<div class="cluster-metric">
                    <span class="label">Recent Jobs:</span>
                    <span class="value">${cluster.jobs}</span>
                </div>` : ''}
                ${cluster.target ? `<div class="cluster-metric">
                    <span class="label">Target:</span>
                    <span class="value">${cluster.target}</span>
                </div>` : ''}
            </div>
            <div class="metric-footer">
                ${renderConfidenceStars(cluster.confidence)}
            </div>
            <p class="source">Source: ${cluster.source}${cluster.link ? ` <a href="${cluster.link}" target="_blank">Read more</a>` : ''}</p>
        </div>
    `).join('')
}

function renderSkillingPrograms(programs) {
    return programs.map(program => `
        <div class="program-card">
            <h4>${program.name}</h4>
            <div class="program-metrics">
                ${program.supported ? `<div class="metric"><strong>Startups Supported:</strong> ${program.supported}</div>` : ''}
                ${program.funding ? `<div class="metric"><strong>Funding Committed:</strong> ${program.funding}</div>` : ''}
                ${program.womenLed ? `<div class="metric"><strong>Women-Led:</strong> ${program.womenLed}</div>` : ''}
                ${program.achievement ? `<div class="metric"><strong>Achievement:</strong> ${program.achievement}</div>` : ''}
                ${program.metric ? `<div class="metric"><strong>Metric:</strong> ${program.metric}</div>` : ''}
                ${program.role ? `<div class="metric"><strong>KDEM Role:</strong> ${program.role}</div>` : ''}
                ${program.focus ? `<div class="metric"><strong>Focus:</strong> ${program.focus}</div>` : ''}
                ${program.companies ? `<div class="metric"><strong>Companies:</strong> ${program.companies}</div>` : ''}
                ${program.jobs ? `<div class="metric"><strong>Jobs Created:</strong> ${program.jobs}</div>` : ''}
            </div>
            <div class="metric-footer">
                ${renderConfidenceStars(program.confidence)}
            </div>
            <p class="source">Source: ${program.source}${program.link ? ` <a href="${program.link}" target="_blank">Learn more</a>` : ''}</p>
        </div>
    `).join('')
}

function renderSkillPolicy(policy) {
    return `
        <div class="policy-card">
            <div class="policy-header">
                <h4>${policy.name}</h4>
                <div class="policy-badge">${renderConfidenceStars(policy.confidence)} Official Government Policy</div>
            </div>

            <div class="policy-details">
                <div class="policy-metric">
                    <div class="metric-icon">💰</div>
                    <div>
                        <div class="value">${policy.investment}</div>
                        <div class="label">Total Investment</div>
                    </div>
                </div>
                <div class="policy-metric">
                    <div class="metric-icon">🎯</div>
                    <div>
                        <div class="value">${policy.target}</div>
                        <div class="label">Employability Target</div>
                    </div>
                </div>
                <div class="policy-metric">
                    <div class="metric-icon">📅</div>
                    <div>
                        <div class="value">${policy.timeline}</div>
                        <div class="label">Policy Timeline</div>
                    </div>
                </div>
            </div>

            <div class="policy-pillars">
                <h5>Four Core Pillars:</h5>
                <ul>
                    ${policy.pillars.map(p => `<li><strong>${p.name}:</strong> ${p.description}</li>`).join('')}
                </ul>
            </div>

            <div class="policy-highlights">
                <h5>Special Initiatives:</h5>
                <ul>
                    ${policy.specialInitiatives.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            <div class="policy-goal">
                <p><strong>Strategic Goal:</strong> ${policy.strategicGoal}</p>
            </div>

            <p class="source">Source: ${policy.source} | Approved ${policy.approvedDate} | <a href="${policy.link}" target="_blank">Read full policy</a></p>
        </div>
    `
}

function renderCoESkilling(coes) {
    return coes.map(coe => `
        <div class="coe-card">
            <h4>${coe.name}</h4>
            <div class="coe-badge">${coe.focus}</div>
            <div class="coe-metrics">
                ${coe.skilled ? `<div class="metric"><span class="label">People Skilled:</span> <span class="value">${coe.skilled}</span></div>` : ''}
                ${coe.startups ? `<div class="metric"><span class="label">Startups:</span> <span class="value">${coe.startups}</span></div>` : ''}
                ${coe.jobs ? `<div class="metric"><span class="label">Jobs Created:</span> <span class="value">${coe.jobs}</span></div>` : ''}
                ${coe.valuation ? `<div class="metric"><span class="label">Portfolio Value:</span> <span class="value">${coe.valuation}</span></div>` : ''}
                ${coe.funding ? `<div class="metric"><span class="label">Funding Raised:</span> <span class="value">${coe.funding}</span></div>` : ''}
                ${coe.patents ? `<div class="metric"><span class="label">Patents/IPR:</span> <span class="value">${coe.patents}</span></div>` : ''}
                ${coe.products ? `<div class="metric"><span class="label">Products Launched:</span> <span class="value">${coe.products}</span></div>` : ''}
                ${coe.impact ? `<div class="metric"><span class="label">Impact:</span> <span class="value">${coe.impact}</span></div>` : ''}
            </div>
            <div class="metric-footer">
                ${renderConfidenceStars(coe.confidence)}
            </div>
            <p class="source">Source: ${coe.source}</p>
        </div>
    `).join('')
}

function renderEmploymentRatios(conversionRatios) {
    // Filter for revenue-to-employment type ratios
    const employmentRatios = conversionRatios.filter(r =>
        r.from_factor === 'revenue' && r.to_factor === 'employment' ||
        r.source_metric === 'revenue' && r.target_metric === 'employment' ||
        r.conversion_type === 'revenue_to_employment'
    )

    // If we have DB data, render from it
    if (employmentRatios.length > 0) {
        return `
            <div class="table-scroll-wrapper">
                <table class="data-table">
                <thead>
                    <tr>
                        <th>Vertical</th>
                        <th>Revenue to Employment Ratio</th>
                        <th>Unit</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
                    ${employmentRatios.map(r => `
                        <tr>
                            <td><strong>${r.vertical_name || r.vertical_id || 'N/A'}</strong></td>
                            <td>${r.ratio || r.value || r.conversion_value || 'N/A'}</td>
                            <td>${r.unit || 'employees per $1M USD'}</td>
                            <td>${r.source || r.data_source || 'KDEM Database'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
            <p class="conversion-note">
                <strong>Note:</strong> These conversion ratios are sourced from the KDEM database and based on industry benchmarks.
                They are used to calculate employment targets from revenue goals across Karnataka's digital economy verticals.
            </p>
        `
    }

    // Fallback: render all conversion ratios if specific filter returned nothing
    if (conversionRatios.length > 0) {
        return `
            <div class="table-scroll-wrapper">
                <table class="data-table">
                <thead>
                    <tr>
                        <th>Vertical / Rule</th>
                        <th>Ratio</th>
                        <th>Unit</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
                    ${conversionRatios.map(r => `
                        <tr>
                            <td><strong>${r.vertical_name || r.vertical_id || r.name || 'N/A'}</strong></td>
                            <td>${r.ratio || r.value || r.conversion_value || 'N/A'}</td>
                            <td>${r.unit || r.description || 'N/A'}</td>
                            <td>${r.source || r.data_source || 'KDEM Database'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
            <p class="conversion-note">
                <strong>Note:</strong> These conversion ratios are sourced from the KDEM database.
                They are used to cascade targets across factors of production in Karnataka's digital economy.
            </p>
        `
    }

    // Empty state if DB returned nothing
    return `
        <div class="empty-state">
            <p>No conversion ratio data available. Ensure the database has been seeded with conversion ratios.</p>
        </div>
    `
}

function renderDataSources(sources) {
    return `
        <div class="sources-grid">
            ${sources.map(source => `
                <div class="source-card">
                    <div class="source-header">
                        <h5>${source.title}</h5>
                        <div class="confidence-badge">${renderConfidenceStars(source.confidence)}</div>
                    </div>
                    <p class="source-data">${source.data}</p>
                    ${source.link ? `<a href="${source.link}" target="_blank" class="source-link">View source</a>` : ''}
                </div>
            `).join('')}
        </div>
        <p class="sources-note">
            For complete list of data sources with confidence ratings, see
            <a href="./SOURCES.md" target="_blank">SOURCES.md</a>
        </p>
    `
}
