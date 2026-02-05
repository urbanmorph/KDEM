/**
 * Labor Tab Renderer
 * Shows workforce, employment, and skilling data across clusters
 */

export async function renderLaborTab(appData) {
    try {
        return `
            <div class="labor-tab">
                <div class="tab-header">
                    <h2>👥 Labor & Skilling</h2>
                    <p class="tab-subtitle">Workforce development, employment metrics, and skilling programs across Karnataka's digital economy</p>
                </div>

                <!-- Overall Workforce Metrics -->
                <div class="section-header">
                    <h3>Karnataka Digital Economy Workforce</h3>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">👥</div>
                        <div class="metric-value">2.5M+</div>
                        <div class="metric-label">Tech Workforce (Bengaluru)</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🎓</div>
                        <div class="metric-value">150K-200K</div>
                        <div class="metric-label">New Tech Hires Per Year</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🤖</div>
                        <div class="metric-value">600K+</div>
                        <div class="metric-label">AI/ML Professionals</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🎓</div>
                        <div class="metric-value">100K+</div>
                        <div class="metric-label">PhD Holders</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                </div>

                <!-- Specialized Workforce -->
                <div class="section-header mt-4">
                    <h3>Specialized Talent Pools</h3>
                </div>

                <div class="talent-pools-grid">
                    <div class="talent-card">
                        <h4>💻 Chip Design & Embedded Systems</h4>
                        <div class="talent-metric">
                            <span class="value">350K+</span>
                            <span class="label">professionals in chip design, testing & embedded systems</span>
                        </div>
                        <p class="source">Source: Bengaluru Innovation Report 2025</p>
                    </div>
                    <div class="talent-card">
                        <h4>🏢 GCC Workforce</h4>
                        <div class="talent-metric">
                            <span class="value">665K+</span>
                            <span class="label">GCC talent in Bengaluru</span>
                        </div>
                        <div class="talent-metric">
                            <span class="value">48%</span>
                            <span class="label">in high-end roles (Engineering/R&D)</span>
                        </div>
                        <p class="source">Source: Bengaluru Innovation Report 2025</p>
                    </div>
                    <div class="talent-card">
                        <h4>🚀 Startup Ecosystem</h4>
                        <div class="talent-metric">
                            <span class="value">40-45%</span>
                            <span class="label">of India's tech hiring</span>
                        </div>
                        <p class="source">Source: Bengaluru Innovation Report 2025</p>
                    </div>
                </div>

                <!-- Cluster-Wise Talent Pools -->
                <div class="section-header mt-4">
                    <h3>Beyond Bengaluru: Cluster Talent Pools</h3>
                    <p>Building talent ecosystems across Karnataka</p>
                </div>

                <div class="clusters-talent-grid">
                    ${renderClusterTalent()}
                </div>

                <!-- Skilling Programs & Initiatives -->
                <div class="section-header mt-4">
                    <h3>KDEM Skilling Programs & Initiatives</h3>
                </div>

                <div class="skilling-programs">
                    ${renderSkillingPrograms()}
                </div>

                <!-- Karnataka Skill Development Policy 2025-32 -->
                <div class="section-header mt-4">
                    <h3>Karnataka Skill Development Policy 2025-32</h3>
                </div>

                <div class="policy-highlight">
                    ${renderSkillPolicy()}
                </div>

                <!-- Centres of Excellence Skilling Impact -->
                <div class="section-header mt-4">
                    <h3>Centres of Excellence - Skilling Impact</h3>
                </div>

                <div class="coe-grid">
                    ${renderCoESkilling()}
                </div>

                <!-- Employment Conversion Ratios -->
                <div class="section-header mt-4">
                    <h3>Industry Employment Conversion Ratios</h3>
                    <p>How revenue translates to employment across verticals</p>
                </div>

                <div class="conversion-table">
                    ${renderEmploymentRatios()}
                </div>

                <!-- Data Sources -->
                <div class="section-header mt-4">
                    <h3>📚 Data Sources & References</h3>
                </div>

                <div class="sources-list">
                    ${renderDataSources()}
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

function renderClusterTalent() {
    const clusters = [
        {
            name: 'Silicon Beach (Mangaluru-Udupi)',
            totalTalent: '3.1 lakh',
            experienced: '90,000',
            fresh: '150,000',
            gradsPerYear: '15,000+',
            institutions: 'NITK Surathkal, Manipal Academy',
            source: 'Silicon Beach Skills Report (Xpheno-KDEM) 2025',
            link: 'https://newskarnataka.com/karnataka/mangaluru/mangaluru-has-potential-to-be-the-next-bengaluru-says-priyank-kharge/25092025'
        },
        {
            name: 'Mysuru',
            totalTalent: 'Growing',
            jobs: '750+ recent jobs',
            target: '150,000 jobs by 2030',
            source: 'KDEM Vision Document 2025 - Mysuru Chapter',
            link: null
        },
        {
            name: 'Hubballi-Dharwad',
            totalTalent: 'Emerging',
            target: 'Part of Beyond Bengaluru initiative',
            source: 'Beyond Bengaluru Initiative',
            link: 'https://beyondbengaluru.com'
        }
    ]

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
            <p class="source">Source: ${cluster.source}${cluster.link ? ` • <a href="${cluster.link}" target="_blank">Read more →</a>` : ''}</p>
        </div>
    `).join('')
}

function renderSkillingPrograms() {
    const programs = [
        {
            name: 'ELEVATE Program',
            supported: '1,227+ startups',
            funding: '₹280+ crore',
            womenLed: '25%',
            source: 'Bengaluru Innovation Report 2025'
        },
        {
            name: 'Karnataka Positive Talent Balance',
            achievement: 'Karnataka ranked #1 state in India',
            metric: 'Positive talent balance across sectors',
            source: 'Xpheno Report, Nov 2024',
            link: 'https://yourstory.com/enterprise-story/2025/06/karnataka-wide-talent-pool-for-gccs-xpheno-report'
        },
        {
            name: 'Bengaluru Skill Summit 2025',
            role: 'KDEM as Knowledge Partner',
            focus: 'Skills & Innovation, industry partnerships',
            source: 'Karnataka Skill Development Corporation',
            link: 'https://bengaluruskillsummit.com/'
        },
        {
            name: 'Beyond Bengaluru Initiative',
            companies: '126 companies',
            jobs: '5,500+ jobs',
            source: 'KDEM Internal',
            link: 'https://beyondbengaluru.com'
        }
    ]

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
            <p class="source">Source: ${program.source}${program.link ? ` • <a href="${program.link}" target="_blank">Learn more →</a>` : ''}</p>
        </div>
    `).join('')
}

function renderSkillPolicy() {
    return `
        <div class="policy-card">
            <div class="policy-header">
                <h4>State Skill Development Policy 2025-32</h4>
                <div class="policy-badge">⭐⭐⭐⭐⭐ Official Government Policy</div>
            </div>

            <div class="policy-details">
                <div class="policy-metric">
                    <div class="metric-icon">💰</div>
                    <div>
                        <div class="value">₹4,432.5 Crore</div>
                        <div class="label">Total Investment</div>
                    </div>
                </div>
                <div class="policy-metric">
                    <div class="metric-icon">🎯</div>
                    <div>
                        <div class="value">3 Million Youth</div>
                        <div class="label">Employability Target</div>
                    </div>
                </div>
                <div class="policy-metric">
                    <div class="metric-icon">📅</div>
                    <div>
                        <div class="value">7 Years</div>
                        <div class="label">Policy Timeline (2025-2032)</div>
                    </div>
                </div>
            </div>

            <div class="policy-pillars">
                <h5>Four Core Pillars:</h5>
                <ul>
                    <li><strong>Vocational Integration:</strong> Integrating vocational education into mainstream schooling and higher education</li>
                    <li><strong>Digital & AI Skills:</strong> Prioritizing digital technologies and AI-driven tools for training and assessment</li>
                    <li><strong>Industry-Led Training:</strong> Fostering industry partnerships and industry-led training programs</li>
                    <li><strong>Apprenticeship Expansion:</strong> Expanding apprenticeship programs across sectors</li>
                </ul>
            </div>

            <div class="policy-highlights">
                <h5>Special Initiatives:</h5>
                <ul>
                    <li>Special interventions for women, persons with disabilities, and marginalized communities</li>
                    <li>Training 15,000 women in space and technology sectors</li>
                    <li>Pilot programs in 100 schools and 50 colleges by early 2026</li>
                    <li>Unified digital portal for training, assessment, and career guidance</li>
                </ul>
            </div>

            <div class="policy-goal">
                <p><strong>Strategic Goal:</strong> Make Karnataka the premier hub for skilled workforce and power the state's <strong>$1 trillion economy goal by 2032</strong></p>
            </div>

            <p class="source">Source: Karnataka Government • Approved January 2026 • <a href="https://thesouthfirst.com/karnataka/karnataka-government-approves-skill-development-policy-2025-32/" target="_blank">Read full policy →</a></p>
        </div>
    `
}

function renderCoESkilling() {
    const coes = [
        {
            name: 'ARTPARK (IISc)',
            skilled: '9,000+',
            startups: '23',
            valuation: '₹750 Cr',
            patents: '32',
            focus: 'AI & Robotics'
        },
        {
            name: 'C-CAMP Agri Innovation',
            startups: '90+',
            funding: '₹500+ Cr',
            patents: '42',
            impact: '5 lakh+ farmers',
            focus: 'Agritech & Biotech'
        },
        {
            name: 'Bangalore Bioinnovation Centre',
            startups: '486+',
            jobs: '6,000+',
            products: '45+',
            patents: '71',
            focus: 'Biotechnology'
        }
    ]

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
            <p class="source">Source: Bengaluru Innovation Report 2025</p>
        </div>
    `).join('')
}

function renderEmploymentRatios() {
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
                <tr>
                    <td><strong>IT Exports</strong></td>
                    <td>20</td>
                    <td>employees per $1M USD</td>
                    <td>NASSCOM</td>
                </tr>
                <tr>
                    <td><strong>IT Domestic</strong></td>
                    <td>25</td>
                    <td>employees per $1M USD</td>
                    <td>NASSCOM</td>
                </tr>
                <tr>
                    <td><strong>ESDM</strong></td>
                    <td>100</td>
                    <td>employees per $1M USD</td>
                    <td>ICEA</td>
                </tr>
            </tbody>
        </table>
        </div>
        <p class="conversion-note">
            <strong>Note:</strong> These conversion ratios are based on industry benchmarks from NASSCOM and ICEA.
            They are used to calculate employment targets from revenue goals across Karnataka's digital economy verticals.
        </p>
    `
}

function renderDataSources() {
    const sources = [
        {
            title: 'Bengaluru Innovation Report 2025',
            confidence: '⭐⭐⭐⭐⭐',
            data: 'Tech workforce metrics, AI/ML talent, GCC workforce, startup ecosystem data',
            link: null
        },
        {
            title: 'Silicon Beach Skills Report (Xpheno-KDEM)',
            confidence: '⭐⭐⭐⭐',
            data: 'Mangaluru-Udupi talent pool (3.1 lakh), institutional capacity',
            link: 'https://newskarnataka.com/karnataka/mangaluru/mangaluru-has-potential-to-be-the-next-bengaluru-says-priyank-kharge/25092025'
        },
        {
            title: 'Karnataka Skill Development Policy 2025-32',
            confidence: '⭐⭐⭐⭐⭐',
            data: '₹4,432.5 Cr investment, 3M youth target, digital & AI focus',
            link: 'https://thesouthfirst.com/karnataka/karnataka-government-approves-skill-development-policy-2025-32/'
        },
        {
            title: 'Karnataka Positive Talent Balance Report (Xpheno)',
            confidence: '⭐⭐⭐⭐',
            data: 'Karnataka #1 state ranking in positive talent balance',
            link: 'https://yourstory.com/enterprise-story/2025/06/karnataka-wide-talent-pool-for-gccs-xpheno-report'
        },
        {
            title: 'Bengaluru Skill Summit 2025',
            confidence: '⭐⭐⭐⭐⭐',
            data: 'KDEM as Knowledge Partner, industry partnerships',
            link: 'https://bengaluruskillsummit.com/'
        },
        {
            title: 'ELEVATE Program Data',
            confidence: '⭐⭐⭐⭐',
            data: '1,227+ startups, ₹280+ Cr funding, 25% women-led',
            link: null
        },
        {
            title: 'NASSCOM Industry Reports',
            confidence: '⭐⭐⭐⭐',
            data: 'IT sector employment conversion ratios',
            link: null
        },
        {
            title: 'ICEA (India Cellular & Electronics Association)',
            confidence: '⭐⭐⭐⭐',
            data: 'ESDM sector employment conversion ratios',
            link: null
        }
    ]

    return `
        <div class="sources-grid">
            ${sources.map(source => `
                <div class="source-card">
                    <div class="source-header">
                        <h5>${source.title}</h5>
                        <div class="confidence-badge">${source.confidence}</div>
                    </div>
                    <p class="source-data">${source.data}</p>
                    ${source.link ? `<a href="${source.link}" target="_blank" class="source-link">View source →</a>` : ''}
                </div>
            `).join('')}
        </div>
        <p class="sources-note">
            For complete list of data sources with confidence ratings, see
            <a href="./SOURCES.md" target="_blank">SOURCES.md</a>
        </p>
    `
}
