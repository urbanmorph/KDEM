/**
 * KDEM Dashboard v3.0 - Main Application
 * Handles tab navigation, data loading, and UI rendering
 */

import { fetchVerticals, fetchGeographies, fetchFactors } from './services/dataService.js'
import { initAnimatedCounters } from './utils/formatting.js'
import { getKarnatakaBaseline } from './services/referenceData.js'
import { Chart } from './utils/chartSetup.js'

// State
let currentTab = 'overview'
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
        showLoading()
        await loadInitialData()

        const lastUpdatedEl = document.getElementById('last-updated-date')
        if (lastUpdatedEl) lastUpdatedEl.textContent = appData.lastUpdated

        const baseline = getKarnatakaBaseline()
        const brandSubtitle = document.getElementById('brand-subtitle')
        if (brandSubtitle) {
            brandSubtitle.textContent = `From $${baseline.currentTotalTechEconomy_USD_Bn}B Today to $${baseline.targetTotalTechEconomy_USD_Bn}B by 2032 — Digital Economy + Biotechnology`
        }

        setupEventListeners()
        await loadTab('overview')
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
    // Tab navigation (flat — no categories)
    const navButtons = document.querySelectorAll('.nav-btn')
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            loadTab(btn.dataset.tab)
        })
    })

    // Retry button
    const retryBtn = document.getElementById('retry-btn')
    if (retryBtn) {
        retryBtn.addEventListener('click', () => initApp())
    }

    // Scroll collapse behavior
    setupScrollCollapse()
}

/**
 * Setup scroll-based navigation collapse
 */
function setupScrollCollapse() {
    const tabNavContainer = document.querySelector('.tab-nav-container')
    const scrollThreshold = 100

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        if (scrollTop > scrollThreshold) {
            tabNavContainer.classList.add('collapsed')
        } else {
            tabNavContainer.classList.remove('collapsed')
        }
    })
}

/**
 * Load a specific tab
 */
async function loadTab(tabId) {
    console.log(`Loading tab: ${tabId}`)

    try {
        // Update active tab button
        const navButtons = document.querySelectorAll('.main-nav .nav-btn')
        navButtons.forEach(btn => {
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active')
            } else {
                btn.classList.remove('active')
            }
        })

        const contentContainer = document.getElementById('tab-content')
        showLoading()

        let content = ''

        switch(tabId) {
            case 'overview': {
                const { renderOverviewTab } = await import('./tabs/overview.js')
                content = await renderOverviewTab(appData)
                break
            }

            case 'clusters': {
                const { renderGeographyTab } = await import('./tabs/geography.js')
                content = await renderGeographyTab('clusters', appData)
                break
            }

            case 'biotechnology': {
                const { renderBiotechnologyTab } = await import('./tabs/biotechnology.js')
                content = await renderBiotechnologyTab(appData)
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

        contentContainer.innerHTML = content

        // Show content BEFORE chart init — ECharts needs visible containers
        hideLoading()
        void contentContainer.offsetHeight

        initAnimatedCounters(contentContainer)

        if (typeof window.__kdem_initCharts === 'function') {
            window.__kdem_initCharts()
            window.__kdem_initCharts = null

            // Resize Chart.js instances after grid layout settles
            // Side-by-side charts in CSS grid may not have final width at init time
            requestAnimationFrame(() => {
                const canvases = contentContainer.querySelectorAll('canvas')
                canvases.forEach(c => {
                    const chartInstance = Chart.getChart(c)
                    if (chartInstance) chartInstance.resize()
                })
            })
        }

        currentTab = tabId
        window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (error) {
        console.error(`Error loading tab ${tabId}:`, error)

        if (error.message && error.message.includes('dynamically imported module')) {
            console.warn('Stale deployment detected, reloading...')
            window.location.reload()
            return
        }

        showError(`Failed to load ${tabId} tab. ${error.message}`)
    }
}

function showLoading() {
    const loadingEl = document.getElementById('loading-state')
    const errorEl = document.getElementById('error-state')
    const contentEl = document.getElementById('tab-content')

    if (loadingEl) loadingEl.style.display = 'flex'
    if (errorEl) errorEl.style.display = 'none'
    if (contentEl) contentEl.style.display = 'none'
}

function hideLoading() {
    const loadingEl = document.getElementById('loading-state')
    const contentEl = document.getElementById('tab-content')

    if (loadingEl) loadingEl.style.display = 'none'
    if (contentEl) contentEl.style.display = 'block'
}

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
    currentTab: () => currentTab
}
