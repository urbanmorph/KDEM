/**
 * Sources Tab Renderer
 * Displays all data sources with confidence ratings and attribution
 */

export async function renderSourcesTab(appData) {
    try {
        return `
            <div class="sources-tab">
                <div class="tab-header">
                    <h2>📚 Data Sources & References</h2>
                    <p class="tab-subtitle">Complete attribution with confidence ratings for all data in KDEM Strategic Dashboard</p>
                    <p class="last-updated">Last Updated: February 5, 2026</p>
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
                    ${renderKDEMSources()}
                </div>

                <div class="sources-section mt-3">
                    <h4>Karnataka Government Policies</h4>
                    ${renderGovernmentPolicies()}
                </div>

                <div class="sources-section mt-3">
                    <h4>Regional Government Data</h4>
                    ${renderRegionalGovernment()}
                </div>

                <!-- Industry Research Reports -->
                <div class="section-header mt-4">
                    <h3>Industry Research Reports</h3>
                </div>

                <div class="sources-section">
                    <h4>GCC Research</h4>
                    ${renderGCCResearch()}
                </div>

                <div class="sources-section mt-3">
                    <h4>Startup & Ecosystem Research</h4>
                    ${renderStartupResearch()}
                </div>

                <div class="sources-section mt-3">
                    <h4>Competitive Intelligence</h4>
                    ${renderCompetitiveIntel()}
                </div>

                <!-- Cluster Vision Documents -->
                <div class="section-header mt-4">
                    <h3>Cluster Vision Documents</h3>
                </div>

                <div class="sources-section">
                    ${renderClusterVision()}
                </div>

                <!-- Skilling & Talent Development -->
                <div class="section-header mt-4">
                    <h3>Skilling & Talent Development</h3>
                </div>

                <div class="sources-section">
                    ${renderSkillingData()}
                </div>

                <!-- News & Event Coverage -->
                <div class="section-header mt-4">
                    <h3>News & Event Coverage</h3>
                </div>

                <div class="sources-section">
                    ${renderNewsEvents()}
                </div>

                <!-- International Benchmarks -->
                <div class="section-header mt-4">
                    <h3>International Benchmarks</h3>
                </div>

                <div class="sources-section">
                    ${renderInternationalBenchmarks()}
                </div>

                <!-- Competitor State Policies -->
                <div class="section-header mt-4">
                    <h3>Competitor State Policies</h3>
                </div>

                <div class="sources-section">
                    ${renderCompetitorPolicies()}
                </div>

                <!-- Data Gaps & Verification -->
                <div class="section-header mt-4">
                    <h3>Data Quality & Transparency</h3>
                </div>

                <div class="data-quality-grid">
                    ${renderDataGaps()}
                    ${renderUpdateSchedule()}
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
        {
            rating: '⭐⭐⭐⭐⭐',
            level: 'Verified Official',
            verification: 'Third-party government/institution data',
            treatment: 'No disclaimer'
        },
        {
            rating: '⭐⭐⭐⭐',
            level: 'High Confidence',
            verification: 'Cross-validated from multiple sources',
            treatment: '"Validated" tag'
        },
        {
            rating: '⭐⭐⭐',
            level: 'Moderate Confidence',
            verification: 'Reputable research/industry reports',
            treatment: 'Source cited'
        },
        {
            rating: '⭐⭐',
            level: 'Self-Reported',
            verification: 'Company/cluster self-reporting',
            treatment: '"Reported" tag'
        },
        {
            rating: '⭐',
            level: 'Estimated/Projected',
            verification: 'Calculated from methodology',
            treatment: '"Estimated" tag'
        }
    ]

    return `
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
                        <td><span class="confidence-badge">${f.rating}</span></td>
                        <td><strong>${f.level}</strong></td>
                        <td>${f.verification}</td>
                        <td>${f.treatment}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `
}

function renderKDEMSources() {
    const sources = [
        { id: 1, name: 'KDEM Official Website', link: 'https://karnatakadigital.in', data: 'Mission, verticals, program descriptions', confidence: '⭐⭐⭐⭐⭐', verified: 'Jan 2026' },
        { id: 2, name: 'Beyond Bengaluru Initiative', link: 'https://beyondbengaluru.com', data: '126 companies, 5,500+ jobs metrics', confidence: '⭐⭐⭐⭐', verified: 'Jan 2026' },
        { id: 3, name: 'Bengaluru Tech Summit', link: 'https://bengalurutechsummit.com', data: 'BTS 2025: 50,000+ visitors, 60+ countries', confidence: '⭐⭐⭐⭐⭐', verified: 'Nov 2025' }
    ]

    return renderSourceTable(sources)
}

function renderGovernmentPolicies() {
    const sources = [
        { id: 4, name: 'Karnataka IT-BT Policy 2025-2030', data: '₹445.5 Cr allocation, 30,000 startup target', confidence: '⭐⭐⭐⭐⭐', notes: 'Cabinet approved Dec 2025' },
        { id: 5, name: 'Karnataka Startup Policy 2025-2030', data: '25,000 startup target, 5% GDP goal', confidence: '⭐⭐⭐⭐⭐', notes: 'Official policy' },
        { id: 6, name: 'Karnataka GCC Policy 2024', data: '500 GCC target, 3.5 lakh jobs, $50B output', confidence: '⭐⭐⭐⭐⭐', notes: 'Notified policy' },
        { id: 7, name: 'Karnataka Space Tech Policy 2025', data: 'Policy launch announcement', confidence: '⭐⭐⭐⭐⭐', notes: 'BTS 2025' },
        { id: 8, name: 'Karnataka ER&D Policy 2021', data: '40% of India\'s ER&D revenue', confidence: '⭐⭐⭐⭐', notes: 'Official policy' },
        { id: 9, name: 'Karnataka Aerospace & Defence Policy 2022-27', data: '60-65% of India\'s aerospace', confidence: '⭐⭐⭐⭐⭐', notes: 'Official policy' }
    ]

    return renderSourceTable(sources)
}

function renderRegionalGovernment() {
    const sources = [
        { id: 10, name: 'STPI Karnataka', link: 'https://bengaluru.stpi.in', data: 'IT/ITES exports (45% share)', confidence: '⭐⭐⭐⭐⭐', notes: 'Official quarterly data' },
        { id: 11, name: 'DPIIT', data: 'Karnataka #1 state, 16,000+ startups', confidence: '⭐⭐⭐⭐⭐', notes: 'Government of India' },
        { id: 12, name: 'Karnataka Economic Survey', data: 'Digital economy ~$110B estimate', confidence: '⭐⭐⭐⭐', notes: 'State economic data' }
    ]

    return renderSourceTable(sources)
}

function renderGCCResearch() {
    const sources = [
        { id: 13, name: 'Zinnov "5 Shifts Defining India\'s GCC Story in 2025"', data: '1,800+ GCCs, 2M workforce, Karnataka 880+ centers', confidence: '⭐⭐⭐⭐', date: 'Nov 2025' },
        { id: 14, name: 'Zinnov-NASSCOM Mid-market GCC Report 2025', data: '480+ mid-market centers, 27% of India GCCs', confidence: '⭐⭐⭐⭐', date: '2025' },
        { id: 15, name: 'Zinnov-KDEM Karnataka Mid-market Report', data: 'Nearly half of India\'s mid-market GCCs in Karnataka', confidence: '⭐⭐⭐⭐', date: '2025' },
        { id: 16, name: 'Zinnov Mega GCC Report 2025', data: '5% of GCCs = 50% workforce', confidence: '⭐⭐⭐⭐', date: '2025' },
        { id: 17, name: 'Zinnov Tier-I City Analysis 2025', data: 'Bengaluru 880+, Hyderabad 355+', confidence: '⭐⭐⭐⭐', date: '2025' },
        { id: 18, name: 'NASSCOM GCC State Policies Analysis', data: 'Policy comparison across states', confidence: '⭐⭐⭐⭐', date: 'Nov 2025' },
        { id: 19, name: 'STPI GCC Policy Report', data: '$50B→$110B market projection (14% CAGR)', confidence: '⭐⭐⭐⭐', date: '2025' }
    ]

    return renderSourceTable(sources)
}

function renderStartupResearch() {
    const sources = [
        { id: 20, name: 'Startup Genome - Bengaluru Karnataka', data: 'Ecosystem health metrics', confidence: '⭐⭐⭐⭐', date: '2025' },
        { id: 21, name: 'Tracxn', data: 'Startup funding, unicorn tracking', confidence: '⭐⭐⭐', notes: 'Subscription data' },
        { id: 22, name: 'Inc42', data: 'Startup news, BTS coverage', confidence: '⭐⭐⭐', notes: 'News source' }
    ]

    return renderSourceTable(sources)
}

function renderCompetitiveIntel() {
    const sources = [
        { id: 23, name: 'Outlook Business Year Ender 2025', data: 'Karnataka vs Telangana cost comparison', confidence: '⭐⭐⭐⭐', date: 'Dec 2025' },
        { id: 24, name: 'Dun & Bradstreet Hyderabad 2025', data: 'Hyderabad 355+ GCCs, 70 greenfield', confidence: '⭐⭐⭐⭐', date: '2025' }
    ]

    return renderSourceTable(sources)
}

function renderClusterVision() {
    const sources = [
        { id: 25, name: 'KDEM Vision Document 2025 - Mysuru Chapter', data: '$10B by 2030, 150,000 jobs, 2,800 startups', confidence: '⭐⭐⭐⭐', date: 'Jul 2025' },
        { id: 26, name: 'Draft Mangaluru Cluster Vision Document 2025', data: '₹40,000 Cr by 2034, 200,000 jobs, 4,000 startups', confidence: '⭐⭐⭐⭐', date: 'Sep 2025' },
        { id: 27, name: 'HDB Cluster Vision Report 2025-2030', data: 'EMC 2.0, industrial corridor', confidence: '⭐⭐⭐⭐', date: '2025' },
        { id: 28, name: 'Silicon Beach Skills Report (Xpheno-KDEM)', link: 'https://newskarnataka.com/karnataka/mangaluru/mangaluru-has-potential-to-be-the-next-bengaluru-says-priyank-kharge/25092025', data: '3.1 lakh talent, 90,000 experienced, 15,000+ grads/year', confidence: '⭐⭐⭐⭐', date: 'Sep 2025' },
        { id: 29, name: 'KDEM-SBP-Deloitte Mangaluru Data Center Study', data: '1 GW+ feasibility, cost comparisons', confidence: '⭐⭐⭐⭐', date: '2025' },
        { id: 30, name: 'Bengaluru Innovation Report 2025', data: '2.5M+ tech workforce, 600K AI/ML professionals, ecosystem metrics', confidence: '⭐⭐⭐⭐⭐', date: '2025' }
    ]

    return renderSourceTable(sources)
}

function renderSkillingData() {
    const sources = [
        { id: 31, name: 'Karnataka Skill Development Policy 2025-32', link: 'https://thesouthfirst.com/karnataka/karnataka-government-approves-skill-development-policy-2025-32/', data: '₹4,432.5 Cr investment, 3M youth target, digital & AI focus', confidence: '⭐⭐⭐⭐⭐', date: 'Jan 2026' },
        { id: 32, name: 'Bengaluru Skill Summit 2025 (KDEM Knowledge Partner)', link: 'https://bengaluruskillsummit.com/', data: 'Skills & Innovation event, industry partnerships', confidence: '⭐⭐⭐⭐⭐', date: 'Feb 2026' },
        { id: 33, name: 'Silicon Beach Skills Report - Full Report (Xpheno-KDEM)', link: 'https://newskarnataka.com/karnataka/mangaluru/mangaluru-has-potential-to-be-the-next-bengaluru-says-priyank-kharge/25092025', data: 'Mangaluru-Udupi region talent depth analysis', confidence: '⭐⭐⭐⭐', date: 'Sep 2025' },
        { id: 34, name: 'ARTPARK (IISc) Skilling Data', data: '9,000+ skilled, 23 startups, ₹750 Cr valuation, 32 patents', confidence: '⭐⭐⭐⭐', notes: 'From Bengaluru Innovation Report' },
        { id: 35, name: 'C-CAMP Agri Innovation Skilling', data: '90+ startups, 5 lakh farmers impacted, 42 patents', confidence: '⭐⭐⭐⭐', notes: 'From Bengaluru Innovation Report' },
        { id: 36, name: 'Bangalore Bioinnovation Centre', data: '486+ startups, 6,000+ jobs, 71 IPR/patents', confidence: '⭐⭐⭐⭐', notes: 'From Bengaluru Innovation Report' },
        { id: 37, name: 'ELEVATE Program Skilling Metrics', data: '1,227+ startups supported, ₹280+ Cr funding, 25% women-led', confidence: '⭐⭐⭐⭐', notes: 'From Bengaluru Innovation Report' },
        { id: 38, name: 'Karnataka Positive Talent Balance Report (Xpheno)', link: 'https://yourstory.com/enterprise-story/2025/06/karnataka-wide-talent-pool-for-gccs-xpheno-report', data: 'Karnataka #1 state in positive talent balance', confidence: '⭐⭐⭐⭐', date: 'Nov 2024' }
    ]

    return renderSourceTable(sources)
}

function renderNewsEvents() {
    const sources = [
        { id: 38, name: 'TheHansIndia - Mysuru Big Tech Show', data: '80+ startups, 1,100+ delegates', confidence: '⭐⭐⭐', date: 'Jul 2025' },
        { id: 39, name: 'Daijiworld - Mangaluru Technovanza', data: 'Vision document unveiling, metrics', confidence: '⭐⭐⭐', date: 'Sep 2025' },
        { id: 40, name: 'Inc42 - BTS 2025 Coverage', data: 'DeepTech, AI focus', confidence: '⭐⭐⭐', date: 'Nov 2025' }
    ]

    return renderSourceTable(sources)
}

function renderInternationalBenchmarks() {
    const sources = [
        { id: 41, name: 'Singapore Digital Economy Report 2025 (IMDA)', data: '$128.1B (18.6% GDP), 12% CAGR', confidence: '⭐⭐⭐⭐⭐', date: 'Oct 2025' },
        { id: 42, name: 'e-Conomy SEA 2025 (Google/Temasek/Bain)', data: '$300B+ GMV, AI adoption', confidence: '⭐⭐⭐⭐', date: 'Nov 2025' },
        { id: 43, name: 'ASEAN Digital Economy Framework Agreement', data: '$2T regional target by 2030', confidence: '⭐⭐⭐⭐⭐', date: '2025' },
        { id: 44, name: 'APEC Internet & Digital Economy Roadmap', data: '11 key focus areas', confidence: '⭐⭐⭐⭐', date: '2017-2025' },
        { id: 45, name: 'World Bank Digital Economy Framework', data: '5 foundations framework', confidence: '⭐⭐⭐⭐⭐', date: '2016-2024' },
        { id: 46, name: 'Singapore Services & DE Technology Roadmap (IMDA)', data: 'Services 4.0, 9 tech trends', confidence: '⭐⭐⭐⭐', date: '2019-2025' }
    ]

    return renderSourceTable(sources)
}

function renderCompetitorPolicies() {
    const sources = [
        { id: 47, name: 'Gujarat GCC Policy 2025-30', data: '250+ GCCs, ₹10,000 Cr, 50,000 jobs', confidence: '⭐⭐⭐⭐⭐', date: '2025' },
        { id: 48, name: 'Odisha GCC Policy 2025', data: '5 hubs, ₹1,000 Cr, 50,000 jobs', confidence: '⭐⭐⭐⭐⭐', date: '2025' },
        { id: 49, name: 'Telangana ICT Policy & TASK Program', data: 'Skilling, ease of business', confidence: '⭐⭐⭐⭐', notes: 'Ongoing' },
        { id: 50, name: 'Maharashtra GCC Policy (Draft)', data: 'Under development', confidence: '⭐⭐⭐', date: '2025' },
        { id: 51, name: 'Tamil Nadu GCC Push', data: 'Coimbatore, Madurai, Tiruchirappalli', confidence: '⭐⭐⭐', date: '2025' },
        { id: 52, name: 'Union Budget 2025-26 GCC Framework', data: 'National guidance framework', confidence: '⭐⭐⭐⭐⭐', date: 'Feb 2025' }
    ]

    return renderSourceTable(sources)
}

function renderSourceTable(sources) {
    return `
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
                            ${s.link ? `<a href="${s.link}" target="_blank" class="source-link">${s.name} →</a>` : `<strong>${s.name}</strong>`}
                        </td>
                        <td>${s.data}</td>
                        <td><span class="confidence-badge">${s.confidence}</span></td>
                        <td>${s.date || s.notes || s.verified || '-'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `
}

function renderDataGaps() {
    const gaps = [
        { gap: 'Company-level verification', current: 'Self-reported', action: 'Registry system + EPFO linkage', priority: 'HIGH' },
        { gap: 'Event conversion tracking', current: 'None', action: 'Event CRM implementation', priority: 'HIGH' },
        { gap: 'Cluster progress validation', current: 'Informal', action: 'Standardized templates', priority: 'HIGH' },
        { gap: 'ELEVATE alumni outcomes', current: 'Partial', action: 'Alumni tracking system', priority: 'MEDIUM' },
        { gap: 'Competitive cost data', current: 'Ad-hoc', action: 'Regular benchmarking', priority: 'MEDIUM' },
        { gap: 'Digital economy methodology', current: 'Estimated', action: 'Statistical office partnership', priority: 'LOW' }
    ]

    return `
        <div class="data-gaps-card">
            <h4>Data Gaps Identified</h4>
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
    `
}

function renderUpdateSchedule() {
    const schedule = [
        { category: 'Vision Progress', frequency: 'Quarterly', next: 'April 2026', owner: 'Strategy' },
        { category: 'Beyond Bengaluru Metrics', frequency: 'Monthly', next: 'Feb 2026', owner: 'Clusters' },
        { category: 'Program Data (ELEVATE/LEAP)', frequency: 'Quarterly', next: 'April 2026', owner: 'Innovation' },
        { category: 'Competitive Intelligence', frequency: 'Quarterly', next: 'April 2026', owner: 'Strategy' },
        { category: 'External Partnerships Data', frequency: 'Monthly', next: 'Feb 2026', owner: 'Data Team' },
        { category: 'International Benchmarks', frequency: 'Semi-annually', next: 'July 2026', owner: 'Strategy' }
    ]

    return `
        <div class="update-schedule-card">
            <h4>Update Schedule</h4>
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
    `
}

function renderContactInfo() {
    return `
        <div class="contact-card">
            <h4>Karnataka Digital Economy Mission</h4>
            <p><strong>Department of Electronics, IT, BT & S&T</strong><br>
            Government of Karnataka</p>
            <ul>
                <li>Website: <a href="https://karnatakadigital.in" target="_blank">karnatakadigital.in →</a></li>
                <li>Dashboard: <a href="http://localhost:3000/KDEM/" target="_blank">KDEM Strategic Dashboard v3.0</a></li>
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
