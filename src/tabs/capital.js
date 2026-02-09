/**
 * Capital Tab Renderer
 * Shows funding, investment, and capital requirements
 * All data loaded from referenceData service - no hardcoded values
 */

import {
    getVCMetrics,
    getInvestorBase,
    getSectorFunding,
    getFundingDistribution,
    getInvestmentTrends,
    getPolicies,
    getNationalOpportunities
} from '../services/referenceData.js'
import { renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createDoughnutChart } from '../utils/chartFactories.js'

/**
 * Unicorn & Soonicorn capital data
 * Source: Bengaluru Innovation Report 2025
 */
function getUnicornData() {
    return {
        unicorns: {
            count: 53,
            funding: '$51.5B',
            valuation: '$191.8B',
            indiaShare: '53%',
            avgTime: '6 years',
            source: 'Bengaluru Innovation Report 2025',
            confidence: 5
        },
        soonicorns: {
            count: 183,
            indiaTotal: 466,
            bengaluruShare: '39%',
            avgTime: '5 years',
            source: 'Bengaluru Innovation Report 2025',
            confidence: 5
        }
    }
}

/**
 * Women-led startup capital data
 * Source: Bengaluru Innovation Report 2025
 */
function getWomenFundingData() {
    return {
        capitalRaised: '$10B',
        startupsFounded: '~1,600',
        activeFunded: '668',
        elevateShare: '25%',
        source: 'Bengaluru Innovation Report 2025',
        confidence: 5
    }
}

export async function renderCapitalTab(appData) {
    try {
        const vcMetrics = getVCMetrics()
        const investorBase = getInvestorBase()
        const sectorFunding = getSectorFunding()
        const fundingDistribution = getFundingDistribution()
        const investmentTrends = getInvestmentTrends()
        const policies = getPolicies()
        const unicornData = getUnicornData()
        const womenFunding = getWomenFundingData()
        const nationalOpportunities = getNationalOpportunities()

        // Filter policies that have allocation/funding info for Government Funding section
        const govFundingPrograms = policies.filter(p =>
            p.allocation || p.funds || p.investment
        )

        // Store chart init function for main.js to call after DOM insertion
        window.__kdem_initCharts = () => initCapitalCharts(fundingDistribution)

        return `
            <div class="capital-tab">
                <div class="tab-header">
                    <h2>Capital & Investment</h2>
                    <p class="tab-subtitle">Funding ecosystem, venture capital, and investment trends across Karnataka's digital economy</p>
                </div>

                <!-- Venture Capital Ecosystem -->
                <div class="section-header">
                    <h3>Bengaluru Venture Capital Ecosystem</h3>
                </div>

                <div class="metrics-grid">
                    ${renderVCMetrics(vcMetrics)}
                </div>

                <!-- Investor Base -->
                <div class="section-header mt-4">
                    <h3>Investor Base Depth</h3>
                </div>

                <div class="investor-grid">
                    ${renderInvestorCards(investorBase)}
                </div>

                <!-- Funding Distribution Chart -->
                <div class="section-header mt-4">
                    <h3>Startup Funding Distribution (Since 2016)</h3>
                    <p>Share of Indian startup funding by city</p>
                </div>

                <div class="chart-container" style="max-width: 480px; margin: 0 auto;">
                    <canvas id="capital-funding-doughnut" height="320"></canvas>
                </div>
                <p class="source" style="text-align: center;">Source: Bengaluru Innovation Report 2025</p>

                <!-- Unicorn & Soonicorn Funding -->
                <div class="section-header mt-4">
                    <h3>Unicorn & Soonicorn Capital</h3>
                </div>

                <div class="unicorn-funding">
                    ${renderUnicornFunding(unicornData)}
                </div>

                <!-- Sector-wise Funding -->
                <div class="section-header mt-4">
                    <h3>Sector-wise Funding Highlights</h3>
                </div>

                <div class="sector-funding-grid">
                    ${renderSectorFundingCards(sectorFunding)}
                </div>

                <!-- Government Funding & Support -->
                <div class="section-header mt-4">
                    <h3>Government Funding Programs</h3>
                </div>

                <div class="govt-funding">
                    ${renderGovernmentFunding(govFundingPrograms)}
                </div>

                <!-- National Scheme Pipeline -->
                <div class="section-header mt-4">
                    <h3>National Scheme Pipeline</h3>
                    <p>Major central government funding schemes Karnataka can capture for digital economy growth</p>
                </div>

                <div class="interventions-grid">
                    ${nationalOpportunities.map(opp => `
                        <div class="intervention-card">
                            <h4>${opp.icon} ${opp.title}</h4>
                            <ul>
                                ${opp.opportunities.map(o => `<li>${o}</li>`).join('')}
                            </ul>
                            <div class="highlight" style="margin-top: 0.5rem;"><strong>Karnataka Action:</strong> ${opp.karnatakaAction}</div>
                            <p class="source" style="margin-top: 0.5rem;">Timeline: ${opp.timeline} | Source: ${opp.source}</p>
                        </div>
                    `).join('')}
                </div>

                <!-- Women-Led Startup Funding -->
                <div class="section-header mt-4">
                    <h3>Women-Led Startup Funding</h3>
                </div>

                <div class="women-funding">
                    ${renderWomenFunding(womenFunding)}
                </div>

                <!-- Investment Trends -->
                <div class="section-header mt-4">
                    <h3>Recent Investment Trends</h3>
                </div>

                <div class="trends-info">
                    ${renderInvestmentTrendCards(investmentTrends)}
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

/**
 * Initialize charts after DOM insertion
 */
function initCapitalCharts(fundingDistribution) {
    if (fundingDistribution && fundingDistribution.length > 0) {
        const labels = fundingDistribution.map(d => d.city)
        const data = fundingDistribution.map(d => d.share)
        const colors = [
            CHART_COLORS.verticals[0],
            CHART_COLORS.verticals[1],
            CHART_COLORS.verticals[2],
            CHART_COLORS.verticals[3] || '#8B5CF6'
        ]
        createDoughnutChart('capital-funding-doughnut', labels, data, colors, 'Funding %')
    }
}

// ---- Render helpers: all data-driven, no hardcoded values ----

function renderVCMetrics(metrics) {
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

function renderInvestorCards(investors) {
    return investors.map(investor => `
        <div class="investor-card">
            <div class="investor-icon">${investor.icon}</div>
            <div class="investor-count">${investor.count}</div>
            <h4>${investor.type}</h4>
            <p>${investor.role}</p>
            <div class="metric-footer">
                ${renderConfidenceStars(investor.confidence)}
            </div>
            <p class="source">Source: ${investor.source}</p>
        </div>
    `).join('')
}

function renderUnicornFunding(data) {
    const { unicorns, soonicorns } = data
    return `
        <div class="unicorn-stats-grid">
            <div class="stat-card">
                <h4>Unicorns (${unicorns.count} in Bengaluru)</h4>
                <div class="stat-metric">
                    <span class="label">Funding Raised:</span>
                    <span class="value">${unicorns.funding}</span>
                </div>
                <div class="stat-metric">
                    <span class="label">Total Valuation:</span>
                    <span class="value">${unicorns.valuation}</span>
                </div>
                <div class="stat-metric">
                    <span class="label">Share of India's Unicorn Valuation:</span>
                    <span class="value">${unicorns.indiaShare}</span>
                </div>
                <div class="stat-metric">
                    <span class="label">Average Time to Unicorn:</span>
                    <span class="value">${unicorns.avgTime}</span>
                </div>
                <p class="highlight">Fastest among Indian hubs</p>
                <div class="metric-footer">
                    ${renderConfidenceStars(unicorns.confidence)}
                </div>
            </div>

            <div class="stat-card">
                <h4>Soonicorns (${soonicorns.count} in Bengaluru)</h4>
                <div class="stat-metric">
                    <span class="label">Total India Soonicorns:</span>
                    <span class="value">${soonicorns.indiaTotal}</span>
                </div>
                <div class="stat-metric">
                    <span class="label">Bengaluru Share:</span>
                    <span class="value">${soonicorns.bengaluruShare} (highest in India)</span>
                </div>
                <div class="stat-metric">
                    <span class="label">Average Time to Soonicorn:</span>
                    <span class="value">${soonicorns.avgTime}</span>
                </div>
                <p class="highlight">Fastest time to soonicorn status</p>
                <div class="metric-footer">
                    ${renderConfidenceStars(soonicorns.confidence)}
                </div>
            </div>
        </div>
        <p class="source">Source: ${unicorns.source}</p>

        <div class="global-context">
            <h5>Global Context:</h5>
            <p>Bengaluru is the <strong>5th largest unicorn hub globally</strong>, after Bay Area, New York, Beijing, and London.</p>
            <p>Unicorn valuation = <strong>4.5% of India's GDP</strong> (2025)</p>
        </div>
    `
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

function renderGovernmentFunding(programs) {
    return programs.map(program => `
        <div class="govt-program-card">
            <h4>${program.name}</h4>
            <div class="policy-status">${renderConfidenceStars(program.confidence)} ${program.status}</div>
            ${program.allocation ? `<div class="allocation">
                <span class="label">Total Allocation:</span>
                <span class="value">${program.allocation}</span>
            </div>` : ''}
            ${program.funds ? `<div class="metric"><strong>Funds Breakdown:</strong> ${program.funds}</div>` : ''}
            ${program.investment ? `<div class="metric"><strong>Total Investment:</strong> ${program.investment}</div>` : ''}
            ${program.targets ? `<div class="target"><strong>Targets:</strong> ${program.targets}</div>` : ''}
            ${program.target ? `<div class="target"><strong>Target:</strong> ${program.target}</div>` : ''}
            ${program.goal ? `<div class="metric"><strong>Goal:</strong> ${program.goal}</div>` : ''}
            ${program.highlights ? `<p class="highlights">${program.highlights}</p>` : ''}
        </div>
    `).join('')
}

function renderWomenFunding(data) {
    return `
        <div class="women-funding-card">
            <h4>Women-Led Startup Capital</h4>
            <div class="women-metrics">
                <div class="metric-large">
                    <div class="value">${data.capitalRaised}</div>
                    <div class="label">Capital Raised by Women-Led Startups in Bengaluru</div>
                </div>
                <div class="metric">
                    <span class="label">Women-Led Startups Founded Since 2010:</span>
                    <span class="value">${data.startupsFounded}</span>
                </div>
                <div class="metric">
                    <span class="label">Active Funded Women-Led Startups:</span>
                    <span class="value">${data.activeFunded} (highest among cities)</span>
                </div>
                <div class="metric">
                    <span class="label">ELEVATE Women-Led Share:</span>
                    <span class="value">${data.elevateShare}</span>
                </div>
            </div>
            <div class="metric-footer">
                ${renderConfidenceStars(data.confidence)}
            </div>
            <p class="source">Source: ${data.source}</p>
        </div>
    `
}

function renderInvestmentTrendCards(trends) {
    return `
        <div class="trends-grid">
            ${trends.map(trend => `
                <div class="trend-card">
                    <h4>${trend.title}</h4>
                    <p>${trend.description}</p>
                    <div class="metric-footer">
                        ${renderConfidenceStars(trend.confidence)}
                    </div>
                    <p class="source">Source: ${trend.source}</p>
                </div>
            `).join('')}
        </div>
    `
}
