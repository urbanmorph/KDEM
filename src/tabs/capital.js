/**
 * Capital Tab Renderer
 * Shows funding, investment, and capital requirements
 */

export async function renderCapitalTab(appData) {
    try {
        return `
            <div class="capital-tab">
                <div class="tab-header">
                    <h2>💼 Capital & Investment</h2>
                    <p class="tab-subtitle">Funding ecosystem, venture capital, and investment trends across Karnataka's digital economy</p>
                </div>

                <!-- Venture Capital Ecosystem -->
                <div class="section-header">
                    <h3>Bengaluru Venture Capital Ecosystem</h3>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">💰</div>
                        <div class="metric-value">$79B</div>
                        <div class="metric-label">Total VC Funding Since 2010</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">📈</div>
                        <div class="metric-value">$70.5B</div>
                        <div class="metric-label">Last 10 Years (2015-2025)</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🎯</div>
                        <div class="metric-value">46%</div>
                        <div class="metric-label">Share of All Indian Startup Funding (Since 2016)</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🚀</div>
                        <div class="metric-value">$38B</div>
                        <div class="metric-label">VC Funding (2020-2024)</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                </div>

                <!-- Investor Base -->
                <div class="section-header mt-4">
                    <h3>Investor Base Depth</h3>
                </div>

                <div class="investor-grid">
                    ${renderInvestorBase()}
                </div>

                <!-- Unicorn & Soonicorn Funding -->
                <div class="section-header mt-4">
                    <h3>Unicorn & Soonicorn Capital</h3>
                </div>

                <div class="unicorn-funding">
                    ${renderUnicornFunding()}
                </div>

                <!-- Sector-wise Funding -->
                <div class="section-header mt-4">
                    <h3>Sector-wise Funding Highlights</h3>
                </div>

                <div class="sector-funding-grid">
                    ${renderSectorFunding()}
                </div>

                <!-- Government Funding & Support -->
                <div class="section-header mt-4">
                    <h3>Government Funding Programs</h3>
                </div>

                <div class="govt-funding">
                    ${renderGovernmentFunding()}
                </div>

                <!-- Women-Led Startup Funding -->
                <div class="section-header mt-4">
                    <h3>Women-Led Startup Funding</h3>
                </div>

                <div class="women-funding">
                    ${renderWomenFunding()}
                </div>

                <!-- Investment Trends -->
                <div class="section-header mt-4">
                    <h3>Recent Investment Trends</h3>
                </div>

                <div class="trends-info">
                    ${renderInvestmentTrends()}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering capital tab:', error)
        return `
            <div class="error-message">
                <h3>Unable to load capital & investment data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderInvestorBase() {
    const investors = [
        {
            icon: '👤',
            type: 'Angel Investors',
            count: '~17,000',
            role: 'Early-stage individual investors providing seed capital and mentorship'
        },
        {
            icon: '💼',
            type: 'Venture Capital Firms',
            count: '~450',
            role: 'Institutional investors across seed, Series A, B, C+ stages'
        },
        {
            icon: '🏢',
            type: 'Corporate Investors',
            count: '~2,200',
            role: 'Strategic corporate investors and corporate venture capital arms'
        }
    ]

    return investors.map(investor => `
        <div class="investor-card">
            <div class="investor-icon">${investor.icon}</div>
            <div class="investor-count">${investor.count}</div>
            <h4>${investor.type}</h4>
            <p>${investor.role}</p>
        </div>
    `).join('') + `
        <p class="source">Source: Bengaluru Innovation Report 2025</p>
    `
}

function renderUnicornFunding() {
    return `
        <div class="unicorn-stats-grid">
            <div class="stat-card">
                <h4>🦄 Unicorns (53 in Bengaluru)</h4>
                <div class="stat-metric">
                    <span class="label">Funding Raised:</span>
                    <span class="value">$51.5B</span>
                </div>
                <div class="stat-metric">
                    <span class="label">Total Valuation:</span>
                    <span class="value">$191.8B</span>
                </div>
                <div class="stat-metric">
                    <span class="label">Share of India's Unicorn Valuation:</span>
                    <span class="value">53%</span>
                </div>
                <div class="stat-metric">
                    <span class="label">Average Time to Unicorn:</span>
                    <span class="value">6 years</span>
                </div>
                <p class="highlight">Fastest among Indian hubs</p>
            </div>

            <div class="stat-card">
                <h4>🌟 Soonicorns (183 in Bengaluru)</h4>
                <div class="stat-metric">
                    <span class="label">Total India Soonicorns:</span>
                    <span class="value">466</span>
                </div>
                <div class="stat-metric">
                    <span class="label">Bengaluru Share:</span>
                    <span class="value">39% (highest in India)</span>
                </div>
                <div class="stat-metric">
                    <span class="label">Average Time to Soonicorn:</span>
                    <span class="value">5 years</span>
                </div>
                <p class="highlight">Fastest time to soonicorn status</p>
            </div>
        </div>
        <p class="source">Source: Bengaluru Innovation Report 2025</p>

        <div class="global-context">
            <h5>Global Context:</h5>
            <p>Bengaluru is the <strong>5th largest unicorn hub globally</strong>, after Bay Area, New York, Beijing, and London.</p>
            <p>Unicorn valuation = <strong>4.5% of India's GDP</strong> (2025)</p>
        </div>
    `
}

function renderSectorFunding() {
    const sectors = [
        {
            sector: 'AI & Machine Learning',
            funding: '~$1.5B',
            share: '58% of India\'s AI startup funding to Bengaluru',
            highlight: 'Application-layer AI: $1.2B+',
            note: 'Bengaluru attracts 58% of all AI startup funding in India'
        },
        {
            sector: 'DeepTech (2010-2025)',
            companies: '861 founded',
            funded: '506 funded',
            funding: '$2.8B',
            highlight: 'Highest DeepTech funding in India'
        },
        {
            sector: 'Life Sciences',
            companies: '278 founded',
            funded: '199 funded',
            funding: '$694.6M',
            note: 'Strong biotech and healthtech ecosystem'
        },
        {
            sector: 'Seed Stage (2024)',
            funding: '$268M',
            growth: '↑ 26% YoY',
            highlight: 'Healthy early-stage funding environment'
        }
    ]

    return sectors.map(sector => `
        <div class="sector-card">
            <h4>${sector.sector}</h4>
            ${sector.companies ? `<div class="metric"><strong>Companies Founded:</strong> ${sector.companies}</div>` : ''}
            ${sector.funded ? `<div class="metric"><strong>Companies Funded:</strong> ${sector.funded}</div>` : ''}
            <div class="metric"><strong>Funding:</strong> ${sector.funding}</div>
            ${sector.share ? `<div class="metric highlight">${sector.share}</div>` : ''}
            ${sector.growth ? `<div class="metric"><strong>Growth:</strong> ${sector.growth}</div>` : ''}
            ${sector.highlight ? `<div class="highlight">${sector.highlight}</div>` : ''}
            ${sector.note ? `<p class="note">${sector.note}</p>` : ''}
        </div>
    `).join('') + `
        <p class="source">Source: Bengaluru Innovation Report 2025</p>
    `
}

function renderGovernmentFunding() {
    const programs = [
        {
            program: 'Karnataka IT-BT Policy 2025-2030',
            allocation: '₹445.5 Crore',
            targets: '30,000 startups',
            status: 'Cabinet approved Dec 2025'
        },
        {
            program: 'Karnataka Startup Policy 2025-2030',
            fundOfFunds: '₹300 Crore',
            deepTech: '₹100 Crore',
            beyondBengaluru: '₹75 Crore',
            targets: '25,000 startups, 5% GDP contribution'
        },
        {
            program: 'ELEVATE Program',
            committed: '₹280+ Crore',
            supported: '1,227+ startups',
            womenLed: '25%'
        },
        {
            program: 'Karnataka Skill Development Policy 2025-32',
            allocation: '₹4,432.5 Crore',
            target: '3M youth employability',
            timeline: '7 years (2025-2032)'
        }
    ]

    return programs.map(program => `
        <div class="govt-program-card">
            <h4>${program.program}</h4>
            ${program.allocation ? `<div class="allocation">
                <span class="label">Total Allocation:</span>
                <span class="value">${program.allocation}</span>
            </div>` : ''}
            ${program.fundOfFunds ? `<div class="metric"><strong>Fund-of-Funds:</strong> ${program.fundOfFunds}</div>` : ''}
            ${program.deepTech ? `<div class="metric"><strong>DeepTech Allocation:</strong> ${program.deepTech}</div>` : ''}
            ${program.beyondBengaluru ? `<div class="metric"><strong>Beyond Bengaluru Seed Fund:</strong> ${program.beyondBengaluru}</div>` : ''}
            ${program.committed ? `<div class="metric"><strong>Funding Committed:</strong> ${program.committed}</div>` : ''}
            ${program.supported ? `<div class="metric"><strong>Startups Supported:</strong> ${program.supported}</div>` : ''}
            ${program.targets ? `<div class="target"><strong>Targets:</strong> ${program.targets}</div>` : ''}
            ${program.target ? `<div class="target"><strong>Target:</strong> ${program.target}</div>` : ''}
            ${program.womenLed ? `<div class="metric"><strong>Women-Led:</strong> ${program.womenLed}</div>` : ''}
            ${program.status ? `<div class="status">${program.status}</div>` : ''}
            ${program.timeline ? `<div class="timeline">${program.timeline}</div>` : ''}
        </div>
    `).join('')
}

function renderWomenFunding() {
    return `
        <div class="women-funding-card">
            <h4>Women-Led Startup Capital</h4>
            <div class="women-metrics">
                <div class="metric-large">
                    <div class="value">$10B</div>
                    <div class="label">Capital Raised by Women-Led Startups in Bengaluru</div>
                </div>
                <div class="metric">
                    <span class="label">Women-Led Startups Founded Since 2010:</span>
                    <span class="value">~1,600</span>
                </div>
                <div class="metric">
                    <span class="label">Active Funded Women-Led Startups:</span>
                    <span class="value">668 (highest among cities)</span>
                </div>
                <div class="metric">
                    <span class="label">ELEVATE Women-Led Share:</span>
                    <span class="value">25%</span>
                </div>
            </div>
            <p class="source">Source: Bengaluru Innovation Report 2025</p>
        </div>
    `
}

function renderInvestmentTrends() {
    return `
        <div class="trends-grid">
            <div class="trend-card">
                <h4>🎯 AI Agents as Top Focus</h4>
                <p>53% of investors rank AI agents as their top focus area for 2025</p>
                <p class="source">Bengaluru Innovation Report 2025</p>
            </div>

            <div class="trend-card">
                <h4>📊 Funding Distribution (Since 2016)</h4>
                <ul>
                    <li>Bengaluru: 26%</li>
                    <li>Delhi NCR: 22%</li>
                    <li>Mumbai: 13%</li>
                </ul>
                <p>Bengaluru leads with the highest share of startup funding in India</p>
                <p class="source">Bengaluru Innovation Report 2025</p>
            </div>

            <div class="trend-card">
                <h4>⚡ Fastest Exit Speed</h4>
                <p>Average startup exit time: <strong>6.8 years</strong></p>
                <ul>
                    <li>Faster than Silicon Valley (7.9 years)</li>
                    <li>Faster than Beijing (8.3 years)</li>
                </ul>
                <p class="source">Bengaluru Innovation Report 2025</p>
            </div>

            <div class="trend-card">
                <h4>🌱 Seed Funding Growth</h4>
                <p>2024 Seed Funding: $268M (↑ 26% YoY)</p>
                <p>Indicates healthy early-stage investment climate</p>
                <p class="source">Bengaluru Innovation Report 2025</p>
            </div>
        </div>
    `
}
