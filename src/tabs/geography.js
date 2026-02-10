/**
 * Geography Tab Renderer
 * Shows Bengaluru dashboard or Beyond Bengaluru clusters
 * All data from Supabase backend - no hardcoded values
 */

import { getGeographyDetails, getGeographyOverview } from '../services/dataService.js'
import { formatNumber } from '../utils/formatting.js'
import { annotatedMetricCard, renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createDoughnutChart, createRadarChart } from '../utils/chartFactories.js'

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

        // Store chart init function for main.js to call after DOM insertion
        window.__kdem_initCharts = () => initSingleGeoCharts(details)

        return `
            <div class="geography-tab">
                <div class="tab-header">
                    <h2>${geography.name}</h2>
                    <p class="tab-subtitle">${geography.type || 'Geographic Cluster'} | ${geography.tier || 'N/A'}</p>
                </div>

                <!-- Overview Metrics -->
                <div class="metrics-grid">
                    ${annotatedMetricCard({
                        label: 'Total Revenue', value: details.totals.revenue_usd_bn, unit: 'USD Billion',
                        icon: '💰', type: 'target', confidence: 4,
                        source: 'KDEM Target Database (Supabase)',
                        formula: 'Sum of vertical revenue targets for this geography'
                    })}
                    ${annotatedMetricCard({
                        label: 'Total Employment', value: details.totals.employment, unit: 'Jobs',
                        icon: '👥', type: 'computed', confidence: 3,
                        source: 'DB targets (AI-adjusted medium scenario)',
                        formula: 'Revenue × AI-adjusted emp/$1M ratio per vertical (Bessemer Oct 2025, NASSCOM AI-era)'
                    })}
                    ${annotatedMetricCard({
                        label: 'Land Required', value: details.totals.land_sqft, unit: 'Sq Ft',
                        icon: '🏗️', type: 'computed', confidence: 3,
                        source: 'Industry standard: 200 sq ft/employee',
                        formula: 'Employment × 200 sq ft per employee'
                    })}
                    ${annotatedMetricCard({
                        label: 'Capital Investment', value: details.totals.capital_inr_cr, unit: 'INR Crores',
                        icon: '💼', type: 'computed', confidence: 2,
                        source: 'Computed from land + geography premiums',
                        formula: 'Land costs × geography multiplier'
                    })}
                </div>

                <!-- Vertical Distribution Chart -->
                ${details.verticalBreakdown.length > 0 ? `
                    <div class="section-header mt-4">
                        <h3>Revenue by Vertical</h3>
                        <p>Which verticals dominate ${geography.name}'s digital economy</p>
                    </div>
                    <div class="growth-charts-grid">
                        <div class="growth-chart-card" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto;">
                            <div class="chart-container" style="height: 350px;">
                                <canvas id="geo-vertical-doughnut"></canvas>
                            </div>
                            <div class="chart-source">Source: KDEM Target Database (Supabase)</div>
                        </div>
                    </div>
                ` : ''}

                <!-- Vertical Breakdown Table -->
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

        // Exclude sub-geographies (parks, SEZs) that have a parent_id - they are child projects, not clusters
        const clusters = overview.filter(g => !g.parent_id)

        // Match tier values from database (migration 001_dimension_tables.sql)
        const tier1 = clusters.filter(g => g.tier === 'tier1-invest-aggressively')
        const tier2 = clusters.filter(g => g.tier === 'tier2-nurture-build')
        const tier3 = clusters.filter(g => g.tier === 'tier3-study-strategize')

        // Store chart init function for main.js to call after DOM insertion
        window.__kdem_initCharts = () => initClustersCharts(clusters, tier1, tier2, tier3)

        return `
            <div class="clusters-tab">
                <div class="tab-header">
                    <h2>Beyond Bengaluru: Strategic Clusters</h2>
                    <p class="tab-subtitle">8 geographic clusters to diversify Karnataka's digital economy</p>
                </div>

                <!-- Tier Revenue Distribution -->
                <div class="growth-charts-grid">
                    <div class="growth-chart-card" style="max-width: 500px; margin: 0 auto;">
                        <h4>Revenue Share by Tier</h4>
                        <div class="chart-container" style="height: 300px;">
                            <canvas id="tier-doughnut-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: KDEM Target Database (Supabase)</div>
                    </div>
                    <div class="growth-chart-card">
                        <h4>Cluster Comparison</h4>
                        <div class="chart-container" style="height: 300px;">
                            <canvas id="cluster-radar-chart"></canvas>
                        </div>
                        <div class="chart-source">Source: KDEM Target Database (Supabase)</div>
                    </div>
                </div>

                <!-- Tier 1 Clusters -->
                <div class="section-header mt-4">
                    <h3>Tier 1: Invest Aggressively</h3>
                    <p>High-priority clusters with immediate investment focus</p>
                </div>
                <div class="clusters-grid">
                    ${tier1.map(cluster => renderClusterCard(cluster)).join('')}
                </div>

                <!-- Tier 2 Clusters -->
                ${tier2.length > 0 ? `
                    <div class="section-header mt-4">
                        <h3>Tier 2: Nurture & Build</h3>
                        <p>Medium-priority clusters with anchor tenant strategy</p>
                    </div>
                    <div class="clusters-grid">
                        ${tier2.map(cluster => renderClusterCard(cluster)).join('')}
                    </div>
                ` : ''}

                <!-- Tier 3 Clusters -->
                ${tier3.length > 0 ? `
                    <div class="section-header mt-4">
                        <h3>Tier 3: Study & Strategize</h3>
                        <p>Future growth clusters with long-term potential</p>
                    </div>
                    <div class="clusters-grid">
                        ${tier3.map(cluster => renderClusterCard(cluster)).join('')}
                    </div>
                ` : ''}
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
    const meta = cluster.metadata || {}
    const currentStatus = meta.currentStatus || {}
    const vision = meta.vision || {}
    const keyCompanies = currentStatus.keyCompanies || []
    const hasMetadata = Object.keys(currentStatus).length > 0

    return `
        <div class="cluster-card">
            <div class="cluster-header">
                <h4>${cluster.name}</h4>
                <span class="tier-badge ${cluster.tier}">${formatTierLabel(cluster.tier)}</span>
            </div>

            ${hasMetadata ? `
                <div class="cluster-current-status">
                    <h5>Current Status</h5>
                    ${currentStatus.companies ? `<p>${currentStatus.companies}</p>` : ''}
                    ${currentStatus.itEmployment ? `<p>IT Employment: ${currentStatus.itEmployment}</p>` : ''}
                    ${currentStatus.highlight ? `<div class="cluster-highlight">${currentStatus.highlight}</div>` : ''}
                    ${keyCompanies.length > 0 ? `
                        <div class="cluster-companies">
                            ${keyCompanies.map(c => `<span class="cluster-company-pill">${c}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            ` : ''}

            <div class="cluster-targets-section">
                <h5>2030 Targets</h5>
                <div class="cluster-metrics">
                    <div class="cluster-metric">
                        <span class="metric-label">Revenue</span>
                        <span class="metric-value">$${formatNumber(cluster.revenue_usd_bn)}B</span>
                    </div>
                    <div class="cluster-metric">
                        <span class="metric-label">Employment</span>
                        <span class="metric-value">${formatNumber(cluster.employment)}</span>
                    </div>
                    <div class="cluster-metric">
                        <span class="metric-label">Land</span>
                        <span class="metric-value">${formatNumber(cluster.land_sqft)} M Sq Ft</span>
                    </div>
                    <div class="cluster-metric">
                        <span class="metric-label">Capital</span>
                        <span class="metric-value">${formatNumber(cluster.capital_inr_cr)} Cr</span>
                    </div>
                </div>
            </div>

            ${cluster.data_source || cluster.confidence_rating ? `
                <div class="cluster-source">
                    <span class="cluster-source-text">${cluster.data_source || 'KDEM Target Database'}</span>
                    ${cluster.confidence_rating ? renderConfidenceStars(cluster.confidence_rating) : ''}
                </div>
            ` : ''}
        </div>
    `
}

function formatTierLabel(tier) {
    if (!tier) return 'N/A'
    const labels = {
        'tier1-invest-aggressively': 'Tier 1',
        'tier2-nurture-build': 'Tier 2',
        'tier3-study-strategize': 'Tier 3',
        'existing-hub': 'Hub',
        'emerging': 'Emerging'
    }
    return labels[tier] || tier
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

function initSingleGeoCharts(details) {
    // Vertical distribution doughnut for single geography
    if (details.verticalBreakdown.length > 0) {
        const labels = details.verticalBreakdown.map(v => v.vertical.name)
        const data = details.verticalBreakdown.map(v => v.revenue_usd_bn)
        const totalRev = data.reduce((a, b) => a + b, 0)
        const colors = details.verticalBreakdown.map(v =>
            CHART_COLORS.verticalNames[v.vertical.id] || CHART_COLORS.verticals[0]
        )
        createDoughnutChart('geo-vertical-doughnut', labels, data, colors, `$${totalRev.toFixed(0)}B`)
    }
}

function initClustersCharts(overview, tier1, tier2, tier3) {
    // Tier Revenue Distribution Doughnut
    const tierLabels = ['Tier 1', 'Tier 2', 'Tier 3']
    const tierRevenues = [
        tier1.reduce((s, g) => s + g.revenue_usd_bn, 0),
        tier2.reduce((s, g) => s + g.revenue_usd_bn, 0),
        tier3.reduce((s, g) => s + g.revenue_usd_bn, 0)
    ]
    createDoughnutChart('tier-doughnut-chart', tierLabels, tierRevenues, CHART_COLORS.tiers)

    // Cluster Comparison Radar
    const clustersWithData = overview.filter(g =>
        g.revenue_usd_bn > 0 || g.employment > 0
    ).slice(0, 6)

    if (clustersWithData.length > 0) {
        const radarLabels = ['Revenue', 'Employment', 'Land', 'Capital']
        const maxRevenue = Math.max(...clustersWithData.map(c => c.revenue_usd_bn)) || 1
        const maxEmployment = Math.max(...clustersWithData.map(c => c.employment)) || 1
        const maxLand = Math.max(...clustersWithData.map(c => c.land_sqft)) || 1
        const maxCapital = Math.max(...clustersWithData.map(c => c.capital_inr_cr)) || 1

        const radarDatasets = clustersWithData.map(cluster => ({
            label: cluster.name,
            data: [
                (cluster.revenue_usd_bn / maxRevenue) * 100,
                (cluster.employment / maxEmployment) * 100,
                (cluster.land_sqft / maxLand) * 100,
                (cluster.capital_inr_cr / maxCapital) * 100
            ]
        }))

        createRadarChart('cluster-radar-chart', radarLabels, radarDatasets)
    }
}
