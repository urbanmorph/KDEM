/**
 * Vertical Detail Tab Renderer
 * Shows detailed metrics for a specific vertical (IT Exports, IT Domestic, ESDM, Startups)
 * All data from Supabase backend - no hardcoded values
 */

import { getVerticalDetails, fetchConversionRatios } from '../services/dataService.js'
import { getDigitizingSubSectors } from '../services/referenceData.js'
import { formatNumber } from '../utils/formatting.js'
import { annotatedMetricCard, renderConfidenceStars } from '../utils/components.js'
import { CHART_COLORS } from '../utils/chartSetup.js'
import { createDoughnutChart } from '../utils/chartFactories.js'
import { createTreemapChart } from '../utils/echartsFactories.js'

export async function renderVerticalTab(verticalId, appData) {
    try {
        const [details, conversionRatios] = await Promise.all([
            getVerticalDetails(verticalId, 2030),
            fetchConversionRatios(verticalId)
        ])
        const vertical = details.vertical

        // Store chart init function for main.js to call after DOM insertion
        window.__kdem_initCharts = () => initVerticalCharts(details, conversionRatios, verticalId)

        return `
            <div class="vertical-tab">
                <div class="tab-header">
                    <h2>${vertical.name}</h2>
                    <p class="tab-subtitle">${vertical.description || ''}</p>
                </div>

                <!-- Overview Metrics -->
                <div class="metrics-grid">
                    ${annotatedMetricCard({
                        label: 'Revenue', value: details.totals.revenue_usd_bn, unit: 'USD Billion',
                        icon: '💰', type: 'target', confidence: 4,
                        source: 'KDEM Target Database (Supabase)',
                        formula: 'Sum of geographic revenue targets'
                    })}
                    ${annotatedMetricCard({
                        label: 'Employment', value: details.totals.employment, unit: 'Jobs',
                        icon: '👥', type: 'computed', confidence: 3,
                        source: 'Computed from conversion ratios',
                        formula: `Revenue × employment ratio per vertical`
                    })}
                    ${annotatedMetricCard({
                        label: 'Land', value: details.totals.land_sqft, unit: 'Sq Ft',
                        icon: '🏗️', type: 'computed', confidence: 3,
                        source: 'Industry standard: 200 sq ft/employee',
                        formula: 'Employment × 200 sq ft per employee'
                    })}
                    ${annotatedMetricCard({
                        label: 'Capital', value: details.totals.capital_inr_cr, unit: 'INR Crores',
                        icon: '💼', type: 'computed', confidence: 2,
                        source: 'Computed from land + geography premiums',
                        formula: 'Land costs × geography multiplier'
                    })}
                </div>

                <!-- Geographic Distribution Chart -->
                <div class="section-header mt-4">
                    <h3>Geographic Distribution</h3>
                    <p>Breakdown of ${vertical.name} across Karnataka's clusters</p>
                </div>

                ${details.geographicBreakdown.length > 0 ? `
                    <div class="growth-charts-grid">
                        <div class="growth-chart-card" style="grid-column: 1 / -1;">
                            <h4>Revenue by Geography</h4>
                            <div class="chart-container" style="height: ${Math.max(250, details.geographicBreakdown.length * 40)}px;">
                                <canvas id="vertical-geo-chart"></canvas>
                            </div>
                            <div class="chart-source">Source: KDEM Target Database (Supabase)</div>
                        </div>
                    </div>
                ` : ''}

                <!-- Geographic Breakdown Table -->
                <div class="geographic-breakdown">
                    ${renderGeographicBreakdown(details.geographicBreakdown)}
                </div>

                <!-- Sub-sectors (if applicable) -->
                ${verticalId === 'esdm' ? renderESDMSubsectors(appData) : ''}
                ${verticalId === 'digitizing-sectors' ? renderDigitizingSectors() : ''}

                <!-- Apportionment Rules -->
                <div class="section-header mt-4">
                    <h3>Default Apportionment Rules</h3>
                    <p>Historical distribution patterns for this vertical</p>
                </div>

                <div class="apportionment-table">
                    ${renderApportionmentTable(details.apportionmentRules)}
                </div>

                <!-- Conversion Ratios -->
                ${conversionRatios && conversionRatios.length > 0 ? `
                    <div class="section-header mt-4">
                        <h3>Conversion Ratios</h3>
                        <p>Industry-standard ratios used to cascade targets for this vertical</p>
                    </div>
                    <div class="conversion-info">
                        ${renderConversionTable(conversionRatios)}
                    </div>
                ` : ''}
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
                    <th>Land (Sq Ft)</th>
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
                        <td>${renderConfidenceStars(rule.confidence_rating || 3)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        </div>
    `
}

function renderConversionTable(ratios) {
    return `
        <div class="table-scroll-wrapper">
            <table class="data-table">
            <thead>
                <tr>
                    <th>From Metric</th>
                    <th>To Metric</th>
                    <th>Ratio</th>
                    <th>Unit</th>
                    <th>Source</th>
                    <th>Confidence</th>
                </tr>
            </thead>
            <tbody>
                ${ratios.map(r => `
                    <tr>
                        <td>${r.from_metric || r.from_factor_id || ''}</td>
                        <td>${r.to_metric || r.to_factor_id || ''}</td>
                        <td>${r.ratio || r.conversion_ratio || ''}</td>
                        <td>${r.unit || ''}</td>
                        <td>${r.source || ''}</td>
                        <td>${renderConfidenceStars(r.confidence_rating || 3)}</td>
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
                    <p>${sub.description || 'Sub-sector of ESDM'}</p>
                </div>
            `).join('')}
        </div>
    `
}

function renderDigitizingSectors() {
    const data = getDigitizingSubSectors()
    const sectors = data.sectors

    // Group by McKinsey category
    const categories = {}
    sectors.forEach(s => {
        const cat = s.mcKinseyCategory
        if (!categories[cat]) categories[cat] = []
        categories[cat].push(s)
    })

    // Sort categories by total KA FY30 value (descending)
    const sortedCategories = Object.entries(categories)
        .map(([name, subs]) => ({
            name,
            sectors: subs.sort((a, b) => b.kaFY30 - a.kaFY30),
            totalFY30: subs.reduce((sum, s) => sum + s.kaFY30, 0),
            totalFY25: subs.reduce((sum, s) => sum + s.kaFY25, 0)
        }))
        .sort((a, b) => b.totalFY30 - a.totalFY30)

    const growthMultiple = (data.totalKaFY30 / data.totalKaFY25).toFixed(1)

    return `
        <div class="section-header mt-4">
            <h3>Newly Digitizing Sectors &mdash; 17 Sub-sector Breakdown</h3>
            <p>Traditional sectors undergoing digital transformation (McKinsey framework)</p>
        </div>

        <!-- Data Provenance Warning -->
        <div class="data-quality-warning">
            <strong>Data Quality Note (Confidence: ${renderConfidenceStars(2)})</strong>
            <p>${data.methodologyNote}</p>
        </div>

        <!-- Summary Metrics -->
        <div class="metrics-grid" style="margin-top: 1.5rem;">
            ${annotatedMetricCard({
                label: 'KA FY24-25 (Bottom-up)', value: data.totalKaFY25, unit: 'USD Billion',
                icon: '📊', type: 'projected', confidence: 2,
                source: 'KDEM Excel — sum of 17 sub-sector projections',
                formula: 'Sum of per-sub-sector CAGR projections from FY21-22 base'
            })}
            ${annotatedMetricCard({
                label: 'KA FY29-30 Target', value: data.totalKaFY30, unit: 'USD Billion',
                icon: '🎯', type: 'target', confidence: 2,
                source: 'KDEM Excel — 15% post-FY25 CAGR uniformly',
                formula: 'FY25 sub-sector values × 15% CAGR for 5 years'
            })}
            ${annotatedMetricCard({
                label: 'Growth Multiple', value: growthMultiple + 'x', unit: 'FY25 to FY30',
                icon: '📈', type: 'computed', confidence: 2,
                source: 'Computed from KDEM Excel projections'
            })}
            ${annotatedMetricCard({
                label: 'Sub-sectors', value: data.subSectorCount, unit: 'McKinsey use cases',
                icon: '🔢', type: 'actual', confidence: 3,
                source: 'McKinsey "Digital India" (2019), Exhibit 17'
            })}
        </div>

        <!-- Treemap Chart -->
        <div class="growth-charts-grid" style="margin-top: 1.5rem;">
            <div class="growth-chart-card" style="grid-column: 1 / -1;">
                <h4>FY29-30 Target Breakdown by Category</h4>
                <p class="chart-subtitle">$${data.totalKaFY30}B across ${data.subSectorCount} sub-sectors, grouped by McKinsey category</p>
                <div id="digitizing-treemap" class="echart-container" style="height: 400px;"></div>
                <div class="chart-source">Source: KDEM Excel + McKinsey "Digital India" (2019)</div>
            </div>
        </div>

        <!-- Category-Grouped Sub-sector Cards -->
        ${sortedCategories.map(cat => renderDigitizingCategoryGroup(cat)).join('')}
    `
}

function renderDigitizingCategoryGroup(category) {
    return `
        <div class="digitizing-category-group">
            <div class="digitizing-category-title">
                <h4>${category.name}</h4>
                <span class="category-total">KA FY30: $${category.totalFY30.toFixed(2)}B</span>
            </div>
            <div class="digitizing-sectors-grid">
                ${category.sectors.map(s => renderDigitizingSectorCard(s)).join('')}
            </div>
        </div>
    `
}

function renderDigitizingSectorCard(sector) {
    const growthMultiple = (sector.kaFY30 / sector.kaFY25).toFixed(1)
    const cagrNum = parseFloat(sector.cagrKaTill25)
    const isExtremeCagr = cagrNum > 100

    return `
        <div class="digitizing-sector-card">
            <h5>${sector.name}</h5>
            <div class="sector-metrics-compact">
                <div class="sector-metric-item">
                    <span class="metric-key">India Base FY22</span>
                    <span class="metric-val">$${sector.indiaBaseFY22}B</span>
                </div>
                <div class="sector-metric-item">
                    <span class="metric-key">KA Share</span>
                    <span class="metric-val">${sector.kaSharePct}%</span>
                </div>
                <div class="sector-metric-item">
                    <span class="metric-key">KA FY25</span>
                    <span class="metric-val">$${sector.kaFY25.toFixed(2)}B</span>
                </div>
                <div class="sector-metric-item">
                    <span class="metric-key">KA FY30</span>
                    <span class="metric-val highlight">$${sector.kaFY30.toFixed(2)}B</span>
                </div>
                <div class="sector-metric-item">
                    <span class="metric-key">Growth</span>
                    <span class="metric-val">${growthMultiple}x</span>
                </div>
                <div class="sector-metric-item">
                    <span class="metric-key">Pre-FY25 CAGR</span>
                    <span class="metric-val ${isExtremeCagr ? 'cagr-extreme' : ''}">${sector.cagrKaTill25}</span>
                </div>
            </div>
            <div class="metric-footer">
                ${renderConfidenceStars(sector.confidence)}
                <span class="source-inline" title="${sector.source}">${sector.source}</span>
            </div>
        </div>
    `
}

function initVerticalCharts(details, conversionRatios, verticalId) {
    // Geographic Distribution Doughnut Chart
    if (details.geographicBreakdown.length > 0) {
        const geoLabels = details.geographicBreakdown.map(g => g.geography.name)
        const geoRevenues = details.geographicBreakdown.map(g => g.revenue_usd_bn)
        const totalRev = geoRevenues.reduce((a, b) => a + b, 0)
        const geoColors = details.geographicBreakdown.map(g => {
            const tier = g.geography.tier || ''
            if (tier.includes('tier1')) return CHART_COLORS.tiers[0]
            if (tier.includes('tier2')) return CHART_COLORS.tiers[1]
            if (tier.includes('tier3')) return CHART_COLORS.tiers[2]
            return CHART_COLORS.verticals[0]
        })

        createDoughnutChart('vertical-geo-chart', geoLabels, geoRevenues, geoColors, `$${totalRev.toFixed(0)}B`)
    }

    // Digitizing sectors treemap
    if (verticalId === 'digitizing-sectors') {
        initDigitizingCharts()
    }
}

function initDigitizingCharts() {
    const data = getDigitizingSubSectors()
    const sectors = data.sectors

    // Group by McKinsey category for treemap
    const categories = {}
    sectors.forEach(s => {
        const cat = s.mcKinseyCategory
        if (!categories[cat]) categories[cat] = []
        categories[cat].push(s)
    })

    const treemapData = Object.entries(categories).map(([name, subs]) => ({
        name,
        value: parseFloat(subs.reduce((sum, s) => sum + s.kaFY30, 0).toFixed(2)),
        children: subs.map(s => ({
            name: s.name.length > 30 ? s.name.substring(0, 28) + '...' : s.name,
            value: s.kaFY30
        }))
    }))

    createTreemapChart('digitizing-treemap', treemapData, {
        title: '',
        formatter: (params) => {
            if (params.data.children) {
                return `${params.name}\n$${params.value}B`
            }
            return `${params.name}\n$${params.value.toFixed(2)}B`
        }
    })
}
