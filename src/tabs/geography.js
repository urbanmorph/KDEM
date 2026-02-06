/**
 * Geography Tab Renderer
 * Shows Bengaluru dashboard or Beyond Bengaluru clusters
 */

import { getGeographyDetails, getGeographyOverview } from '../services/dataService.js'

export async function renderGeographyTab(geographyId, appData) {
    if (geographyId === 'clusters') {
        return renderClustersView(appData)
    } else {
        return renderSingleGeography(geographyId, appData)
    }
}

async function renderSingleGeography(geographyId, appData) {
    try {
        const details = await getGeographyDetails(geographyId, 2030)
        const geography = details.geography

        return `
            <div class="geography-tab">
                <div class="tab-header">
                    <h2>${geography.name}</h2>
                    <p class="tab-subtitle">${geography.type || 'Geographic Cluster'} | ${geography.tier || 'N/A'}</p>
                </div>

                <!-- Overview Metrics -->
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-icon">💰</div>
                        <div class="metric-content">
                            <div class="metric-label">Total Revenue</div>
                            <div class="metric-value">${formatNumber(details.totals.revenue_usd_bn)}</div>
                            <div class="metric-unit">USD Billion</div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">👥</div>
                        <div class="metric-content">
                            <div class="metric-label">Total Employment</div>
                            <div class="metric-value">${formatNumber(details.totals.employment)}</div>
                            <div class="metric-unit">Jobs</div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">🏗️</div>
                        <div class="metric-content">
                            <div class="metric-label">Land Required</div>
                            <div class="metric-value">${formatNumber(details.totals.land_sqft)}</div>
                            <div class="metric-unit">Sq Ft</div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">💼</div>
                        <div class="metric-content">
                            <div class="metric-label">Capital Investment</div>
                            <div class="metric-value">${formatNumber(details.totals.capital_inr_cr)}</div>
                            <div class="metric-unit">INR Crores</div>
                        </div>
                    </div>
                </div>

                <!-- Vertical Breakdown -->
                <div class="section-header mt-4">
                    <h3>Distribution by Vertical</h3>
                    <p>How different digital economy verticals contribute to ${geography.name}</p>
                </div>

                <div class="vertical-breakdown">
                    ${renderVerticalBreakdown(details.verticalBreakdown)}
                </div>
            </div>
        `
    } catch (error) {
        console.error(`Error rendering ${geographyId} geography:`, error)
        return `
            <div class="error-message">
                <h3>Unable to load ${geographyId} data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

async function renderClustersView(appData) {
    try {
        const overview = await getGeographyOverview(2030)

        const tier1 = overview.filter(g => g.tier === 'tier1-invest-aggressively')
        const tier2 = overview.filter(g => g.tier === 'tier2-invest-as-anchor')
        const tier3 = overview.filter(g => g.tier === 'tier3-invest-later')

        return `
            <div class="clusters-tab">
                <div class="tab-header">
                    <h2>Beyond Bengaluru: Strategic Clusters</h2>
                    <p class="tab-subtitle">8 geographic clusters to diversify Karnataka's digital economy</p>
                </div>

                <!-- Tier 1 Clusters -->
                <div class="section-header">
                    <h3>Tier 1: Invest Aggressively</h3>
                    <p>High-priority clusters with immediate investment focus</p>
                </div>
                <div class="clusters-grid">
                    ${tier1.map(cluster => renderClusterCard(cluster)).join('')}
                </div>

                <!-- Tier 2 Clusters -->
                <div class="section-header mt-4">
                    <h3>Tier 2: Invest as Anchor</h3>
                    <p>Medium-priority clusters with anchor tenant strategy</p>
                </div>
                <div class="clusters-grid">
                    ${tier2.map(cluster => renderClusterCard(cluster)).join('')}
                </div>

                <!-- Tier 3 Clusters -->
                <div class="section-header mt-4">
                    <h3>Tier 3: Invest Later</h3>
                    <p>Future growth clusters with deferred investment</p>
                </div>
                <div class="clusters-grid">
                    ${tier3.map(cluster => renderClusterCard(cluster)).join('')}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering clusters view:', error)
        return `
            <div class="error-message">
                <h3>Unable to load clusters data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderClusterCard(cluster) {
    return `
        <div class="cluster-card">
            <div class="cluster-header">
                <h4>${cluster.name}</h4>
                <span class="tier-badge ${cluster.tier}">${cluster.tier || 'N/A'}</span>
            </div>
            <div class="cluster-metrics">
                <div class="cluster-metric">
                    <span class="metric-label">Revenue</span>
                    <span class="metric-value">${formatNumber(cluster.revenue_usd_bn)} USD Bn</span>
                </div>
                <div class="cluster-metric">
                    <span class="metric-label">Employment</span>
                    <span class="metric-value">${formatNumber(cluster.employment)}</span>
                </div>
                <div class="cluster-metric">
                    <span class="metric-label">Land</span>
                    <span class="metric-value">${formatNumber(cluster.land_sqft)} Sq Ft</span>
                </div>
                <div class="cluster-metric">
                    <span class="metric-label">Capital</span>
                    <span class="metric-value">${formatNumber(cluster.capital_inr_cr)} Cr</span>
                </div>
            </div>
        </div>
    `
}

function renderVerticalBreakdown(breakdown) {
    if (!breakdown || breakdown.length === 0) {
        return `
            <div class="no-data-message">
                <p>No vertical distribution data available yet. This will be populated when targets are set.</p>
            </div>
        `
    }

    return `
        <div class="table-scroll-wrapper">
            <table class="data-table">
            <thead>
                <tr>
                    <th>Vertical</th>
                    <th>Category</th>
                    <th>Revenue (USD Bn)</th>
                    <th>Employment</th>
                    <th>Land (Sq Ft)</th>
                    <th>Capital (Cr)</th>
                </tr>
            </thead>
            <tbody>
                ${breakdown.map(item => `
                    <tr>
                        <td><strong>${item.vertical.name}</strong></td>
                        <td><span class="category-badge">${item.vertical.category}</span></td>
                        <td>${formatNumber(item.revenue_usd_bn)}</td>
                        <td>${formatNumber(item.employment)}</td>
                        <td>${formatNumber(item.land_sqft)}</td>
                        <td>${formatNumber(item.capital_inr_cr)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        </div>
    `
}

function formatNumber(value) {
    if (!value || value === 0) return '0'

    if (value >= 1000000000) {
        return (value / 1000000000).toFixed(2) + 'B'
    } else if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + 'M'
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + 'K'
    } else {
        return value.toFixed(2)
    }
}
