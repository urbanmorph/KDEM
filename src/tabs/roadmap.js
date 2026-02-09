/**
 * Strategic Roadmap Tab Renderer
 * Shows 2025-2030 timeline, milestones, and policy interventions
 * All data from referenceData service - no hardcoded values
 */

import { getRoadmapPhases, getInterventions, getInvestmentSchedule, getRisks } from '../services/referenceData.js'
import { renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createAreaChart } from '../utils/chartFactories.js'

export async function renderRoadmapTab(appData) {
    const phases = getRoadmapPhases()
    const interventions = getInterventions()
    const investmentSchedule = getInvestmentSchedule()
    const risks = getRisks()

    // Store chart init function for main.js to call after DOM insertion
    window.__kdem_initCharts = () => initRoadmapCharts(investmentSchedule, phases)

    return `
        <div class="roadmap-tab">
            <div class="tab-header">
                <h2>Strategic Roadmap 2025-2032</h2>
                <p class="tab-subtitle">Phased approach to building Karnataka's $329 billion digital economy</p>
            </div>

            <!-- Timeline -->
            <div class="section-header">
                <h3>Implementation Timeline</h3>
                <p>Key milestones and deliverables across 7 years</p>
            </div>

            <div class="timeline">
                ${renderTimeline(phases)}
            </div>

            <!-- Policy Interventions -->
            <div class="section-header mt-4">
                <h3>Policy Interventions by Phase</h3>
                <p>Strategic policy actions to enable growth</p>
            </div>

            <div class="interventions">
                ${renderInterventionsGrid(interventions)}
            </div>

            <!-- Investment Schedule Chart -->
            <div class="section-header mt-4">
                <h3>Investment Schedule</h3>
                <p>Projected capital deployment across phases</p>
            </div>

            <div class="growth-charts-grid">
                <div class="growth-chart-card" style="grid-column: 1 / -1;">
                    <h4>Public vs Private Investment (INR Crores)</h4>
                    <div class="chart-container">
                        <canvas id="investment-schedule-chart"></canvas>
                    </div>
                    <div class="chart-source">Source: KDEM Strategic Plan</div>
                </div>
            </div>

            <div class="investment-schedule">
                ${renderInvestmentTable(investmentSchedule)}
            </div>

            <!-- Confidence Trajectory Chart -->
            <div class="section-header mt-4">
                <h3>Confidence Trajectory</h3>
                <p>How confidence levels change across implementation phases</p>
            </div>

            <div class="growth-charts-grid">
                <div class="growth-chart-card" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto;">
                    <div class="chart-container">
                        <canvas id="confidence-trajectory-chart"></canvas>
                    </div>
                    <div class="chart-source">Source: KDEM Confidence Framework</div>
                </div>
            </div>

            <!-- Risk Mitigation -->
            <div class="section-header mt-4">
                <h3>Risk Mitigation Strategies</h3>
                <p>Key risks and mitigation approaches</p>
            </div>

            <div class="risks">
                ${renderRiskTable(risks)}
            </div>

            <!-- Confidence Ratings -->
            <div class="section-header mt-4">
                <h3>Confidence Ratings Framework</h3>
                <p>How we assess feasibility and likelihood of success</p>
            </div>

            <div class="confidence-framework">
                ${renderConfidenceFramework()}
            </div>
        </div>
    `
}

function renderTimeline(phases) {
    return `
        <div class="timeline-container">
            ${phases.map(phase => `
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <h4>${phase.year}: ${phase.title}</h4>
                            <span class="confidence-badge">${renderConfidenceStars(phase.confidence)} ${phase.confidence}/5</span>
                        </div>
                        <ul class="timeline-milestones">
                            ${phase.milestones.map(m => `<li>${m}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </div>
    `
}

function renderInterventionsGrid(interventions) {
    return `
        <div class="interventions-grid">
            ${interventions.map(intervention => `
                <div class="intervention-card">
                    <h4>${intervention.category}</h4>
                    <ul>
                        ${intervention.actions.map(action => `<li>${action}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `
}

function renderInvestmentTable(schedule) {
    const totalPublic = schedule.reduce((s, r) => s + r.public, 0)
    const totalPrivate = schedule.reduce((s, r) => s + r.private, 0)
    const totalAll = schedule.reduce((s, r) => s + r.total, 0)

    return `
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
                ${schedule.map(row => `
                    <tr>
                        <td>${row.year}</td>
                        <td>₹${row.public.toLocaleString()}</td>
                        <td>₹${row.private.toLocaleString()}</td>
                        <td>₹${row.total.toLocaleString()}</td>
                        <td>${row.focus}</td>
                    </tr>
                `).join('')}
                <tr class="total-row">
                    <td><strong>Total</strong></td>
                    <td><strong>₹${totalPublic.toLocaleString()}</strong></td>
                    <td><strong>₹${totalPrivate.toLocaleString()}</strong></td>
                    <td><strong>₹${totalAll.toLocaleString()}</strong></td>
                    <td><strong>2025-2030</strong></td>
                </tr>
            </tbody>
        </table>
        </div>
    `
}

function renderRiskTable(risks) {
    return `
        <div class="table-scroll-wrapper">
            <table class="data-table">
            <thead>
                <tr>
                    <th>Risk</th>
                    <th>Impact</th>
                    <th>Likelihood</th>
                    <th>Mitigation Strategy</th>
                </tr>
            </thead>
            <tbody>
                ${risks.map(risk => `
                    <tr>
                        <td><strong>${risk.risk}</strong></td>
                        <td><span class="impact-badge ${risk.impact.toLowerCase()}">${risk.impact}</span></td>
                        <td><span class="likelihood-badge ${risk.likelihood.toLowerCase()}">${risk.likelihood}</span></td>
                        <td>${risk.mitigation}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        </div>
    `
}

function renderConfidenceFramework() {
    const levels = [
        { stars: 5, title: 'Very High Confidence', description: 'Established track record, proven models, minimal dependencies. Example: IT Exports growth in Bengaluru.' },
        { stars: 4, title: 'High Confidence', description: 'Strong fundamentals, some execution risk. Example: IT Domestic expansion, Tier 1 cluster development.' },
        { stars: 3, title: 'Medium Confidence', description: 'Moderate risks, requires coordination. Example: ESDM scaling, Tier 2 anchor tenant model.' },
        { stars: 2, title: 'Low Confidence', description: 'Significant uncertainties, high dependencies. Example: Newly digitizing sectors at scale.' },
        { stars: 1, title: 'Very Low Confidence', description: 'Experimental, unproven models, multiple risk factors. Example: Tier 3 development in early phases.' }
    ]

    return `
        <div class="confidence-grid">
            ${levels.map(level => `
                <div class="confidence-level">
                    <div class="confidence-icon">${renderConfidenceStars(level.stars)}</div>
                    <h4>${level.stars} - ${level.title}</h4>
                    <p>${level.description}</p>
                </div>
            `).join('')}
        </div>
    `
}

function initRoadmapCharts(investmentSchedule, phases) {
    // Investment Schedule as stacked area chart
    const years = investmentSchedule.map(r => r.year)
    createAreaChart('investment-schedule-chart', years, [
        { label: 'Public Investment (Cr)', data: investmentSchedule.map(r => r.public), color: CHART_COLORS.verticals[0] },
        { label: 'Private Investment (Cr)', data: investmentSchedule.map(r => r.private), color: CHART_COLORS.verticals[2] }
    ])

    // Confidence Trajectory Line Chart
    const phaseLabels = phases.map(p => p.year)
    const confidenceData = phases.map(p => p.confidence)
    createAreaChart('confidence-trajectory-chart', phaseLabels, [
        { label: 'Confidence Rating', data: confidenceData, color: CHART_COLORS.verticals[0] }
    ])
}
