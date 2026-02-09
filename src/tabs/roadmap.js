/**
 * Strategic Roadmap Tab Renderer
 * Comprehensive 2025-2032 roadmap covering AI disruption, ecosystem diversification,
 * national scheme capture, and four-phase implementation strategy.
 * All data from referenceData service.
 */

import { getRoadmapPhases, getInterventions, getInvestmentSchedule, getRisks,
         getAIWorkforceImpact, getNationalOpportunities, getKeyUncertainties,
         getEcosystemDiversification, getRoadmapRevenueTrajectory } from '../services/referenceData.js'
import { renderConfidenceStars, annotatedMetricCard } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createAnnotatedAreaChart, createAreaChart } from '../utils/chartFactories.js'
import { formatNumber } from '../utils/formatting.js'

export async function renderRoadmapTab(appData) {
    const phases = getRoadmapPhases()
    const interventions = getInterventions()
    const investmentSchedule = getInvestmentSchedule()
    const risks = getRisks()
    const aiImpact = getAIWorkforceImpact()
    const opportunities = getNationalOpportunities()
    const uncertainties = getKeyUncertainties()
    const diversification = getEcosystemDiversification()
    const trajectory = getRoadmapRevenueTrajectory()

    window.__kdem_initCharts = () => initRoadmapCharts(trajectory, investmentSchedule)

    return `
        <div class="roadmap-tab">
            ${renderHeader()}
            ${renderRevenueTrajectorySection(trajectory)}
            ${renderTimelineSection(phases)}
            ${renderAIWorkforceSection(aiImpact)}
            ${renderEmploymentScenarios(aiImpact.employmentScenarios)}
            ${renderNationalOpportunities(opportunities)}
            ${renderDiversificationSection(diversification)}
            ${renderUncertaintiesSection(uncertainties)}
            ${renderInterventionsSection(interventions)}
            ${renderInvestmentSection(investmentSchedule)}
            ${renderRiskSection(risks)}
        </div>
    `
}

// ---------------------------------------------------------------------------
// Section Renderers
// ---------------------------------------------------------------------------

function renderHeader() {
    return `
        <div class="tab-header">
            <h2>Strategic Roadmap 2025-2032: Navigating AI Disruption to $329B</h2>
            <p class="tab-subtitle">Four-phase strategy addressing AI workforce transformation, ecosystem diversification, and national scheme capture</p>
        </div>
    `
}

function renderRevenueTrajectorySection(trajectory) {
    return `
        <div class="section-header mt-4">
            <h3>Revenue Trajectory to $329B</h3>
            <p>Projected growth path from FY24-25 ($159B) to FY31-32 ($329B) across four strategic phases</p>
        </div>

        <div class="growth-charts-grid">
            <div class="growth-chart-card" style="grid-column: 1 / -1;">
                <h4>Karnataka Digital Economy Revenue Trajectory</h4>
                <div class="chart-container" style="min-height: 350px;">
                    <canvas id="roadmap-revenue-trajectory-chart"></canvas>
                </div>
                <div class="chart-source">
                    Source: ${trajectory.source} ${renderConfidenceStars(trajectory.confidence)}
                </div>
            </div>
        </div>
    `
}

function renderTimelineSection(phases) {
    return `
        <div class="section-header mt-4">
            <h3>Implementation Timeline</h3>
            <p>Four phases from foundation building through ecosystem maturity</p>
        </div>

        <div class="timeline-container">
            ${phases.map(phase => `
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <h4>${phase.yearRange}: ${phase.title}</h4>
                            <span class="confidence-badge">${renderConfidenceStars(phase.confidence)} ${phase.confidence}/5</span>
                        </div>
                        <p style="margin: 4px 0 8px; color: var(--text-secondary); font-style: italic;">${phase.theme}</p>
                        <div style="display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 8px;">
                            <div><strong>Revenue:</strong> ${phase.revenueRange}</div>
                            <div><strong>Employment Focus:</strong> ${phase.employmentFocus}</div>
                        </div>
                        <ul class="timeline-milestones">
                            ${phase.milestones.map(m => `<li>${m}</li>`).join('')}
                        </ul>
                        <div class="chart-source">Source: ${phase.source}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `
}

function renderAIWorkforceSection(aiImpact) {
    const stats = aiImpact.keyStats

    return `
        <div class="section-header mt-4">
            <h3>AI Workforce Impact Assessment</h3>
            <p>Understanding the scale of AI-driven displacement and the reskilling imperative for Karnataka's 1.5M IT workforce</p>
        </div>

        <div class="metric-cards-grid">
            ${annotatedMetricCard({
                label: 'Total IT Workforce',
                value: stats.totalITWorkforce,
                unit: 'workers in Karnataka',
                icon: '👥',
                type: 'actual',
                confidence: stats.confidence,
                source: stats.source
            })}
            ${annotatedMetricCard({
                label: 'Vulnerable Workers',
                value: stats.vulnerableWorkers.low,
                unit: `${formatNumber(stats.vulnerableWorkers.low)} - ${formatNumber(stats.vulnerableWorkers.high)} at risk`,
                icon: '⚠️',
                type: 'estimate',
                confidence: stats.confidence,
                source: stats.source
            })}
            ${annotatedMetricCard({
                label: 'Current AI Specialists',
                value: stats.currentAISpecialists,
                unit: 'AI/ML professionals today',
                icon: '🤖',
                type: 'actual',
                confidence: stats.confidence,
                source: stats.source
            })}
            ${annotatedMetricCard({
                label: 'Needed AI Specialists',
                value: stats.neededAISpecialists,
                unit: 'target by 2030 (3x current)',
                icon: '🎯',
                type: 'target',
                confidence: stats.confidence,
                source: stats.source
            })}
        </div>

        <!-- Vulnerable Roles Table -->
        <div style="margin-top: 24px;">
            <h4 style="margin-bottom: 12px;">Vulnerable Roles by AI Risk Level</h4>
            <div class="table-scroll-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>Est. Workers</th>
                            <th>Risk Level</th>
                            <th>Timeline</th>
                            <th>AI Replacement</th>
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
                                <td>${r.aiReplacement}</td>
                                <td>${r.mitigation}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Displacement Timeline Table -->
        <div style="margin-top: 24px;">
            <h4 style="margin-bottom: 12px;">AI Displacement Timeline</h4>
            <div class="table-scroll-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Phase</th>
                            <th>Event</th>
                            <th>Impact</th>
                            <th>Net Effect</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${aiImpact.displacementTimeline.map(d => `
                            <tr>
                                <td><strong>${d.phase}</strong></td>
                                <td>${d.event}</td>
                                <td>${d.impact}</td>
                                <td>${d.netEffect}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="chart-source">Source: ${aiImpact.source} ${renderConfidenceStars(aiImpact.confidence)}</div>
        </div>
    `
}

function renderEmploymentScenarios(scenarios) {
    return `
        <div class="section-header mt-4">
            <h3>Employment Scenarios at $329B Revenue</h3>
            <p>Per-vertical AI-adjusted conversion ratios (excludes startup double-count and digitizing sectors)</p>
        </div>

        <div class="table-scroll-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Scenario</th>
                        <th>Employment</th>
                        <th>Per-Vertical Breakdown</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    ${scenarios.map(s => `
                        <tr>
                            <td><strong>${s.scenario}</strong></td>
                            <td>${(s.employment / 1000000).toFixed(1)}M</td>
                            <td style="font-size: 0.8rem;">${s.breakdown || ''}</td>
                            <td>${s.note}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `
}

function renderNationalOpportunities(opportunities) {
    return `
        <div class="section-header mt-4">
            <h3>National Opportunities & Scheme Capture</h3>
            <p>Central government schemes, missions, and budgetary allocations Karnataka must capture</p>
        </div>

        <div class="opportunities-grid">
            ${opportunities.map(opp => `
                <div class="intervention-card">
                    <h4>${opp.icon} ${opp.title}</h4>
                    <ul>
                        ${opp.opportunities.map(o => `<li>${o}</li>`).join('')}
                    </ul>
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-color);">
                        <strong>Karnataka Action:</strong> ${opp.karnatakaAction}
                    </div>
                    <div style="margin-top: 6px; font-size: 0.82rem; color: var(--text-secondary);">
                        Timeline: ${opp.timeline}
                    </div>
                    <div class="chart-source">Source: ${opp.source}</div>
                </div>
            `).join('')}
        </div>
    `
}

function renderDiversificationSection(diversification) {
    return `
        <div class="section-header mt-4">
            <h3>Ecosystem Diversification Strategy</h3>
            <p>Six strategic vectors to reduce dependence on traditional IT services and build new revenue engines</p>
        </div>

        <div class="interventions-grid">
            ${diversification.map(item => `
                <div class="intervention-card">
                    <h4>${item.title}</h4>
                    <p style="margin: 8px 0; color: var(--text-secondary);">${item.description}</p>
                    <div style="margin: 8px 0;">
                        <span class="impact-badge high" style="font-size: 0.85rem;">${item.targetRevenue}</span>
                    </div>
                    <p style="font-size: 0.85rem; margin-top: 8px;"><strong>Rationale:</strong> ${item.rationale}</p>
                    <div class="chart-source">Source: ${item.source}</div>
                </div>
            `).join('')}
        </div>
    `
}

function renderUncertaintiesSection(uncertainties) {
    return `
        <div class="section-header mt-4">
            <h3>Key Uncertainties & Impact Assessment</h3>
            <p>Major unknowns that could significantly alter the trajectory of Karnataka's digital economy</p>
        </div>

        <div class="table-scroll-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Uncertainty</th>
                        <th>Impact</th>
                        <th>Current State</th>
                        <th>Mitigation</th>
                    </tr>
                </thead>
                <tbody>
                    ${uncertainties.map(u => `
                        <tr>
                            <td><strong>${u.uncertainty}</strong></td>
                            <td>${u.impact}</td>
                            <td>${u.currentState}</td>
                            <td>${u.mitigation}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `
}

function renderInterventionsSection(interventions) {
    return `
        <div class="section-header mt-4">
            <h3>Policy Interventions</h3>
            <p>Six strategic intervention categories spanning workforce transition, industrial development, and ecosystem building</p>
        </div>

        <div class="interventions-grid">
            ${interventions.map(intervention => `
                <div class="intervention-card">
                    <h4>${intervention.icon} ${intervention.category}</h4>
                    <ul>
                        ${intervention.actions.map(action => `<li>${action}</li>`).join('')}
                    </ul>
                    <div class="chart-source">Source: ${intervention.source}</div>
                </div>
            `).join('')}
        </div>
    `
}

function renderInvestmentSection(investmentSchedule) {
    const totalPublic = investmentSchedule.reduce((s, r) => s + r.public, 0)
    const totalPrivate = investmentSchedule.reduce((s, r) => s + r.private, 0)
    const totalAll = investmentSchedule.reduce((s, r) => s + r.total, 0)

    return `
        <div class="section-header mt-4">
            <h3>Investment Schedule (INR Crores)</h3>
            <p>Projected public and private capital deployment across seven years</p>
        </div>

        <div class="growth-charts-grid">
            <div class="growth-chart-card" style="grid-column: 1 / -1;">
                <h4>Public vs Private Investment (INR Crores)</h4>
                <div class="chart-container" style="min-height: 350px;">
                    <canvas id="roadmap-investment-chart"></canvas>
                </div>
                <div class="chart-source">Source: KDEM Strategic Plan</div>
            </div>
        </div>

        <div class="table-scroll-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Public Investment (Cr)</th>
                        <th>Private Investment (Cr)</th>
                        <th>Total (Cr)</th>
                        <th>Focus Areas</th>
                    </tr>
                </thead>
                <tbody>
                    ${investmentSchedule.map(row => `
                        <tr>
                            <td>${row.year}</td>
                            <td>${row.public.toLocaleString()}</td>
                            <td>${row.private.toLocaleString()}</td>
                            <td>${row.total.toLocaleString()}</td>
                            <td>${row.focus}</td>
                        </tr>
                    `).join('')}
                    <tr class="total-row">
                        <td><strong>Total</strong></td>
                        <td><strong>${totalPublic.toLocaleString()}</strong></td>
                        <td><strong>${totalPrivate.toLocaleString()}</strong></td>
                        <td><strong>${totalAll.toLocaleString()}</strong></td>
                        <td><strong>2025-2032</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
}

function renderRiskSection(risks) {
    return `
        <div class="section-header mt-4">
            <h3>Risk Mitigation Strategies</h3>
            <p>Key risks to the $329B target with impact assessment and mitigation approaches</p>
        </div>

        <div class="table-scroll-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Risk</th>
                        <th>Impact</th>
                        <th>Likelihood</th>
                        <th>Mitigation</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
                    ${risks.map(risk => `
                        <tr>
                            <td><strong>${risk.risk}</strong></td>
                            <td><span class="impact-badge ${risk.impact.toLowerCase()}">${risk.impact}</span></td>
                            <td><span class="likelihood-badge ${risk.likelihood.toLowerCase()}">${risk.likelihood}</span></td>
                            <td>${risk.mitigation}</td>
                            <td style="font-size: 0.82rem; color: var(--text-secondary);">${risk.source}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `
}

// ---------------------------------------------------------------------------
// Chart Initialization
// ---------------------------------------------------------------------------

function initRoadmapCharts(trajectory, investmentSchedule) {
    // 1. Revenue trajectory annotated area chart
    createAnnotatedAreaChart(
        'roadmap-revenue-trajectory-chart',
        trajectory.labels,
        [
            {
                label: 'Actual',
                data: trajectory.actual,
                color: CHART_COLORS.verticals[0],
                dashed: false
            },
            {
                label: 'Projected',
                data: trajectory.projected,
                color: CHART_COLORS.verticals[2],
                dashed: true
            }
        ],
        {
            targetLine: {
                value: trajectory.target,
                label: `$${trajectory.target}B Target`,
                color: '#ef4444'
            },
            todayLine: {
                index: trajectory.todayIndex,
                label: 'FY24-25'
            },
            phases: trajectory.phases
        }
    )

    // 2. Investment schedule area chart
    const years = investmentSchedule.map(r => r.year)
    createAreaChart('roadmap-investment-chart', years, [
        { label: 'Public Investment (Cr)', data: investmentSchedule.map(r => r.public), color: CHART_COLORS.verticals[0] },
        { label: 'Private Investment (Cr)', data: investmentSchedule.map(r => r.private), color: CHART_COLORS.verticals[2] }
    ])
}
