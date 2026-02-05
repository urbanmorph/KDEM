/**
 * Land Tab Renderer
 * Shows real estate, infrastructure, and land requirements
 */

export async function renderLandTab(appData) {
    try {
        return `
            <div class="land-tab">
                <div class="tab-header">
                    <h2>🏗️ Land & Infrastructure</h2>
                    <p class="tab-subtitle">Real estate, office space, and infrastructure requirements for Karnataka's digital economy</p>
                </div>

                <!-- Overview Metrics -->
                <div class="section-header">
                    <h3>Current Infrastructure Capacity</h3>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">🏢</div>
                        <div class="metric-value">200M+ sq ft</div>
                        <div class="metric-label">Grade A Office Space (Bengaluru)</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                    <div class="metric-card metric-highlight">
                        <div class="metric-icon">💼</div>
                        <div class="metric-value">150M sq ft</div>
                        <div class="metric-label">IT-Owned Office Space</div>
                        <div class="metric-source">Bengaluru Innovation Report 2025</div>
                    </div>
                </div>

                <!-- Beyond Bengaluru Infrastructure -->
                <div class="section-header mt-4">
                    <h3>Beyond Bengaluru: Cluster Infrastructure</h3>
                </div>

                <div class="clusters-infra-grid">
                    ${renderClusterInfrastructure()}
                </div>

                <!-- Land Conversion Ratios -->
                <div class="section-header mt-4">
                    <h3>Employment to Land Conversion Ratio</h3>
                    <p>Industry-standard space requirements per employee</p>
                </div>

                <div class="conversion-info">
                    ${renderLandRatios()}
                </div>

                <!-- Geography Premium -->
                <div class="section-header mt-4">
                    <h3>Real Estate Cost Premiums by Geography</h3>
                </div>

                <div class="premium-info">
                    ${renderGeographyPremiums()}
                </div>

                <!-- Infrastructure Types -->
                <div class="section-header mt-4">
                    <h3>Infrastructure Types & Requirements</h3>
                </div>

                <div class="infra-types-grid">
                    ${renderInfrastructureTypes()}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering land tab:', error)
        return `
            <div class="error-message">
                <h3>Unable to load land & infrastructure data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderClusterInfrastructure() {
    const clusters = [
        {
            name: 'Hubballi-Dharwad',
            space: '5 lakh+ sq ft',
            type: 'Shared co-working space',
            provider: 'HDB (Hubballi-Dharwad Development Board)',
            source: 'Bengaluru Innovation Report 2025'
        },
        {
            name: 'Mangaluru',
            space: '3.35 lakh sq ft',
            type: 'Shared co-working space',
            provider: 'Part of Beyond Bengaluru initiative',
            source: 'Bengaluru Innovation Report 2025'
        },
        {
            name: 'Mysuru',
            target: 'Infrastructure expansion planned',
            goal: '150,000 jobs by 2030 requires ~30M sq ft',
            source: 'KDEM Vision Document 2025 - Mysuru Chapter'
        }
    ]

    return clusters.map(cluster => `
        <div class="cluster-infra-card">
            <h4>${cluster.name}</h4>
            <div class="infra-details">
                ${cluster.space ? `<div class="detail">
                    <span class="label">Available Space:</span>
                    <span class="value">${cluster.space}</span>
                </div>` : ''}
                ${cluster.type ? `<div class="detail">
                    <span class="label">Type:</span>
                    <span class="value">${cluster.type}</span>
                </div>` : ''}
                ${cluster.provider ? `<div class="detail">
                    <span class="label">Provider:</span>
                    <span class="value">${cluster.provider}</span>
                </div>` : ''}
                ${cluster.target ? `<div class="detail">
                    <span class="label">Target:</span>
                    <span class="value">${cluster.target}</span>
                </div>` : ''}
                ${cluster.goal ? `<div class="detail">
                    <span class="label">Requirement:</span>
                    <span class="value">${cluster.goal}</span>
                </div>` : ''}
            </div>
            <p class="source">Source: ${cluster.source}</p>
        </div>
    `).join('')
}

function renderLandRatios() {
    return `
        <div class="ratio-card">
            <div class="ratio-value">200 sq ft</div>
            <div class="ratio-label">per employee</div>
            <p class="ratio-description">
                Industry-standard office space requirement including workstations,
                meeting rooms, common areas, and amenities. This ratio is used to
                calculate land requirements from employment targets.
            </p>
            <p class="source">Source: Industry Standard</p>
        </div>

        <div class="example-calculation">
            <h4>Example Calculation:</h4>
            <div class="calc-step">
                <span class="calc-label">Employment Target:</span>
                <span class="calc-value">10,000 employees</span>
            </div>
            <div class="calc-step">
                <span class="calc-label">×</span>
                <span class="calc-value">200 sq ft per employee</span>
            </div>
            <div class="calc-result">
                <span class="calc-label">Land Requirement:</span>
                <span class="calc-value">2,000,000 sq ft (2M sq ft)</span>
            </div>
        </div>
    `
}

function renderGeographyPremiums() {
    const premiums = [
        {
            geography: 'Bengaluru',
            premium: '1.20x',
            description: '20% premium over baseline costs due to prime location and existing ecosystem',
            source: 'Real Estate Industry Data'
        },
        {
            geography: 'Mysuru',
            premium: '0.85x',
            description: '15% discount vs baseline - tier-2 city cost advantage',
            source: 'Estimated'
        },
        {
            geography: 'Mangaluru',
            premium: '0.80x',
            description: '20% discount vs baseline - coastal tier-2 city advantages',
            source: 'KDEM-SBP-Deloitte Mangaluru Data Center Study'
        },
        {
            geography: 'Hubballi-Dharwad',
            premium: '0.75x',
            description: '25% discount vs baseline - tier-2 city with government support',
            source: 'Estimated'
        }
    ]

    return `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Geography</th>
                    <th>Cost Premium/Discount</th>
                    <th>Description</th>
                    <th>Source</th>
                </tr>
            </thead>
            <tbody>
                ${premiums.map(p => `
                    <tr>
                        <td><strong>${p.geography}</strong></td>
                        <td><span class="premium-badge ${p.premium.includes('-') ? 'discount' : 'premium'}">${p.premium}</span></td>
                        <td>${p.description}</td>
                        <td>${p.source}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <p class="premium-note">
            <strong>Note:</strong> Cost premiums/discounts are applied to baseline land and construction costs.
            Bengaluru premium reflects mature ecosystem and high demand. Beyond Bengaluru locations offer
            significant cost advantages while maintaining connectivity and talent access.
        </p>
    `
}

function renderInfrastructureTypes() {
    const types = [
        {
            icon: '🏢',
            type: 'Grade A Office Space',
            description: 'Premium commercial office buildings with modern amenities',
            typical: 'IT/ITES, GCCs, Startups',
            requirement: '200 sq ft per employee'
        },
        {
            icon: '🏭',
            type: 'Manufacturing Facilities',
            description: 'ESDM manufacturing, assembly, and testing facilities',
            typical: 'Electronics, Semiconductors, Hardware',
            requirement: 'Varies by production type'
        },
        {
            icon: '💻',
            type: 'Co-Working Spaces',
            description: 'Flexible shared workspaces for startups and small teams',
            typical: 'Startups, Freelancers, Small businesses',
            requirement: '100-150 sq ft per person'
        },
        {
            icon: '🔬',
            type: 'R&D Centers',
            description: 'Research & development facilities with specialized equipment',
            typical: 'DeepTech, Biotech, Advanced R&D',
            requirement: '300+ sq ft per researcher'
        },
        {
            icon: '🖥️',
            type: 'Data Centers',
            description: 'Server facilities with power, cooling, and connectivity',
            typical: 'Cloud providers, Enterprises',
            requirement: 'Based on server capacity (kW)',
            special: 'Mangaluru identified for 1 GW+ capacity'
        },
        {
            icon: '🎓',
            type: 'Incubation Centers',
            description: 'Startup incubators and accelerators with mentorship',
            typical: 'Early-stage startups',
            requirement: '50+ startups per center',
            examples: 'ARTPARK, C-CAMP, Bangalore Bioinnovation Centre'
        }
    ]

    return types.map(type => `
        <div class="infra-type-card">
            <div class="type-icon">${type.icon}</div>
            <h4>${type.type}</h4>
            <p class="type-description">${type.description}</p>
            <div class="type-details">
                <div class="detail">
                    <strong>Typical Users:</strong> ${type.typical}
                </div>
                <div class="detail">
                    <strong>Space Requirement:</strong> ${type.requirement}
                </div>
                ${type.special ? `<div class="detail special">
                    <strong>Special:</strong> ${type.special}
                </div>` : ''}
                ${type.examples ? `<div class="detail">
                    <strong>Examples:</strong> ${type.examples}
                </div>` : ''}
            </div>
        </div>
    `).join('')
}
