/**
 * Vertical Detail Tab Renderer
 * Shows detailed metrics for a specific vertical (IT Exports, IT Domestic, ESDM, Startups)
 */

import { getVerticalDetails } from '../services/dataService.js'

export async function renderVerticalTab(verticalId, appData) {
    try {
        const details = await getVerticalDetails(verticalId, 2030)
        const vertical = details.vertical

        return `
            <div class="vertical-tab">
                <div class="tab-header">
                    <h2>${vertical.name}</h2>
                    <p class="tab-subtitle">${getVerticalTagline(verticalId)}</p>
                </div>

                <!-- Overview Metrics -->
                <div class="metrics-grid">
                    ${renderMetricCard('Revenue', details.totals.revenue_usd_bn, 'USD Billion', 'revenue')}
                    ${renderMetricCard('Employment', details.totals.employment, 'Jobs', 'employment')}
                    ${renderMetricCard('Land', details.totals.land_sqft, 'M Sq Ft', 'land')}
                    ${renderMetricCard('Capital', details.totals.capital_inr_cr, 'INR Crores', 'capital')}
                </div>

                <!-- Geographic Distribution -->
                <div class="section-header mt-4">
                    <h3>Geographic Distribution</h3>
                    <p>Breakdown of ${vertical.name} across Karnataka's clusters</p>
                </div>

                <div class="geographic-breakdown">
                    ${renderGeographicBreakdown(details.geographicBreakdown)}
                </div>

                <!-- Sub-sectors (if applicable) -->
                ${verticalId === 'esdm' ? renderESDMSubsectors(appData) : ''}
                ${verticalId === 'digitizing-sectors' ? renderDigitizingSectors(appData) : ''}

                <!-- Apportionment Rules -->
                <div class="section-header mt-4">
                    <h3>Default Apportionment Rules</h3>
                    <p>Historical distribution patterns for this vertical</p>
                </div>

                <div class="apportionment-table">
                    ${renderApportionmentTable(details.apportionmentRules)}
                </div>
            </div>
        `
    } catch (error) {
        console.error(`Error rendering ${verticalId} tab:`, error)
        return `
            <div class="error-message">
                <h3>Unable to load ${verticalId} data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderMetricCard(label, value, unit, type) {
    const icons = {
        'revenue': '💰',
        'employment': '👥',
        'land': '🏗️',
        'capital': '💼'
    }

    return `
        <div class="metric-card">
            <div class="metric-icon">${icons[type]}</div>
            <div class="metric-content">
                <div class="metric-label">${label}</div>
                <div class="metric-value">${formatNumber(value)}</div>
                <div class="metric-unit">${unit}</div>
            </div>
        </div>
    `
}

function renderGeographicBreakdown(breakdown) {
    if (!breakdown || breakdown.length === 0) {
        return `
            <div class="no-data-message">
                <p>No geographic distribution data available yet. This will be populated when targets are set in the admin interface.</p>
            </div>
        `
    }

    return `
        <div class="table-scroll-wrapper">
            <table class="data-table">
            <thead>
                <tr>
                    <th>Geography</th>
                    <th>Tier</th>
                    <th>Revenue (USD Bn)</th>
                    <th>Employment</th>
                    <th>Land (M Sq Ft)</th>
                    <th>Capital (Cr)</th>
                </tr>
            </thead>
            <tbody>
                ${breakdown.map(item => `
                    <tr>
                        <td><strong>${item.geography.name}</strong></td>
                        <td><span class="tier-badge ${item.geography.tier}">${item.geography.tier || 'N/A'}</span></td>
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

function renderApportionmentTable(rules) {
    if (!rules || rules.length === 0) {
        return `<div class="no-data-message"><p>No apportionment rules defined.</p></div>`
    }

    return `
        <div class="table-scroll-wrapper">
            <table class="data-table">
            <thead>
                <tr>
                    <th>From Geography</th>
                    <th>To Geography</th>
                    <th>Allocation %</th>
                    <th>Basis</th>
                    <th>Confidence</th>
                </tr>
            </thead>
            <tbody>
                ${rules.slice(0, 10).map(rule => `
                    <tr>
                        <td>${rule.from_geography_id}</td>
                        <td><strong>${rule.to_geography_id}</strong></td>
                        <td>${rule.percentage_allocation}%</td>
                        <td>${rule.basis || 'Historical'}</td>
                        <td><span class="confidence-badge">${rule.confidence_rating || 3}/5</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        </div>
    `
}

function renderESDMSubsectors(appData) {
    const esdmSubs = appData.verticals.filter(v => v.parent_id === 'esdm')

    return `
        <div class="section-header mt-4">
            <h3>ESDM Sub-sectors</h3>
            <p>Specialized manufacturing segments within ESDM</p>
        </div>
        <div class="subsectors-grid">
            ${esdmSubs.map(sub => `
                <div class="subsector-card">
                    <h4>${sub.name}</h4>
                    <p>Sub-sector of ESDM</p>
                </div>
            `).join('')}
        </div>
    `
}

function renderDigitizingSectors(appData) {
    const digitizing = appData.verticals.filter(v => v.category === 'digitizing')

    return `
        <div class="section-header mt-4">
            <h3>Newly Digitizing Sectors</h3>
            <p>Traditional sectors undergoing digital transformation</p>
        </div>
        <div class="subsectors-grid">
            ${digitizing.map(sector => `
                <div class="subsector-card">
                    <h4>${sector.name}</h4>
                </div>
            `).join('')}
        </div>
    `
}

function getVerticalTagline(verticalId) {
    const taglines = {
        'it-exports': 'Global software product development and IT services',
        'it-domestic': 'Digital solutions for Indian businesses and government',
        'esdm': 'Electronic System Design & Manufacturing',
        'startups': 'Innovation ecosystem and early-stage ventures',
        'digitizing-sectors': 'Traditional sectors adopting digital technologies'
    }
    return taglines[verticalId] || ''
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
