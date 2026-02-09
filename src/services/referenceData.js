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
// Source: MoSPI, RBI, STPI, NASSCOM, ICRIER, MEITY (various confidence levels)
// ============================================================

export function getKarnatakaBaseline() {
    return {
        // Current state (FY 2024-25 estimates)
        currentGSDP_USD_Bn: 331,
        currentITExports_USD_Bn: 52,
        currentITDomestic_USD_Bn: 18,
        currentESDM_USD_Bn: 8,
        currentStartups_USD_Bn: 5,
        currentDigitizing_USD_Bn: 3,
        currentTotalDigital_USD_Bn: 86,
        currentITEmployment: 2800000,
        // 2030 Targets
        targetRevenue_USD_Bn: 400,
        targetEmployment: 5000000,
        // National context
        indiaGDP_FY25_USD_Tn: 3.9,
        karnatakaShareOfGDP_Pct: 8.5,
        karnatakaITShareOfIndia_Pct: 42,
        source: 'STPI Karnataka, NASSCOM, MoSPI, RBI Handbook 2025',
        confidence: 3
    }
}

export function getVerticalBaselines() {
    return [
        {
            id: 'it-exports', name: 'IT Exports',
            current: 52, target: 229, unit: 'USD Bn',
            currentEmployment: 1400000, targetEmployment: 2200000,
            source: 'STPI Karnataka FY25', confidence: 5
        },
        {
            id: 'it-domestic', name: 'IT Domestic',
            current: 18, target: 48, unit: 'USD Bn',
            currentEmployment: 600000, targetEmployment: 900000,
            source: 'NASSCOM / Industry estimates', confidence: 3
        },
        {
            id: 'esdm', name: 'ESDM',
            current: 8, target: 105, unit: 'USD Bn',
            currentEmployment: 300000, targetEmployment: 800000,
            source: 'MEITY, IBEF, ICEA', confidence: 3
        },
        {
            id: 'startups', name: 'Startups',
            current: 5, target: 10, unit: 'USD Bn',
            currentEmployment: 200000, targetEmployment: 500000,
            source: 'Bengaluru Innovation Report 2025', confidence: 4
        },
        {
            id: 'digitizing-sectors', name: 'Newly Digitizing',
            current: 3, target: 8, unit: 'USD Bn',
            currentEmployment: 300000, targetEmployment: 600000,
            source: 'KDEM estimates', confidence: 2
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
    return {
        labels: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25', '2025-26', '2026-27', '2028-29', '2029-30'],
        actual: [28.69, 34.94, 38.74, 48.89, 52.04, null, null, null, null],
        projected: [null, null, null, null, 52.04, 75, 110, 170, 229],
        target: 229,
        todayIndex: 4,
        source: 'STPI Karnataka',
        confidence: 4
    }
}

export function getGDPComparisonTimeline() {
    return {
        labels: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
        karnatakaGSDP: [222, 270, 281, 306, 331],
        indiaGDP_actual: [2690, 3190, 3260, 3600, 3790],
        indiaGDP_scaled: [269, 319, 326, 360, 379],
        source: 'MoSPI, RBI Handbook 2025',
        confidence: 5
    }
}

export function getRevenueWaterfall() {
    return [
        { name: 'IT Exports', value: 229, color: '#E96337' },
        { name: 'IT Domestic', value: 48, color: '#E68634' },
        { name: 'ESDM', value: 105, color: '#5BB9EC' },
        { name: 'Startups', value: 10, color: '#8B5CF6' },
        { name: 'Digitizing', value: 8, color: '#10B981' },
        { name: 'Total Target', value: 0, isTotal: true }
    ]
}

export function getRevenueSankeyData() {
    return {
        nodes: [
            { name: '$400B Target', id: 'total', color: '#202124' },
            { name: 'IT Exports ($229B)', id: 'it-exports' },
            { name: 'ESDM ($105B)', id: 'esdm' },
            { name: 'IT Domestic ($48B)', id: 'it-domestic' },
            { name: 'Startups ($10B)', id: 'startups' },
            { name: 'Digitizing ($8B)', id: 'digitizing-sectors' },
            { name: 'Bengaluru', id: 'bengaluru', color: '#374151' },
            { name: 'Mysuru', id: 'mysuru', color: '#6b7280' },
            { name: 'Mangaluru', id: 'mangaluru', color: '#6b7280' },
            { name: 'Hubballi-Dharwad', id: 'hubballi', color: '#6b7280' },
            { name: 'Other Clusters', id: 'others', color: '#9ca3af' }
        ],
        links: [
            // Total to verticals
            { source: '$400B Target', target: 'IT Exports ($229B)', value: 229 },
            { source: '$400B Target', target: 'ESDM ($105B)', value: 105 },
            { source: '$400B Target', target: 'IT Domestic ($48B)', value: 48 },
            { source: '$400B Target', target: 'Startups ($10B)', value: 10 },
            { source: '$400B Target', target: 'Digitizing ($8B)', value: 8 },
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
            { source: 'IT Domestic ($48B)', target: 'Bengaluru', value: 40 },
            { source: 'IT Domestic ($48B)', target: 'Other Clusters', value: 8 },
            // Startups
            { source: 'Startups ($10B)', target: 'Bengaluru', value: 8 },
            { source: 'Startups ($10B)', target: 'Other Clusters', value: 2 },
            // Digitizing
            { source: 'Digitizing ($8B)', target: 'Bengaluru', value: 4 },
            { source: 'Digitizing ($8B)', target: 'Other Clusters', value: 4 }
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
            name: 'IT Domestic',
            value: 48,
            color: '#E68634',
            children: [
                { name: 'Enterprise IT', value: 22 },
                { name: 'Government IT', value: 14 },
                { name: 'Digital Services', value: 12 }
            ]
        },
        {
            name: 'Startups',
            value: 10,
            color: '#8B5CF6',
            children: [
                { name: 'SaaS', value: 4 },
                { name: 'DeepTech', value: 3 },
                { name: 'Fintech', value: 2 },
                { name: 'Other', value: 1 }
            ]
        },
        {
            name: 'Newly Digitizing',
            value: 8,
            color: '#10B981',
            children: [
                { name: 'Agritech', value: 3 },
                { name: 'Healthtech', value: 2 },
                { name: 'Edtech', value: 2 },
                { name: 'Cleantech', value: 1 }
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
