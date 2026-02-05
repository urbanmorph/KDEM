/**
 * Entrepreneurship Tab Renderer
 * Shows startup ecosystem, policies, and institutional readiness
 */

export async function renderEntrepreneurshipTab(appData) {
    try {
        return `
            <div class="entrepreneurship-tab">
                <div class="tab-header">
                    <h2>⚙️ Entrepreneurship & Ecosystem</h2>
                    <p class="tab-subtitle">Startup ecosystem, policy framework, and institutional readiness for Karnataka's digital economy</p>
                </div>

                <!-- Startup Ecosystem Overview -->
                <div class="section-header">
                    <h3>Bengaluru Startup Ecosystem</h3>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🚀</div>
                        <div class="metric-value">2,443</div>
                        <div class="metric-label">Active Funded Startups (2010-2025 YTD)</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🏢</div>
                        <div class="metric-value">140K+</div>
                        <div class="metric-label">Tech Startups Founded in India Since 2010</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🦄</div>
                        <div class="metric-value">53</div>
                        <div class="metric-label">Unicorns in Bengaluru</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🌟</div>
                        <div class="metric-value">183</div>
                        <div class="metric-label">Soonicorns (39% of India)</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                </div>

                <!-- Policy Framework -->
                <div class="section-header mt-4">
                    <h3>Karnataka Policy Framework</h3>
                </div>

                <div class="policies-grid">
                    ${renderPolicyFramework()}
                </div>

                <!-- Ecosystem Infrastructure -->
                <div class="section-header mt-4">
                    <h3>Ecosystem Infrastructure</h3>
                </div>

                <div class="ecosystem-infra">
                    ${renderEcosystemInfra()}
                </div>

                <!-- Innovation Metrics -->
                <div class="section-header mt-4">
                    <h3>Innovation & Research Excellence</h3>
                </div>

                <div class="innovation-grid">
                    ${renderInnovationMetrics()}
                </div>

                <!-- Global Rankings & Recognition -->
                <div class="section-header mt-4">
                    <h3>Global Rankings & Recognition</h3>
                </div>

                <div class="rankings-grid">
                    ${renderGlobalRankings()}
                </div>

                <!-- Beyond Bengaluru Ecosystem -->
                <div class="section-header mt-4">
                    <h3>Beyond Bengaluru: Cluster Ecosystems</h3>
                </div>

                <div class="cluster-ecosystem">
                    ${renderClusterEcosystems()}
                </div>

                <!-- Support Programs -->
                <div class="section-header mt-4">
                    <h3>KDEM Support Programs</h3>
                </div>

                <div class="support-programs">
                    ${renderSupportPrograms()}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering entrepreneurship tab:', error)
        return `
            <div class="error-message">
                <h3>Unable to load entrepreneurship data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderPolicyFramework() {
    const policies = [
        {
            name: 'Karnataka IT-BT Policy 2025-2030',
            status: '⭐⭐⭐⭐⭐ Cabinet Approved (Dec 2025)',
            allocation: '₹445.5 Crore',
            targets: '30,000 startups',
            highlights: 'Focus on emerging tech, GCCs, and innovation'
        },
        {
            name: 'Karnataka Startup Policy 2025-2030',
            status: '⭐⭐⭐⭐⭐ Official Policy',
            targets: '25,000 startups enabled',
            goal: '5% GDP contribution',
            funds: 'Fund-of-Funds: ₹300 Cr | DeepTech: ₹100 Cr | Beyond Bengaluru: ₹75 Cr'
        },
        {
            name: 'Karnataka GCC Policy 2024',
            status: '⭐⭐⭐⭐⭐ Notified Policy',
            target: '500 new GCCs by 2029 (double current)',
            jobs: '3.5 lakh jobs',
            output: '$50B economic output'
        },
        {
            name: 'Karnataka Space Tech Policy 2025',
            status: '⭐⭐⭐⭐⭐ Launched at BTS 2025',
            focus: 'Space technology ecosystem development',
            note: 'New policy launched at Bengaluru Tech Summit 2025'
        },
        {
            name: 'Karnataka Skill Development Policy 2025-32',
            status: '⭐⭐⭐⭐⭐ Approved Jan 2026',
            investment: '₹4,432.5 Crore',
            target: '3M youth employability',
            goal: 'Power $1 trillion economy by 2032'
        }
    ]

    return policies.map(policy => `
        <div class="policy-card">
            <h4>${policy.name}</h4>
            <div class="policy-status">${policy.status}</div>
            ${policy.allocation ? `<div class="metric"><strong>Allocation:</strong> ${policy.allocation}</div>` : ''}
            ${policy.investment ? `<div class="metric"><strong>Investment:</strong> ${policy.investment}</div>` : ''}
            ${policy.targets ? `<div class="metric"><strong>Targets:</strong> ${policy.targets}</div>` : ''}
            ${policy.target ? `<div class="metric"><strong>Target:</strong> ${policy.target}</div>` : ''}
            ${policy.jobs ? `<div class="metric"><strong>Jobs:</strong> ${policy.jobs}</div>` : ''}
            ${policy.output ? `<div class="metric"><strong>Output:</strong> ${policy.output}</div>` : ''}
            ${policy.goal ? `<div class="metric"><strong>Goal:</strong> ${policy.goal}</div>` : ''}
            ${policy.funds ? `<div class="metric"><strong>Funds:</strong> ${policy.funds}</div>` : ''}
            ${policy.focus ? `<div class="metric"><strong>Focus:</strong> ${policy.focus}</div>` : ''}
            ${policy.highlights ? `<p class="highlights">${policy.highlights}</p>` : ''}
            ${policy.note ? `<p class="note">${policy.note}</p>` : ''}
        </div>
    `).join('')
}

function renderEcosystemInfra() {
    return `
        <div class="infra-stats-grid">
            <div class="infra-stat">
                <h4>🏢 Centres of Excellence (CoEs)</h4>
                <div class="stat-value">16</div>
                <p>Specialized centers for AI, Robotics, Biotech, Agritech, and emerging technologies</p>
                <div class="examples">
                    <strong>Examples:</strong> ARTPARK (IISc), C-CAMP, Bangalore Bioinnovation Centre
                </div>
            </div>

            <div class="infra-stat">
                <h4>🚀 Technology Business Incubators (TBIs)</h4>
                <div class="stat-value">50+</div>
                <p>Startup incubators providing mentorship, funding, and infrastructure</p>
                <div class="coverage">
                    <strong>Beyond Bengaluru:</strong> 50 new NAIN 2.0 innovation centres planned
                </div>
            </div>

            <div class="infra-stat">
                <h4>🧬 Biotech Companies</h4>
                <div class="stat-value">300+</div>
                <p>Biotech and life sciences companies in Karnataka</p>
            </div>

            <div class="infra-stat">
                <h4>🏢 GCC Units</h4>
                <div class="stat-value">875+</div>
                <p>Global Capability Centres in Bengaluru (40% of India's GCCs)</p>
                <div class="coverage">
                    <strong>Target:</strong> Double GCC count by 2029
                </div>
            </div>
        </div>
        <p class="source">Sources: Bengaluru Innovation Report 2025, Karnataka Startup Policy 2025-2030</p>
    `
}

function renderInnovationMetrics() {
    const metrics = [
        {
            category: 'Patents & Research',
            icon: '📜',
            stats: [
                'Global patents metric: 9/10 (comparable to Silicon Valley & Tokyo)',
                'Computer Science patents (2020-2023): 503',
                'Electronics patents: 473',
                'Communication patents: 441'
            ],
            source: 'Bengaluru Innovation Report 2025'
        },
        {
            category: 'DeepTech Innovation',
            icon: '🔬',
            stats: [
                'Companies founded (2010-2025): 861',
                'Companies funded: 506',
                'Total funding: $2.8B (highest in India)'
            ],
            source: 'Bengaluru Innovation Report 2025'
        },
        {
            category: 'AI Leadership',
            icon: '🤖',
            stats: [
                'Ranked #5 among Top 50 global AI cities',
                '58% of India\'s AI startup funding',
                '~$1.5B in AI funding since 2020',
                'Application-layer AI: $1.2B+ funding'
            ],
            source: 'Bengaluru Innovation Report 2025'
        },
        {
            category: 'PhD Talent Pool',
            icon: '🎓',
            stats: [
                '100K+ PhD holders',
                'Strong academic-industry collaboration',
                'Premier institutions: IISc, IITs, NITs'
            ],
            source: 'Bengaluru Innovation Report 2025'
        }
    ]

    return metrics.map(metric => `
        <div class="innovation-card">
            <div class="innovation-icon">${metric.icon}</div>
            <h4>${metric.category}</h4>
            <ul>
                ${metric.stats.map(stat => `<li>${stat}</li>`).join('')}
            </ul>
            <p class="source">Source: ${metric.source}</p>
        </div>
    `).join('')
}

function renderGlobalRankings() {
    const rankings = [
        {
            rank: '#1',
            metric: 'Fastest Growing City Globally',
            description: 'Projected real GDP growth leader (next 15 years)',
            growth: '8.5% annual avg real GDP growth (2019-2035)',
            badge: 'gold'
        },
        {
            rank: '#1',
            metric: 'Unicorns to GDP per Capita Ratio',
            description: 'Highest ratio globally',
            note: 'Bengaluru: 3.3 unicorns per million population',
            badge: 'gold'
        },
        {
            rank: '#4',
            metric: 'High-Growth Companies (Asian Cities)',
            description: 'Among Asian cities for presence of high-growth companies',
            badge: 'silver'
        },
        {
            rank: '#5',
            metric: 'Global AI City',
            description: 'Among Top 50 global AI cities',
            badge: 'bronze'
        },
        {
            rank: '#5',
            metric: 'Largest Unicorn Hub Globally',
            description: 'After Bay Area, New York, Beijing, London',
            unicorns: '53 unicorns, $191.8B valuation',
            badge: 'bronze'
        },
        {
            rank: '#14',
            metric: 'GSER 2025 Rank',
            description: 'Global Startup Ecosystem Ranking (up from #21 in 2024)',
            improvement: '↑7 positions YoY',
            badge: 'badge'
        }
    ]

    return rankings.map(ranking => `
        <div class="ranking-card ranking-${ranking.badge}">
            <div class="rank-badge">${ranking.rank}</div>
            <h4>${ranking.metric}</h4>
            <p class="description">${ranking.description}</p>
            ${ranking.growth ? `<p class="detail"><strong>${ranking.growth}</strong></p>` : ''}
            ${ranking.note ? `<p class="detail">${ranking.note}</p>` : ''}
            ${ranking.unicorns ? `<p class="detail">${ranking.unicorns}</p>` : ''}
            ${ranking.improvement ? `<p class="improvement">${ranking.improvement}</p>` : ''}
        </div>
    `).join('') + `
        <p class="source">Source: Bengaluru Innovation Report 2025</p>
    `
}

function renderClusterEcosystems() {
    const clusters = [
        {
            name: 'Mysuru',
            vision: '$10B by 2030',
            startups: '2,800 startups target',
            jobs: '150,000 jobs',
            events: 'Mysuru Big Tech Show: 80+ startups, 1,100+ delegates',
            status: 'Vision document released July 2025'
        },
        {
            name: 'Mangaluru (Silicon Beach)',
            vision: '₹40,000 Cr by 2034',
            startups: '4,000 startups target',
            jobs: '200,000 jobs',
            companies: '250 tech companies',
            events: 'Technovanza 2025 - Vision document unveiled',
            status: 'Draft vision document Sep 2025'
        },
        {
            name: 'Hubballi-Dharwad',
            initiative: 'HDB Cluster Vision 2025-2030',
            focus: 'EMC 2.0, industrial corridor development',
            infrastructure: '5 lakh+ sq ft co-working space',
            status: 'Part of Beyond Bengaluru initiative'
        }
    ]

    return clusters.map(cluster => `
        <div class="cluster-ecosystem-card">
            <h4>${cluster.name}</h4>
            ${cluster.vision ? `<div class="vision"><strong>Vision:</strong> ${cluster.vision}</div>` : ''}
            ${cluster.initiative ? `<div class="vision"><strong>Initiative:</strong> ${cluster.initiative}</div>` : ''}
            <div class="cluster-targets">
                ${cluster.startups ? `<div class="target"><strong>Startups:</strong> ${cluster.startups}</div>` : ''}
                ${cluster.jobs ? `<div class="target"><strong>Jobs:</strong> ${cluster.jobs}</div>` : ''}
                ${cluster.companies ? `<div class="target"><strong>Companies:</strong> ${cluster.companies}</div>` : ''}
                ${cluster.infrastructure ? `<div class="target"><strong>Infrastructure:</strong> ${cluster.infrastructure}</div>` : ''}
                ${cluster.focus ? `<div class="target"><strong>Focus:</strong> ${cluster.focus}</div>` : ''}
            </div>
            ${cluster.events ? `<p class="events"><strong>Events:</strong> ${cluster.events}</p>` : ''}
            <p class="status">${cluster.status}</p>
        </div>
    `).join('')
}

function renderSupportPrograms() {
    const programs = [
        {
            name: 'ELEVATE (Idea2PoC)',
            supported: '1,227+ startups',
            funding: '₹280+ crore committed',
            womenLed: '25% women-led share',
            impact: 'Karnataka\'s flagship startup support program'
        },
        {
            name: 'Beyond Bengaluru Initiative',
            companies: '126 companies',
            jobs: '5,500+ jobs created',
            clusters: 'Mysuru, Mangaluru, Hubballi-Dharwad, and more',
            funding: '₹75 Cr seed fund allocation'
        },
        {
            name: 'NAIN 2.0 Innovation Centres',
            target: '50 new centres',
            location: 'Beyond Bengaluru clusters',
            focus: 'Distributed innovation ecosystem'
        },
        {
            name: 'New TBIs Outside Bengaluru',
            target: '12 new incubators',
            goal: 'Strengthen cluster innovation infrastructure',
            support: 'Mentorship, funding, workspace'
        }
    ]

    return programs.map(program => `
        <div class="support-program-card">
            <h4>${program.name}</h4>
            ${program.supported ? `<div class="metric"><strong>Startups Supported:</strong> ${program.supported}</div>` : ''}
            ${program.funding ? `<div class="metric"><strong>Funding:</strong> ${program.funding}</div>` : ''}
            ${program.womenLed ? `<div class="metric"><strong>Women-Led:</strong> ${program.womenLed}</div>` : ''}
            ${program.companies ? `<div class="metric"><strong>Companies:</strong> ${program.companies}</div>` : ''}
            ${program.jobs ? `<div class="metric"><strong>Jobs:</strong> ${program.jobs}</div>` : ''}
            ${program.clusters ? `<div class="metric"><strong>Clusters:</strong> ${program.clusters}</div>` : ''}
            ${program.target ? `<div class="metric"><strong>Target:</strong> ${program.target}</div>` : ''}
            ${program.location ? `<div class="metric"><strong>Location:</strong> ${program.location}</div>` : ''}
            ${program.focus ? `<div class="metric"><strong>Focus:</strong> ${program.focus}</div>` : ''}
            ${program.goal ? `<div class="metric"><strong>Goal:</strong> ${program.goal}</div>` : ''}
            ${program.support ? `<div class="metric"><strong>Support:</strong> ${program.support}</div>` : ''}
            ${program.impact ? `<p class="impact">${program.impact}</p>` : ''}
        </div>
    `).join('')
}
