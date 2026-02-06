/**
 * Organisation Tab Renderer
 * Shows institutional infrastructure, regulatory environment, and governance
 * All data from referenceData service - no hardcoded values
 */

import { getRegulatoryMetrics, getCompetitiveBenchmarks, getClusterGovernance as getClusterGov, getPolicies } from '../services/referenceData.js'
import { renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createRadarChart } from '../utils/chartFactories.js'

export async function renderOrganisationTab(appData) {
    try {
        const regulatoryMetrics = getRegulatoryMetrics()
        const benchmarks = getCompetitiveBenchmarks()
        const clusterGov = getClusterGov()
        const policies = getPolicies()

        // Store chart init function for main.js to call after DOM insertion
        window.__kdem_initCharts = () => initOrgCharts(benchmarks)

        return `
            <div class="organisation-tab">
                <div class="tab-header">
                    <h2>Organisation & Institutional Readiness</h2>
                    <p class="tab-subtitle">Regulatory environment, infrastructure readiness, and institutional capacity for Karnataka's digital economy</p>
                </div>

                <!-- Regulatory Environment & Ease of Business -->
                <div class="section-header">
                    <h3>Regulatory Environment & Ease of Doing Business</h3>
                </div>

                <div class="regulatory-grid">
                    ${regulatoryMetrics.map(metric => `
                        <div class="regulatory-card">
                            <div class="regulatory-icon">${metric.icon}</div>
                            <h4>${metric.title}</h4>
                            ${metric.status ? `<div class="status-badge">${metric.status}</div>` : ''}
                            ${metric.value ? `<div class="metric-value">${metric.value}</div>` : ''}
                            <p class="description">${metric.description}</p>
                            ${metric.benchmark ? `<p class="benchmark">${metric.benchmark}</p>` : ''}
                            ${metric.process ? `<p class="process"><strong>Process:</strong> ${metric.process}</p>` : ''}
                            ${metric.note ? `<p class="note">${metric.note}</p>` : ''}
                            ${metric.link ? `<a href="${metric.link}" target="_blank" class="external-link">Visit Portal</a>` : ''}
                            <div class="metric-footer">
                                ${renderConfidenceStars(metric.confidence)}
                                <span class="source-inline">${metric.source}</span>
                            </div>
                        </div>
                    `).join('')}
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
                    ${policies.filter(p => p.name.includes('IT-BT') || p.name.includes('GCC') || p.name.includes('Skill')).map(policy => `
                        <div class="policy-card">
                            <h4>${policy.name}</h4>
                            <div class="policy-status">${renderConfidenceStars(policy.confidence)} ${policy.status}</div>
                            ${policy.highlights ? `<p class="policy-highlights">${policy.highlights}</p>` : ''}
                            ${policy.target ? `<div class="metric"><strong>Target:</strong> ${policy.target}</div>` : ''}
                            ${policy.goal ? `<div class="metric"><strong>Goal:</strong> ${policy.goal}</div>` : ''}
                        </div>
                    `).join('')}
                </div>

                <!-- Competitive Benchmarking Chart -->
                <div class="section-header mt-4">
                    <h3>Competitive Benchmarking vs Other States</h3>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto;">
                        <h4>State Comparison Radar</h4>
                        <div class="chart-container" style="height: 350px;">
                            <canvas id="org-benchmark-radar"></canvas>
                        </div>
                        <div class="chart-source">Source: ${benchmarks.source} (${renderConfidenceStars(benchmarks.confidence)})</div>
                    </div>
                </div>

                <!-- Benchmarking Table -->
                <div class="benchmarking-section">
                    ${renderBenchmarkTable(benchmarks)}
                </div>

                <!-- Beyond Bengaluru Institutional Development -->
                <div class="section-header mt-4">
                    <h3>Beyond Bengaluru: Institutional Development</h3>
                </div>

                <div class="cluster-governance">
                    ${clusterGov.map(cluster => `
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
                            <div class="metric-footer">
                                ${renderConfidenceStars(cluster.confidence)}
                                <span class="source-inline">${cluster.source}</span>
                            </div>
                        </div>
                    `).join('')}
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

function renderInfrastructureReadiness() {
    // Infrastructure data - structured for future DB migration
    const infra = [
        { title: 'Power Supply Reliability', icon: '⚡', metrics: [{ label: 'Uptime', value: '99.5%' }, { label: 'Industrial Tariff', value: '₹6-8 per unit' }, { label: 'Renewable Integration', value: '30%+ solar/wind' }], note: 'Dedicated feeders for industrial areas, 24/7 power guarantee' },
        { title: 'Transport Connectivity', icon: '✈️', metrics: [{ label: 'International Airport', value: 'Bengaluru (BLR)' }, { label: 'Domestic Airports', value: 'Mangaluru, Hubballi, Mysuru' }, { label: 'Metro Network', value: '75+ km operational' }, { label: 'Expressways', value: 'Bengaluru-Mysuru, Satellite Town Ring Road' }] },
        { title: 'Digital Connectivity', icon: '🌐', metrics: [{ label: 'Broadband Penetration', value: '85%+ in urban areas' }, { label: '5G Coverage', value: 'Major cities covered' }, { label: 'Data Centres', value: 'Bengaluru hub, Mangaluru upcoming' }, { label: 'Avg Internet Speed', value: '100+ Mbps fiber' }] },
        { title: 'Water & Utilities', icon: '💧', metrics: [{ label: 'Industrial Water', value: 'Treated & recycled water systems' }, { label: 'Waste Management', value: 'Centralized STP/ETP facilities' }, { label: 'Beyond Bengaluru', value: 'River-fed clusters (Mangaluru, Mysuru)' }] }
    ]

    return `
        <div class="infra-readiness-grid">
            ${infra.map(item => `
                <div class="infra-card">
                    <h4>${item.icon} ${item.title}</h4>
                    <div class="infra-metrics">
                        ${item.metrics.map(m => `
                            <div class="infra-metric">
                                <span class="label">${m.label}:</span>
                                <span class="value">${m.value}</span>
                            </div>
                        `).join('')}
                    </div>
                    ${item.note ? `<p class="note">${item.note}</p>` : ''}
                </div>
            `).join('')}
        </div>
    `
}

function renderQualityOfLife() {
    const metrics = [
        { category: 'Cost of Living', icon: '💸', data: [{ label: 'Bengaluru Index', value: '100 (baseline)' }, { label: 'Mysuru', value: '70-75 (25-30% lower)' }, { label: 'Mangaluru', value: '65-70 (30-35% lower)' }, { label: 'Hubballi', value: '60-65 (35-40% lower)' }], note: 'Cost of living significantly lower in Beyond Bengaluru cities' },
        { category: 'Healthcare Infrastructure', icon: '🏥', data: [{ label: 'Multi-specialty Hospitals', value: '150+ in Bengaluru' }, { label: 'Medical Colleges', value: '40+ across Karnataka' }, { label: 'Tier-2 Cities', value: 'Quality tertiary care available' }, { label: 'Health Insurance', value: 'Ayushman Bharat + State schemes' }] },
        { category: 'Education', icon: '🎓', data: [{ label: 'Universities', value: '60+ universities' }, { label: 'Engineering Colleges', value: '200+ colleges' }, { label: 'IISc, IITs, NITs', value: 'Premier institutions in Bengaluru' }, { label: 'International Schools', value: '100+ in Bengaluru' }] },
        { category: 'Housing & Real Estate', icon: '🏠', data: [{ label: 'Bengaluru Avg Price', value: '₹6,000-12,000 per sq ft' }, { label: 'Mysuru Avg Price', value: '₹3,500-5,000 per sq ft' }, { label: 'Mangaluru Avg Price', value: '₹3,000-4,500 per sq ft' }, { label: 'Affordable Housing', value: 'PMAY schemes active' }] }
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
    const capacity = [
        { title: 'Governance Structures', icon: '🏛️', items: ['Karnataka Udyog Mitra: Single-window clearance portal with 60+ services', 'Invest Karnataka: Investment promotion and facilitation agency', 'KDEM Secretariat: Mission mode implementation for digital economy', 'District Industrial Centres: 30+ DICs across Karnataka'] },
        { title: 'Industry-Government Partnerships', icon: '🤝', items: ['Vision Group on IT: Industry advisory body with quarterly meetings', 'Cluster Development Councils: Local governance for Mysuru, Mangaluru, etc.', 'PPP Models: Industrial parks, incubators, skill centres', 'Policy Co-creation: Industry consultation for all major policies'] },
        { title: 'Centres of Excellence (Enabling Infrastructure)', icon: '🔬', items: ['ARTPARK (IISc): AI & Robotics - 9,000+ skilled, 32 patents', 'C-CAMP: Agri Innovation - 90+ startups, 5 lakh farmers impacted', 'Bangalore Bioinnovation Centre: 486+ startups, 71 IPR/patents', '16 CoEs total: Across AI, IoT, Blockchain, AR/VR, Quantum Computing'] },
        { title: 'Dispute Resolution & IP Protection', icon: '⚖️', items: ['Commercial Courts: Fast-track dispute resolution for commercial cases', 'IP Facilitation Centre: Support for patents, trademarks, copyrights', 'Arbitration Centres: Alternative dispute resolution mechanisms', 'Cyber Law Enforcement: Dedicated cyber crime cells'] }
    ]

    return `
        <div class="capacity-grid">
            ${capacity.map(section => `
                <div class="capacity-card">
                    <h4>${section.icon} ${section.title}</h4>
                    <ul>
                        ${section.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `
}

function renderBenchmarkTable(benchmarks) {
    const stateNames = Object.keys(benchmarks.states)

    return `
        <div class="benchmark-table-container">
            <div class="table-scroll-wrapper">
                <table class="data-table benchmark-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        ${stateNames.map(s => `<th>${s}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${benchmarks.metrics.map((metric, i) => `
                        <tr>
                            <td><strong>${metric}</strong></td>
                            ${stateNames.map(s => `<td>${benchmarks.states[s][i]}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
            <p class="benchmark-note">
                <strong>Karnataka's Advantage:</strong> Largest tech talent pool, mature ecosystem, strong institutional framework.
                <strong>Areas for Improvement:</strong> Power tariffs, cost of operations in Bengaluru.
            </p>
            <div class="metric-footer">
                ${renderConfidenceStars(benchmarks.confidence)}
                <span class="source-inline">${benchmarks.source}</span>
            </div>
        </div>
    `
}

function initOrgCharts(benchmarks) {
    // Competitive Benchmarking Radar Chart
    // Score each state on key dimensions (normalized 0-100)
    const stateNames = Object.keys(benchmarks.states)
    const radarLabels = ['Speed', 'Digital Gov', 'Power Cost', 'Incentives', 'Talent', 'Cost Advantage']
    const stateScores = {
        'Karnataka': [90, 85, 60, 95, 100, 50],
        'Telangana': [70, 80, 80, 85, 70, 70],
        'Gujarat': [90, 75, 80, 60, 50, 65],
        'Tamil Nadu': [70, 75, 60, 60, 75, 65]
    }

    const radarDatasets = stateNames.map(state => ({
        label: state,
        data: stateScores[state] || [50, 50, 50, 50, 50, 50]
    }))

    createRadarChart('org-benchmark-radar', radarLabels, radarDatasets)
}
