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
        { year: '2029-2030', title: 'Acceleration Phase', milestones: ['IT Exports crosses $137B', 'ESDM crosses $72B', 'All clusters operational', '4M employment milestone'], confidence: 3 },
        { year: '2031-2032', title: 'Maturity Phase', milestones: ['All verticals at target levels', 'Sustainable growth trajectory established', '$329B digital economy achieved', '5M employment target'], confidence: 3 }
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
            { id: 10, name: 'STPI Karnataka', link: 'https://bengaluru.stpi.in', data: 'IT/ITES exports (42-45% national share)', confidence: 5, notes: 'Official quarterly data' },
            { id: 11, name: 'DPIIT Prabhaav Dashboard', link: 'https://www.prabhaav.in', data: 'Karnataka: 21,163 DPIIT-recognized startups (#1 state)', confidence: 5, notes: 'Jan 2025' },
            { id: 12, name: 'Karnataka Economic Survey', data: 'Digital economy ~$110B estimate (FY21-22 base)', confidence: 4, notes: 'State economic data' },
            { id: 'R1', name: 'MeitY Annual Report FY24-25', link: 'https://www.meity.gov.in', data: 'India ESDM production, Karnataka ESDM contribution $36.69B', confidence: 5, notes: 'Official data' },
            { id: 'R2', name: 'MoSPI / RBI Handbook of Statistics', link: 'https://www.rbi.org.in/scripts/AnnualPublications.aspx', data: 'India GDP, Karnataka GSDP, GDP deflator', confidence: 5, notes: '2025' }
        ],
        gcc: [
            { id: 13, name: 'Zinnov "5 Shifts Defining India\'s GCC Story in 2025"', data: '1,800+ GCCs, 2M workforce, Karnataka 880+ centers', confidence: 4, date: 'Nov 2025' },
            { id: 14, name: 'Zinnov-NASSCOM Mid-market GCC Report 2025', data: '480+ mid-market centers, 27% of India GCCs', confidence: 4, date: '2025' },
            { id: 15, name: 'Zinnov-KDEM Karnataka Mid-market Report', data: 'Nearly half of India\'s mid-market GCCs in Karnataka', confidence: 4, date: '2025' },
            { id: 16, name: 'Zinnov Mega GCC Report 2025', data: '5% of GCCs = 50% workforce', confidence: 4, date: '2025' }
        ],
        startup: [
            { id: 20, name: 'Startup Genome GSER 2025', link: 'https://startupgenome.com/report/gser2025', data: 'Bengaluru #14 global ecosystem, ecosystem value $136B, 32 unicorns', confidence: 5, date: '2025' },
            { id: 21, name: 'Tracxn - Bengaluru Startups', link: 'https://tracxn.com', data: '17,000+ funded startups, 183 soonicorns, funding rounds', confidence: 4, notes: 'Subscription data' },
            { id: 22, name: 'Inc42', link: 'https://inc42.com', data: 'Startup news, funding data', confidence: 3, notes: 'News source' },
            { id: 23, name: '3One4 Capital - Bengaluru Innovation Report 2025', data: '2.5M+ tech workforce, ecosystem metrics, AI/ML talent', confidence: 4, date: '2025' },
            { id: 24, name: 'DPIIT Prabhaav - Karnataka Startups', link: 'https://www.prabhaav.in', data: '21,163 DPIIT-recognized startups, sector breakdown', confidence: 5, date: 'Jan 2025' }
        ],
        projections: [
            { id: 'P1', name: 'NASSCOM Strategic Review FY24-25', link: 'https://nasscom.in/knowledge-center/publications/nasscom-strategic-review-2025', data: 'India IT revenue $283B (Exports $224B, Domestic $58.2B), IT talent 5.8M, $500B target by 2030', confidence: 5, date: 'Feb 2025' },
            { id: 'P2', name: 'NASSCOM IT-BPM Revenue Growth Forecast', link: 'https://nasscom.in', data: 'India IT 6-7% growth FY27, AI-moderated projections', confidence: 4, date: '2025' },
            { id: 'P3', name: 'CareEdge Research - India ESDM', link: 'https://www.careedge.in', data: 'India ESDM 20-25% CAGR projection, semiconductor investment impact', confidence: 4, date: '2025' },
            { id: 'P4', name: 'Statista - India IT Services Market', link: 'https://www.statista.com/outlook/tmo/it-services/india', data: 'India IT services 8.83% CAGR 2025-2030', confidence: 4, date: '2025' },
            { id: 'P5', name: 'Bessemer Venture Partners - Cloud Atlas', link: 'https://www.bvp.com/atlas', data: 'India cloud revenue $400B by 2030 projection', confidence: 3, date: '2025' },
            { id: 'P6', name: 'IDC India IT Spending Forecast', link: 'https://www.idc.com', data: 'India domestic IT 7.2% growth 2024', confidence: 4, date: '2024' },
            { id: 'P7', name: 'Gartner India IT Spending Forecast', link: 'https://www.gartner.com', data: 'India IT spending 10-11% growth FY25-26', confidence: 4, date: '2025' },
            { id: 'P8', name: 'ICEA - India Electronics & Semiconductor Report', link: 'https://icea.org.in', data: 'India ESDM production data, base year figures', confidence: 4, date: '2025' },
            { id: 'P9', name: 'McKinsey - Digital India (2019)', link: 'https://www.mckinsey.com/business-functions/mckinsey-digital/our-insights/digital-india-technology-to-transform-a-connected-nation', data: '17 digitizing sub-sector framework (baseline only, not used for projections)', confidence: 3, date: '2019' }
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
        currentTotalDigital_USD_Bn: 159,   // 85.12 + 17.46 + 36.69 + 20.23 = 159.50 (Startups excluded — double-counts with IT Exports/Domestic)
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
        // 2032 Targets (FY 2031-32 — revised conservative projection, startups excluded)
        targetRevenue_USD_Bn: 329,
        targetEmployment: 8160000,
        targetYear: '2031-32',
        publicTargetRevenue_USD_Bn: 329,
        publicTargetEmployment: 5000000,
        errorBand: { low: 140, high: 175, note: 'IT Exports KA share could be 42% not 38% (+$9-13B); ESDM may include design services inflating share (-$10B); Digitizing sectors CAGRs may be overstated (-$6-10B).' },
        startupNote: 'Startup revenue excluded from total to avoid double-counting with IT Exports/Domestic (NASSCOM figures include startup company revenues). Startups tracked as ecosystem health metrics.',
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
    // FY31-32 "target" values: revised conservative projections using industry-benchmarked CAGRs
    return [
        {
            id: 'it-exports', name: 'IT Exports',
            current: 85.12, target: 165.0, unit: 'USD Bn',
            currentEmployment: 1830000, targetEmployment: 3370000,
            baseYear: '2021-22', baseActual: 67.64, baseEmployment: 1334000,
            indiaFY25: 224, karnatakaSharePct: 38,
            actualGrowthCAGR: '~8% (FY22-25)', targetCAGR: '10% (FY25-32)',
            targetYear: '2031-32',
            revisionNote: 'NASSCOM SR 2025 ($500B India IT by 2030, ~12% CAGR); Statista 8.83%; Bessemer $400B by 2030; AI-moderated growth (NASSCOM projects 6-7% FY27)',
            source: 'NASSCOM Strategic Review FY25: India $224B × 38% KA share',
            confidence: 4
        },
        {
            id: 'it-domestic', name: 'IT Domestic',
            current: 17.46, target: 34.0, unit: 'USD Bn',
            currentEmployment: 370000, targetEmployment: 890000,
            baseYear: '2021-22', baseActual: 14.7, baseEmployment: 290000,
            indiaFY25: 58.2, karnatakaSharePct: 30,
            actualGrowthCAGR: '~6% (FY22-25)', targetCAGR: '10% (FY25-32)',
            targetYear: '2031-32',
            revisionNote: 'IDC India domestic IT 7.2% growth 2024; Gartner India IT spending 10-11% FY25-26',
            source: 'NASSCOM Strategic Review FY25: India $58.2B × 30% KA share',
            confidence: 4
        },
        {
            id: 'esdm', name: 'ESDM',
            current: 36.69, target: 95.0, unit: 'USD Bn',
            currentEmployment: 284000, targetEmployment: 910000,
            baseYear: '2021-22', baseActual: 17.98, baseEmployment: 140000,
            indiaFY25: null, karnatakaSharePct: 20,
            actualGrowthCAGR: '~27% (FY22-25)', targetCAGR: '14.5% (FY25-32)',
            targetYear: '2031-32',
            revisionNote: 'CareEdge 20-25% India CAGR; moderated for Karnataka share dilution as Gujarat/TN fabs come online',
            source: 'MeitY + Care Edge Research FY24-25 actual',
            confidence: 5
        },
        {
            id: 'startups', name: 'Startups',
            current: 8.79, target: 22.0, unit: 'USD Bn',
            currentEmployment: 920000, targetEmployment: 2980000,
            baseYear: '2021-22', baseActual: 4.0, baseEmployment: 424000,
            indiaFY25: null, karnatakaSharePct: 40,
            actualGrowthCAGR: '~30% projected (FY22-25)', targetCAGR: '14% (FY25-32)',
            targetYear: '2031-32',
            isEcosystemPillar: true,
            revenueExcluded: true,
            ecosystemMetrics: {
                dpiitCount: 21163,
                nonDpiitEstimate: '~20,000-25,000',
                totalEstimate: '~40,000-46,000',
                ecosystemValue: 136,
                annualFunding: 3.6,
                unicorns: 32,
                soonicorns: 183,
                source: 'DPIIT Prabhaav Jan 2025, Startup Genome GSER 2025, Tracxn 2025, 3One4 Capital Bengaluru Innovation Report 2025'
            },
            nonDpiitNote: 'DPIIT recognition covers an estimated 50-60% of eligible startups. Many bootstrapped companies, sole proprietorships, and early-stage ventures operate without DPIIT registration. Non-DPIIT estimate based on: MCA tech company registrations in Karnataka (<10 years), Tracxn database coverage (17,000+ funded), and Karnataka Startup Cell data (Elevate program). Total ecosystem estimated at 40,000-46,000 startups.',
            revisionNote: 'DPIIT/NASSCOM $1T startup contribution by 2030; Bengaluru 26% of VC funding; moderated for funding winter',
            note: 'Startup revenue excluded from total revenue target to avoid double-counting. NASSCOM IT revenue figures already include startup company revenues in IT Exports and IT Domestic. Startups tracked as an ecosystem health pillar with metrics on count, funding, and unicorns.',
            source: 'KDEM Excel projection (no independent FY25 actual available)',
            confidence: 3
        },
        {
            id: 'digitizing-sectors', name: 'Newly Digitizing',
            current: 20.23, target: 35.0, unit: 'USD Bn',
            currentEmployment: 0, targetEmployment: 0,
            baseYear: '2021-22', baseActual: 6.0, baseEmployment: 0,
            indiaFY25: null, karnatakaSharePct: null,
            actualGrowthCAGR: 'sub-sector specific (FY22-25)', targetCAGR: '8% (FY25-32)',
            targetYear: '2031-32',
            revisionNote: 'Aligned with India nominal GDP growth; McKinsey 2019 framework not used for projections',
            source: 'KDEM Excel — 17 sub-sectors (McKinsey framework), no independent FY25 actuals',
            confidence: 2
        }
    ]
}

export function getVerticalTimeline(verticalId) {
    const idToKey = {
        'it-exports': 'IT Exports',
        'it-domestic': 'IT Domestic',
        'esdm': 'ESDM',
        'startups': 'Startups',
        'digitizing-sectors': 'Digitizing'
    }
    const key = idToKey[verticalId]
    if (!key) return null

    const timeline = getKarnatakaDigitalEconomyTimeline()
    const series = timeline.verticalBreakdown[key]
    if (!series) return null

    const baseline = getVerticalBaselines().find(v => v.id === verticalId)
    const todayIndex = timeline.todayIndex

    // Split into actual (0..todayIndex) and projected (todayIndex..end)
    const actual = series.map((v, i) => i <= todayIndex ? v : null)
    const projected = series.map((v, i) => i >= todayIndex ? v : null)

    return {
        labels: timeline.labels,
        actual,
        projected,
        target: baseline ? baseline.target : series[series.length - 1],
        todayIndex,
        source: baseline ? baseline.source : timeline.source,
        confidence: baseline ? baseline.confidence : timeline.confidence
    }
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
    // FY25-32 projected at 10% CAGR to reach $165B revised target
    return {
        labels: ['2021-22', '2022-23', '2023-24', '2024-25', '2025-26', '2026-27', '2027-28', '2028-29', '2029-30', '2030-31', '2031-32'],
        actual: [67.6, 73.1, 78.9, 85.1, null, null, null, null, null, null, null],
        projected: [null, null, null, 85.1, 93.6, 103.0, 113.3, 124.6, 137.1, 150.8, 165.8],
        target: 165,
        todayIndex: 3,
        source: 'NASSCOM Strategic Review FY25 (India $224B × 38% KA share); 10% CAGR: NASSCOM SR 2025 ($500B India IT by 2030), Statista 8.83%, AI-moderated growth',
        confidence: 4,
        note: 'NASSCOM actual FY24-25. Revised to 10% CAGR (FY25-32) from original 22% (FY25-30). STPI-only: $52B (covers ~60% of total IT exports).'
    }
}

export function getKarnatakaDigitalEconomyTimeline() {
    // Sum of 4 revenue verticals (Startups excluded — double-counts with IT Exports/Domestic)
    // IT Exports & Domestic: NASSCOM Strategic Review FY25 × KA share
    // ESDM: MeitY actual FY24-25
    // Digitizing: KDEM Excel CAGR projections (no independent actuals)
    // FY25-32: per-vertical conservative CAGRs to reach $329B by FY31-32
    // Revised CAGRs: IT Exports 10%, IT Domestic 10%, ESDM 14.5%, Digitizing 8%
    return {
        labels: ['2021-22', '2022-23', '2023-24', '2024-25', '2025-26', '2026-27', '2027-28', '2028-29', '2029-30', '2030-31', '2031-32'],
        actual: [106, null, null, 159, null, null, null, null, null, null, null],
        projected: [106, 121, 138, 159, 177, 196, 217, 241, 267, 297, 329],
        target: 329,
        todayIndex: 3,
        verticalBreakdown: {
            'IT Exports':  [67.64, 73.1,  78.9,  85.1,  93.6,  103.0, 113.3, 124.6, 137.1, 150.8, 165.8],
            'IT Domestic': [14.70, 15.6,  16.5,  17.5,  19.2,  21.2,  23.3,  25.6,  28.2,  31.0,  34.1],
            'ESDM':        [17.98, 22.8,  29.0,  36.7,  42.0,  48.1,  55.1,  63.1,  72.2,  82.7,  94.7],
            'Startups':    [4.00,  5.2,   6.76,  8.79,  10.0,  11.4,  13.0,  14.8,  16.9,  19.3,  22.0],
            'Digitizing':  [6.00,  9.45,  13.93, 20.23, 21.8,  23.6,  25.5,  27.5,  29.7,  32.1,  34.7]
        },
        source: 'NASSCOM Strategic Review 2025 + MeitY FY25 + revised conservative CAGRs (IT 10%, ESDM 14.5%, Digitizing 8%). Startup revenue excluded from total (double-counts with IT).',
        confidence: 4,
        note: 'FY21-22 actual base. FY24-25: IT/ESDM from NASSCOM/MeitY actuals, Digitizing from KDEM Excel. Startup revenue excluded from total to avoid double-counting with IT Exports/Domestic (NASSCOM figures include startup company revenues). Startups vertical breakdown retained for ecosystem tracking. FY25-32: revised per-vertical CAGRs benchmarked to industry consensus (NASSCOM, IDC, CareEdge). Timeline target: $329B by FY31-32.'
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
    // Startups excluded — revenue double-counts with IT Exports/Domestic
    return [
        { name: 'IT Exports', value: 165, color: '#E96337' },
        { name: 'IT Domestic', value: 34, color: '#E68634' },
        { name: 'ESDM', value: 95, color: '#5BB9EC' },
        { name: 'Digitizing', value: 35, color: '#10B981' },
        { name: 'Total Target', value: 0, isTotal: true }
    ]
}

export function getRevenueSankeyData() {
    // Startups excluded — revenue double-counts with IT Exports/Domestic
    return {
        nodes: [
            { name: '$329B Target', id: 'total', color: '#202124' },
            { name: 'IT Exports ($165B)', id: 'it-exports' },
            { name: 'ESDM ($95B)', id: 'esdm' },
            { name: 'IT Domestic ($34B)', id: 'it-domestic' },
            { name: 'Digitizing ($35B)', id: 'digitizing-sectors' },
            { name: 'Bengaluru', id: 'bengaluru', color: '#374151' },
            { name: 'Mysuru', id: 'mysuru', color: '#6b7280' },
            { name: 'Mangaluru', id: 'mangaluru', color: '#6b7280' },
            { name: 'Hubballi-Dharwad', id: 'hubballi', color: '#6b7280' },
            { name: 'Other Clusters', id: 'others', color: '#9ca3af' }
        ],
        links: [
            // Total to verticals
            { source: '$329B Target', target: 'IT Exports ($165B)', value: 165 },
            { source: '$329B Target', target: 'ESDM ($95B)', value: 95 },
            { source: '$329B Target', target: 'IT Domestic ($34B)', value: 34 },
            { source: '$329B Target', target: 'Digitizing ($35B)', value: 35 },
            // IT Exports to geographies (96.7% Bengaluru)
            { source: 'IT Exports ($165B)', target: 'Bengaluru', value: 159 },
            { source: 'IT Exports ($165B)', target: 'Mysuru', value: 2 },
            { source: 'IT Exports ($165B)', target: 'Mangaluru', value: 2 },
            { source: 'IT Exports ($165B)', target: 'Other Clusters', value: 2 },
            // ESDM to geographies
            { source: 'ESDM ($95B)', target: 'Bengaluru', value: 57 },
            { source: 'ESDM ($95B)', target: 'Mysuru', value: 11 },
            { source: 'ESDM ($95B)', target: 'Hubballi-Dharwad', value: 9 },
            { source: 'ESDM ($95B)', target: 'Mangaluru', value: 7 },
            { source: 'ESDM ($95B)', target: 'Other Clusters', value: 11 },
            // IT Domestic
            { source: 'IT Domestic ($34B)', target: 'Bengaluru', value: 28 },
            { source: 'IT Domestic ($34B)', target: 'Other Clusters', value: 6 },
            // Digitizing
            { source: 'Digitizing ($35B)', target: 'Bengaluru', value: 18 },
            { source: 'Digitizing ($35B)', target: 'Mysuru', value: 4 },
            { source: 'Digitizing ($35B)', target: 'Hubballi-Dharwad', value: 3 },
            { source: 'Digitizing ($35B)', target: 'Other Clusters', value: 10 }
        ],
        source: 'KDEM Target Database + Apportionment Rules (Startups excluded — double-counts with IT)',
        confidence: 3
    }
}

export function getRevenueTreemapData() {
    // Startups excluded — revenue double-counts with IT Exports/Domestic
    return [
        {
            name: 'IT Exports',
            value: 165,
            color: '#E96337',
            children: [
                { name: 'IT Services', value: 94 },
                { name: 'BPM', value: 32 },
                { name: 'GCCs', value: 24 },
                { name: 'ER&D', value: 15 }
            ]
        },
        {
            name: 'ESDM',
            value: 95,
            color: '#5BB9EC',
            children: [
                { name: 'Semiconductor Design', value: 38 },
                { name: 'Consumer Electronics', value: 23 },
                { name: 'Industrial Electronics', value: 18 },
                { name: 'Components', value: 16 }
            ]
        },
        {
            name: 'Digitizing Sectors',
            value: 35,
            color: '#10B981',
            children: [
                { name: 'Business Digitization & IoT', value: 7.2 },
                { name: 'Flow-based Lending', value: 4.9 },
                { name: 'Digital Communication', value: 3.4 },
                { name: 'Transport & Logistics', value: 2.7 },
                { name: 'Govt e-Marketplace', value: 2.6 },
                { name: 'Digital Payments', value: 2.2 },
                { name: 'Direct Benefit Transfer', value: 2.0 },
                { name: 'Education Platforms', value: 1.9 },
                { name: 'E-Commerce Supply Chain', value: 1.5 },
                { name: 'Retail Supply Chain', value: 1.5 },
                { name: 'Farmer Finance', value: 1.2 },
                { name: 'Power Distribution', value: 1.2 },
                { name: 'Agri Marketplace', value: 1.2 },
                { name: 'Precision Agriculture', value: 1.0 },
                { name: 'Healthcare', value: 0.2 },
                { name: 'Talent Platforms', value: 0.1 },
                { name: 'Smart Grids', value: 0.1 }
            ]
        },
        {
            name: 'IT Domestic',
            value: 34,
            color: '#E68634',
            children: [
                { name: 'Enterprise IT', value: 16 },
                { name: 'Government IT', value: 10 },
                { name: 'Digital Services', value: 8 }
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
