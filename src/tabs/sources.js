/**
 * Sources Tab Renderer
 * Displays all data sources with confidence ratings and attribution
 * All data from referenceData service - no hardcoded values
 */

import { getAllSources, getDataGaps, getUpdateSchedule } from '../services/referenceData.js'
import { renderConfidenceStars } from '../utils/components.js'

export async function renderSourcesTab(appData) {
    try {
        const allSources = getAllSources()
        const dataGaps = getDataGaps()
        const updateSchedule = getUpdateSchedule()

        return `
            <div class="sources-tab">
                <div class="tab-header">
                    <h2>Data Sources & References</h2>
                    <p class="tab-subtitle">Complete attribution with confidence ratings for all data in KDEM Strategic Dashboard</p>
                    <p class="last-updated">Last Updated: February 9, 2026</p>
                </div>

                <!-- Confidence Rating Framework -->
                <div class="section-header">
                    <h3>Source Confidence Rating Framework</h3>
                </div>

                <div class="confidence-framework">
                    ${renderConfidenceFramework()}
                </div>

                <!-- Official Government Sources -->
                <div class="section-header mt-4">
                    <h3>Official Government Sources</h3>
                </div>

                <div class="sources-section">
                    <h4>KDEM Official Publications</h4>
                    ${renderSourceTable(allSources.kdem)}
                </div>

                <div class="sources-section mt-3">
                    <h4>Karnataka Government Policies</h4>
                    ${renderSourceTable(allSources.government)}
                </div>

                <div class="sources-section mt-3">
                    <h4>Regional Government Data</h4>
                    ${renderSourceTable(allSources.regional)}
                </div>

                <!-- Industry Research Reports -->
                <div class="section-header mt-4">
                    <h3>Industry Research Reports</h3>
                </div>

                <div class="sources-section">
                    <h4>GCC Research</h4>
                    ${renderSourceTable(allSources.gcc)}
                </div>

                <div class="sources-section mt-3">
                    <h4>Startup & Ecosystem Research</h4>
                    ${renderSourceTable(allSources.startup)}
                </div>

                <!-- Industry Data & Projections -->
                <div class="section-header mt-4">
                    <h3>Industry Data & Growth Projections</h3>
                    <p>Sources used for per-vertical CAGR projections and the $329B FY 2031-32 target</p>
                </div>

                <div class="sources-section">
                    ${renderSourceTable(allSources.projections)}
                </div>

                <!-- Cluster Vision Documents -->
                <div class="section-header mt-4">
                    <h3>Cluster Vision Documents</h3>
                </div>

                <div class="sources-section">
                    ${renderSourceTable(allSources.cluster)}
                </div>

                <!-- Skilling & Talent Development -->
                <div class="section-header mt-4">
                    <h3>Skilling & Talent Development</h3>
                </div>

                <div class="sources-section">
                    ${renderSourceTable(allSources.skilling)}
                </div>

                <!-- International Benchmarks -->
                <div class="section-header mt-4">
                    <h3>International Benchmarks</h3>
                </div>

                <div class="sources-section">
                    ${renderSourceTable(allSources.international)}
                </div>

                <!-- Competitor State Policies -->
                <div class="section-header mt-4">
                    <h3>Competitor State Policies</h3>
                </div>

                <div class="sources-section">
                    ${renderSourceTable(allSources.competitor)}
                </div>

                <!-- Data Gaps & Verification -->
                <div class="section-header mt-4">
                    <h3>Data Quality & Transparency</h3>
                </div>

                <div class="data-quality-grid">
                    ${renderDataGapsTable(dataGaps)}
                    ${renderUpdateScheduleTable(updateSchedule)}
                </div>

                <!-- Contact Information -->
                <div class="section-header mt-4">
                    <h3>Contact for Data Inquiries</h3>
                </div>

                <div class="contact-info">
                    ${renderContactInfo()}
                </div>
            </div>
        `
    } catch (error) {
        console.error('Error rendering sources tab:', error)
        return `
            <div class="error-message">
                <h3>Unable to load sources data</h3>
                <p>${error.message}</p>
            </div>
        `
    }
}

function renderConfidenceFramework() {
    const framework = [
        { stars: 5, level: 'Verified Official', verification: 'Third-party government/institution data', treatment: 'No disclaimer' },
        { stars: 4, level: 'High Confidence', verification: 'Cross-validated from multiple sources', treatment: '"Validated" tag' },
        { stars: 3, level: 'Moderate Confidence', verification: 'Reputable research/industry reports', treatment: 'Source cited' },
        { stars: 2, level: 'Self-Reported', verification: 'Company/cluster self-reporting', treatment: '"Reported" tag' },
        { stars: 1, level: 'Estimated/Projected', verification: 'Calculated from methodology', treatment: '"Estimated" tag' }
    ]

    return `
        <div class="table-scroll-wrapper">
            <table class="data-table confidence-table">
                <thead>
                    <tr>
                        <th>Rating</th>
                        <th>Definition</th>
                        <th>Verification Level</th>
                        <th>Dashboard Treatment</th>
                    </tr>
                </thead>
                <tbody>
                    ${framework.map(f => `
                        <tr>
                            <td><span class="confidence-badge">${renderConfidenceStars(f.stars)}</span></td>
                            <td><strong>${f.level}</strong></td>
                            <td>${f.verification}</td>
                            <td>${f.treatment}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `
}

function renderSourceTable(sources) {
    if (!sources || sources.length === 0) {
        return `<p class="no-data-message">No sources in this category.</p>`
    }

    return `
        <div class="table-scroll-wrapper">
            <table class="data-table sources-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Source</th>
                        <th>Data Used</th>
                        <th>Confidence</th>
                        <th>Date/Notes</th>
                    </tr>
                </thead>
                <tbody>
                    ${sources.map(s => `
                        <tr>
                            <td>${s.id}</td>
                            <td>
                                ${s.link ? `<a href="${s.link}" target="_blank" class="source-link">${s.name}</a>` : `<strong>${s.name}</strong>`}
                            </td>
                            <td>${s.data}</td>
                            <td>${renderConfidenceStars(s.confidence)}</td>
                            <td>${s.date || s.notes || s.verified || '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `
}

function renderDataGapsTable(gaps) {
    return `
        <div class="data-gaps-card">
            <h4>Data Gaps Identified</h4>
            <div class="table-scroll-wrapper">
                <table class="data-table gaps-table">
                    <thead>
                        <tr>
                            <th>Gap</th>
                            <th>Current State</th>
                            <th>Required Action</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${gaps.map(g => `
                            <tr>
                                <td>${g.gap}</td>
                                <td>${g.current}</td>
                                <td>${g.action}</td>
                                <td><span class="priority-badge priority-${g.priority.toLowerCase()}">${g.priority}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `
}

function renderUpdateScheduleTable(schedule) {
    return `
        <div class="update-schedule-card">
            <h4>Update Schedule</h4>
            <div class="table-scroll-wrapper">
                <table class="data-table schedule-table">
                    <thead>
                        <tr>
                            <th>Data Category</th>
                            <th>Frequency</th>
                            <th>Next Update</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${schedule.map(s => `
                            <tr>
                                <td>${s.category}</td>
                                <td>${s.frequency}</td>
                                <td>${s.next}</td>
                                <td>${s.owner}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `
}

function renderContactInfo() {
    return `
        <div class="contact-card">
            <h4>Karnataka Digital Economy Mission</h4>
            <p><strong>Department of Electronics, IT, BT & S&T</strong><br>
            Government of Karnataka</p>
            <ul>
                <li>Website: <a href="https://karnatakadigital.in" target="_blank">karnatakadigital.in</a></li>
                <li>Dashboard: KDEM Strategic Dashboard v1.0</li>
            </ul>
            <div class="transparency-commitment">
                <h5>Data Transparency Commitment</h5>
                <p>Urban Morph is committed to maintaining the highest standards of data accuracy and transparency.
                All data sources are attributed with confidence ratings, and we continuously work to verify and update
                our data. For inquiries, corrections, or additional data sources, please contact the KDEM team.</p>
            </div>
        </div>
    `
}
