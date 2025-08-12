// Global variables
let currentTheme = localStorage.getItem("theme") || "light"
const particles = []
let animationsEnabled = true
let particlesEnabled = true

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Set initial theme
  document.documentElement.setAttribute("data-theme", currentTheme)
  updateThemeIcon()

  // Initialize components
  initializeNavigation()
  initializeSearch()
  initializeThemeToggle()
  initializeParticles()
  initializeCursorTrail()
  initializeAnimations()
  initializeCharts()
  initializeSettings()
  initializeTooltips()
  initializeMagneticButtons()

  // Show loading screen and then hide it
  showLoadingScreen()

  // Simulate loading time
  setTimeout(() => {
    hideLoadingScreen()
  }, 3000)
}

// Loading Screen
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen")
  const progressBar = loadingScreen.querySelector(".progress-bar")

  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 15
    if (progress >= 100) {
      progress = 100
      clearInterval(interval)
    }
    progressBar.style.width = progress + "%"
  }, 200)
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen")
  const mainContainer = document.getElementById("mainContainer")

  loadingScreen.classList.add("hidden")
  mainContainer.style.display = "flex"

  // Trigger entrance animations
  setTimeout(() => {
    triggerEntranceAnimations()
  }, 500)
}

// Navigation
function initializeNavigation() {
  const navItems = document.querySelectorAll(".nav-item")
  const tabContents = document.querySelectorAll(".tab-content")
  const navIndicator = document.querySelector(".nav-indicator")

  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Remove active class from all items and contents
      navItems.forEach((nav) => nav.classList.remove("active"))
      tabContents.forEach((tab) => tab.classList.remove("active"))

      // Add active class to clicked item and corresponding content
      item.classList.add("active")
      const tabId = item.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")

      // Update indicator position
      updateNavIndicator(item)

      // Show toast notification
      showToast(`Chuyển đến ${item.querySelector("span").textContent}`, "success")
    })
  })

  // Set initial indicator position
  const activeItem = document.querySelector(".nav-item.active")
  if (activeItem) {
    updateNavIndicator(activeItem)
  }
}

function updateNavIndicator(activeItem) {
  const indicator = document.querySelector(".nav-indicator")
  const rect = activeItem.getBoundingClientRect()
  const navRect = activeItem.parentElement.getBoundingClientRect()

  indicator.style.width = rect.width + "px"
  indicator.style.height = rect.height + "px"
  indicator.style.left = rect.left - navRect.left + "px"
  indicator.style.top = rect.top - navRect.top + "px"
}

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById("searchInput")
  const searchSuggestions = document.getElementById("searchSuggestions")

  const suggestions = [
  ]

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase()

    if (query.length > 0) {
      const filtered = suggestions.filter((item) => item.toLowerCase().includes(query))

      if (filtered.length > 0) {
        showSearchSuggestions(filtered)
      } else {
        hideSearchSuggestions()
      }
    } else {
      hideSearchSuggestions()
    }
  })

  searchInput.addEventListener("blur", () => {
    setTimeout(() => hideSearchSuggestions(), 200)
  })

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      performSearch(searchInput.value)
      hideSearchSuggestions()
    }
  })
}

function showSearchSuggestions(suggestions) {
  const container = document.getElementById("searchSuggestions")
  container.innerHTML = ""

  suggestions.forEach((suggestion) => {
    const item = document.createElement("div")
    item.className = "suggestion-item"
    item.textContent = suggestion
    item.addEventListener("click", () => {
      performSearch(suggestion)
      hideSearchSuggestions()
    })
    container.appendChild(item)
  })

  container.style.display = "block"
}

function hideSearchSuggestions() {
  document.getElementById("searchSuggestions").style.display = "none"
}

function performSearch(query) {
  showToast(`Tìm kiếm: ${query}`, "success")
  document.getElementById("searchInput").value = query
}

// Theme Toggle
function initializeThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")

  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", currentTheme)
    localStorage.setItem("theme", currentTheme)
    updateThemeIcon()

    // Add transition effect
    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease"
    setTimeout(() => {
      document.body.style.transition = ""
    }, 300)

    showToast(`Chuyển sang chế độ ${currentTheme === "dark" ? "tối" : "sáng"}`, "success")
  })
}

function updateThemeIcon() {
  const icon = document.querySelector("#themeToggle i")
  icon.className = currentTheme === "light" ? "fas fa-moon" : "fas fa-sun"
}

// Particle System
function initializeParticles() {
  if (!particlesEnabled) return

  const container = document.querySelector(".particle-container")

  function createParticle() {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random position and properties
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDuration = Math.random() * 3 + 3 + "s"
    particle.style.opacity = Math.random() * 0.5 + 0.3
    particle.style.transform = `scale(${Math.random() * 0.5 + 0.5})`

    // Random color
    const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981"]
    particle.style.background = colors[Math.floor(Math.random() * colors.length)]

    container.appendChild(particle)

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 6000)
  }

  // Create particles periodically
  setInterval(createParticle, 300)
}

// Cursor Trail
function initializeCursorTrail() {
  const trail = document.querySelector(".cursor-trail")
  let mouseX = 0,
    mouseY = 0
  let trailX = 0,
    trailY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    trail.style.opacity = "1"
    trail.style.transform = "scale(1)"
  })

  document.addEventListener("mouseleave", () => {
    trail.style.opacity = "0"
    trail.style.transform = "scale(0)"
  })

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.1
    trailY += (mouseY - trailY) * 0.1

    trail.style.left = trailX - 10 + "px"
    trail.style.top = trailY - 10 + "px"

    requestAnimationFrame(animateTrail)
  }

  animateTrail()
}

// Animations
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Observe elements for scroll animations
  document.querySelectorAll(".feature-card, .tool-card, .analytics-card").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

function triggerEntranceAnimations() {
  // Animate text reveals
  document.querySelectorAll(".text-reveal").forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, index * 200)
  })
}

// Charts (Simple canvas-based charts)
function initializeCharts() {
  drawVisitsChart()
  drawUsersChart()
}

function drawVisitsChart() {
  const canvas = document.getElementById("visitsChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const width = canvas.width
  const height = canvas.height

  // Sample data
  const data = [20, 45, 30, 60, 40, 80, 65, 90, 70, 85]
  const max = Math.max(...data)

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Draw line
  ctx.beginPath()
  ctx.strokeStyle = "#6366f1"
  ctx.lineWidth = 3
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  data.forEach((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - (value / max) * height

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.stroke()

  // Draw gradient fill
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, "rgba(99, 102, 241, 0.3)")
  gradient.addColorStop(1, "rgba(99, 102, 241, 0)")

  ctx.fillStyle = gradient
  ctx.fill()
}

function drawUsersChart() {
  const canvas = document.getElementById("usersChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const width = canvas.width
  const height = canvas.height

  // Sample data
  const data = [15, 25, 35, 45, 30, 50, 40, 60, 55, 70]
  const max = Math.max(...data)

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Draw bars
  const barWidth = width / data.length

  data.forEach((value, index) => {
    const barHeight = (value / max) * height
    const x = index * barWidth
    const y = height - barHeight

    // Create gradient for each bar
    const gradient = ctx.createLinearGradient(0, y, 0, height)
    gradient.addColorStop(0, "#8b5cf6")
    gradient.addColorStop(1, "#6366f1")

    ctx.fillStyle = gradient
    ctx.fillRect(x + 2, y, barWidth - 4, barHeight)
  })
}

// Settings
function initializeSettings() {
  // Dark mode toggle in settings
  const darkModeToggle = document.getElementById("darkModeToggle")
  darkModeToggle.checked = currentTheme === "dark"

  darkModeToggle.addEventListener("change", (e) => {
    currentTheme = e.target.checked ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", currentTheme)
    localStorage.setItem("theme", currentTheme)
    updateThemeIcon()
  })

  // Animations toggle
  const animationsToggle = document.getElementById("animationsToggle")
  animationsToggle.addEventListener("change", (e) => {
    animationsEnabled = e.target.checked
    document.body.style.setProperty("--transition-fast", animationsEnabled ? "0.2s ease" : "0s")
    document.body.style.setProperty("--transition-normal", animationsEnabled ? "0.3s ease" : "0s")
    document.body.style.setProperty("--transition-slow", animationsEnabled ? "0.5s ease" : "0s")

    showToast(`Hiệu ứng động ${animationsEnabled ? "bật" : "tắt"}`, "success")
  })

  // Particles toggle
  const particlesToggle = document.getElementById("particlesToggle")
  particlesToggle.addEventListener("change", (e) => {
    particlesEnabled = e.target.checked
    const container = document.querySelector(".particle-container")
    container.style.display = particlesEnabled ? "block" : "none"

    showToast(`Particle effects ${particlesEnabled ? "bật" : "tắt"}`, "success")
  })

  // Other settings toggles
  document.querySelectorAll(".toggle-switch input").forEach((toggle) => {
    toggle.addEventListener("change", (e) => {
      const label = e.target.parentElement.parentElement.querySelector("label").textContent
      showToast(`${label} ${e.target.checked ? "bật" : "tắt"}`, "success")
    })
  })

  // Quality select
  const qualitySelect = document.querySelector(".setting-select")
  qualitySelect.addEventListener("change", (e) => {
    showToast(`Chất lượng hiệu ứng: ${e.target.value}`, "success")
  })
}

// Filter functionality
function initializeFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const toolCards = document.querySelectorAll(".tool-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")

      toolCards.forEach((card) => {
        const category = card.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          card.style.display = "block"
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"

          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(-20px)"

          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })

      showToast(`Lọc: ${btn.textContent}`, "success")
    })
  })
}

// Initialize filters when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeFilters()
})

// Toast notifications
// function showToast(message, type = "success") {
//   const container = document.getElementById("toastContainer")
//   const toast = document.createElement("div")
//   toast.className = `toast ${type}`

//   const icon =
//     type === "success" ? "fas fa-check-circle" : type === "error" ? "fas fa-exclamation-circle" : "fas fa-info-circle"

//   toast.innerHTML = `
//         <i class="${icon}"></i>
//         <span>${message}</span>
//     `

//   container.appendChild(toast)

//   // Auto remove after 3 seconds
//   setTimeout(() => {
//     toast.style.animation = "slideOutRight 0.3s ease forwards"
//     setTimeout(() => {
//       if (toast.parentNode) {
//         toast.parentNode.removeChild(toast)
//       }
//     }, 300)
//   }, 3000)
// }

// Modal functionality
function showModal(title, content) {
  const modal = document.getElementById("modalOverlay")
  const modalTitle = document.getElementById("modalTitle")
  const modalBody = document.getElementById("modalBody")

  modalTitle.textContent = title
  modalBody.innerHTML = content
  modal.classList.add("active")

  // Close modal handlers
  const closeBtn = document.getElementById("modalClose")
  closeBtn.onclick = hideModal

  modal.onclick = (e) => {
    if (e.target === modal) {
      hideModal()
    }
  }

  document.addEventListener("keydown", function escHandler(e) {
    if (e.key === "Escape") {
      hideModal()
      document.removeEventListener("keydown", escHandler)
    }
  })
}

function hideModal() {
  const modal = document.getElementById("modalOverlay")
  modal.classList.remove("active")
}

// Tooltips
function initializeTooltips() {
  const elements = document.querySelectorAll("[data-tooltip]")

  elements.forEach((el) => {
    el.addEventListener("mouseenter", (e) => {
      const tooltip = document.createElement("div")
      tooltip.className = "tooltip"
      tooltip.textContent = el.getAttribute("data-tooltip")
      document.body.appendChild(tooltip)

      const rect = el.getBoundingClientRect()
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px"
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px"
    })

    el.addEventListener("mouseleave", () => {
      const tooltip = document.querySelector(".tooltip")
      if (tooltip) {
        tooltip.remove()
      }
    })
  })
}

// Magnetic buttons
function initializeMagneticButtons() {
  const magneticBtns = document.querySelectorAll(".magnetic-btn")

  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`
    })

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0) scale(1)"
    })
  })
}

// Tool card interactions
document.addEventListener("DOMContentLoaded", () => {
  const toolCards = document.querySelectorAll(".tool-card")

  toolCards.forEach((card) => {
    const launchBtn = card.querySelector(".tool-launch-btn")
    const toolActions = card.querySelectorAll(".tool-action")

    launchBtn.addEventListener("click", () => {
      const toolName = card.querySelector(".tool-title").textContent
      showModal(
        `${toolName}`,
        `
                <div style="text-align: center; padding: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        <i class="fas fa-tools"></i>
                    </div>
                    <h3 style="margin-bottom: 1rem;">${toolName}</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">Công cụ này sẽ được khởi chạy trong tab mới.</p>
                    <button onclick="hideModal()" style="padding: 0.75rem 2rem; background: var(--gradient-primary); color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
                        Đóng
                    </button>
                </div>
            `,
      )
    })

    toolActions.forEach((action) => {
      action.addEventListener("click", (e) => {
        e.stopPropagation()
        const icon = action.querySelector("i")

        if (icon.classList.contains("fa-heart")) {
          icon.classList.toggle("fas")
          icon.classList.toggle("far")
          const liked = icon.classList.contains("fas")
          showToast(liked ? "Đã thêm vào yêu thích" : "Đã xóa khỏi yêu thích", "success")
        } else if (icon.classList.contains("fa-share")) {
          showToast("Đã sao chép link chia sẻ", "success")
        }
      })
    })
  })
})

// Date range picker
document.addEventListener("DOMContentLoaded", () => {
  const dateBtns = document.querySelectorAll(".date-btn")

  dateBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      dateBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Simulate data refresh
      showToast(`Cập nhật dữ liệu ${btn.textContent}`, "success")

      // Redraw charts with new data
      setTimeout(() => {
        drawVisitsChart()
        drawUsersChart()
      }, 500)
    })
  })
})

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault()
    document.getElementById("searchInput").focus()
  }

  // Ctrl/Cmd + D for theme toggle
  if ((e.ctrlKey || e.metaKey) && e.key === "d") {
    e.preventDefault()
    document.getElementById("themeToggle").click()
  }

  // Number keys for tab navigation
  if (e.key >= "1" && e.key <= "4") {
    const navItems = document.querySelectorAll(".nav-item")
    const index = Number.parseInt(e.key) - 1
    if (navItems[index]) {
      navItems[index].click()
    }
  }
})

// Performance monitoring
function monitorPerformance() {
  // Monitor FPS
  let fps = 0
  let lastTime = performance.now()

  function countFPS() {
    const currentTime = performance.now()
    fps = 1000 / (currentTime - lastTime)
    lastTime = currentTime

    // Log performance issues
    if (fps < 30) {
      console.warn("Low FPS detected:", fps)
    }

    requestAnimationFrame(countFPS)
  }

  countFPS()

  // Monitor memory usage (if available)
  if (performance.memory) {
    setInterval(() => {
      const memory = performance.memory
      if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
        console.warn("High memory usage detected")
      }
    }, 5000)
  }
}

// Initialize performance monitoring
monitorPerformance()

// Service Worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Add CSS animation classes dynamically
const style = document.createElement("style")
style.textContent = `
    @keyframes slideOutRight {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .tooltip {
        position: absolute;
        background: var(--bg-primary);
        color: var(--text-primary);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--border-color);
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        animation: fadeIn 0.2s ease forwards;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
`
document.head.appendChild(style)

// Export functions for global access
window.showToast = showToast
window.showModal = showModal
window.hideModal = hideModal
