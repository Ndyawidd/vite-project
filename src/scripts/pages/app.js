import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #currentPage = null;
  #loadingIndicator = null;
  #isNavigating = false;
  #touchStartX = 0;
  #touchStartY = 0;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#createLoadingIndicator();
    this.#setupDrawer();
    this.#setupPageCleanup();
    this.#setupGestures();
    this.#setupKeyboardNavigation();
    this.#setupProgressiveLoading();
    this.#addModernStyling();
  }

  #createLoadingIndicator() {
    // Create a modern loading spinner
    this.#loadingIndicator = document.createElement("div");
    this.#loadingIndicator.className = "loading-indicator";
    this.#loadingIndicator.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="loading-text">Loading...</div>
      </div>
    `;
    document.body.appendChild(this.#loadingIndicator);
  }

  #addModernStyling() {
    // Add modern CSS if not already present
    if (!document.querySelector("#modern-app-styles")) {
      const style = document.createElement("style");
      style.id = "modern-app-styles";
      style.textContent = `
        /* Loading Indicator */
        .loading-indicator {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .loading-indicator.show {
          opacity: 1;
          visibility: visible;
        }

        .loading-spinner {
          text-align: center;
          color: white;
        }

        .spinner-ring {
          width: 60px;
          height: 60px;
          border: 3px solid rgba(255, 255, 255, 0.2);
          border-top: 3px solid #fff;
          border-radius: 50%;
          margin: 0 auto 20px;
          animation: spin 1s linear infinite;
        }

        .loading-text {
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Navigation Drawer Enhancements */
        .navigation-drawer {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .navigation-drawer.open {
          transform: translateX(0);
        }

        .navigation-drawer a {
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .navigation-drawer a:hover {
          transform: translateX(8px);
        }

        .navigation-drawer a::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }

        .navigation-drawer a:hover::before {
          left: 100%;
        }

        /* Content Area */
        .content {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .content.page-transition {
          opacity: 0;
          transform: translateY(20px);
        }

        /* Drawer Button Animation */
        .drawer-button {
          transition: all 0.2s ease;
        }

        .drawer-button:hover {
          transform: scale(1.1);
        }

        .drawer-button:active {
          transform: scale(0.95);
        }

        /* Progress Bar */
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.3s ease;
          z-index: 10000;
        }

        .progress-bar.loading {
          animation: progressLoad 2s ease-in-out;
        }

        @keyframes progressLoad {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }

        /* Toast Notifications */
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 10001;
        }

        .toast {
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          margin-bottom: 10px;
          transform: translateX(400px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }

        .toast.show {
          transform: translateX(0);
          opacity: 1;
        }

        /* Accessibility Improvements */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Add progress bar
    if (!document.querySelector(".progress-bar")) {
      const progressBar = document.createElement("div");
      progressBar.className = "progress-bar";
      document.body.appendChild(progressBar);
    }

    // Add toast container
    if (!document.querySelector(".toast-container")) {
      const toastContainer = document.createElement("div");
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }
  }

  #setupDrawer() {
    // Enhanced drawer with modern interactions
    this.#drawerButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.#toggleDrawer();
      this.#hapticFeedback();
    });

    // Close drawer on outside click with improved detection
    document.addEventListener("click", (event) => {
      if (this.#navigationDrawer.classList.contains("open")) {
        if (
          !this.#navigationDrawer.contains(event.target) &&
          !this.#drawerButton.contains(event.target)
        ) {
          this.#closeDrawer();
        }
      }
    });

    // Close drawer when clicking navigation links
    this.#navigationDrawer.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        this.#closeDrawer();
        this.#showToast("Navigating...", "info");
      }
    });

    // Add escape key to close drawer
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        this.#navigationDrawer.classList.contains("open")
      ) {
        this.#closeDrawer();
      }
    });
  }

  #setupGestures() {
    // Touch gestures for mobile
    this.#navigationDrawer.addEventListener("touchstart", (e) => {
      this.#touchStartX = e.touches[0].clientX;
      this.#touchStartY = e.touches[0].clientY;
    });

    this.#navigationDrawer.addEventListener("touchmove", (e) => {
      if (!this.#touchStartX || !this.#touchStartY) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const diffX = this.#touchStartX - touchEndX;
      const diffY = this.#touchStartY - touchEndY;

      // Swipe left to close drawer
      if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
        this.#closeDrawer();
      }
    });

    this.#navigationDrawer.addEventListener("touchend", () => {
      this.#touchStartX = 0;
      this.#touchStartY = 0;
    });
  }

  #setupKeyboardNavigation() {
    // Enhanced keyboard navigation
    document.addEventListener("keydown", (event) => {
      // Ctrl/Cmd + M to toggle menu
      if ((event.ctrlKey || event.metaKey) && event.key === "m") {
        event.preventDefault();
        this.#toggleDrawer();
      }
    });
  }

  #setupProgressiveLoading() {
    // Preload next likely pages
    const links = this.#navigationDrawer.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        const href = link.getAttribute("href");
        if (href && routes[href.replace("#", "")]) {
          // Preload logic could go here
          console.log(`🚀 Preloading: ${href}`);
        }
      });
    });
  }

  #toggleDrawer() {
    this.#navigationDrawer.classList.toggle("open");
    const isOpen = this.#navigationDrawer.classList.contains("open");

    // Update ARIA attributes
    this.#drawerButton.setAttribute("aria-expanded", isOpen);
    this.#navigationDrawer.setAttribute("aria-hidden", !isOpen);

    if (isOpen) {
      // Focus first link when opened
      const firstLink = this.#navigationDrawer.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  }

  #closeDrawer() {
    this.#navigationDrawer.classList.remove("open");
    this.#drawerButton.setAttribute("aria-expanded", "false");
    this.#navigationDrawer.setAttribute("aria-hidden", "true");
  }

  #hapticFeedback() {
    // Modern haptic feedback for supported devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  #showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    const container = document.querySelector(".toast-container");
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  #showProgress() {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.classList.add("loading");
      progressBar.style.transform = "scaleX(1)";
    }
  }

  #hideProgress() {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.classList.remove("loading");
      progressBar.style.transform = "scaleX(0)";
    }
  }

  #showLoading() {
    this.#loadingIndicator.classList.add("show");
  }

  #hideLoading() {
    this.#loadingIndicator.classList.remove("show");
  }

  #setupPageCleanup() {
    // Enhanced cleanup with better error handling
    window.addEventListener("beforeunload", () => {
      this.#cleanupCurrentPage();
    });

    window.addEventListener("hashchange", () => {
      if (!this.#isNavigating) {
        this.#cleanupCurrentPage();
      }
    });
  }

  #cleanupCurrentPage() {
    if (
      this.#currentPage &&
      typeof this.#currentPage.beforeUnload === "function"
    ) {
      try {
        console.log("🧹 Cleaning up current page...");
        this.#currentPage.beforeUnload();
      } catch (error) {
        console.error("Error during page cleanup:", error);
      }
    }
  }

  async renderPage() {
    if (this.#isNavigating) return; // Prevent multiple simultaneous navigations

    this.#isNavigating = true;
    this.#showProgress();

    try {
      // Cleanup previous page
      this.#cleanupCurrentPage();

      const url = getActiveRoute();
      const page = routes[url];

      if (!page) {
        throw new Error(`Page not found: ${url}`);
      }

      // Store current page reference
      this.#currentPage = page;

      const updateContent = async () => {
        // Add transition class
        this.#content.classList.add("page-transition");

        // Small delay for smooth transition
        await new Promise((resolve) => setTimeout(resolve, 150));

        try {
          this.#content.innerHTML = await page.render();
          await page.afterRender();

          // Remove transition class
          this.#content.classList.remove("page-transition");

          console.log(`📄 Rendered page: ${url}`);
          this.#showToast(
            `Welcome to ${url.charAt(0).toUpperCase() + url.slice(1)}!`
          );
        } catch (error) {
          console.error("Error rendering page:", error);
          this.#content.innerHTML = `
            <div style="text-align: center; padding: 40px;">
              <h2>Oops! Something went wrong 😅</h2>
              <p>We couldn't load this page. Please try again!</p>
              <button onclick="location.reload()" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                margin-top: 20px;
              ">Refresh Page</button>
            </div>
          `;
          this.#showToast("Failed to load page", "error");
        }
      };

      // Use View Transition API if available
      if (document.startViewTransition) {
        await document.startViewTransition(updateContent);
      } else {
        await updateContent();
      }
    } catch (error) {
      console.error("Navigation error:", error);
      this.#showToast("Navigation failed", "error");
    } finally {
      this.#hideProgress();
      this.#isNavigating = false;
    }
  }

  // Public method to manually trigger navigation
  navigateTo(route) {
    window.location.hash = route;
    return this.renderPage();
  }

  // Public method to check if navigation is in progress
  isNavigating() {
    return this.#isNavigating;
  }
}

export default App;
