/**
 * Reference Data Service
 *
 * Centralized store for all reference/informational data used across tabs.
 * This module serves as the single source of truth for data that is not yet
 * stored in Supabase tables. When these are migrated to the database,
 * each function simply needs to be updated to fetch from Supabase instead.
 *
 * Data sources are attributed with confidence ratings per the KDEM framework.
 */

// ============================================================
// STARTUP ECOSYSTEM DATA
// Source: Bengaluru Innovation Report 2025 (⭐⭐⭐⭐⭐)
// ============================================================

export function getStartupMetrics() {
    return [
        { icon: '🚀', value: '2,443', label: 'Active Funded Startups (2010-2025 YTD)', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { icon: '🏢', value: '140K+', label: 'Tech Startups Founded in India Since 2010', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { icon: '🦄', value: '53', label: 'Unicorns in Bengaluru', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { icon: '🌟', value: '183', label: 'Soonicorns (39% of India)', source: 'Bengaluru Innovation Report 2025', confidence: 5 }
    ]
}

export function getPolicies() {
    return [
        { name: 'Karnataka IT-BT Policy 2025-2030', status: 'Cabinet Approved (Dec 2025)', confidence: 5, allocation: '₹445.5 Crore', targets: '30,000 startups', highlights: 'Focus on emerging tech, GCCs, and innovation' },
        { name: 'Karnataka Startup Policy 2025-2030', status: 'Official Policy', confidence: 5, targets: '25,000 startups enabled', goal: '5% GDP contribution', funds: 'Fund-of-Funds: ₹300 Cr | DeepTech: ₹100 Cr | Beyond Bengaluru: ₹75 Cr' },
        { name: 'Karnataka GCC Policy 2024', status: 'Notified Policy', confidence: 5, target: '500 new GCCs by 2029 (double current)', jobs: '3.5 lakh jobs', output: '$50B economic output' },
        { name: 'Karnataka Space Tech Policy 2025', status: 'Launched at BTS 2025', confidence: 5, focus: 'Space technology ecosystem development', note: 'New policy launched at Bengaluru Tech Summit 2025' },
        { name: 'Karnataka Skill Development Policy 2025-32', status: 'Approved Jan 2026', confidence: 5, investment: '₹4,432.5 Crore', target: '3M youth employability', goal: 'Power $1 trillion economy by 2032' }
    ]
}

export function getEcosystemInfra() {
    return [
        { title: 'Centres of Excellence (CoEs)', icon: '🏢', value: '16', description: 'Specialized centers for AI, Robotics, Biotech, Agritech, and emerging technologies', examples: 'ARTPARK (IISc), C-CAMP, Bangalore Bioinnovation Centre', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { title: 'Technology Business Incubators (TBIs)', icon: '🚀', value: '50+', description: 'Startup incubators providing mentorship, funding, and infrastructure', coverage: '50 new NAIN 2.0 innovation centres planned', source: 'Karnataka Startup Policy 2025-2030', confidence: 5 },
        { title: 'Biotech Companies', icon: '🧬', value: '300+', description: 'Biotech and life sciences companies in Karnataka', source: 'Bengaluru Innovation Report 2025', confidence: 4 },
        { title: 'GCC Units', icon: '🏢', value: '875+', description: 'Global Capability Centres in Bengaluru (40% of India\'s GCCs)', coverage: 'Double GCC count by 2029', source: 'Bengaluru Innovation Report 2025', confidence: 5 }
    ]
}

export function getInnovationMetrics() {
    return [
        { category: 'Patents & Research', icon: '📜', stats: ['Global patents metric: 9/10 (comparable to Silicon Valley & Tokyo)', 'Computer Science patents (2020-2023): 503', 'Electronics patents: 473', 'Communication patents: 441'], source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { category: 'DeepTech Innovation', icon: '🔬', stats: ['Companies founded (2010-2025): 861', 'Companies funded: 506', 'Total funding: $2.8B (highest in India)'], source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { category: 'AI Leadership', icon: '🤖', stats: ['Ranked #5 among Top 50 global AI cities', '58% of India\'s AI startup funding', '~$1.5B in AI funding since 2020', 'Application-layer AI: $1.2B+ funding'], source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { category: 'PhD Talent Pool', icon: '🎓', stats: ['100K+ PhD holders', 'Strong academic-industry collaboration', 'Premier institutions: IISc, IITs, NITs'], source: 'Bengaluru Innovation Report 2025', confidence: 4 }
    ]
}

export function getGlobalRankings() {
    return [
        { rank: '#1', metric: 'Fastest Growing City Globally', description: 'Projected real GDP growth leader (next 15 years)', growth: '8.5% annual avg real GDP growth (2019-2035)', badge: 'gold', source: 'Oxford Economics / Bengaluru Innovation Report 2025', confidence: 5 },
        { rank: '#1', metric: 'Unicorns to GDP per Capita Ratio', description: 'Highest ratio globally', note: 'Bengaluru: 3.3 unicorns per million population', badge: 'gold', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { rank: '#4', metric: 'High-Growth Companies (Asian Cities)', description: 'Among Asian cities for presence of high-growth companies', badge: 'silver', source: 'Bengaluru Innovation Report 2025', confidence: 4 },
        { rank: '#5', metric: 'Global AI City', description: 'Among Top 50 global AI cities', badge: 'bronze', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { rank: '#5', metric: 'Largest Unicorn Hub Globally', description: 'After Bay Area, New York, Beijing, London', unicorns: '53 unicorns, $191.8B valuation', badge: 'bronze', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { rank: '#14', metric: 'GSER 2025 Rank', description: 'Global Startup Ecosystem Ranking (up from #21 in 2024)', improvement: '↑7 positions YoY', badge: 'badge', source: 'Startup Genome GSER 2025', confidence: 5 }
    ]
}

export function getClusterEcosystems() {
    return [
        { name: 'Mysuru', vision: '$10B by 2030', startups: '2,800 startups target', jobs: '150,000 jobs', events: 'Mysuru Big Tech Show: 80+ startups, 1,100+ delegates', status: 'Vision document released July 2025', source: 'KDEM Vision Document 2025 - Mysuru Chapter', confidence: 4 },
        { name: 'Mangaluru (Silicon Beach)', vision: '₹40,000 Cr by 2034', startups: '4,000 startups target', jobs: '200,000 jobs', companies: '250 tech companies', events: 'Technovanza 2025 - Vision document unveiled', status: 'Draft vision document Sep 2025', source: 'Draft Mangaluru Cluster Vision Document 2025', confidence: 4 },
        { name: 'Hubballi-Dharwad', initiative: 'HDB Cluster Vision 2025-2030', focus: 'EMC 2.0, industrial corridor development', infrastructure: '5 lakh+ sq ft co-working space', status: 'Part of Beyond Bengaluru initiative', source: 'HDB Cluster Vision Report 2025-2030', confidence: 4 }
    ]
}

export function getSupportPrograms() {
    return [
        { name: 'ELEVATE (Idea2PoC)', supported: '1,227+ startups', funding: '₹280+ crore committed', womenLed: '25% women-led share', impact: 'Karnataka\'s flagship startup support program', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { name: 'Beyond Bengaluru Initiative', companies: '126 companies', jobs: '5,500+ jobs created', clusters: 'Mysuru, Mangaluru, Hubballi-Dharwad, and more', funding: '₹75 Cr seed fund allocation', source: 'KDEM Internal / beyondbengaluru.com', confidence: 4 },
        { name: 'NAIN 2.0 Innovation Centres', target: '50 new centres', location: 'Beyond Bengaluru clusters', focus: 'Distributed innovation ecosystem', source: 'Karnataka Startup Policy 2025-2030', confidence: 5 },
        { name: 'New TBIs Outside Bengaluru', target: '12 new incubators', goal: 'Strengthen cluster innovation infrastructure', support: 'Mentorship, funding, workspace', source: 'Karnataka Startup Policy 2025-2030', confidence: 5 }
    ]
}

// ============================================================
// CAPITAL & INVESTMENT DATA
// Source: Bengaluru Innovation Report 2025 (⭐⭐⭐⭐⭐)
// ============================================================

export function getVCMetrics() {
    return [
        { icon: '💰', value: '$79B', label: 'Total VC Funding Since 2010', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { icon: '📈', value: '$70.5B', label: 'Last 10 Years (2015-2025)', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { icon: '🎯', value: '46%', label: 'Share of All Indian Startup Funding (Since 2016)', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { icon: '🚀', value: '$38B', label: 'VC Funding (2020-2024)', source: 'Bengaluru Innovation Report 2025', confidence: 5 }
    ]
}

export function getInvestorBase() {
    return [
        { icon: '👤', type: 'Angel Investors', count: '~17,000', role: 'Early-stage individual investors providing seed capital and mentorship', source: 'Bengaluru Innovation Report 2025', confidence: 4 },
        { icon: '💼', type: 'Venture Capital Firms', count: '~450', role: 'Institutional investors across seed, Series A, B, C+ stages', source: 'Bengaluru Innovation Report 2025', confidence: 4 },
        { icon: '🏢', type: 'Corporate Investors', count: '~2,200', role: 'Strategic corporate investors and corporate venture capital arms', source: 'Bengaluru Innovation Report 2025', confidence: 4 }
    ]
}

export function getSectorFunding() {
    return [
        { sector: 'AI & Machine Learning', funding: '~$1.5B', share: '58% of India\'s AI startup funding to Bengaluru', highlight: 'Application-layer AI: $1.2B+', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { sector: 'DeepTech (2010-2025)', companies: '861 founded', funded: '506 funded', funding: '$2.8B', highlight: 'Highest DeepTech funding in India', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { sector: 'Life Sciences', companies: '278 founded', funded: '199 funded', funding: '$694.6M', note: 'Strong biotech and healthtech ecosystem', source: 'Bengaluru Innovation Report 2025', confidence: 4 },
        { sector: 'Seed Stage (2024)', funding: '$268M', growth: '↑ 26% YoY', highlight: 'Healthy early-stage funding environment', source: 'Bengaluru Innovation Report 2025', confidence: 5 }
    ]
}

export function getFundingDistribution() {
    return [
        { city: 'Bengaluru', share: 26, source: 'Bengaluru Innovation Report 2025' },
        { city: 'Delhi NCR', share: 22, source: 'Bengaluru Innovation Report 2025' },
        { city: 'Mumbai', share: 13, source: 'Bengaluru Innovation Report 2025' },
        { city: 'Others', share: 39, source: 'Bengaluru Innovation Report 2025' }
    ]
}

export function getInvestmentTrends() {
    return [
        { title: 'AI Agents as Top Focus', description: '53% of investors rank AI agents as their top focus area for 2025', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { title: 'Fastest Exit Speed', description: 'Average startup exit time: 6.8 years (faster than Silicon Valley 7.9 years, Beijing 8.3 years)', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { title: 'Seed Funding Growth', description: '2024 Seed Funding: $268M (↑ 26% YoY). Healthy early-stage investment climate.', source: 'Bengaluru Innovation Report 2025', confidence: 5 }
    ]
}

// ============================================================
// LAND & INFRASTRUCTURE DATA
// ============================================================

export function getLandMetrics() {
    return [
        { icon: '🏢', value: '200M+ sq ft', label: 'Grade A Office Space (Bengaluru)', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { icon: '💼', value: '150M sq ft', label: 'IT-Owned Office Space', source: 'Bengaluru Innovation Report 2025', confidence: 4 }
    ]
}

export function getClusterInfrastructure() {
    return [
        { name: 'Hubballi-Dharwad', space: '5 lakh+ sq ft', type: 'Shared co-working space', provider: 'HDB (Hubballi-Dharwad Development Board)', source: 'Bengaluru Innovation Report 2025', confidence: 4 },
        { name: 'Mangaluru', space: '3.35 lakh sq ft', type: 'Shared co-working space', provider: 'Part of Beyond Bengaluru initiative', source: 'Bengaluru Innovation Report 2025', confidence: 4 },
        { name: 'Mysuru', target: 'Infrastructure expansion planned', goal: '150,000 jobs by 2030 requires ~30M sq ft', source: 'KDEM Vision Document 2025 - Mysuru Chapter', confidence: 4 }
    ]
}

export function getInfrastructureTypes() {
    return [
        { icon: '🏢', type: 'Grade A Office Space', description: 'Premium commercial office buildings with modern amenities', typical: 'IT/ITES, GCCs, Startups', requirement: '200 sq ft per employee' },
        { icon: '🏭', type: 'Manufacturing Facilities', description: 'ESDM manufacturing, assembly, and testing facilities', typical: 'Electronics, Semiconductors, Hardware', requirement: 'Varies by production type' },
        { icon: '💻', type: 'Co-Working Spaces', description: 'Flexible shared workspaces for startups and small teams', typical: 'Startups, Freelancers, Small businesses', requirement: '100-150 sq ft per person' },
        { icon: '🔬', type: 'R&D Centers', description: 'Research & development facilities with specialized equipment', typical: 'DeepTech, Biotech, Advanced R&D', requirement: '300+ sq ft per researcher' },
        { icon: '🖥️', type: 'Data Centers', description: 'Server facilities with power, cooling, and connectivity', typical: 'Cloud providers, Enterprises', requirement: 'Based on server capacity (kW)', special: 'Mangaluru identified for 1 GW+ capacity' },
        { icon: '🎓', type: 'Incubation Centers', description: 'Startup incubators and accelerators with mentorship', typical: 'Early-stage startups', requirement: '50+ startups per center', examples: 'ARTPARK, C-CAMP, Bangalore Bioinnovation Centre' }
    ]
}

// ============================================================
// LABOR & SKILLING DATA
// ============================================================

export function getLaborMetrics() {
    return [
        { icon: '👥', value: '2.5M+', label: 'Tech Workforce (Bengaluru)', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { icon: '🎓', value: '150K-200K', label: 'New Tech Hires Per Year', source: 'Bengaluru Innovation Report 2025', confidence: 4 },
        { icon: '🤖', value: '600K+', label: 'AI/ML Professionals', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { icon: '🎓', value: '100K+', label: 'PhD Holders', source: 'Bengaluru Innovation Report 2025', confidence: 4 }
    ]
}

export function getTalentPools() {
    return [
        { title: 'Chip Design & Embedded Systems', icon: '💻', value: '350K+', description: 'professionals in chip design, testing & embedded systems', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { title: 'GCC Workforce', icon: '🏢', value: '665K+', description: 'GCC talent in Bengaluru', detail: '48% in high-end roles (Engineering/R&D)', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { title: 'Startup Ecosystem', icon: '🚀', value: '40-45%', description: 'of India\'s tech hiring', source: 'Bengaluru Innovation Report 2025', confidence: 4 }
    ]
}

export function getClusterTalent() {
    return [
        { name: 'Silicon Beach (Mangaluru-Udupi)', totalTalent: '3.1 lakh', experienced: '90,000', fresh: '150,000', gradsPerYear: '15,000+', institutions: 'NITK Surathkal, Manipal Academy', source: 'Silicon Beach Skills Report (Xpheno-KDEM) 2025', confidence: 4, link: 'https://newskarnataka.com/karnataka/mangaluru/mangaluru-has-potential-to-be-the-next-bengaluru-says-priyank-kharge/25092025' },
        { name: 'Mysuru', totalTalent: 'Growing', jobs: '750+ recent jobs', target: '150,000 jobs by 2030', source: 'KDEM Vision Document 2025 - Mysuru Chapter', confidence: 4 },
        { name: 'Hubballi-Dharwad', totalTalent: 'Emerging', target: 'Part of Beyond Bengaluru initiative', source: 'Beyond Bengaluru Initiative', confidence: 3 }
    ]
}

export function getSkillingPrograms() {
    return [
        { name: 'ELEVATE Program', supported: '1,227+ startups', funding: '₹280+ crore', womenLed: '25%', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { name: 'Karnataka Positive Talent Balance', achievement: 'Karnataka ranked #1 state in India', metric: 'Positive talent balance across sectors', source: 'Xpheno Report, Nov 2024', confidence: 4, link: 'https://yourstory.com/enterprise-story/2025/06/karnataka-wide-talent-pool-for-gccs-xpheno-report' },
        { name: 'Bengaluru Skill Summit 2025', role: 'KDEM as Knowledge Partner', focus: 'Skills & Innovation, industry partnerships', source: 'Karnataka Skill Development Corporation', confidence: 5, link: 'https://bengaluruskillsummit.com/' },
        { name: 'Beyond Bengaluru Initiative', companies: '126 companies', jobs: '5,500+ jobs', source: 'KDEM Internal', confidence: 4, link: 'https://beyondbengaluru.com' }
    ]
}

export function getCoESkilling() {
    return [
        { name: 'ARTPARK (IISc)', skilled: '9,000+', startups: '23', valuation: '₹750 Cr', patents: '32', focus: 'AI & Robotics', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { name: 'C-CAMP Agri Innovation', startups: '90+', funding: '₹500+ Cr', patents: '42', impact: '5 lakh+ farmers', focus: 'Agritech & Biotech', source: 'Bengaluru Innovation Report 2025', confidence: 5 },
        { name: 'Bangalore Bioinnovation Centre', startups: '486+', jobs: '6,000+', products: '45+', patents: '71', focus: 'Biotechnology', source: 'Bengaluru Innovation Report 2025', confidence: 5 }
    ]
}

export function getSkillDevelopmentPolicy() {
    return {
        name: 'State Skill Development Policy 2025-32',
        investment: '₹4,432.5 Crore',
        target: '3 Million Youth',
        timeline: '7 Years (2025-2032)',
        pillars: [
            { name: 'Vocational Integration', description: 'Integrating vocational education into mainstream schooling and higher education' },
            { name: 'Digital & AI Skills', description: 'Prioritizing digital technologies and AI-driven tools for training and assessment' },
            { name: 'Industry-Led Training', description: 'Fostering industry partnerships and industry-led training programs' },
            { name: 'Apprenticeship Expansion', description: 'Expanding apprenticeship programs across sectors' }
        ],
        specialInitiatives: [
            'Special interventions for women, persons with disabilities, and marginalized communities',
            'Training 15,000 women in space and technology sectors',
            'Pilot programs in 100 schools and 50 colleges by early 2026',
            'Unified digital portal for training, assessment, and career guidance'
        ],
        strategicGoal: 'Make Karnataka the premier hub for skilled workforce and power the state\'s $1 trillion economy goal by 2032',
        source: 'Karnataka Government',
        approvedDate: 'January 2026',
        link: 'https://thesouthfirst.com/karnataka/karnataka-government-approves-skill-development-policy-2025-32/',
        confidence: 5
    }
}

export function getLaborSources() {
    return [
        { title: 'Bengaluru Innovation Report 2025', confidence: 5, data: 'Tech workforce metrics, AI/ML talent, GCC workforce, startup ecosystem data', link: null },
        { title: 'Silicon Beach Skills Report (Xpheno-KDEM)', confidence: 4, data: 'Mangaluru-Udupi talent pool (3.1 lakh), institutional capacity', link: 'https://newskarnataka.com/karnataka/mangaluru/mangaluru-has-potential-to-be-the-next-bengaluru-says-priyank-kharge/25092025' },
        { title: 'Karnataka Skill Development Policy 2025-32', confidence: 5, data: '₹4,432.5 Cr investment, 3M youth target, digital & AI focus', link: 'https://thesouthfirst.com/karnataka/karnataka-government-approves-skill-development-policy-2025-32/' },
        { title: 'Karnataka Positive Talent Balance Report (Xpheno)', confidence: 4, data: 'Karnataka #1 state ranking in positive talent balance', link: 'https://yourstory.com/enterprise-story/2025/06/karnataka-wide-talent-pool-for-gccs-xpheno-report' },
        { title: 'Bengaluru Skill Summit 2025', confidence: 5, data: 'KDEM as Knowledge Partner, industry partnerships', link: 'https://bengaluruskillsummit.com/' },
        { title: 'ELEVATE Program Data', confidence: 4, data: '1,227+ startups, ₹280+ Cr funding, 25% women-led', link: null },
        { title: 'NASSCOM Industry Reports', confidence: 4, data: 'IT sector employment conversion ratios', link: null },
        { title: 'ICEA (India Cellular & Electronics Association)', confidence: 4, data: 'ESDM sector employment conversion ratios', link: null }
    ]
}

// ============================================================
// ROADMAP DATA
// ============================================================

export function getRoadmapPhases() {
    return [
        { year: '2025', title: 'Foundation Phase', milestones: ['Launch KDEM Dashboard v3.0', 'Establish governance structure', 'Begin Tier 1 cluster development', 'Policy framework finalization'], confidence: 5 },
        { year: '2026', title: 'Acceleration Phase', milestones: ['Scale Tier 1 investments', 'Launch Tier 2 anchor projects', 'IT Exports reach $100B', 'ESDM manufacturing ramp-up'], confidence: 4 },
        { year: '2027', title: 'Expansion Phase', milestones: ['Geographic diversification across all clusters', 'Startup ecosystem maturity', 'Advanced digitization in traditional sectors', '2M employment milestone'], confidence: 4 },
        { year: '2028', title: 'Integration Phase', milestones: ['Cross-cluster synergies activated', 'Infrastructure projects operational', 'IT Domestic scales to $50B', '3M employment milestone'], confidence: 3 },
        { year: '2029-2030', title: 'Maturity Phase', milestones: ['All verticals at target levels', 'Sustainable growth trajectory established', '$400B digital economy achieved', '5M employment target'], confidence: 3 }
    ]
}

export function getInterventions() {
    return [
        { category: 'Infrastructure', actions: ['Develop industrial parks in Tier 1 clusters', 'Expand connectivity (roads, airports, fiber)', 'Build shared facilities (data centers, testing labs)', 'Create innovation districts in key cities'] },
        { category: 'Policy & Regulation', actions: ['Simplify land acquisition processes', 'Offer tax incentives for cluster investments', 'Streamline environmental clearances', 'Create single-window clearance system'] },
        { category: 'Talent Development', actions: ['Expand engineering college capacity', 'Launch skill development programs', 'Attract global talent to Karnataka', 'Industry-academia partnerships'] },
        { category: 'Investment Promotion', actions: ['Anchor tenant recruitment for Tier 2/3', 'Startup ecosystem support', 'FDI promotion campaigns', 'Public-private partnerships'] }
    ]
}

export function getInvestmentSchedule() {
    return [
        { year: '2025-2026', public: 5000, private: 15000, total: 20000, focus: 'Tier 1 infrastructure, policy setup' },
        { year: '2026-2027', public: 8000, private: 25000, total: 33000, focus: 'Tier 2 anchors, ESDM facilities' },
        { year: '2027-2028', public: 10000, private: 35000, total: 45000, focus: 'Geographic expansion, digitization' },
        { year: '2028-2029', public: 12000, private: 45000, total: 57000, focus: 'Infrastructure projects, scale-up' },
        { year: '2029-2030', public: 15000, private: 60000, total: 75000, focus: 'Final push to targets, sustainability' }
    ]
}

export function getRisks() {
    return [
        { risk: 'Talent Shortage', impact: 'High', likelihood: 'Medium', mitigation: 'Expand education capacity, skill development programs, global talent attraction' },
        { risk: 'Infrastructure Delays', impact: 'High', likelihood: 'Medium', mitigation: 'PPP models, streamlined approvals, concurrent development' },
        { risk: 'Market Downturn', impact: 'High', likelihood: 'Low', mitigation: 'Diversification across verticals, resilient policy framework' },
        { risk: 'Competition from Other States', impact: 'Medium', likelihood: 'High', mitigation: 'Competitive incentives, first-mover advantage in Tier 2/3' },
        { risk: 'Technology Disruption', impact: 'Medium', likelihood: 'Medium', mitigation: 'Innovation focus, adaptable targets, continuous monitoring' }
    ]
}

// ============================================================
// ORGANISATION DATA
// ============================================================

export function getRegulatoryMetrics() {
    return [
        { icon: '🏛️', title: 'Single Window Clearance', status: 'Operational', description: 'Karnataka Udyog Mitra - One-stop portal for all clearances and approvals', link: 'https://kum.karnataka.gov.in', source: 'Karnataka Government', confidence: 5 },
        { icon: '⏱️', title: 'Average Clearance Time', value: '15-30 days', description: 'For industrial registration and basic approvals', benchmark: 'Target: <15 days by 2026', source: 'Karnataka Udyog Mitra', confidence: 4 },
        { icon: '💰', title: 'Compliance Cost', status: 'Competitive', description: 'Lower than Maharashtra, competitive with Telangana', note: 'Focus on digital compliance to reduce costs', source: 'Industry estimates', confidence: 3 },
        { icon: '🌳', title: 'Environmental Clearances', process: 'State & Central', description: 'State clearances: 30-60 days | Central clearances: 105-210 days', note: 'Fast-track mechanism for IT/ITES projects', source: 'Karnataka Government', confidence: 4 }
    ]
}

export function getCompetitiveBenchmarks() {
    return {
        metrics: ['Time to Start Business', 'Single Window Portal', 'Industrial Power Tariff', 'IT/ITES Incentives', 'Talent Availability', 'Cost of Operations'],
        states: {
            'Karnataka': ['5-7 days', '✓ Karnataka Udyog Mitra', '₹6-8 per unit', 'High - ₹445.5 Cr allocation', 'Highest - 2.5M+ tech workforce', 'High (Bengaluru) / Low (Tier-2)'],
            'Telangana': ['7-10 days', '✓ TS-iPASS', '₹5-7 per unit', 'High - TASK program', 'High - 750K+ tech workforce', 'Medium (Hyderabad)'],
            'Gujarat': ['5-7 days', '✓ InvestGujarat', '₹5-7 per unit', 'Medium', 'Medium', 'Medium'],
            'Tamil Nadu': ['7-10 days', '✓ TN Single Window', '₹6-8 per unit', 'Medium', 'High - Chennai hub', 'Medium (Chennai)']
        },
        source: 'Industry estimates, State Government portals',
        confidence: 3
    }
}

export function getClusterGovernance() {
    return [
        { name: 'Mysuru', governance: 'Mysuru Urban Development Authority + District Industrial Centre', initiatives: ['IT Park with plug-and-play facilities', 'Dedicated cluster coordination cell', 'Fast-track clearances for IT/ITES projects', 'Collaboration with local universities for talent pipeline'], status: 'Operational - Scaling phase', source: 'KDEM Vision Document 2025 - Mysuru Chapter', confidence: 4 },
        { name: 'Mangaluru', governance: 'Mangaluru Smart City Ltd + STPI Mangaluru', initiatives: ['Data centre hub development (1 GW+ capacity planned)', 'Coastal connectivity advantage for submarine cables', 'Quality of life advantage - educational institutions', 'Lower operational costs vs Bengaluru (30-35%)'], status: 'Emerging - High potential', source: 'Draft Mangaluru Cluster Vision Document 2025', confidence: 4 },
        { name: 'Hubballi-Dharwad', governance: 'HDB (Hubballi-Dharwad Development Board)', initiatives: ['5 lakh+ sq ft co-working space operational', 'EMC 2.0 industrial corridor development', 'Twin-city advantage - shared infrastructure', 'Railway connectivity hub for logistics'], status: 'Growing - Infrastructure ready', source: 'HDB Cluster Vision Report 2025-2030', confidence: 4 }
    ]
}

// ============================================================
// SOURCES DATA
// ============================================================

export function getAllSources() {
    return {
        kdem: [
            { id: 1, name: 'KDEM Official Website', link: 'https://karnatakadigital.in', data: 'Mission, verticals, program descriptions', confidence: 5, verified: 'Jan 2026' },
            { id: 2, name: 'Beyond Bengaluru Initiative', link: 'https://beyondbengaluru.com', data: '126 companies, 5,500+ jobs metrics', confidence: 4, verified: 'Jan 2026' },
            { id: 3, name: 'Bengaluru Tech Summit', link: 'https://bengalurutechsummit.com', data: 'BTS 2025: 50,000+ visitors, 60+ countries', confidence: 5, verified: 'Nov 2025' }
        ],
        government: [
            { id: 4, name: 'Karnataka IT-BT Policy 2025-2030', data: '₹445.5 Cr allocation, 30,000 startup target', confidence: 5, notes: 'Cabinet approved Dec 2025' },
            { id: 5, name: 'Karnataka Startup Policy 2025-2030', data: '25,000 startup target, 5% GDP goal', confidence: 5, notes: 'Official policy' },
            { id: 6, name: 'Karnataka GCC Policy 2024', data: '500 GCC target, 3.5 lakh jobs, $50B output', confidence: 5, notes: 'Notified policy' },
            { id: 7, name: 'Karnataka Space Tech Policy 2025', data: 'Policy launch announcement', confidence: 5, notes: 'BTS 2025' },
            { id: 8, name: 'Karnataka ER&D Policy 2021', data: '40% of India\'s ER&D revenue', confidence: 4, notes: 'Official policy' },
            { id: 9, name: 'Karnataka Aerospace & Defence Policy 2022-27', data: '60-65% of India\'s aerospace', confidence: 5, notes: 'Official policy' }
        ],
        regional: [
            { id: 10, name: 'STPI Karnataka', link: 'https://bengaluru.stpi.in', data: 'IT/ITES exports (45% share)', confidence: 5, notes: 'Official quarterly data' },
            { id: 11, name: 'DPIIT', data: 'Karnataka #1 state, 16,000+ startups', confidence: 5, notes: 'Government of India' },
            { id: 12, name: 'Karnataka Economic Survey', data: 'Digital economy ~$110B estimate', confidence: 4, notes: 'State economic data' }
        ],
        gcc: [
            { id: 13, name: 'Zinnov "5 Shifts Defining India\'s GCC Story in 2025"', data: '1,800+ GCCs, 2M workforce, Karnataka 880+ centers', confidence: 4, date: 'Nov 2025' },
            { id: 14, name: 'Zinnov-NASSCOM Mid-market GCC Report 2025', data: '480+ mid-market centers, 27% of India GCCs', confidence: 4, date: '2025' },
            { id: 15, name: 'Zinnov-KDEM Karnataka Mid-market Report', data: 'Nearly half of India\'s mid-market GCCs in Karnataka', confidence: 4, date: '2025' },
            { id: 16, name: 'Zinnov Mega GCC Report 2025', data: '5% of GCCs = 50% workforce', confidence: 4, date: '2025' }
        ],
        startup: [
            { id: 20, name: 'Startup Genome - Bengaluru Karnataka', data: 'Ecosystem health metrics', confidence: 4, date: '2025' },
            { id: 21, name: 'Tracxn', data: 'Startup funding, unicorn tracking', confidence: 3, notes: 'Subscription data' },
            { id: 22, name: 'Inc42', data: 'Startup news, BTS coverage', confidence: 3, notes: 'News source' }
        ],
        cluster: [
            { id: 25, name: 'KDEM Vision Document 2025 - Mysuru Chapter', data: '$10B by 2030, 150,000 jobs, 2,800 startups', confidence: 4, date: 'Jul 2025' },
            { id: 26, name: 'Draft Mangaluru Cluster Vision Document 2025', data: '₹40,000 Cr by 2034, 200,000 jobs, 4,000 startups', confidence: 4, date: 'Sep 2025' },
            { id: 27, name: 'HDB Cluster Vision Report 2025-2030', data: 'EMC 2.0, industrial corridor', confidence: 4, date: '2025' },
            { id: 28, name: 'Silicon Beach Skills Report (Xpheno-KDEM)', link: 'https://newskarnataka.com/karnataka/mangaluru/mangaluru-has-potential-to-be-the-next-bengaluru-says-priyank-kharge/25092025', data: '3.1 lakh talent, 90,000 experienced, 15,000+ grads/year', confidence: 4, date: 'Sep 2025' },
            { id: 30, name: 'Bengaluru Innovation Report 2025', data: '2.5M+ tech workforce, 600K AI/ML professionals, ecosystem metrics', confidence: 5, date: '2025' }
        ],
        skilling: [
            { id: 31, name: 'Karnataka Skill Development Policy 2025-32', link: 'https://thesouthfirst.com/karnataka/karnataka-government-approves-skill-development-policy-2025-32/', data: '₹4,432.5 Cr investment, 3M youth target, digital & AI focus', confidence: 5, date: 'Jan 2026' },
            { id: 32, name: 'Bengaluru Skill Summit 2025 (KDEM Knowledge Partner)', link: 'https://bengaluruskillsummit.com/', data: 'Skills & Innovation event, industry partnerships', confidence: 5, date: 'Feb 2026' }
        ],
        international: [
            { id: 41, name: 'Singapore Digital Economy Report 2025 (IMDA)', data: '$128.1B (18.6% GDP), 12% CAGR', confidence: 5, date: 'Oct 2025' },
            { id: 42, name: 'e-Conomy SEA 2025 (Google/Temasek/Bain)', data: '$300B+ GMV, AI adoption', confidence: 4, date: 'Nov 2025' },
            { id: 45, name: 'World Bank Digital Economy Framework', data: '5 foundations framework', confidence: 5, date: '2016-2024' }
        ],
        competitor: [
            { id: 47, name: 'Gujarat GCC Policy 2025-30', data: '250+ GCCs, ₹10,000 Cr, 50,000 jobs', confidence: 5, date: '2025' },
            { id: 48, name: 'Odisha GCC Policy 2025', data: '5 hubs, ₹1,000 Cr, 50,000 jobs', confidence: 5, date: '2025' },
            { id: 49, name: 'Telangana ICT Policy & TASK Program', data: 'Skilling, ease of business', confidence: 4, notes: 'Ongoing' },
            { id: 52, name: 'Union Budget 2025-26 GCC Framework', data: 'National guidance framework', confidence: 5, date: 'Feb 2025' }
        ]
    }
}

// ============================================================
// KARNATAKA BASELINE & ECONOMIC CONTEXT DATA
// ============================================================
// PRIMARY SOURCE: "Estimation of Digital Economy numbers - Finalized numbers.xlsx"
//   Base year: FY 2021-22 (ACTUAL reported data from NASSCOM, MeitY, ICEA)
//   Projections: FY 2022-23 onward use CAGR model (see assumptions below)
//   CAGR assumptions:
//     IT Exports: 12% till FY25, 10% post-FY25
//     IT Domestic: 15% till FY25, 12% post-FY25
//     ESDM: per ICEA estimates till FY25, 12% post-FY25
//     Startups: 30% till FY25, 20% post-FY25
//     Digitizing: individual sub-sector CAGRs till FY25, 15% KA post-FY25
//   Karnataka share of India: IT Exports 38%, IT Domestic 30%, ESDM 20%, Startups 40%
// VALIDATION: "Data Validation for Digital Economy numbers_v2.xlsx"
// SUMMARY: "Digital Eco Ind KA Data 16 12.xlsx" (Slide 3)
// ============================================================

export function getKarnatakaBaseline() {
    return {
        // FY 2024-25 — NASSCOM actuals for IT, MeitY actual for ESDM, Excel projections for Startups/Digitizing
        baseYear: '2021-22',
        baseYearDataType: 'actual',
        displayYear: '2024-25',
        displayYearDataType: 'actual (IT/ESDM) + projected (Startups/Digitizing)',
        currentGSDP_USD_Bn: 345,
        currentITExports_USD_Bn: 85.12,    // NASSCOM FY25: India $224B × 38% KA share
        currentITDomestic_USD_Bn: 17.46,   // NASSCOM FY25: India $58.2B × 30% KA share
        currentESDM_USD_Bn: 36.69,         // MeitY actual FY24-25
        currentStartups_USD_Bn: 8.79,      // KDEM Excel projection (no NASSCOM alt)
        currentDigitizing_USD_Bn: 20.23,   // KDEM Excel bottom-up sum of 17 sub-sectors (not smooth CAGR)
        currentTotalDigital_USD_Bn: 168,   // 85.12 + 17.46 + 36.69 + 8.79 + 20.23 = 168.29
        currentDigitalEmployment: 3400000, // NASSCOM 5.8M India × 38% = 2.2M IT + 284K ESDM + 920K Startups
        currentITEmployment: 3400000,
        // FY 2021-22 actuals (for reference)
        baseActuals: {
            year: '2021-22',
            itExports: 67.64,
            itDomestic: 14.7,
            esdm: 17.98,
            startups: 4.0,
            digitizing: 6.0,
            total: 110.4,
            employment: 2180000
        },
        // 2030 Targets (FY 2029-30 — KDEM aspiration)
        targetRevenue_USD_Bn: 479,
        targetEmployment: 8160000,
        publicTargetRevenue_USD_Bn: 400,
        publicTargetEmployment: 5000000,
        // National context (FY 2024-25)
        indiaGDP_FY25_USD_Tn: 3.9,
        indiaIT_FY25_USD_Bn: 283,          // NASSCOM Strategic Review 2025
        indiaITExports_FY25_USD_Bn: 224,   // NASSCOM Strategic Review 2025
        indiaITDomestic_FY25_USD_Bn: 58.2, // NASSCOM Strategic Review 2025
        indiaITTalent_FY25: 5800000,       // NASSCOM Strategic Review 2025
        karnatakaShareOfGDP_Pct: 8.5,
        karnatakaDigitalShareOfIndia_Pct: 38,
        karnatakaITShareOfIndia_Pct: 38,
        // Source provenance
        sources: {
            nasscom: 'NASSCOM Strategic Review FY24-25 (Feb 2025) — India IT: $283B, Exports: $224B, Domestic: $58.2B, Talent: 5.8M',
            meity: 'MeitY + Care Edge Research — India ESDM FY24-25: $36.69B (KA 20%)',
            stpi: 'STPI Bengaluru FY24-25: ₹4,53,593 Cr (~$52B) — STPI-registered units only',
            excelModel: 'KDEM Excel — Estimation of Digital Economy numbers - Finalized numbers.xlsx',
            validation: 'Data Validation for Digital Economy numbers_v2.xlsx',
            summary: 'Digital Eco Ind KA Data 16 12.xlsx (Slide 3)',
            methodology: 'IT: NASSCOM FY25 actuals × KA share | ESDM: MeitY FY25 actual | Startups/Digitizing: KDEM Excel CAGR from FY21-22 base',
            baseYearSources: {
                itExports: 'NASSCOM FY24-25 actual: India $224B × 38% KA share = $85.12B',
                itDomestic: 'NASSCOM FY24-25 actual: India $58.2B × 30% KA share = $17.46B',
                esdm: 'MeitY FY24-25 actual: India ESDM production — KA contribution $36.69B',
                startups: 'KDEM Excel projection from FY21-22 base ($4B × 30% CAGR) — no independent FY25 actual',
                digitizing: 'KDEM Excel bottom-up sum of 17 sub-sectors ($20.23B) — McKinsey framework, per-sub-sector CAGRs'
            }
        },
        source: 'NASSCOM Strategic Review 2025, MeitY, KDEM Excel',
        confidence: 4
    }
}

export function getVerticalBaselines() {
    // FY24-25 "current" values: NASSCOM actuals for IT, MeitY actual for ESDM, Excel projections for Startups/Digitizing
    // FY29-30 "target" values: KDEM aspirational targets from Excel model
    return [
        {
            id: 'it-exports', name: 'IT Exports',
            current: 85.12, target: 228.66, unit: 'USD Bn',
            currentEmployment: 1830000, targetEmployment: 3370000,
            baseYear: '2021-22', baseActual: 67.64, baseEmployment: 1334000,
            indiaFY25: 224, karnatakaSharePct: 38,
            actualGrowthCAGR: '~8% (FY22-25)', targetCAGR: '~22% (FY25-30)',
            source: 'NASSCOM Strategic Review FY25: India $224B × 38% KA share',
            confidence: 4
        },
        {
            id: 'it-domestic', name: 'IT Domestic',
            current: 17.46, target: 56.24, unit: 'USD Bn',
            currentEmployment: 370000, targetEmployment: 890000,
            baseYear: '2021-22', baseActual: 14.7, baseEmployment: 290000,
            indiaFY25: 58.2, karnatakaSharePct: 30,
            actualGrowthCAGR: '~6% (FY22-25)', targetCAGR: '~26% (FY25-30)',
            source: 'NASSCOM Strategic Review FY25: India $58.2B × 30% KA share',
            confidence: 4
        },
        {
            id: 'esdm', name: 'ESDM',
            current: 36.69, target: 105.18, unit: 'USD Bn',
            currentEmployment: 284000, targetEmployment: 910000,
            baseYear: '2021-22', baseActual: 17.98, baseEmployment: 140000,
            indiaFY25: null, karnatakaSharePct: 20,
            actualGrowthCAGR: '~27% (FY22-25)', targetCAGR: '~23% (FY25-30)',
            source: 'MeitY + Care Edge Research FY24-25 actual',
            confidence: 5
        },
        {
            id: 'startups', name: 'Startups',
            current: 8.79, target: 26.78, unit: 'USD Bn',
            currentEmployment: 920000, targetEmployment: 2980000,
            baseYear: '2021-22', baseActual: 4.0, baseEmployment: 424000,
            indiaFY25: null, karnatakaSharePct: 40,
            actualGrowthCAGR: '~30% projected (FY22-25)', targetCAGR: '~25% (FY25-30)',
            source: 'KDEM Excel projection (no independent FY25 actual available)',
            confidence: 3
        },
        {
            id: 'digitizing-sectors', name: 'Newly Digitizing',
            current: 20.23, target: 61.98, unit: 'USD Bn',
            currentEmployment: 0, targetEmployment: 0,
            baseYear: '2021-22', baseActual: 6.0, baseEmployment: 0,
            indiaFY25: null, karnatakaSharePct: null,
            actualGrowthCAGR: 'sub-sector specific (FY22-25)', targetCAGR: '~33% (FY25-30)',
            source: 'KDEM Excel — 17 sub-sectors (McKinsey framework), no independent FY25 actuals',
            confidence: 2
        }
    ]
}

export function getIndiaDigitalEconomyTimeline() {
    return {
        labels: ['2022-23', '2023-24', '2024-25', '2025-26', '2026-27', '2027-28', '2028-29', '2029-30'],
        actual: [402, 448, 529, null, null, null, null, null],
        projected: [null, null, 529, 625, 740, 879, 1046, 1247],
        target: 1247,
        todayIndex: 2,
        source: 'ICRIER estimates, MoSPI, IMF',
        confidence: 3
    }
}

export function getKarnatakaITExportsTimeline() {
    // NASSCOM actual for FY24-25: India $224B × 38% = $85.12B
    // FY22-24 interpolated from FY21-22 base ($67.64B) at ~8% actual CAGR
    // FY25-30 projected at ~22% CAGR to reach $229B KDEM target
    return {
        labels: ['2021-22', '2022-23', '2023-24', '2024-25', '2025-26', '2026-27', '2027-28', '2028-29', '2029-30'],
        actual: [67.6, 73.1, 78.9, 85.1, null, null, null, null, null],
        projected: [null, null, null, 85.1, 103.8, 126.5, 154.2, 188.0, 229],
        target: 229,
        todayIndex: 3,
        source: 'NASSCOM Strategic Review FY25 (India $224B × 38% KA share)',
        confidence: 4,
        note: 'NASSCOM actual FY24-25. STPI-only: $52B (covers ~60% of total IT exports).'
    }
}

export function getKarnatakaDigitalEconomyTimeline() {
    // Sum of all 5 verticals — NASSCOM/MeitY actuals for FY24-25, interpolated FY22-24, projected FY25-30
    // IT Exports & Domestic: NASSCOM Strategic Review FY25 × KA share
    // ESDM: MeitY actual FY24-25
    // Startups & Digitizing: KDEM Excel CAGR projections (no independent actuals)
    // FY25-30: per-vertical CAGR to reach KDEM $479B aspiration
    return {
        labels: ['2021-22', '2022-23', '2023-24', '2024-25', '2025-26', '2026-27', '2027-28', '2028-29', '2029-30'],
        actual: [110, null, null, 168, null, null, null, null, null],
        projected: [110, 127, 147, 168, 207, 255, 317, 390, 479],
        target: 479,
        todayIndex: 3,
        verticalBreakdown: {
            'IT Exports':  [67.64, 73.1,  78.9,  85.1,  103.8, 126.5, 154.2, 188.0, 229],
            'IT Domestic': [14.70, 15.6,  16.5,  17.5,  22.1,  27.9,  35.2,  44.5,  56.2],
            'ESDM':        [17.98, 22.8,  29.0,  36.7,  45.3,  55.9,  69.0,  85.1,  105.0],
            'Startups':    [4.00,  5.2,   6.76,  8.79,  11.0,  13.8,  17.3,  21.7,  26.8],
            'Digitizing':  [6.00,  9.45,  13.93, 20.23, 24.8,  30.4,  37.2,  48.1,  62.0]
        },
        source: 'NASSCOM Strategic Review 2025 + MeitY FY25 + KDEM Excel targets',
        confidence: 4,
        note: 'FY21-22 actual base. FY24-25: IT/ESDM from NASSCOM/MeitY actuals, Startups/Digitizing from KDEM Excel. FY25-30: per-vertical CAGR to KDEM targets.'
    }
}

export function getGDPComparisonTimeline() {
    return {
        labels: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
        karnatakaGSDP: [222, 270, 281, 306, 345],
        indiaGDP_actual: [2690, 3190, 3260, 3600, 3900],
        indiaGDP_scaled: [269, 319, 326, 360, 390],
        source: 'MoSPI, PRS India Budget Analysis',
        confidence: 5
    }
}

export function getRevenueWaterfall() {
    return [
        { name: 'IT Exports', value: 229, color: '#E96337' },
        { name: 'IT Domestic', value: 56, color: '#E68634' },
        { name: 'ESDM', value: 105, color: '#5BB9EC' },
        { name: 'Startups', value: 27, color: '#8B5CF6' },
        { name: 'Digitizing', value: 62, color: '#10B981' },
        { name: 'Total Target', value: 0, isTotal: true }
    ]
}

export function getRevenueSankeyData() {
    return {
        nodes: [
            { name: '$479B Target', id: 'total', color: '#202124' },
            { name: 'IT Exports ($229B)', id: 'it-exports' },
            { name: 'ESDM ($105B)', id: 'esdm' },
            { name: 'IT Domestic ($56B)', id: 'it-domestic' },
            { name: 'Digitizing ($62B)', id: 'digitizing-sectors' },
            { name: 'Startups ($27B)', id: 'startups' },
            { name: 'Bengaluru', id: 'bengaluru', color: '#374151' },
            { name: 'Mysuru', id: 'mysuru', color: '#6b7280' },
            { name: 'Mangaluru', id: 'mangaluru', color: '#6b7280' },
            { name: 'Hubballi-Dharwad', id: 'hubballi', color: '#6b7280' },
            { name: 'Other Clusters', id: 'others', color: '#9ca3af' }
        ],
        links: [
            // Total to verticals
            { source: '$479B Target', target: 'IT Exports ($229B)', value: 229 },
            { source: '$479B Target', target: 'ESDM ($105B)', value: 105 },
            { source: '$479B Target', target: 'IT Domestic ($56B)', value: 56 },
            { source: '$479B Target', target: 'Digitizing ($62B)', value: 62 },
            { source: '$479B Target', target: 'Startups ($27B)', value: 27 },
            // IT Exports to geographies
            { source: 'IT Exports ($229B)', target: 'Bengaluru', value: 221 },
            { source: 'IT Exports ($229B)', target: 'Mysuru', value: 3 },
            { source: 'IT Exports ($229B)', target: 'Mangaluru', value: 2 },
            { source: 'IT Exports ($229B)', target: 'Other Clusters', value: 3 },
            // ESDM to geographies
            { source: 'ESDM ($105B)', target: 'Bengaluru', value: 63 },
            { source: 'ESDM ($105B)', target: 'Mysuru', value: 12 },
            { source: 'ESDM ($105B)', target: 'Hubballi-Dharwad', value: 10 },
            { source: 'ESDM ($105B)', target: 'Mangaluru', value: 8 },
            { source: 'ESDM ($105B)', target: 'Other Clusters', value: 12 },
            // IT Domestic
            { source: 'IT Domestic ($56B)', target: 'Bengaluru', value: 46 },
            { source: 'IT Domestic ($56B)', target: 'Other Clusters', value: 10 },
            // Digitizing
            { source: 'Digitizing ($62B)', target: 'Bengaluru', value: 31 },
            { source: 'Digitizing ($62B)', target: 'Mysuru', value: 8 },
            { source: 'Digitizing ($62B)', target: 'Hubballi-Dharwad', value: 6 },
            { source: 'Digitizing ($62B)', target: 'Other Clusters', value: 17 },
            // Startups
            { source: 'Startups ($27B)', target: 'Bengaluru', value: 21 },
            { source: 'Startups ($27B)', target: 'Other Clusters', value: 6 }
        ],
        source: 'KDEM Target Database + Apportionment Rules',
        confidence: 3
    }
}

export function getRevenueTreemapData() {
    return [
        {
            name: 'IT Exports',
            value: 229,
            color: '#E96337',
            children: [
                { name: 'IT Services', value: 130 },
                { name: 'BPM', value: 45 },
                { name: 'GCCs', value: 34 },
                { name: 'ER&D', value: 20 }
            ]
        },
        {
            name: 'ESDM',
            value: 105,
            color: '#5BB9EC',
            children: [
                { name: 'Semiconductor Design', value: 42 },
                { name: 'Consumer Electronics', value: 25 },
                { name: 'Industrial Electronics', value: 20 },
                { name: 'Components', value: 18 }
            ]
        },
        {
            name: 'Digitizing Sectors',
            value: 62,
            color: '#10B981',
            children: [
                { name: 'Business Digitization & IoT', value: 12.75 },
                { name: 'Flow-based Lending', value: 8.76 },
                { name: 'Digital Communication', value: 6.10 },
                { name: 'Transport & Logistics', value: 4.72 },
                { name: 'Govt e-Marketplace', value: 4.53 },
                { name: 'Digital Payments', value: 3.87 },
                { name: 'Direct Benefit Transfer', value: 3.57 },
                { name: 'Education Platforms', value: 3.36 },
                { name: 'E-Commerce Supply Chain', value: 2.72 },
                { name: 'Retail Supply Chain', value: 2.72 },
                { name: 'Farmer Finance', value: 2.13 },
                { name: 'Power Distribution', value: 2.06 },
                { name: 'Agri Marketplace', value: 2.04 },
                { name: 'Precision Agriculture', value: 1.84 },
                { name: 'Healthcare', value: 0.29 },
                { name: 'Talent Platforms', value: 0.20 },
                { name: 'Smart Grids', value: 0.13 }
            ]
        },
        {
            name: 'IT Domestic',
            value: 56,
            color: '#E68634',
            children: [
                { name: 'Enterprise IT', value: 26 },
                { name: 'Government IT', value: 16 },
                { name: 'Digital Services', value: 14 }
            ]
        },
        {
            name: 'Startups',
            value: 27,
            color: '#8B5CF6',
            children: [
                { name: 'SaaS', value: 10 },
                { name: 'DeepTech', value: 6 },
                { name: 'Fintech', value: 5 },
                { name: 'Consumer Tech', value: 3 },
                { name: 'Other', value: 3 }
            ]
        }
    ]
}

export function getDataGaps() {
    return [
        { gap: 'Company-level verification', current: 'Self-reported', action: 'Registry system + EPFO linkage', priority: 'HIGH' },
        { gap: 'Event conversion tracking', current: 'None', action: 'Event CRM implementation', priority: 'HIGH' },
        { gap: 'Cluster progress validation', current: 'Informal', action: 'Standardized templates', priority: 'HIGH' },
        { gap: 'ELEVATE alumni outcomes', current: 'Partial', action: 'Alumni tracking system', priority: 'MEDIUM' },
        { gap: 'Competitive cost data', current: 'Ad-hoc', action: 'Regular benchmarking', priority: 'MEDIUM' },
        { gap: 'Digital economy methodology', current: 'Estimated', action: 'Statistical office partnership', priority: 'LOW' }
    ]
}

export function getUpdateSchedule() {
    return [
        { category: 'Vision Progress', frequency: 'Quarterly', next: 'April 2026', owner: 'Strategy' },
        { category: 'Beyond Bengaluru Metrics', frequency: 'Monthly', next: 'Feb 2026', owner: 'Clusters' },
        { category: 'Program Data (ELEVATE/LEAP)', frequency: 'Quarterly', next: 'April 2026', owner: 'Innovation' },
        { category: 'Competitive Intelligence', frequency: 'Quarterly', next: 'April 2026', owner: 'Strategy' },
        { category: 'External Partnerships Data', frequency: 'Monthly', next: 'Feb 2026', owner: 'Data Team' },
        { category: 'International Benchmarks', frequency: 'Semi-annually', next: 'July 2026', owner: 'Strategy' }
    ]
}

// ============================================================
// NEWLY DIGITIZING SECTORS — 17 Sub-sector Breakdown
// ============================================================
// Source: "Estimation of Digital Economy numbers - Finalized numbers.xlsx"
// Original framework: McKinsey "Digital India" report (March 2019), Exhibit 17
// Base year: FY 2021-22 (actual). All FY24-25 and FY29-30 values are CAGR projections.
// Post-FY25 CAGR: 15% Karnataka, 10% India (uniform across all sub-sectors)
// ============================================================

export function getDigitizingSubSectors() {
    return {
        methodologyNote: 'These projections derive from McKinsey\'s 2019 "potential economic value" estimates (Exhibit 18), not actual revenue. The KDEM Excel team independently created sub-sector splits, CAGRs (20%-227%), and Karnataka share assumptions (5%-15%). Post-FY25 growth: 15% KA, 10% India uniformly. See Data Audit for full provenance.',
        totalKaFY25: 20.23,
        totalKaFY30: 61.98,
        subSectorCount: 17,
        sectors: [
        {
            name: 'Business Digitization & IoT Analytics',
            indiaBaseFY22: 1.0, kaSharePct: 9, kaBaseFY22: 0.09,
            cagrKaTill25: '200%', cagrIndiaTill25: '227%',
            kaFY25: 1.93, kaFY30: 12.75, indiaFY30: 167.4,
            mcKinseyCategory: 'Business Digitisation (incl. Manufacturing IoT)',
            mcKinseyPotential2025: 90,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Flow-based Lending & Advanced Credit (MSMEs)',
            indiaBaseFY22: 10.0, kaSharePct: 6, kaBaseFY22: 0.60,
            cagrKaTill25: '70%', cagrIndiaTill25: '80%',
            kaFY25: 2.93, kaFY30: 8.76, indiaFY30: 153.7,
            mcKinseyCategory: 'Financial Services',
            mcKinseyPotential2025: 170,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Digital Communication Services',
            indiaBaseFY22: 23.0, kaSharePct: 6.5, kaBaseFY22: 1.495,
            cagrKaTill25: '23.6%', cagrIndiaTill25: '17.7%',
            kaFY25: 2.81, kaFY30: 6.10, indiaFY30: 76.1,
            mcKinseyCategory: 'Digital Communication Services',
            mcKinseyPotential2025: 55,
            source: 'KDEM Excel + McKinsey Exhibit 18', confidence: 3
        },
        {
            name: 'Efficient Transport & Logistics',
            indiaBaseFY22: 1.0, kaSharePct: 8, kaBaseFY22: 0.08,
            cagrKaTill25: '141%', cagrIndiaTill25: '117%',
            kaFY25: 1.56, kaFY30: 4.72, indiaFY30: 32.2,
            mcKinseyCategory: 'Logistics',
            mcKinseyPotential2025: 30,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Government e-Marketplace',
            indiaBaseFY22: 13.0, kaSharePct: 10, kaBaseFY22: 1.30,
            cagrKaTill25: '18.8%', cagrIndiaTill25: '17.8%',
            kaFY25: 2.17, kaFY30: 4.53, indiaFY30: 36.6,
            mcKinseyCategory: 'Government e-Marketplace',
            mcKinseyPotential2025: 25,
            source: 'KDEM Excel + McKinsey Exhibit 18', confidence: 3
        },
        {
            name: 'Digital Payments',
            indiaBaseFY22: 5.0, kaSharePct: 10, kaBaseFY22: 0.50,
            cagrKaTill25: '45%', cagrIndiaTill25: '62.7%',
            kaFY25: 1.53, kaFY30: 3.87, indiaFY30: 51.3,
            mcKinseyCategory: 'Financial Services',
            mcKinseyPotential2025: 170,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Direct Benefit Transfer',
            indiaBaseFY22: 5.66, kaSharePct: 15, kaBaseFY22: 0.849,
            cagrKaTill25: '24.5%', cagrIndiaTill25: '21%',
            kaFY25: 1.62, kaFY30: 3.57, indiaFY30: 17.8,
            mcKinseyCategory: 'Direct Benefit Transfer',
            mcKinseyPotential2025: 15,
            source: 'KDEM Excel + McKinsey Exhibit 18', confidence: 3
        },
        {
            name: 'Customizable Education Platforms',
            indiaBaseFY22: 10.0, kaSharePct: 5, kaBaseFY22: 0.50,
            cagrKaTill25: '40%', cagrIndiaTill25: '36.8%',
            kaFY25: 1.37, kaFY30: 3.36, indiaFY30: 51.3,
            mcKinseyCategory: 'Education',
            mcKinseyPotential2025: 50,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Digital Supply Chain - E-Commerce',
            indiaBaseFY22: 1.0, kaSharePct: 6.5, kaBaseFY22: 0.08,
            cagrKaTill25: '110%', cagrIndiaTill25: '105%',
            kaFY25: 0.69, kaFY30: 2.72, indiaFY30: 25.9,
            mcKinseyCategory: 'Retail',
            mcKinseyPotential2025: 35,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Digital Supply Chain - Traditional Retail',
            indiaBaseFY22: 1.0, kaSharePct: 6.5, kaBaseFY22: 0.08,
            cagrKaTill25: '110%', cagrIndiaTill25: '68.2%',
            kaFY25: 0.69, kaFY30: 2.72, indiaFY30: 11.7,
            mcKinseyCategory: 'Retail',
            mcKinseyPotential2025: 35,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Digital Farmer Financing & Insurance',
            indiaBaseFY22: 1.0, kaSharePct: 13, kaBaseFY22: 0.13,
            cagrKaTill25: '75%', cagrIndiaTill25: '88%',
            kaFY25: 0.70, kaFY30: 2.13, indiaFY30: 18.3,
            mcKinseyCategory: 'Agriculture',
            mcKinseyPotential2025: 70,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Digitally Enabled Power Distribution',
            indiaBaseFY22: 1.0, kaSharePct: 8, kaBaseFY22: 0.08,
            cagrKaTill25: '96%', cagrIndiaTill25: '82%',
            kaFY25: 0.60, kaFY30: 2.06, indiaFY30: 16.1,
            mcKinseyCategory: 'Energy',
            mcKinseyPotential2025: 15,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Universal Agricultural Marketplace',
            indiaBaseFY22: 1.0, kaSharePct: 6, kaBaseFY22: 0.06,
            cagrKaTill25: '110%', cagrIndiaTill25: '118%',
            kaFY25: 0.51, kaFY30: 2.04, indiaFY30: 33.1,
            mcKinseyCategory: 'Agriculture',
            mcKinseyPotential2025: 70,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Precision Agriculture',
            indiaBaseFY22: 1.0, kaSharePct: 9, kaBaseFY22: 0.09,
            cagrKaTill25: '85%', cagrIndiaTill25: '118%',
            kaFY25: 0.57, kaFY30: 1.84, indiaFY30: 33.1,
            mcKinseyCategory: 'Agriculture',
            mcKinseyPotential2025: 70,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Tech-enabled Healthcare',
            indiaBaseFY22: 1.0, kaSharePct: 8, kaBaseFY22: 0.08,
            cagrKaTill25: '20%', cagrIndiaTill25: '49.5%',
            kaFY25: 0.14, kaFY30: 0.29, indiaFY30: 7.3,
            mcKinseyCategory: 'Healthcare',
            mcKinseyPotential2025: 10,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Online Talent Platforms',
            indiaBaseFY22: 1.0, kaSharePct: 5, kaBaseFY22: 0.05,
            cagrKaTill25: '23.6%', cagrIndiaTill25: '187%',
            kaFY25: 0.09, kaFY30: 0.20, indiaFY30: 99.3,
            mcKinseyCategory: 'Jobs and Skills',
            mcKinseyPotential2025: 70,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        },
        {
            name: 'Smart Grids with Distributed Generation',
            indiaBaseFY22: 0.25, kaSharePct: 8, kaBaseFY22: 0.02,
            cagrKaTill25: '40%', cagrIndiaTill25: '40%',
            kaFY25: 0.05, kaFY30: 0.13, indiaFY30: 1.4,
            mcKinseyCategory: 'Energy',
            mcKinseyPotential2025: 15,
            source: 'KDEM Excel + McKinsey Exhibit 17', confidence: 2
        }
    ]}
}
