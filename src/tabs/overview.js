/**
 * Overview Tab Renderer
 * Shows 5-pillar framework and total digital economy metrics
 */

import { getVerticalOverview, getTotalMetrics } from '../services/dataService.js'

export async function renderOverviewTab(appData) {
    try {
        // Fetch overview data
        const verticalOverview = await getVerticalOverview(2030)
        const totalMetrics = await getTotalMetrics(2030)

        // Get core verticals
        const coreVerticals = appData.verticals.filter(v => v.category === 'core')

        return `
            <div class="overview-tab">
                <div class="tab-header">
                    <h2>Karnataka Digital Economy Overview</h2>
                    <p class="tab-subtitle">Building a $400 Billion Digital Economy by 2030</p>
                </div>

                <!-- Total Metrics Summary -->
                <div class="metrics-grid">
                    ${renderMetricCard('Total Revenue', totalMetrics.total_revenue_usd_bn, 'USD Billion', '$400B Target', 'revenue')}
                    ${renderMetricCard('Total Employment', totalMetrics.total_employment, 'Jobs', '5M Target', 'employment')}
                    ${renderMetricCard('Land Required', totalMetrics.total_land_sqft, 'Million Sq Ft', 'Infrastructure', 'land')}
                    ${renderMetricCard('Capital Investment', totalMetrics.total_capital_inr_cr, 'INR Crores', 'Investment', 'capital')}
                </div>

                <!-- 5-Pillar Framework -->
                <div class="section-header">
                    <h3>5-Pillar Digital Economy Framework</h3>
                    <p>Karnataka's digital economy is built on five core pillars, each contributing to the overall $400 billion vision</p>
                </div>

                <div class="pillars-grid">
                    ${coreVerticals.map(vertical => {
                        const data = verticalOverview.find(v => v.id === vertical.id) || {}
                        return renderPillarCard(vertical, data)
                    }).join('')}
                </div>

                <!-- Geographic Distribution Preview -->
                <div class="section-header mt-4">
                    <h3>Geographic Distribution</h3>
                    <p>Digital economy spread across Bengaluru and 8 strategic clusters</p>
                </div>

                <div class="geographic-preview">
                    ${renderGeographicPreview(appData)}
                </div>

                <!-- Vision Progress -->
                <div class="section-header mt-4">
                    <h3>Progress Towards 2030 Vision</h3>
                </div>

                <div class="vision-progress">
                    ${renderVisionProgress(totalMetrics)}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering overview tab:', error)
        return `
            <div class="error-message">
                <h3>Unable to load overview data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderMetricCard(label, value, unit, target, icon) {
    const formattedValue = formatNumber(value)

    const iconMap = {
        'revenue': '💰',
        'employment': '👥',
        'land': '🏗️',
        'capital': '💼'
    }

    return `
        <div class="metric-card">
            <div class="metric-icon">${iconMap[icon] || '📊'}</div>
            <div class="metric-content">
                <div class="metric-label">${label}</div>
                <div class="metric-value">${formattedValue}</div>
                <div class="metric-unit">${unit}</div>
                <div class="metric-target">${target}</div>
            </div>
        </div>
    `
}

function renderPillarCard(vertical, data) {
    const revenue = data.revenue_usd_bn || 0
    const employment = data.employment || 0
    const land = data.land_sqft || 0
    const capital = data.capital_inr_cr || 0

    return `
        <div class="pillar-card">
            <div class="pillar-header">
                <h4>${vertical.name}</h4>
                <span class="pillar-badge">${vertical.category}</span>
            </div>
            <div class="pillar-description">
                ${getVerticalDescription(vertical.id)}
            </div>
            <div class="pillar-metrics">
                <div class="pillar-metric">
                    <span class="metric-icon-small">💰</span>
                    <span class="metric-label-small">Revenue</span>
                    <span class="metric-value-small">${formatNumber(revenue)} USD Bn</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-icon-small">👥</span>
                    <span class="metric-label-small">Employment</span>
                    <span class="metric-value-small">${formatNumber(employment)}</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-icon-small">🏗️</span>
                    <span class="metric-label-small">Land (M Sq Ft)</span>
                    <span class="metric-value-small">${formatNumber(land)}</span>
                </div>
                <div class="pillar-metric">
                    <span class="metric-icon-small">💼</span>
                    <span class="metric-label-small">Capital (Cr)</span>
                    <span class="metric-value-small">${formatNumber(capital)}</span>
                </div>
            </div>
            <div class="pillar-footer">
                <a href="#" class="view-details-link" data-vertical="${vertical.id}">View Details →</a>
            </div>
        </div>
    `
}

function renderGeographicPreview(appData) {
    const tier1 = appData.geographies.filter(g => g.tier === 'tier1-invest-aggressively')
    const tier2 = appData.geographies.filter(g => g.tier === 'tier2-invest-as-anchor')
    const tier3 = appData.geographies.filter(g => g.tier === 'tier3-invest-later')

    return `
        <div class="geo-preview-grid">
            <div class="geo-preview-card">
                <div class="geo-tier-label tier1">Tier 1: Invest Aggressively</div>
                <div class="geo-list">
                    ${tier1.map(g => `<div class="geo-item">${g.name}</div>`).join('')}
                </div>
            </div>
            <div class="geo-preview-card">
                <div class="geo-tier-label tier2">Tier 2: Invest as Anchor</div>
                <div class="geo-list">
                    ${tier2.map(g => `<div class="geo-item">${g.name}</div>`).join('')}
                </div>
            </div>
            <div class="geo-preview-card">
                <div class="geo-tier-label tier3">Tier 3: Invest Later</div>
                <div class="geo-list">
                    ${tier3.map(g => `<div class="geo-item">${g.name}</div>`).join('')}
                </div>
            </div>
        </div>
    `
}

function renderVisionProgress(totalMetrics) {
    const revenueProgress = (totalMetrics.total_revenue_usd_bn / 400) * 100
    const employmentProgress = (totalMetrics.total_employment / 5000000) * 100

    return `
        <div class="progress-grid">
            <div class="progress-item">
                <div class="progress-header">
                    <span class="progress-label">Revenue Target Progress</span>
                    <span class="progress-percentage">${revenueProgress.toFixed(1)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${revenueProgress}%"></div>
                </div>
                <div class="progress-details">
                    <span>${formatNumber(totalMetrics.total_revenue_usd_bn)} USD Bn</span>
                    <span>of $400 Bn target</span>
                </div>
            </div>
            <div class="progress-item">
                <div class="progress-header">
                    <span class="progress-label">Employment Target Progress</span>
                    <span class="progress-percentage">${employmentProgress.toFixed(1)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${employmentProgress}%"></div>
                </div>
                <div class="progress-details">
                    <span>${formatNumber(totalMetrics.total_employment)} Jobs</span>
                    <span>of 5M target</span>
                </div>
            </div>
        </div>
    `
}

function getVerticalDescription(verticalId) {
    const descriptions = {
        'it-exports': 'Software product development and IT services for global markets. Includes GCCs, product companies, and services firms.',
        'it-domestic': 'Digital services for Indian businesses and government. Includes SaaS platforms, enterprise solutions, and govt tech.',
        'esdm': 'Electronic System Design & Manufacturing. Includes semiconductors, PCB manufacturing, and aerospace electronics.',
        'startups': 'Innovation ecosystem and early-stage ventures. Includes tech startups, incubators, and R&D centers.',
        'digitizing-sectors': 'Traditional sectors adopting digital technologies. Includes healthcare, education, agriculture, and finance digitization.'
    }
    return descriptions[verticalId] || ''
}

function formatNumber(value) {
    if (!value || value === 0) return '0'

    if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + 'M'
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + 'K'
    } else {
        return value.toFixed(2)
    }
}
