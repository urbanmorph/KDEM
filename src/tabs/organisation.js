/**
 * Organisation Tab Renderer
 * Shows institutional infrastructure, regulatory environment, and governance
 */

export async function renderOrganisationTab(appData) {
    try {
        return `
            <div class="organisation-tab">
                <div class="tab-header">
                    <h2>⚙️ Organisation & Institutional Readiness</h2>
                    <p class="tab-subtitle">Regulatory environment, infrastructure readiness, and institutional capacity for Karnataka's digital economy</p>
                </div>

                <!-- Regulatory Environment & Ease of Business -->
                <div class="section-header">
                    <h3>Regulatory Environment & Ease of Doing Business</h3>
                </div>

                <div class="regulatory-grid">
                    ${renderRegulatoryEnvironment()}
                </div>

                <!-- Infrastructure Readiness -->
                <div class="section-header mt-4">
                    <h3>Infrastructure Readiness</h3>
                </div>

                <div class="infrastructure-readiness">
                    ${renderInfrastructureReadiness()}
                </div>

                <!-- Quality of Life Metrics -->
                <div class="section-header mt-4">
                    <h3>Quality of Life Metrics</h3>
                </div>

                <div class="quality-of-life-grid">
                    ${renderQualityOfLife()}
                </div>

                <!-- Institutional Capacity -->
                <div class="section-header mt-4">
                    <h3>Institutional Capacity & Governance</h3>
                </div>

                <div class="institutional-capacity">
                    ${renderInstitutionalCapacity()}
                </div>

                <!-- Policy Framework -->
                <div class="section-header mt-4">
                    <h3>Policy Framework & Governance</h3>
                </div>

                <div class="policies-grid">
                    ${renderPolicyFramework()}
                </div>

                <!-- Competitive Benchmarking -->
                <div class="section-header mt-4">
                    <h3>Competitive Benchmarking vs Other States</h3>
                </div>

                <div class="benchmarking-section">
                    ${renderCompetitiveBenchmarking()}
                </div>

                <!-- Beyond Bengaluru Institutional Development -->
                <div class="section-header mt-4">
                    <h3>Beyond Bengaluru: Institutional Development</h3>
                </div>

                <div class="cluster-governance">
                    ${renderClusterGovernance()}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering organisation tab:', error)
        return `
            <div class="error-message">
                <h3>Unable to load organisation data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderRegulatoryEnvironment() {
    const metrics = [
        {
            icon: '🏛️',
            title: 'Single Window Clearance',
            status: 'Operational',
            description: 'Karnataka Udyog Mitra - One-stop portal for all clearances and approvals',
            link: 'https://kum.karnataka.gov.in'
        },
        {
            icon: '⏱️',
            title: 'Average Clearance Time',
            value: '15-30 days',
            description: 'For industrial registration and basic approvals',
            benchmark: 'Target: <15 days by 2026'
        },
        {
            icon: '💰',
            title: 'Compliance Cost',
            status: 'Competitive',
            description: 'Lower than Maharashtra, competitive with Telangana',
            note: 'Focus on digital compliance to reduce costs'
        },
        {
            icon: '🌳',
            title: 'Environmental Clearances',
            process: 'State & Central',
            description: 'State clearances: 30-60 days | Central clearances: 105-210 days',
            note: 'Fast-track mechanism for IT/ITES projects'
        }
    ]

    return metrics.map(metric => `
        <div class="regulatory-card">
            <div class="regulatory-icon">${metric.icon}</div>
            <h4>${metric.title}</h4>
            ${metric.status ? `<div class="status-badge">${metric.status}</div>` : ''}
            ${metric.value ? `<div class="metric-value">${metric.value}</div>` : ''}
            <p class="description">${metric.description}</p>
            ${metric.benchmark ? `<p class="benchmark">${metric.benchmark}</p>` : ''}
            ${metric.process ? `<p class="process"><strong>Process:</strong> ${metric.process}</p>` : ''}
            ${metric.note ? `<p class="note">${metric.note}</p>` : ''}
            ${metric.link ? `<a href="${metric.link}" target="_blank" class="external-link">Visit Portal →</a>` : ''}
        </div>
    `).join('')
}

function renderInfrastructureReadiness() {
    return `
        <div class="infra-readiness-grid">
            <div class="infra-card">
                <h4>⚡ Power Supply Reliability</h4>
                <div class="infra-metrics">
                    <div class="infra-metric">
                        <span class="label">Uptime:</span>
                        <span class="value">99.5%</span>
                    </div>
                    <div class="infra-metric">
                        <span class="label">Industrial Tariff:</span>
                        <span class="value">₹6-8 per unit</span>
                    </div>
                    <div class="infra-metric">
                        <span class="label">Renewable Integration:</span>
                        <span class="value">30%+ solar/wind</span>
                    </div>
                </div>
                <p class="note">Dedicated feeders for industrial areas, 24/7 power guarantee</p>
            </div>

            <div class="infra-card">
                <h4>✈️ Transport Connectivity</h4>
                <div class="infra-metrics">
                    <div class="infra-metric">
                        <span class="label">International Airport:</span>
                        <span class="value">Bengaluru (BLR)</span>
                    </div>
                    <div class="infra-metric">
                        <span class="label">Domestic Airports:</span>
                        <span class="value">Mangaluru, Hubballi, Mysuru</span>
                    </div>
                    <div class="infra-metric">
                        <span class="label">Metro Network:</span>
                        <span class="value">75+ km operational</span>
                    </div>
                    <div class="infra-metric">
                        <span class="label">Expressways:</span>
                        <span class="value">Bengaluru-Mysuru, Satellite Town Ring Road</span>
                    </div>
                </div>
            </div>

            <div class="infra-card">
                <h4>🌐 Digital Connectivity</h4>
                <div class="infra-metrics">
                    <div class="infra-metric">
                        <span class="label">Broadband Penetration:</span>
                        <span class="value">85%+ in urban areas</span>
                    </div>
                    <div class="infra-metric">
                        <span class="label">5G Coverage:</span>
                        <span class="value">Major cities covered</span>
                    </div>
                    <div class="infra-metric">
                        <span class="label">Data Centres:</span>
                        <span class="value">Bengaluru hub, Mangaluru upcoming</span>
                    </div>
                    <div class="infra-metric">
                        <span class="label">Avg Internet Speed:</span>
                        <span class="value">100+ Mbps fiber</span>
                    </div>
                </div>
            </div>

            <div class="infra-card">
                <h4>💧 Water & Utilities</h4>
                <div class="infra-metrics">
                    <div class="infra-metric">
                        <span class="label">Industrial Water:</span>
                        <span class="value">Treated & recycled water systems</span>
                    </div>
                    <div class="infra-metric">
                        <span class="label">Waste Management:</span>
                        <span class="value">Centralized STP/ETP facilities</span>
                    </div>
                    <div class="infra-metric">
                        <span class="label">Beyond Bengaluru:</span>
                        <span class="value">River-fed clusters (Mangaluru, Mysuru)</span>
                    </div>
                </div>
            </div>
        </div>
    `
}

function renderQualityOfLife() {
    const metrics = [
        {
            category: 'Cost of Living',
            icon: '💸',
            data: [
                { label: 'Bengaluru Index', value: '100 (baseline)' },
                { label: 'Mysuru', value: '70-75 (25-30% lower)' },
                { label: 'Mangaluru', value: '65-70 (30-35% lower)' },
                { label: 'Hubballi', value: '60-65 (35-40% lower)' }
            ],
            note: 'Cost of living significantly lower in Beyond Bengaluru cities'
        },
        {
            category: 'Healthcare Infrastructure',
            icon: '🏥',
            data: [
                { label: 'Multi-specialty Hospitals', value: '150+ in Bengaluru' },
                { label: 'Medical Colleges', value: '40+ across Karnataka' },
                { label: 'Tier-2 Cities', value: 'Quality tertiary care available' },
                { label: 'Health Insurance', value: 'Ayushman Bharat + State schemes' }
            ]
        },
        {
            category: 'Education',
            icon: '🎓',
            data: [
                { label: 'Universities', value: '60+ universities' },
                { label: 'Engineering Colleges', value: '200+ colleges' },
                { label: 'IISc, IITs, NITs', value: 'Premier institutions in Bengaluru' },
                { label: 'International Schools', value: '100+ in Bengaluru' }
            ]
        },
        {
            category: 'Housing & Real Estate',
            icon: '🏠',
            data: [
                { label: 'Bengaluru Avg Price', value: '₹6,000-12,000 per sq ft' },
                { label: 'Mysuru Avg Price', value: '₹3,500-5,000 per sq ft' },
                { label: 'Mangaluru Avg Price', value: '₹3,000-4,500 per sq ft' },
                { label: 'Affordable Housing', value: 'PMAY schemes active' }
            ]
        }
    ]

    return metrics.map(metric => `
        <div class="qol-card">
            <div class="qol-icon">${metric.icon}</div>
            <h4>${metric.category}</h4>
            <div class="qol-data">
                ${metric.data.map(item => `
                    <div class="qol-item">
                        <span class="qol-label">${item.label}:</span>
                        <span class="qol-value">${item.value}</span>
                    </div>
                `).join('')}
            </div>
            ${metric.note ? `<p class="qol-note">${metric.note}</p>` : ''}
        </div>
    `).join('')
}

function renderInstitutionalCapacity() {
    return `
        <div class="capacity-grid">
            <div class="capacity-card">
                <h4>🏛️ Governance Structures</h4>
                <ul>
                    <li><strong>Karnataka Udyog Mitra:</strong> Single-window clearance portal with 60+ services</li>
                    <li><strong>Invest Karnataka:</strong> Investment promotion and facilitation agency</li>
                    <li><strong>KDEM Secretariat:</strong> Mission mode implementation for digital economy</li>
                    <li><strong>District Industrial Centres:</strong> 30+ DICs across Karnataka</li>
                </ul>
            </div>

            <div class="capacity-card">
                <h4>🤝 Industry-Government Partnerships</h4>
                <ul>
                    <li><strong>Vision Group on IT:</strong> Industry advisory body with quarterly meetings</li>
                    <li><strong>Cluster Development Councils:</strong> Local governance for Mysuru, Mangaluru, etc.</li>
                    <li><strong>PPP Models:</strong> Industrial parks, incubators, skill centres</li>
                    <li><strong>Policy Co-creation:</strong> Industry consultation for all major policies</li>
                </ul>
            </div>

            <div class="capacity-card">
                <h4>🔬 Centres of Excellence (Enabling Infrastructure)</h4>
                <div class="coe-list">
                    <div class="coe-item">
                        <strong>ARTPARK (IISc):</strong> AI & Robotics - 9,000+ skilled, 32 patents
                    </div>
                    <div class="coe-item">
                        <strong>C-CAMP:</strong> Agri Innovation - 90+ startups, 5 lakh farmers impacted
                    </div>
                    <div class="coe-item">
                        <strong>Bangalore Bioinnovation Centre:</strong> 486+ startups, 71 IPR/patents
                    </div>
                    <div class="coe-item">
                        <strong>16 CoEs total:</strong> Across AI, IoT, Blockchain, AR/VR, Quantum Computing
                    </div>
                </div>
                <p class="note">CoEs provide R&D infrastructure, testing facilities, and technical expertise</p>
            </div>

            <div class="capacity-card">
                <h4>⚖️ Dispute Resolution & IP Protection</h4>
                <ul>
                    <li><strong>Commercial Courts:</strong> Fast-track dispute resolution for commercial cases</li>
                    <li><strong>IP Facilitation Centre:</strong> Support for patents, trademarks, copyrights</li>
                    <li><strong>Arbitration Centres:</strong> Alternative dispute resolution mechanisms</li>
                    <li><strong>Cyber Law Enforcement:</strong> Dedicated cyber crime cells</li>
                </ul>
            </div>
        </div>
    `
}

function renderPolicyFramework() {
    const policies = [
        {
            name: 'Karnataka IT-BT Policy 2025-2030',
            status: '⭐⭐⭐⭐⭐ Cabinet Approved (Dec 2025)',
            focus: 'Governance & Implementation',
            highlights: 'Single-window clearance, fast-track approvals, policy stability'
        },
        {
            name: 'Karnataka GCC Policy 2024',
            status: '⭐⭐⭐⭐⭐ Notified Policy',
            focus: 'Institutional Support for GCCs',
            highlights: 'Dedicated GCC facilitation cell, expedited approvals, infrastructure support'
        },
        {
            name: 'Karnataka Industrial Policy',
            status: '⭐⭐⭐⭐⭐ Active',
            focus: 'Industrial Licensing & Land Allotment',
            highlights: 'Transparent land allocation, plug-and-play infrastructure'
        },
        {
            name: 'Ease of Doing Business Reforms',
            status: '⭐⭐⭐⭐ Ongoing',
            focus: 'Regulatory Simplification',
            highlights: 'Digital compliance, reduced paperwork, time-bound clearances'
        }
    ]

    return policies.map(policy => `
        <div class="policy-card">
            <h4>${policy.name}</h4>
            <div class="policy-status">${policy.status}</div>
            <div class="policy-focus"><strong>Focus:</strong> ${policy.focus}</div>
            <p class="policy-highlights">${policy.highlights}</p>
        </div>
    `).join('')
}

function renderCompetitiveBenchmarking() {
    return `
        <div class="benchmark-table-container">
            <div class="table-scroll-wrapper">
                <table class="data-table benchmark-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Karnataka</th>
                        <th>Telangana</th>
                        <th>Gujarat</th>
                        <th>Tamil Nadu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Time to Start Business</strong></td>
                        <td class="highlight">5-7 days</td>
                        <td>7-10 days</td>
                        <td>5-7 days</td>
                        <td>7-10 days</td>
                    </tr>
                    <tr>
                        <td><strong>Single Window Portal</strong></td>
                        <td class="highlight">✓ Karnataka Udyog Mitra</td>
                        <td>✓ TS-iPASS</td>
                        <td>✓ InvestGujarat</td>
                        <td>✓ TN Single Window</td>
                    </tr>
                    <tr>
                        <td><strong>Industrial Power Tariff</strong></td>
                        <td>₹6-8 per unit</td>
                        <td class="highlight">₹5-7 per unit</td>
                        <td>₹5-7 per unit</td>
                        <td>₹6-8 per unit</td>
                    </tr>
                    <tr>
                        <td><strong>IT/ITES Incentives</strong></td>
                        <td class="highlight">High - ₹445.5 Cr allocation</td>
                        <td>High - TASK program</td>
                        <td>Medium</td>
                        <td>Medium</td>
                    </tr>
                    <tr>
                        <td><strong>Talent Availability</strong></td>
                        <td class="highlight">Highest - 2.5M+ tech workforce</td>
                        <td>High - 750K+ tech workforce</td>
                        <td>Medium</td>
                        <td>High - Chennai hub</td>
                    </tr>
                    <tr>
                        <td><strong>Cost of Operations</strong></td>
                        <td>High (Bengaluru) / Low (Tier-2)</td>
                        <td class="highlight">Medium (Hyderabad)</td>
                        <td>Medium</td>
                        <td>Medium (Chennai)</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <p class="benchmark-note">
                <strong>Karnataka's Advantage:</strong> Largest tech talent pool, mature ecosystem, strong institutional framework.
                <strong>Areas for Improvement:</strong> Power tariffs, cost of operations in Bengaluru.
            </p>
        </div>
    `
}

function renderClusterGovernance() {
    const clusters = [
        {
            name: 'Mysuru',
            governance: 'Mysuru Urban Development Authority + District Industrial Centre',
            initiatives: [
                'IT Park with plug-and-play facilities',
                'Dedicated cluster coordination cell',
                'Fast-track clearances for IT/ITES projects',
                'Collaboration with local universities for talent pipeline'
            ],
            status: 'Operational - Scaling phase'
        },
        {
            name: 'Mangaluru',
            governance: 'Mangaluru Smart City Ltd + STPI Mangaluru',
            initiatives: [
                'Data centre hub development (1 GW+ capacity planned)',
                'Coastal connectivity advantage for submarine cables',
                'Quality of life advantage - educational institutions',
                'Lower operational costs vs Bengaluru (30-35%)'
            ],
            status: 'Emerging - High potential'
        },
        {
            name: 'Hubballi-Dharwad',
            governance: 'HDB (Hubballi-Dharwad Development Board)',
            initiatives: [
                '5 lakh+ sq ft co-working space operational',
                'EMC 2.0 industrial corridor development',
                'Twin-city advantage - shared infrastructure',
                'Railway connectivity hub for logistics'
            ],
            status: 'Growing - Infrastructure ready'
        }
    ]

    return clusters.map(cluster => `
        <div class="cluster-gov-card">
            <h4>${cluster.name}</h4>
            <div class="governance-body">
                <strong>Governance Body:</strong> ${cluster.governance}
            </div>
            <div class="cluster-initiatives">
                <strong>Key Initiatives:</strong>
                <ul>
                    ${cluster.initiatives.map(init => `<li>${init}</li>`).join('')}
                </ul>
            </div>
            <div class="cluster-status">
                <strong>Status:</strong> ${cluster.status}
            </div>
        </div>
    `).join('')
}
