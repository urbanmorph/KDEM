/**
 * Startups & Digitizing Sectors Tab Renderer
 * Shows startup ecosystem, unicorns, innovation metrics, and support programs
 * All data loaded from referenceData service - no hardcoded values
 */

import {
    getStartupMetrics,
    getPolicies,
    getEcosystemInfra,
    getInnovationMetrics,
    getGlobalRankings,
    getClusterEcosystems,
    getSupportPrograms,
    getSectorFunding,
    getFundingDistribution
} from '../services/referenceData.js'
import { formatNumber } from '../utils/formatting.js'
import { renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createDoughnutChart } from '../utils/chartFactories.js'

export async function renderStartupsTab(appData) {
    try {
        const startupMetrics = getStartupMetrics()
        const policies = getPolicies()
        const ecosystemInfra = getEcosystemInfra()
        const innovationMetrics = getInnovationMetrics()
        const globalRankings = getGlobalRankings()
        const clusterEcosystems = getClusterEcosystems()
        const supportPrograms = getSupportPrograms()
        const sectorFunding = getSectorFunding()
        const fundingDistribution = getFundingDistribution()

        // Store chart init function for main.js to call after DOM insertion
        window.__kdem_initCharts = () => initStartupCharts(fundingDistribution, globalRankings)

        return `
            <div class="startups-tab">
                <div class="tab-header">
                    <h2>Startups & Digitizing Sectors</h2>
                    <p class="tab-subtitle">Startup ecosystem, unicorns, soonicorns, innovation excellence, and support programs across Karnataka</p>
                </div>

                <!-- Startup Ecosystem Overview -->
                <div class="section-header">
                    <h3>Bengaluru Startup Ecosystem</h3>
                </div>

                <div class="metrics-grid">
                    ${renderStartupMetrics(startupMetrics)}
                </div>

                <!-- Policy Framework -->
                <div class="section-header mt-4">
                    <h3>Karnataka Policy Framework</h3>
                </div>

                <div class="policies-grid">
                    ${renderPolicyFramework(policies)}
                </div>

                <!-- Ecosystem Infrastructure -->
                <div class="section-header mt-4">
                    <h3>Ecosystem Infrastructure</h3>
                </div>

                <div class="ecosystem-infra">
                    ${renderEcosystemInfra(ecosystemInfra)}
                </div>

                <!-- Innovation Metrics -->
                <div class="section-header mt-4">
                    <h3>Innovation & Research Excellence</h3>
                </div>

                <div class="innovation-grid">
                    ${renderInnovationCards(innovationMetrics)}
                </div>

                <!-- Global Rankings & Recognition -->
                <div class="section-header mt-4">
                    <h3>Global Rankings & Recognition</h3>
                </div>

                <div class="rankings-grid">
                    ${renderRankingCards(globalRankings)}
                </div>

                <!-- Funding Distribution Chart -->
                <div class="section-header mt-4">
                    <h3>Funding Distribution (Since 2016)</h3>
                    <p>Share of Indian startup funding by city</p>
                </div>

                <div class="chart-container" style="max-width: 480px; margin: 0 auto;">
                    <canvas id="startups-funding-doughnut" height="320"></canvas>
                </div>

                <!-- Rankings are displayed as styled cards in the section above -->

                <!-- Beyond Bengaluru Ecosystem -->
                <div class="section-header mt-4">
                    <h3>Beyond Bengaluru: Cluster Ecosystems</h3>
                </div>

                <div class="cluster-ecosystem">
                    ${renderClusterCards(clusterEcosystems)}
                </div>

                <!-- Support Programs -->
                <div class="section-header mt-4">
                    <h3>KDEM Support Programs</h3>
                </div>

                <div class="support-programs">
                    ${renderSupportCards(supportPrograms)}
                </div>

                <!-- Sector Funding -->
                <div class="section-header mt-4">
                    <h3>Sector-wise Funding Highlights</h3>
                </div>

                <div class="sector-funding-grid">
                    ${renderSectorFundingCards(sectorFunding)}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering startups tab:', error)
        return `
            <div class="error-message">
                <h3>Unable to load startups & digitizing sectors data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

/**
 * Initialize charts after DOM insertion
 */
function initStartupCharts(fundingDistribution, globalRankings) {
    // Funding Distribution Doughnut
    if (fundingDistribution && fundingDistribution.length > 0) {
        const labels = fundingDistribution.map(d => d.city)
        const data = fundingDistribution.map(d => d.share)
        const colors = [
            CHART_COLORS.verticals[0],
            CHART_COLORS.verticals[1],
            CHART_COLORS.verticals[2],
            CHART_COLORS.verticals[3] || '#8B5CF6'
        ]
        createDoughnutChart('startups-funding-doughnut', labels, data, colors, 'Funding %')
    }

    // Global Rankings are displayed as styled ranking cards (no chart needed)
}

// ---- Render helpers: all data-driven, no hardcoded values ----

function renderStartupMetrics(metrics) {
    return metrics.map(m => `
        <div class="metric-card metric-highlight">
            <div class="metric-icon">${m.icon}</div>
            <div class="metric-value">${m.value}</div>
            <div class="metric-label">${m.label}</div>
            <div class="metric-footer">
                ${renderConfidenceStars(m.confidence)}
            </div>
            <div class="metric-source">${m.source}</div>
        </div>
    `).join('')
}

function renderPolicyFramework(policies) {
    return policies.map(policy => `
        <div class="policy-card">
            <h4>${policy.name}</h4>
            <div class="policy-status">${renderConfidenceStars(policy.confidence)} ${policy.status}</div>
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

function renderEcosystemInfra(infraItems) {
    return `
        <div class="infra-stats-grid">
            ${infraItems.map(item => `
                <div class="infra-stat">
                    <h4>${item.icon} ${item.title}</h4>
                    <div class="stat-value">${item.value}</div>
                    <p>${item.description}</p>
                    ${item.examples ? `
                        <div class="examples">
                            <strong>Examples:</strong> ${item.examples}
                        </div>
                    ` : ''}
                    ${item.coverage ? `
                        <div class="coverage">
                            <strong>Target:</strong> ${item.coverage}
                        </div>
                    ` : ''}
                    <div class="metric-footer">
                        ${renderConfidenceStars(item.confidence)}
                    </div>
                    <div class="metric-source">${item.source}</div>
                </div>
            `).join('')}
        </div>
    `
}

function renderInnovationCards(metrics) {
    return metrics.map(metric => `
        <div class="innovation-card">
            <div class="innovation-icon">${metric.icon}</div>
            <h4>${metric.category}</h4>
            <ul>
                ${metric.stats.map(stat => `<li>${stat}</li>`).join('')}
            </ul>
            <div class="metric-footer">
                ${renderConfidenceStars(metric.confidence)}
            </div>
            <p class="source">Source: ${metric.source}</p>
        </div>
    `).join('')
}

function renderRankingCards(rankings) {
    return rankings.map(ranking => `
        <div class="ranking-card ranking-${ranking.badge}">
            <div class="rank-badge">${ranking.rank}</div>
            <h4>${ranking.metric}</h4>
            <p class="description">${ranking.description}</p>
            ${ranking.growth ? `<p class="detail"><strong>${ranking.growth}</strong></p>` : ''}
            ${ranking.note ? `<p class="detail">${ranking.note}</p>` : ''}
            ${ranking.unicorns ? `<p class="detail">${ranking.unicorns}</p>` : ''}
            ${ranking.improvement ? `<p class="improvement">${ranking.improvement}</p>` : ''}
            <div class="metric-footer">
                ${renderConfidenceStars(ranking.confidence)}
            </div>
            <p class="source">Source: ${ranking.source}</p>
        </div>
    `).join('')
}

function renderClusterCards(clusters) {
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
            <div class="metric-footer">
                ${renderConfidenceStars(cluster.confidence)}
            </div>
            <p class="source">Source: ${cluster.source}</p>
        </div>
    `).join('')
}

function renderSupportCards(programs) {
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
            <div class="metric-footer">
                ${renderConfidenceStars(program.confidence)}
            </div>
            <p class="source">Source: ${program.source}</p>
        </div>
    `).join('')
}

function renderSectorFundingCards(sectors) {
    return sectors.map(sector => `
        <div class="sector-card">
            <h4>${sector.sector}</h4>
            ${sector.companies ? `<div class="metric"><strong>Companies Founded:</strong> ${sector.companies}</div>` : ''}
            ${sector.funded ? `<div class="metric"><strong>Companies Funded:</strong> ${sector.funded}</div>` : ''}
            ${sector.funding ? `<div class="metric"><strong>Funding:</strong> ${sector.funding}</div>` : ''}
            ${sector.share ? `<div class="metric highlight">${sector.share}</div>` : ''}
            ${sector.growth ? `<div class="metric"><strong>Growth:</strong> ${sector.growth}</div>` : ''}
            ${sector.highlight ? `<div class="highlight">${sector.highlight}</div>` : ''}
            ${sector.note ? `<p class="note">${sector.note}</p>` : ''}
            <div class="metric-footer">
                ${renderConfidenceStars(sector.confidence)}
            </div>
            <p class="source">Source: ${sector.source}</p>
        </div>
    `).join('')
}
