import CONFIG from "../../config.js";

export default class LoginPage {
  async render() {
    return `
      <div class="login-wrapper">
        <div class="login-container">
          <div class="login-header">
            <h1 class="login-title">Selamat Datang</h1>
            <p class="login-subtitle">Masuk ke akun Anda</p>
          </div>
          
          <form id="login-form" class="login-form">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                class="form-input" 
                placeholder="Masukkan email Anda"
                required 
              />
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                id="password" 
                class="form-input" 
                placeholder="Masukkan password Anda"
                required 
              />
            </div>

            <button type="submit" class="login-btn" id="login-btn">
              <span class="btn-text">Masuk</span>
              <span class="btn-loader" style="display: none;">
                <svg class="spinner" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                    <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </span>
            </button>
          </form>

          <div id="login-status" class="status-message"></div>
        </div>
      </div>

      <style>
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .login-container {
          background: white;
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          width: 100%;
          max-width: 400px;
          animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.025em;
        }

        .login-subtitle {
          color: #6b7280;
          margin: 0;
          font-size: 0.875rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
          margin: 0;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: #fafafa;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          background: white;
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .login-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 48px;
          margin-top: 0.5rem;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px -5px rgba(102, 126, 234, 0.4);
        }

        .login-btn:active {
          transform: translateY(0);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 20px;
          height: 20px;
          color: white;
        }

        .status-message {
          margin-top: 1.5rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
          display: none;
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .status-message.success {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
          display: block;
        }

        .status-message.error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
          display: block;
        }

        /* Responsive design */
        @media (max-width: 480px) {
          .login-wrapper {
            padding: 1rem;
          }
          
          .login-container {
            padding: 2rem;
          }
          
          .login-title {
            font-size: 1.5rem;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .login-container {
            background:rgb(255, 255, 255);
            color: black;
          }
          
          .login-title {
            color: black;
          }
          
          .login-subtitle {
            color: #9ca3af;
          }
          
          .form-label {
            color: #d1d5db;
          }
          
          .form-input {
            background: #374151;
            border-color: #4b5563;
            color: black;
          }
          
          .form-input:focus {
            background: #4b5563;
            border-color: #667eea;
          }
        }
      </style>
    `;
  }

  async afterRender() {
    const form = document.getElementById("login-form");
    const status = document.getElementById("login-status");
    const loginBtn = document.getElementById("login-btn");
    const btnText = loginBtn.querySelector(".btn-text");
    const btnLoader = loginBtn.querySelector(".btn-loader");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Reset status
      status.className = "status-message";
      status.style.display = "none";

      // Show loading state
      loginBtn.disabled = true;
      btnText.style.display = "none";
      btnLoader.style.display = "inline-flex";

      try {
        const res = await fetch(`${CONFIG.BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!data.error) {
          localStorage.setItem("token", data.loginResult.token);
          status.className = "status-message success";
          status.innerHTML = "✅ Login berhasil! Mengalihkan...";
          status.style.display = "block";

          // Redirect after a short delay
          setTimeout(() => {
            location.hash = "/";
          }, 1500);
        } else {
          status.className = "status-message error";
          status.innerHTML = "❌ " + (data.message || "Gagal login");
          status.style.display = "block";
        }
      } catch (err) {
        status.className = "status-message error";
        status.innerHTML = "❌ Terjadi kesalahan koneksi";
        status.style.display = "block";
      } finally {
        // Reset button state
        loginBtn.disabled = false;
        btnText.style.display = "inline";
        btnLoader.style.display = "none";
      }
    });
  }
}
