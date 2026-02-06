/**
 * Land Tab Renderer
 * Shows real estate, infrastructure, and land requirements
 *
 * Data sources:
 * - DB (Supabase): conversion_ratios (employment-to-land ratios per vertical)
 * - DB (Supabase): geography_conversion_multipliers (cost premiums by location)
 * - Reference data: getLandMetrics, getClusterInfrastructure, getInfrastructureTypes
 */

import { getLandMetrics, getClusterInfrastructure, getInfrastructureTypes } from '../services/referenceData.js'
import { fetchConversionRatios } from '../services/dataService.js'
import { formatNumber } from '../utils/formatting.js'
import { renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createRadarChart } from '../utils/chartFactories.js'
import { supabase } from '../lib/supabaseClient.js'

/**
 * Fetch geography conversion multipliers from Supabase.
 * Falls back to reference data defaults if DB is unavailable.
 */
async function fetchGeographyPremiums() {
    try {
        const { data, error } = await supabase
            .from('geography_conversion_multipliers')
            .select('*')
            .eq('factor_id', 'land')

        if (error) throw error
        if (data && data.length > 0) return { source: 'db', data }
    } catch (err) {
        console.warn('Could not load geography premiums from DB, using reference data fallback:', err.message)
    }

    // Fallback: derive from referenceData cluster info + known defaults
    return {
        source: 'reference',
        data: [
            { geography_id: 'bengaluru', multiplier: 1.20, basis: '20% premium for Bengaluru real estate vs state average' },
            { geography_id: 'mysuru', multiplier: 0.70, basis: '30% discount vs Bengaluru' },
            { geography_id: 'mangaluru', multiplier: 0.75, basis: '25% discount vs Bengaluru' },
            { geography_id: 'hdb-corridor', multiplier: 0.65, basis: '35% discount vs Bengaluru' },
            { geography_id: 'kalaburagi', multiplier: 0.50, basis: '50% discount vs Bengaluru' },
            { geography_id: 'tumakuru', multiplier: 0.60, basis: '40% discount vs Bengaluru' },
            { geography_id: 'shivamogga', multiplier: 0.55, basis: '45% discount vs Bengaluru' },
            { geography_id: 'rest-of-karnataka', multiplier: 0.60, basis: '40% discount vs Bengaluru (average)' }
        ]
    }
}

export async function renderLandTab(appData) {
    try {
        // Load data from DB and reference data in parallel
        const [conversionRatios, geoPremiumsResult] = await Promise.all([
            fetchConversionRatios(),
            fetchGeographyPremiums()
        ])

        // Extract land-specific conversion ratios (employment -> land)
        const landRatios = conversionRatios.filter(r =>
            (r.from_metric === 'employment' || r.from_factor_id === 'labour') &&
            (r.to_metric === 'land' || r.to_factor_id === 'land')
        )

        // Load reference data
        const landMetrics = getLandMetrics()
        const clusterInfra = getClusterInfrastructure()
        const infraTypes = getInfrastructureTypes()

        // Geography premiums
        const geoPremiums = geoPremiumsResult.data
        const premiumSource = geoPremiumsResult.source === 'db'
            ? 'KDEM Supabase Database (geography_conversion_multipliers)'
            : 'Reference Data (fallback)'

        // Store chart init function for main.js to call after DOM insertion
        window.__kdem_initCharts = () => initLandCharts(clusterInfra, landRatios)

        return `
            <div class="land-tab">
                <div class="tab-header">
                    <h2>Land & Infrastructure</h2>
                    <p class="tab-subtitle">Real estate, office space, and infrastructure requirements for Karnataka's digital economy</p>
                </div>

                <!-- Overview Metrics -->
                <div class="section-header">
                    <h3>Current Infrastructure Capacity</h3>
                </div>

                <div class="metrics-grid">
                    ${landMetrics.map(m => `
                        <div class="metric-card metric-highlight">
                            <div class="metric-icon">${m.icon}</div>
                            <div class="metric-value">${m.value}</div>
                            <div class="metric-label">${m.label}</div>
                            <div class="metric-footer">
                                ${renderConfidenceStars(m.confidence)}
                            </div>
                            <div class="metric-source">Source: ${m.source}</div>
                        </div>
                    `).join('')}
                </div>

                <!-- Beyond Bengaluru Infrastructure -->
                <div class="section-header mt-4">
                    <h3>Beyond Bengaluru: Cluster Infrastructure</h3>
                </div>

                <div class="clusters-infra-grid">
                    ${renderClusterInfrastructure(clusterInfra)}
                </div>

                <!-- Cluster Infrastructure Comparison Chart -->
                <div class="section-header mt-4">
                    <h3>Cluster Infrastructure Comparison</h3>
                    <p>Available office and co-working space across Beyond Bengaluru clusters</p>
                </div>

                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="grid-column: 1 / -1;">
                        <div class="chart-container">
                            <canvas id="cluster-infra-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: Bengaluru Innovation Report 2025 / KDEM Vision Documents</div>
                    </div>
                </div>

                <!-- Land Conversion Ratios -->
                <div class="section-header mt-4">
                    <h3>Employment to Land Conversion Ratio</h3>
                    <p>Industry-standard space requirements per employee${landRatios.length > 0 ? ' (loaded from database)' : ''}</p>
                </div>

                <div class="conversion-info">
                    ${renderLandRatios(landRatios)}
                </div>

                <!-- Geography Premium -->
                <div class="section-header mt-4">
                    <h3>Real Estate Cost Premiums by Geography</h3>
                </div>

                <div class="premium-info">
                    ${renderGeographyPremiums(geoPremiums, premiumSource)}
                </div>

                <!-- Infrastructure Types -->
                <div class="section-header mt-4">
                    <h3>Infrastructure Types & Requirements</h3>
                </div>

                <div class="infra-types-grid">
                    ${renderInfrastructureTypes(infraTypes)}
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

function renderClusterInfrastructure(clusters) {
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
            <div class="metric-footer">
                ${renderConfidenceStars(cluster.confidence || 4)}
            </div>
            <p class="source">Source: ${cluster.source}</p>
        </div>
    `).join('')
}

function renderLandRatios(landRatios) {
    // If we have DB ratios, render a detailed table per vertical
    if (landRatios && landRatios.length > 0) {
        return `
            <div class="table-scroll-wrapper">
                <table class="data-table">
                <thead>
                    <tr>
                        <th>Vertical</th>
                        <th>Ratio (sq ft / employee)</th>
                        <th>Unit</th>
                        <th>Basis</th>
                        <th>Confidence</th>
                    </tr>
                </thead>
                <tbody>
                    ${landRatios.map(r => `
                        <tr>
                            <td><strong>${r.vertical_id || 'All'}</strong></td>
                            <td>${r.ratio || r.conversion_ratio || ''}</td>
                            <td>${r.unit || 'sqft_per_employee'}</td>
                            <td>${r.basis || r.source || ''}</td>
                            <td>${renderConfidenceStars(r.confidence_rating || 3)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
            <p class="conversion-note">
                <strong>Source:</strong> KDEM Supabase Database (conversion_ratios table)
            </p>

            <div class="example-calculation">
                <h4>Example Calculation:</h4>
                <div class="calc-step">
                    <span class="calc-label">Employment Target:</span>
                    <span class="calc-value">10,000 employees</span>
                </div>
                <div class="calc-step">
                    <span class="calc-label">x</span>
                    <span class="calc-value">${landRatios[0] ? (landRatios[0].ratio || 200) : 200} sq ft per employee (${landRatios[0] ? landRatios[0].vertical_id : 'default'})</span>
                </div>
                <div class="calc-result">
                    <span class="calc-label">Land Requirement:</span>
                    <span class="calc-value">${formatNumber(10000 * (landRatios[0] ? parseFloat(landRatios[0].ratio || 200) : 200))} sq ft</span>
                </div>
            </div>
        `
    }

    // Fallback: show generic industry-standard ratio
    return `
        <div class="ratio-card">
            <div class="ratio-value">200 sq ft</div>
            <div class="ratio-label">per employee</div>
            <p class="ratio-description">
                Industry-standard office space requirement including workstations,
                meeting rooms, common areas, and amenities. This ratio is used to
                calculate land requirements from employment targets.
            </p>
            <p class="source">Source: Industry Standard (no DB data available)</p>
        </div>

        <div class="example-calculation">
            <h4>Example Calculation:</h4>
            <div class="calc-step">
                <span class="calc-label">Employment Target:</span>
                <span class="calc-value">10,000 employees</span>
            </div>
            <div class="calc-step">
                <span class="calc-label">x</span>
                <span class="calc-value">200 sq ft per employee</span>
            </div>
            <div class="calc-result">
                <span class="calc-label">Land Requirement:</span>
                <span class="calc-value">${formatNumber(2000000)} sq ft</span>
            </div>
        </div>
    `
}

function renderGeographyPremiums(premiums, premiumSource) {
    if (!premiums || premiums.length === 0) {
        return `<div class="no-data-message"><p>No geography premium data available.</p></div>`
    }

    // Format geography name for display
    function formatGeoName(id) {
        const names = {
            'bengaluru': 'Bengaluru',
            'mysuru': 'Mysuru',
            'mangaluru': 'Mangaluru',
            'hdb-corridor': 'Hubballi-Dharwad',
            'kalaburagi': 'Kalaburagi',
            'tumakuru': 'Tumakuru',
            'shivamogga': 'Shivamogga',
            'rest-of-karnataka': 'Rest of Karnataka'
        }
        return names[id] || id
    }

    return `
        <div class="table-scroll-wrapper">
            <table class="data-table">
            <thead>
                <tr>
                    <th>Geography</th>
                    <th>Cost Multiplier</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${premiums.map(p => {
                    const mult = parseFloat(p.multiplier)
                    const isPremium = mult >= 1.0
                    const badgeClass = isPremium ? 'premium' : 'discount'
                    return `
                    <tr>
                        <td><strong>${formatGeoName(p.geography_id)}</strong></td>
                        <td><span class="premium-badge ${badgeClass}">${mult.toFixed(2)}x</span></td>
                        <td>${p.basis || ''}</td>
                    </tr>
                    `
                }).join('')}
            </tbody>
        </table>
        </div>
        <p class="conversion-note">
            <strong>Source:</strong> ${premiumSource}
        </p>
        <p class="premium-note">
            <strong>Note:</strong> Cost multipliers are applied to baseline land and construction costs.
            Bengaluru premium reflects mature ecosystem and high demand. Beyond Bengaluru locations offer
            significant cost advantages while maintaining connectivity and talent access.
        </p>
    `
}

function renderInfrastructureTypes(types) {
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
            <p class="source">Source: Reference Data (getInfrastructureTypes)</p>
        </div>
    `).join('')
}

/**
 * Initialize charts after DOM insertion.
 * Called via window.__kdem_initCharts pattern from main.js.
 */
function initLandCharts(clusterInfra, landRatios) {
    // Cluster Infrastructure Comparison as Radar Chart
    const chartClusters = clusterInfra.filter(c => c.space)
    if (chartClusters.length > 0) {
        const labels = chartClusters.map(c => c.name)
        const data = chartClusters.map(c => {
            const match = c.space.match(/([\d.]+)\s*lakh/)
            return match ? parseFloat(match[1]) : 0
        })

        createRadarChart('cluster-infra-chart', labels, [
            { label: 'Available Space (lakh sq ft)', data }
        ])
    }
}
