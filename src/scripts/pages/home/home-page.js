import { HomePresenter } from "../../presenters/home-presenter.js";
import {
  initMap,
  addMarker,
  clearMarkers,
  fitMapToMarkers,
} from "../../utils/map-utils.js";

export default class HomePage {
  constructor() {
    this.presenter = new HomePresenter(this);
    this.isLoading = false;
    this.currentStories = [];
    this.currentFilter = "all";
    this.isInfiniteScrollEnabled = true;
    this.page = 1;
  }

  async render() {
    return `
      <div class="homepage-container">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">
              <span class="gradient-text">Stories</span> 
              <span class="sparkle">✨</span>
            </h1>
            <p class="hero-subtitle">Temukan cerita-cerita menakjubkan dari seluruh dunia 🌍</p>
            
            <!-- Search & Filter -->
            <div class="search-container">
              <div class="search-input-wrapper">
                <input type="text" id="story-search" placeholder="Cari cerita..." />
                <button class="search-btn" id="search-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </div>
              
              <div class="filter-tabs">
                <button class="filter-tab active" data-filter="all">Semua ✨</button>
                <button class="filter-tab" data-filter="recent">Terbaru 🔥</button>
                <button class="filter-tab" data-filter="location">Ada Lokasi 📍</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Stories Section -->
        <section class="stories-section">
          <div class="section-header">
            <h2 class="section-title">Cerita Terbaru</h2>
            <div class="story-stats" id="story-stats">
              <span class="stat-item">📚 <span id="total-stories">0</span> cerita</span>
              <span class="stat-item">🌍 <span id="stories-with-location">0</span> dengan lokasi</span>
            </div>
          </div>

          <!-- Loading Indicator -->
          <div id="loading-indicator" class="loading-skeleton">
            <div class="story-skeleton">
              <div class="skeleton-image"></div>
              <div class="skeleton-content">
                <div class="skeleton-line skeleton-title"></div>
                <div class="skeleton-line skeleton-text"></div>
                <div class="skeleton-line skeleton-text short"></div>
              </div>
            </div>
            <div class="story-skeleton">
              <div class="skeleton-image"></div>
              <div class="skeleton-content">
                <div class="skeleton-line skeleton-title"></div>
                <div class="skeleton-line skeleton-text"></div>
                <div class="skeleton-line skeleton-text short"></div>
              </div>
            </div>
            <div class="story-skeleton">
              <div class="skeleton-image"></div>
              <div class="skeleton-content">
                <div class="skeleton-line skeleton-title"></div>
                <div class="skeleton-line skeleton-text"></div>
                <div class="skeleton-line skeleton-text short"></div>
              </div>
            </div>
          </div>

          <!-- Stories Grid -->
          <div id="story-list" class="story-grid"></div>
          
          <!-- Load More Button -->
          <div class="load-more-container" id="load-more-container" style="display: none;">
            <button class="load-more-btn" id="load-more-btn">
              <span class="btn-text">Muat Lebih Banyak</span>
              <span class="btn-icon">⬇️</span>
            </button>
          </div>

          <!-- Empty State -->
          <div id="empty-state" class="empty-state" style="display: none;">
            <div class="empty-illustration">📭</div>
            <h3>Tidak Ada Cerita</h3>
            <p>Coba sesuaikan kriteria pencarian atau filter Anda</p>
          </div>
        </section>

        <!-- Map Section -->
        <section class="map-section">
          <div class="section-header">
            <h2 class="section-title">Lokasi Cerita</h2>
            <p class="section-subtitle">Jelajahi dari mana cerita-cerita menakjubkan ini berasal</p>
          </div>
          <div class="map-container">
            <div id="map" class="story-map"></div>
            <div class="map-overlay" id="map-overlay">
              <div class="map-legend">
                <div class="legend-item">
                  <span class="legend-marker">📍</span>
                  <span>Lokasi Cerita</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Error Message -->
        <div id="error-message" class="error-toast">
          <div class="toast-content">
            <span class="toast-icon">⚠️</span>
            <span class="toast-message" id="error-text"></span>
            <button class="toast-close" id="error-close">×</button>
          </div>
        </div>
      </div>

      <style>
        /* Homepage Styles */
        .homepage-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 0;
          overflow-x: hidden;
        }

        /* Hero Section */
        .hero-section {
          padding: 80px 20px 60px;
          text-align: center;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
          background-size: 50px 50px;
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 20px;
          color: white;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }

        .gradient-text {
          background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .sparkle {
          display: inline-block;
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 40px;
          font-weight: 400;
        }

        /* Search & Filter */
        .search-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .search-input-wrapper {
          position: relative;
          margin-bottom: 24px;
        }

        #story-search {
          width: 100%;
          padding: 16px 60px 16px 24px;
          border: none;
          border-radius: 50px;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        #story-search:focus {
          outline: none;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          background: white;
        }

        .search-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-btn:hover {
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .filter-tabs {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: 12px 24px;
          border: none;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .filter-tab:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .filter-tab.active {
          background: white;
          color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Stories Section */
        .stories-section {
          background: #f8fafc;
          padding: 60px 20px;
          min-height: 60vh;
        }

        .section-header {
          max-width: 1200px;
          margin: 0 auto 40px;
          text-align: center;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 12px;
        }

        .story-stats {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stat-item {
          background: white;
          padding: 12px 20px;
          border-radius: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          font-weight: 500;
          color: #4a5568;
        }

        /* Loading Skeleton */
        .loading-skeleton {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .story-skeleton {
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .skeleton-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .skeleton-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skeleton-line {
          height: 16px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 8px;
        }

        .skeleton-title {
          height: 24px;
        }

        .skeleton-text.short {
          width: 60%;
        }

        @keyframes loading {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Story Grid */
        .story-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .story-item {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }

        .story-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .story-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .story-item:hover img {
          transform: scale(1.05);
        }

        .story-content {
          padding: 24px;
        }

        .story-item h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .story-item h3::before {
          content: '👤';
          font-size: 1rem;
        }

        .story-item p {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .story-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: #718096;
        }

        .story-item small {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #718096;
          font-size: 0.9rem;
        }

        .story-item small::before {
          content: '🕒';
        }

        .location-badge {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          margin-top: 8px;
          display: inline-block;
        }

        /* Load More */
        .load-more-container {
          text-align: center;
          margin-top: 40px;
        }

        .load-more-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .load-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #4a5568;
        }

        .empty-illustration {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
          color: #2d3748;
        }

        /* Map Section */
        .map-section {
          background: white;
          padding: 60px 20px;
        }

        .section-subtitle {
          color: #718096;
          font-size: 1.1rem;
          margin-top: 8px;
        }

        .map-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .story-map {
          height: 400px;
          width: 100%;
        }

        .map-overlay {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .map-legend {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: #4a5568;
        }

        .legend-marker {
          font-size: 1.2rem;
        }

        /* Error Toast */
        .error-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #fed7d7;
          color: #c53030;
          border: 1px solid #feb2b2;
          border-radius: 12px;
          padding: 0;
          max-width: 400px;
          transform: translateX(500px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          box-shadow: 0 10px 40px rgba(197, 48, 48, 0.2);
          display: none;
        }

        .error-toast.show {
          transform: translateX(0);
          opacity: 1;
          display: block;
        }

        .toast-content {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
        }

        .toast-icon {
          font-size: 1.2rem;
        }

        .toast-message {
          flex: 1;
          font-weight: 500;
        }

        .toast-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #c53030;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s ease;
        }

        .toast-close:hover {
          background-color: rgba(197, 48, 48, 0.1);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 16px 40px;
          }
          
          .stories-section {
            padding: 40px 16px;
          }
          
          .map-section {
            padding: 40px 16px;
          }
          
          .story-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .filter-tabs {
            gap: 8px;
          }
          
          .filter-tab {
            padding: 10px 16px;
            font-size: 0.9rem;
          }
          
          .map-overlay {
            position: static;
            margin-top: 16px;
            background: white;
          }
        }

        /* Animations */
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slide-up {
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>
    `;
  }

  async afterRender() {
    this.#setupEventListeners();
    this.#initializeMap();
    await this.presenter.loadStories();
  }

  #setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById("story-search");
    const searchButton = document.getElementById("search-button");

    searchInput?.addEventListener(
      "input",
      this.#debounce((e) => {
        this.#filterStories(e.target.value);
      }, 300)
    );

    searchButton?.addEventListener("click", () => {
      this.#filterStories(searchInput.value);
    });

    // Filter tabs
    document.querySelectorAll(".filter-tab").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        this.#setActiveFilter(e.target.dataset.filter);
      });
    });

    // Load more button
    const loadMoreBtn = document.getElementById("load-more-btn");
    loadMoreBtn?.addEventListener("click", () => {
      this.#loadMoreStories();
    });

    // Error toast close
    const errorClose = document.getElementById("error-close");
    errorClose?.addEventListener("click", () => {
      this.#hideError();
    });

    // Infinite scroll
    if (this.isInfiniteScrollEnabled) {
      window.addEventListener(
        "scroll",
        this.#debounce(() => {
          if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 1000
          ) {
            this.#loadMoreStories();
          }
        }, 200)
      );
    }
  }

  #initializeMap() {
    try {
      initMap("map");
      window.clearMarkers = clearMarkers;
      window.fitMapToMarkers = fitMapToMarkers;
    } catch (error) {
      console.error("Failed to initialize map:", error);
    }
  }

  #debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  #setActiveFilter(filter) {
    // Update active tab
    document.querySelectorAll(".filter-tab").forEach((tab) => {
      tab.classList.remove("active");
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add("active");

    this.currentFilter = filter;
    this.#applyCurrentFilter();
  }

  #filterStories(searchTerm) {
    const filteredStories = this.currentStories.filter(
      (story) =>
        story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.#renderStories(filteredStories);
  }

  #applyCurrentFilter() {
    let filteredStories = [...this.currentStories];

    switch (this.currentFilter) {
      case "recent":
        filteredStories = filteredStories
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
        break;
      case "location":
        filteredStories = filteredStories.filter((story) => story.hasLocation);
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    this.#renderStories(filteredStories);
  }

  #loadMoreStories() {
    if (this.isLoading) return;

    this.page++;
    // This would typically trigger a call to load more data
    // For now, we'll just hide the load more button
    const loadMoreContainer = document.getElementById("load-more-container");
    if (loadMoreContainer) {
      loadMoreContainer.style.display = "none";
    }
  }

  #hideError() {
    const errorToast = document.getElementById("error-message");
    if (errorToast) {
      errorToast.classList.remove("show");
    }
  }

  #formatDate(dateString) {
    console.log("Date input:", dateString, typeof dateString);

    if (!dateString) {
      return "Tanggal tidak tersedia";
    }

    const date = new Date(dateString);
    console.log("Parsed date:", date, "Valid:", !isNaN(date.getTime()));

    if (isNaN(date.getTime())) {
      return `${dateString}`;
    }

    // Rest of your original code...
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Hari ini";
    if (diffInDays === 1) return "Kemarin";
    if (diffInDays < 7) return `${diffInDays} hari yang lalu`;
    if (diffInDays < 30)
      return `${Math.floor(diffInDays / 7)} minggu yang lalu`;

    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  #renderStories(stories) {
    const storyList = document.getElementById("story-list");
    const emptyState = document.getElementById("empty-state");

    if (!storyList) return;

    if (stories.length === 0) {
      storyList.style.display = "none";
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    storyList.style.display = "grid";
    storyList.innerHTML = "";

    stories.forEach((story, index) => {
      const item = document.createElement("div");
      item.className = "story-item fade-in";
      item.style.animationDelay = `${index * 0.1}s`;

      item.innerHTML = `
        <img src="${story.photoUrl}" alt="Foto oleh ${story.name}" 
             loading="lazy" 
             onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 300\"><rect width=\"400\" height=\"300\" fill=\"%23f7fafc\"/><text x=\"200\" y=\"150\" text-anchor=\"middle\" fill=\"%23a0aec0\" font-family=\"system-ui\" font-size=\"16\"><text></svg>
        <div class="story-content">
          <h3>${story.name}</h3>
          <p>${story.description}</p>
          <div class="story-meta">
            <small>${this.#formatDate(story.createdAt)}</small>
            ${
              story.hasLocation
                ? '<span class="location-badge">📍 Ada Lokasi</span>'
                : ""
            }
          </div>
        </div>
      `;

      storyList.appendChild(item);
    });

    // Show load more button if there are more stories
    const loadMoreContainer = document.getElementById("load-more-container");
    if (loadMoreContainer && stories.length >= 10) {
      loadMoreContainer.style.display = "block";
    }
  }

  #updateStats(stories) {
    const totalStoriesEl = document.getElementById("total-stories");
    const storiesWithLocationEl = document.getElementById(
      "stories-with-location"
    );

    if (totalStoriesEl) {
      totalStoriesEl.textContent = stories.length;
    }

    if (storiesWithLocationEl) {
      const locationCount = stories.filter((story) => story.hasLocation).length;
      storiesWithLocationEl.textContent = locationCount;
    }
  }

  // View interface methods (keeping original functionality)
  showLoading() {
    this.isLoading = true;
    const loadingIndicator = document.getElementById("loading-indicator");
    const storyList = document.getElementById("story-list");
    const emptyState = document.getElementById("empty-state");

    if (loadingIndicator) loadingIndicator.style.display = "grid";
    if (storyList) storyList.style.display = "none";
    if (emptyState) emptyState.style.display = "none";
  }

  hideLoading() {
    this.isLoading = false;
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }
  }

  displayStories(stories) {
    this.currentStories = stories;
    this.#updateStats(stories);
    this.#applyCurrentFilter();
  }

  displayStoriesOnMap(storiesWithLocation) {
    try {
      // Clear existing markers first
      if (window.clearMarkers) {
        clearMarkers();
      }

      storiesWithLocation.forEach((story) => {
        // Handle different possible property names for coordinates
        const lat = story.lat || story.latitude || story.location?.lat;
        const lon =
          story.lon || story.longitude || story.lng || story.location?.lng;

        if (lat && lon) {
          addMarker(lat, lon, story.name, story);
          console.log(`Added marker for: ${story.name} at [${lat}, ${lon}]`);
        } else {
          console.warn(`Story "${story.name}" has no valid coordinates:`, {
            lat,
            lon,
          });
        }
      });

      // Fit map to show all markers
      if (window.fitMapToMarkers && storiesWithLocation.length > 0) {
        setTimeout(() => fitMapToMarkers(), 100);
      }
    } catch (error) {
      console.error("Failed to display stories on map:", error);
      this.showError("Gagal menampilkan lokasi cerita di peta");
    }
  }
  showError(message) {
    const errorToast = document.getElementById("error-message");
    const errorText = document.getElementById("error-text");

    if (errorToast && errorText) {
      errorText.textContent = message;
      errorToast.classList.add("show");

      // Auto hide after 5 seconds
      setTimeout(() => {
        this.#hideError();
      }, 5000);
    }

    // Clear story list and show empty state
    const storyList = document.getElementById("story-list");
    const emptyState = document.getElementById("empty-state");

    if (storyList) {
      storyList.innerHTML = "";
      storyList.style.display = "none";
    }

    if (emptyState) {
      emptyState.style.display = "block";
    }
  }
}
