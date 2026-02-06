/**
 * KDEM Dashboard v3.0 - Main Application
 * Handles tab navigation, data loading, and UI rendering
 */

import { fetchVerticals, fetchGeographies, fetchFactors } from './services/dataService.js'
import { initAnimatedCounters } from './utils/formatting.js'

// Tab renderers are now loaded dynamically on-demand to reduce initial bundle size
// This improves initial page load performance by code splitting

// State
let currentTab = 'overview'
let currentCategory = 'strategy'
let appData = {
    verticals: [],
    geographies: [],
    factors: [],
    lastUpdated: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

/**
 * Initialize the application
 */
async function initApp() {
    console.log('Initializing KDEM Dashboard v3.0...')

    try {
        // Show loading state
        showLoading()

        // Load initial data
        await loadInitialData()

        // Update last updated date
        document.getElementById('last-updated-date').textContent = appData.lastUpdated

        // Setup event listeners
        setupEventListeners()

        // Load initial tab
        await loadTab('overview')

        // Hide loading, show content
        hideLoading()

        console.log('Dashboard initialized successfully')
    } catch (error) {
        console.error('Failed to initialize dashboard:', error)
        showError(error.message)
    }
}

/**
 * Load initial data from Supabase
 */
async function loadInitialData() {
    console.log('Loading initial data from Supabase...')

    try {
        // Load dimension data in parallel
        const [verticals, geographies, factors] = await Promise.all([
            fetchVerticals(),
            fetchGeographies(),
            fetchFactors()
        ])

        appData.verticals = verticals
        appData.geographies = geographies
        appData.factors = factors

        console.log(`Loaded ${verticals.length} verticals, ${geographies.length} geographies, ${factors.length} factors`)
    } catch (error) {
        console.error('Error loading initial data:', error)
        throw new Error('Failed to load dashboard data. Please check your connection and try again.')
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Category navigation
    const categoryButtons = document.querySelectorAll('.category-btn')
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category
            switchCategory(category)
        })
    })

    // Tab navigation
    const navButtons = document.querySelectorAll('.nav-btn')
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab
            loadTab(tabId)
        })
    })

    // Retry button
    const retryBtn = document.getElementById('retry-btn')
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            initApp()
        })
    }

    // Scroll collapse behavior
    setupScrollCollapse()

    // Mobile hamburger menu
    setupMobileMenu()
}

/**
 * Switch between categories and show appropriate tabs
 */
function switchCategory(category) {
    console.log(`Switching to category: ${category}`)

    // Update current category FIRST before loading tab
    currentCategory = category

    // Update active category button
    const categoryButtons = document.querySelectorAll('.category-btn')
    categoryButtons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active')
        } else {
            btn.classList.remove('active')
        }
    })

    // Show appropriate tab group and load first tab
    const tabGroups = document.querySelectorAll('.secondary-nav .tab-group')
    tabGroups.forEach(group => {
        if (group.dataset.category === category) {
            group.style.display = 'flex'

            // Load the first tab in this category
            const firstTab = group.querySelector('.nav-btn')
            if (firstTab) {
                loadTab(firstTab.dataset.tab)
            }
        } else {
            group.style.display = 'none'
        }
    })
}

/**
 * Setup scroll-based navigation collapse
 */
function setupScrollCollapse() {
    const tabNavContainer = document.querySelector('.tab-nav-container')
    let lastScrollTop = 0
    let scrollThreshold = 100 // Collapse after 100px scroll

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        if (scrollTop > scrollThreshold) {
            // Scrolled down past threshold - collapse
            tabNavContainer.classList.add('collapsed')
        } else {
            // At top of page - expand
            tabNavContainer.classList.remove('collapsed')
        }

        lastScrollTop = scrollTop
    })
}

/**
 * Load a specific tab
 */
async function loadTab(tabId) {
    console.log(`Loading tab: ${tabId}`)

    try {
        // Update active tab button within the current category
        const activeTabGroup = document.querySelector(`.secondary-nav .tab-group[data-category="${currentCategory}"]`)
        if (activeTabGroup) {
            const navButtons = activeTabGroup.querySelectorAll('.nav-btn')
            navButtons.forEach(btn => {
                if (btn.dataset.tab === tabId) {
                    btn.classList.add('active')
                } else {
                    btn.classList.remove('active')
                }
            })
        }

        // Get content container
        const contentContainer = document.getElementById('tab-content')

        // Show loading
        showLoading()

        // Render tab content based on tabId
        // Use dynamic imports to lazy-load tab components
        let content = ''

        switch(tabId) {
            case 'overview': {
                const { renderOverviewTab } = await import('./tabs/overview.js')
                content = await renderOverviewTab(appData)
                break
            }

            case 'it-exports': {
                const { renderVerticalTab } = await import('./tabs/vertical.js')
                content = await renderVerticalTab('it-exports', appData)
                break
            }

            case 'it-domestic': {
                const { renderVerticalTab } = await import('./tabs/vertical.js')
                content = await renderVerticalTab('it-domestic', appData)
                break
            }

            case 'esdm': {
                const { renderVerticalTab } = await import('./tabs/vertical.js')
                content = await renderVerticalTab('esdm', appData)
                break
            }

            case 'startups': {
                const { renderStartupsTab } = await import('./tabs/startups.js')
                content = await renderStartupsTab(appData)
                break
            }

            case 'bengaluru': {
                const { renderGeographyTab } = await import('./tabs/geography.js')
                content = await renderGeographyTab('bengaluru', appData)
                break
            }

            case 'clusters': {
                const { renderGeographyTab } = await import('./tabs/geography.js')
                content = await renderGeographyTab('clusters', appData)
                break
            }

            case 'factors': {
                const { renderFactorsTab } = await import('./tabs/factors.js')
                content = await renderFactorsTab(appData)
                break
            }

            case 'land': {
                const { renderLandTab } = await import('./tabs/land.js')
                content = await renderLandTab(appData)
                break
            }

            case 'labor': {
                const { renderLaborTab } = await import('./tabs/labor.js')
                content = await renderLaborTab(appData)
                break
            }

            case 'capital': {
                const { renderCapitalTab } = await import('./tabs/capital.js')
                content = await renderCapitalTab(appData)
                break
            }

            case 'organisation': {
                const { renderOrganisationTab } = await import('./tabs/organisation.js')
                content = await renderOrganisationTab(appData)
                break
            }

            case 'roadmap': {
                const { renderRoadmapTab } = await import('./tabs/roadmap.js')
                content = await renderRoadmapTab(appData)
                break
            }

            case 'sources': {
                const { renderSourcesTab } = await import('./tabs/sources.js')
                content = await renderSourcesTab(appData)
                break
            }

            default:
                content = '<h2>Tab not found</h2><p>This tab is under construction.</p>'
        }

        // Update content
        contentContainer.innerHTML = content

        // Initialize animated counters
        initAnimatedCounters(contentContainer)

        // Initialize charts if the tab exports an init function
        if (typeof window.__kdem_initCharts === 'function') {
            window.__kdem_initCharts()
            window.__kdem_initCharts = null
        }

        // Setup event listeners for view details links (in overview tab)
        setupViewDetailsLinks()

        // Hide loading, show content
        hideLoading()

        // Update current tab
        currentTab = tabId

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (error) {
        console.error(`Error loading tab ${tabId}:`, error)
        showError(`Failed to load ${tabId} tab. ${error.message}`)
    }
}

/**
 * Show loading state
 */
function showLoading() {
    const loadingEl = document.getElementById('loading-state')
    const errorEl = document.getElementById('error-state')
    const contentEl = document.getElementById('tab-content')

    if (loadingEl) loadingEl.style.display = 'flex'
    if (errorEl) errorEl.style.display = 'none'
    if (contentEl) contentEl.style.display = 'none'
}

/**
 * Hide loading state
 */
function hideLoading() {
    const loadingEl = document.getElementById('loading-state')
    const contentEl = document.getElementById('tab-content')

    if (loadingEl) loadingEl.style.display = 'none'
    if (contentEl) contentEl.style.display = 'block'
}

/**
 * Show error state
 */
function showError(message) {
    const loadingEl = document.getElementById('loading-state')
    const errorEl = document.getElementById('error-state')
    const contentEl = document.getElementById('tab-content')
    const errorMessageEl = document.getElementById('error-message')

    if (loadingEl) loadingEl.style.display = 'none'
    if (errorEl) errorEl.style.display = 'block'
    if (contentEl) contentEl.style.display = 'none'
    if (errorMessageEl) errorMessageEl.textContent = message
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp)
} else {
    initApp()
}

// Export for debugging
window.KDEM = {
    appData,
    loadTab,
    switchCategory,
    currentTab: () => currentTab,
    currentCategory: () => currentCategory
}

/**
 * Setup event listeners for "View Details" links in pillar cards
 */
function setupViewDetailsLinks() {
    const viewDetailsLinks = document.querySelectorAll('.view-details-link')
    viewDetailsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            const verticalId = link.dataset.vertical
            if (verticalId) {
                loadTab(verticalId)
            }
        })
    })
}

/**
 * Setup mobile hamburger menu
 */
function setupMobileMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn')
    const tabNavContainer = document.querySelector('.tab-nav-container')
    const navButtons = document.querySelectorAll('.nav-btn')
    const categoryButtons = document.querySelectorAll('.category-btn')

    if (!hamburgerBtn) return

    // Toggle menu on hamburger click
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        tabNavContainer.classList.toggle('mobile-menu-open')
    })

    // Close menu when a tab is clicked
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabNavContainer.classList.remove('mobile-menu-open')
        })
    })

    // Close menu when a category is clicked
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Don't close immediately on category click - let user see the tabs
            // Only close when they click a tab
        })
    })

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!tabNavContainer.contains(e.target)) {
            tabNavContainer.classList.remove('mobile-menu-open')
        }
    })
}
