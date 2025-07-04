import { AboutPresenter } from "../../presenters/about-presenter.js";

export default class AboutPage {
  constructor() {
    this.presenter = new AboutPresenter(this);
    this.isLoading = false;
    this.statistics = null;
  }

  async render() {
    return `
      <div class="about-page-container">
        <!-- Hero Section -->
        <section class="about-hero">
          <div class="hero-content">
            <div class="hero-icon">
              <div class="icon-wrapper">
                <span class="main-icon">📱</span>
                <span class="floating-icon">✨</span>
              </div>
            </div>
            <h1 class="hero-title">
              <span class="gradient-text">Stories</span>
              <span class="subtitle">App</span>
            </h1>
            <p class="hero-description">
              Platform berbagi cerita dari seluruh dunia dengan teknologi lokasi interaktif
            </p>
          </div>
          <div class="hero-decoration">
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
            <div class="decoration-circle circle-3"></div>
          </div>
        </section>

        <!-- Main Content -->
        <section class="about-content">
          <div class="content-container">
            <!-- Application Info -->
            <div class="info-card main-info">
              <div class="card-header">
                <h2>
                  <span class="card-icon">🚀</span>
                  Tentang Aplikasi
                </h2>
              </div>
              <div class="card-body">
                <p class="lead-text">
                  Aplikasi ini merupakan platform inovatif yang memungkinkan pengguna untuk berbagi cerita-cerita menarik dari berbagai belahan dunia.
                </p>
                <div class="feature-list">
                  <div class="feature-item">
                    <span class="feature-icon">📍</span>
                    <div class="feature-content">
                      <h4>Lokasi Interaktif</h4>
                      <p>Setiap cerita dilengkapi dengan peta lokasi yang memungkinkan Anda menjelajahi dunia melalui cerita-cerita nyata.</p>
                    </div>
                  </div>
                  <div class="feature-item">
                    <span class="feature-icon">🌍</span>
                    <div class="feature-content">
                      <h4>Komunitas Global</h4>
                      <p>Bergabunglah dengan komunitas global dan temukan cerita-cerita menakjubkan dari berbagai budaya dan tempat.</p>
                    </div>
                  </div>
                  <div class="feature-item">
                    <span class="feature-icon">📱</span>
                    <div class="feature-content">
                      <h4>Responsif & Modern</h4>
                      <p>Dibangun dengan teknologi web modern yang memberikan pengalaman optimal di semua perangkat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Statistics Section -->
            <div class="stats-section">
              <div class="section-header">
                <h2>
                  <span class="section-icon">📊</span>
                  Statistik Platform
                </h2>
                <p class="section-subtitle">Data real-time tentang aktivitas pengguna dan konten</p>
              </div>
              
              <div class="stats-grid" id="stats-container">
                <!-- Loading State -->
                <div id="stats-loading" class="stats-loading">
                  <div class="stat-skeleton">
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-content">
                      <div class="skeleton-line large"></div>
                      <div class="skeleton-line small"></div>
                    </div>
                  </div>
                  <div class="stat-skeleton">
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-content">
                      <div class="skeleton-line large"></div>
                      <div class="skeleton-line small"></div>
                    </div>
                  </div>
                  <div class="stat-skeleton">
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-content">
                      <div class="skeleton-line large"></div>
                      <div class="skeleton-line small"></div>
                    </div>
                  </div>
                </div>

                <!-- Stats Cards -->
                <div id="stats-cards" class="stats-cards" style="display: none;">
                  <div class="stat-card primary">
                    <div class="stat-icon">📚</div>
                    <div class="stat-content">
                      <div class="stat-number" id="total-stories">0</div>
                      <div class="stat-label">Total Cerita</div>
                    </div>
                    <div class="stat-trend">
                      <span class="trend-icon">📈</span>
                      <span class="trend-text">Terus bertambah</span>
                    </div>
                  </div>

                

                <!-- Error State -->
                <div id="stats-error" class="stats-error" style="display: none;">
                  <div class="error-icon">⚠️</div>
                  <h3>Gagal Memuat Statistik</h3>
                  <p>Terjadi kesalahan saat mengambil data statistik. Silakan coba lagi nanti.</p>
                  <button class="retry-btn" id="retry-stats">
                    <span class="btn-icon">🔄</span>
                    Coba Lagi
                  </button>
                </div>
              </div>
            </div>

            <!-- Technical Info -->
            <div class="info-card technical-info">
              <div class="card-header">
                <h2>
                  <span class="card-icon">⚙️</span>
                  Informasi Teknis
                </h2>
              </div>
              <div class="card-body">
                <div class="tech-grid">
                  <div class="tech-item">
                    <div class="tech-icon">🎓</div>
                    <div class="tech-content">
                      <h4>Dicoding Submission</h4>
                      <p>Proyek ini merupakan bagian dari submission kelas <strong>Front-End Web Intermediate</strong> di platform Dicoding Indonesia.</p>
                    </div>
                  </div>
                  <div class="tech-item">
                    <div class="tech-icon">💻</div>
                    <div class="tech-content">
                      <h4>Teknologi Modern</h4>
                      <p>Dibangun menggunakan <strong>vanilla JavaScript</strong>, <strong>Web APIs</strong>, dan <strong>modern CSS</strong> untuk performa optimal.</p>
                    </div>
                  </div>
                  <div class="tech-item">
                    <div class="tech-icon">🎨</div>
                    <div class="tech-content">
                      <h4>UI/UX Design</h4>
                      <p>Menerapkan prinsip <strong>responsive design</strong> dan <strong>accessibility</strong> untuk pengalaman pengguna terbaik.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>
        /* About Page Styles */
        .about-page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow-x: hidden;
        }

        /* Hero Section */
        .about-hero {
          padding: 80px 20px;
          text-align: center;
          position: relative;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-icon {
          margin-bottom: 30px;
        }

        .icon-wrapper {
          position: relative;
          display: inline-block;
        }

        .main-icon {
          font-size: 4rem;
          display: inline-block;
          animation: bounce 2s ease-in-out infinite;
        }

        .floating-icon {
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 1.5rem;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
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

        .subtitle {
          color: rgba(255, 255, 255, 0.9);
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0;
          font-weight: 400;
        }

        .hero-decoration {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: floatCircle 10s ease-in-out infinite;
        }

        .circle-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .circle-3 {
          width: 60px;
          height: 60px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes floatCircle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }

        /* Content Section */
        .about-content {
          background: #f8fafc;
          padding: 60px 20px;
          position: relative;
        }

        .content-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* Info Cards */
        .info-card {
          background: white;
          border-radius: 20px;
          padding: 0;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .card-header {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 30px;
          text-align: center;
        }

        .card-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .card-icon {
          font-size: 2rem;
        }

        .card-body {
          padding: 40px;
        }

        .lead-text {
          font-size: 1.1rem;
          color: #4a5568;
          line-height: 1.7;
          margin-bottom: 30px;
          text-align: center;
        }

        /* Feature List */
        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: #f7fafc;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: #edf2f7;
          transform: translateX(5px);
        }

        .feature-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .feature-content h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 8px 0;
        }

        .feature-content p {
          color: #4a5568;
          line-height: 1.6;
          margin: 0;
        }

        /* Stats Section */
        .stats-section {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }

        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .section-icon {
          font-size: 2rem;
        }

        .section-subtitle {
          color: #718096;
          font-size: 1.1rem;
          margin: 0;
        }

        /* Stats Loading */
        .stats-loading {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .stat-skeleton {
          background: #f7fafc;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .skeleton-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(90deg, #e2e8f0 25%, #cbd5e0 50%, #e2e8f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 50%;
        }

        .skeleton-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .skeleton-line {
          height: 16px;
          background: linear-gradient(90deg, #e2e8f0 25%, #cbd5e0 50%, #e2e8f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 8px;
        }

        .skeleton-line.large {
          height: 24px;
          width: 80%;
        }

        .skeleton-line.small {
          width: 60%;
        }

        @keyframes loading {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Stats Cards */
        .stats-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
        }

        .stat-card.primary::before {
          background: linear-gradient(90deg, #667eea, #764ba2);
        }

        .stat-card.secondary::before {
          background: linear-gradient(90deg, #48dbfb, #0abde3);
        }

        .stat-card.accent::before {
          background: linear-gradient(90deg, #feca57, #ff9ff3);
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          font-size: 3rem;
          margin-bottom: 16px;
          display: block;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 8px;
          line-height: 1;
        }

        .stat-label {
          color: #718096;
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #48bb78;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .trend-icon {
          font-size: 1rem;
        }

        /* Stats Error */
        .stats-error {
          text-align: center;
          padding: 60px 20px;
          color: #4a5568;
        }

        .error-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          display: block;
        }

        .stats-error h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
          color: #2d3748;
        }

        .stats-error p {
          margin-bottom: 24px;
          color: #718096;
        }

        .retry-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .retry-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .btn-icon {
          font-size: 1rem;
        }

        /* Technical Info */
        .technical-info {
          margin-top: 0;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .tech-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 24px;
          background: #f7fafc;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          background: #edf2f7;
          transform: translateY(-3px);
        }

        .tech-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .tech-content h4 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 8px 0;
        }

        .tech-content p {
          color: #4a5568;
          line-height: 1.6;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .about-hero {
            padding: 60px 16px;
          }
          
          .about-content {
            padding: 40px 16px;
          }
          
          .card-body {
            padding: 24px;
          }
          
          .stats-section {
            padding: 24px;
          }
          
          .feature-list {
            gap: 16px;
          }
          
          .feature-item {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
          
          .tech-grid {
            grid-template-columns: 1fr;
          }
          
          .tech-item {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
          
          .stats-cards {
            grid-template-columns: 1fr;
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

        /* Counter Animation */
        .counter-animate {
          animation: counterPulse 0.6s ease-out;
        }

        @keyframes counterPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      </style>
    `;
  }

  async afterRender() {
    this.#setupEventListeners();
    await this.presenter.loadStatistics();
  }

  #setupEventListeners() {
    // Retry button
    const retryBtn = document.getElementById("retry-stats");
    retryBtn?.addEventListener("click", async () => {
      await this.presenter.loadStatistics();
    });

    // Add scroll animations
    this.#observeElements();
  }

  #observeElements() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll(".info-card, .stats-section").forEach((card) => {
      observer.observe(card);
    });
  }

  #animateCounter(element, finalValue, duration = 1000) {
    const startValue = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(
        startValue + (finalValue - startValue) * easeOutQuart
      );

      element.textContent = currentValue.toLocaleString("id-ID");

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.classList.add("counter-animate");
      }
    };

    requestAnimationFrame(animate);
  }

  #calculateCoveragePercentage(totalStories, storiesWithLocation) {
    if (totalStories === 0) return 0;
    return Math.round((storiesWithLocation / totalStories) * 100);
  }

  // View interface methods
  showLoadingStats() {
    this.isLoading = true;
    const loadingEl = document.getElementById("stats-loading");
    const cardsEl = document.getElementById("stats-cards");
    const errorEl = document.getElementById("stats-error");

    if (loadingEl) loadingEl.style.display = "grid";
    if (cardsEl) cardsEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";
  }

  displayStatistics(totalStories, storiesWithLocation = 0) {
    this.isLoading = false;
    this.statistics = { totalStories, storiesWithLocation };

    const loadingEl = document.getElementById("stats-loading");
    const cardsEl = document.getElementById("stats-cards");
    const errorEl = document.getElementById("stats-error");

    if (loadingEl) loadingEl.style.display = "none";
    if (cardsEl) cardsEl.style.display = "grid";
    if (errorEl) errorEl.style.display = "none";

    // Animate counters
    const totalEl = document.getElementById("total-stories");
    const locationEl = document.getElementById("stories-with-location");
    const coverageEl = document.getElementById("coverage-percentage");

    if (totalEl) {
      this.#animateCounter(totalEl, totalStories, 1500);
    }

    if (locationEl) {
      setTimeout(() => {
        this.#animateCounter(locationEl, storiesWithLocation, 1200);
      }, 300);
    }

    if (coverageEl) {
      const percentage = this.#calculateCoveragePercentage(
        totalStories,
        storiesWithLocation
      );
      setTimeout(() => {
        this.#animateCounter(coverageEl, percentage, 1000);
        // Add % sign after animation
        setTimeout(() => {
          coverageEl.textContent = percentage + "%";
        }, 1000);
      }, 600);
    }

    // Add slide-up animation to cards
    setTimeout(() => {
      cardsEl.classList.add("slide-up");
    }, 100);
  }

  showStatsError(message = "Gagal memuat statistik") {
    this.isLoading = false;
    const loadingEl = document.getElementById("stats-loading");
    const cardsEl = document.getElementById("stats-cards");
    const errorEl = document.getElementById("stats-error");

    if (loadingEl) loadingEl.style.display = "none";
    if (cardsEl) cardsEl.style.display = "none";
    if (errorEl) {
      errorEl.style.display = "block";
      // Update error message if needed
      const errorText = errorEl.querySelector("p");
      if (errorText && message !== "Gagal memuat statistik") {
        errorText.textContent = message;
      }
    }
  }
}
