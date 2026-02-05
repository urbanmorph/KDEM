/**
 * Strategic Roadmap Tab Renderer
 * Shows 2025-2030 timeline, milestones, and policy interventions
 */

export async function renderRoadmapTab(appData) {
    return `
        <div class="roadmap-tab">
            <div class="tab-header">
                <h2>Strategic Roadmap 2025-2030</h2>
                <p class="tab-subtitle">Phased approach to building Karnataka's $400 billion digital economy</p>
            </div>

            <!-- Timeline -->
            <div class="section-header">
                <h3>Implementation Timeline</h3>
                <p>Key milestones and deliverables across 5 years</p>
            </div>

            <div class="timeline">
                ${renderTimeline()}
            </div>

            <!-- Policy Interventions -->
            <div class="section-header mt-4">
                <h3>Policy Interventions by Phase</h3>
                <p>Strategic policy actions to enable growth</p>
            </div>

            <div class="interventions">
                ${renderInterventions()}
            </div>

            <!-- Investment Schedule -->
            <div class="section-header mt-4">
                <h3>Investment Schedule</h3>
                <p>Projected capital deployment across phases</p>
            </div>

            <div class="investment-schedule">
                ${renderInvestmentSchedule()}
            </div>

            <!-- Risk Mitigation -->
            <div class="section-header mt-4">
                <h3>Risk Mitigation Strategies</h3>
                <p>Key risks and mitigation approaches</p>
            </div>

            <div class="risks">
                ${renderRisks()}
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

function renderTimeline() {
    const phases = [
        {
            year: '2025',
            title: 'Foundation Phase',
            milestones: [
                'Launch KDEM Dashboard v3.0',
                'Establish governance structure',
                'Begin Tier 1 cluster development',
                'Policy framework finalization'
            ],
            confidence: 5
        },
        {
            year: '2026',
            title: 'Acceleration Phase',
            milestones: [
                'Scale Tier 1 investments',
                'Launch Tier 2 anchor projects',
                'IT Exports reach $100B',
                'ESDM manufacturing ramp-up'
            ],
            confidence: 4
        },
        {
            year: '2027',
            title: 'Expansion Phase',
            milestones: [
                'Geographic diversification across all clusters',
                'Startup ecosystem maturity',
                'Advanced digitization in traditional sectors',
                '2M employment milestone'
            ],
            confidence: 4
        },
        {
            year: '2028',
            title: 'Integration Phase',
            milestones: [
                'Cross-cluster synergies activated',
                'Infrastructure projects operational',
                'IT Domestic scales to $50B',
                '3M employment milestone'
            ],
            confidence: 3
        },
        {
            year: '2029-2030',
            title: 'Maturity Phase',
            milestones: [
                'All verticals at target levels',
                'Sustainable growth trajectory established',
                '$400B digital economy achieved',
                '5M employment target'
            ],
            confidence: 3
        }
    ]

    return `
        <div class="timeline-container">
            ${phases.map(phase => `
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <h4>${phase.year}: ${phase.title}</h4>
                            <span class="confidence-badge">${phase.confidence}/5 Confidence</span>
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

function renderInterventions() {
    const interventions = [
        {
            category: 'Infrastructure',
            actions: [
                'Develop industrial parks in Tier 1 clusters',
                'Expand connectivity (roads, airports, fiber)',
                'Build shared facilities (data centers, testing labs)',
                'Create innovation districts in key cities'
            ]
        },
        {
            category: 'Policy & Regulation',
            actions: [
                'Simplify land acquisition processes',
                'Offer tax incentives for cluster investments',
                'Streamline environmental clearances',
                'Create single-window clearance system'
            ]
        },
        {
            category: 'Talent Development',
            actions: [
                'Expand engineering college capacity',
                'Launch skill development programs',
                'Attract global talent to Karnataka',
                'Industry-academia partnerships'
            ]
        },
        {
            category: 'Investment Promotion',
            actions: [
                'Anchor tenant recruitment for Tier 2/3',
                'Startup ecosystem support',
                'FDI promotion campaigns',
                'Public-private partnerships'
            ]
        }
    ]

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

function renderInvestmentSchedule() {
    return `
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
                <tr>
                    <td>2025-2026</td>
                    <td>₹5,000</td>
                    <td>₹15,000</td>
                    <td>₹20,000</td>
                    <td>Tier 1 infrastructure, policy setup</td>
                </tr>
                <tr>
                    <td>2026-2027</td>
                    <td>₹8,000</td>
                    <td>₹25,000</td>
                    <td>₹33,000</td>
                    <td>Tier 2 anchors, ESDM facilities</td>
                </tr>
                <tr>
                    <td>2027-2028</td>
                    <td>₹10,000</td>
                    <td>₹35,000</td>
                    <td>₹45,000</td>
                    <td>Geographic expansion, digitization</td>
                </tr>
                <tr>
                    <td>2028-2029</td>
                    <td>₹12,000</td>
                    <td>₹45,000</td>
                    <td>₹57,000</td>
                    <td>Infrastructure projects, scale-up</td>
                </tr>
                <tr>
                    <td>2029-2030</td>
                    <td>₹15,000</td>
                    <td>₹60,000</td>
                    <td>₹75,000</td>
                    <td>Final push to targets, sustainability</td>
                </tr>
                <tr class="total-row">
                    <td><strong>Total</strong></td>
                    <td><strong>₹50,000</strong></td>
                    <td><strong>₹180,000</strong></td>
                    <td><strong>₹230,000</strong></td>
                    <td><strong>2025-2030</strong></td>
                </tr>
            </tbody>
        </table>
    `
}

function renderRisks() {
    const risks = [
        {
            risk: 'Talent Shortage',
            impact: 'High',
            likelihood: 'Medium',
            mitigation: 'Expand education capacity, skill development programs, global talent attraction'
        },
        {
            risk: 'Infrastructure Delays',
            impact: 'High',
            likelihood: 'Medium',
            mitigation: 'PPP models, streamlined approvals, concurrent development'
        },
        {
            risk: 'Market Downturn',
            impact: 'High',
            likelihood: 'Low',
            mitigation: 'Diversification across verticals, resilient policy framework'
        },
        {
            risk: 'Competition from Other States',
            impact: 'Medium',
            likelihood: 'High',
            mitigation: 'Competitive incentives, first-mover advantage in Tier 2/3'
        },
        {
            risk: 'Technology Disruption',
            impact: 'Medium',
            likelihood: 'Medium',
            mitigation: 'Innovation focus, adaptable targets, continuous monitoring'
        }
    ]

    return `
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
    `
}

function renderConfidenceFramework() {
    return `
        <div class="confidence-grid">
            <div class="confidence-level">
                <div class="confidence-icon">⭐⭐⭐⭐⭐</div>
                <h4>5 - Very High Confidence</h4>
                <p>Established track record, proven models, minimal dependencies. Example: IT Exports growth in Bengaluru.</p>
            </div>
            <div class="confidence-level">
                <div class="confidence-icon">⭐⭐⭐⭐</div>
                <h4>4 - High Confidence</h4>
                <p>Strong fundamentals, some execution risk. Example: IT Domestic expansion, Tier 1 cluster development.</p>
            </div>
            <div class="confidence-level">
                <div class="confidence-icon">⭐⭐⭐</div>
                <h4>3 - Medium Confidence</h4>
                <p>Moderate risks, requires coordination. Example: ESDM scaling, Tier 2 anchor tenant model.</p>
            </div>
            <div class="confidence-level">
                <div class="confidence-icon">⭐⭐</div>
                <h4>2 - Low Confidence</h4>
                <p>Significant uncertainties, high dependencies. Example: Newly digitizing sectors at scale.</p>
            </div>
            <div class="confidence-level">
                <div class="confidence-icon">⭐</div>
                <h4>1 - Very Low Confidence</h4>
                <p>Experimental, unproven models, multiple risk factors. Example: Tier 3 development in early phases.</p>
            </div>
        </div>
    `
}
