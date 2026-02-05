/**
 * Factors of Production Tab Renderer
 * Shows Land, Labour, Capital, and Organisation metrics
 */

import { fetchFactorSummary } from '../services/dataService.js'

export async function renderFactorsTab(appData) {
    try {
        const factorSummary = await fetchFactorSummary()

        return `
            <div class="factors-tab">
                <div class="tab-header">
                    <h2>Factors of Production</h2>
                    <p class="tab-subtitle">Land, Labour, Capital, and Organisation - The four pillars of economic development</p>
                </div>

                <!-- Factors Overview -->
                <div class="factors-grid">
                    ${appData.factors.map(factor => renderFactorCard(factor, factorSummary)).join('')}
                </div>

                <!-- Factor Relationships -->
                <div class="section-header mt-4">
                    <h3>Cross-Factor Dependencies</h3>
                    <p>How factors of production interact and depend on each other</p>
                </div>

                <div class="dependencies-info">
                    ${renderDependencies()}
                </div>

                <!-- Conversion Ratios -->
                <div class="section-header mt-4">
                    <h3>Industry-Standard Conversion Ratios</h3>
                    <p>How revenue translates to employment, land requirements, and capital needs</p>
                </div>

                <div class="conversion-info">
                    ${renderConversionInfo()}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering factors tab:', error)
        return `
            <div class="error-message">
                <h3>Unable to load factors data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderFactorCard(factor, summary) {
    const icons = {
        'land': '🏗️',
        'labour': '👥',
        'capital': '💼',
        'organisation': '⚙️'
    }

    const descriptions = {
        'land': 'Physical infrastructure and real estate requirements for digital economy growth. Includes office space, data centers, and manufacturing facilities.',
        'labour': 'Human resources and employment across all verticals. Includes software engineers, manufacturing workers, and support staff.',
        'capital': 'Financial investment required for infrastructure, equipment, and operational expenses. Measured in INR Crores.',
        'organisation': 'Institutional readiness and governance structures. Includes policy framework, regulatory environment, and administrative capacity.'
    }

    return `
        <div class="factor-card">
            <div class="factor-icon">${icons[factor.id] || '📊'}</div>
            <h3>${factor.name}</h3>
            <p class="factor-description">${descriptions[factor.id]}</p>
            <div class="factor-metrics">
                <div class="factor-metric">
                    <span class="label">Primary Metrics:</span>
                    <span class="value">${factor.metrics ? factor.metrics.join(', ') : 'N/A'}</span>
                </div>
            </div>
        </div>
    `
}

function renderDependencies() {
    return `
        <div class="dependencies-grid">
            <div class="dependency-card">
                <h4>Revenue → Labour</h4>
                <p>Revenue targets drive employment requirements based on industry-specific ratios (e.g., 20 employees per $1M USD in IT Services).</p>
            </div>
            <div class="dependency-card">
                <h4>Labour → Land</h4>
                <p>Employment numbers determine infrastructure needs. Average 200 sq ft per employee including common areas and amenities.</p>
            </div>
            <div class="dependency-card">
                <h4>Land → Capital</h4>
                <p>Land acquisition and infrastructure development require capital investment. Costs vary by geography (Bengaluru 20% premium).</p>
            </div>
            <div class="dependency-card">
                <h4>Organisation → All Factors</h4>
                <p>Institutional readiness enables efficient utilization of land, labour, and capital. Policy framework impacts all factor productivity.</p>
            </div>
        </div>
    `
}

function renderConversionInfo() {
    return `
        <div class="conversion-table">
            <div class="table-scroll-wrapper">
                <table class="data-table">
                <thead>
                    <tr>
                        <th>Vertical</th>
                        <th>From Metric</th>
                        <th>To Metric</th>
                        <th>Ratio</th>
                        <th>Unit</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>IT Exports</td>
                        <td>Revenue</td>
                        <td>Employment</td>
                        <td>20</td>
                        <td>employees per $1M USD</td>
                        <td>NASSCOM</td>
                    </tr>
                    <tr>
                        <td>IT Domestic</td>
                        <td>Revenue</td>
                        <td>Employment</td>
                        <td>25</td>
                        <td>employees per $1M USD</td>
                        <td>NASSCOM</td>
                    </tr>
                    <tr>
                        <td>ESDM</td>
                        <td>Revenue</td>
                        <td>Employment</td>
                        <td>100</td>
                        <td>employees per $1M USD</td>
                        <td>ICEA</td>
                    </tr>
                    <tr>
                        <td>All Sectors</td>
                        <td>Employment</td>
                        <td>Land</td>
                        <td>200</td>
                        <td>sq ft per employee</td>
                        <td>Industry Standard</td>
                    </tr>
                    <tr>
                        <td>Bengaluru</td>
                        <td>Land Cost</td>
                        <td>Capital</td>
                        <td>1.20x</td>
                        <td>multiplier</td>
                        <td>Real Estate Premium</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <p class="conversion-note">
                <strong>Note:</strong> These conversion ratios are based on industry benchmarks and are used to auto-calculate factor targets when revenue targets are set in the admin interface.
            </p>
        </div>
    `
}
