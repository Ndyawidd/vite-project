import CONFIG from "../../config.js";

export default class RegisterPage {
  async render() {
    return `
      <div class="register-wrapper">
        <div class="register-container">
          <div class="register-header">
            <h1 class="register-title">Buat Akun Baru</h1>
            <p class="register-subtitle">Bergabunglah dengan kami hari ini</p>
          </div>
          
          <form id="register-form" class="register-form">
            <div class="form-group">
              <label for="name" class="form-label">Nama Lengkap</label>
              <input 
                type="text" 
                id="name" 
                class="form-input" 
                placeholder="Masukkan nama lengkap Anda"
                required 
              />
              <div class="input-error" id="name-error"></div>
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                class="form-input" 
                placeholder="Masukkan alamat email Anda"
                required 
              />
              <div class="input-error" id="email-error"></div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="password-wrapper">
                <input 
                  type="password" 
                  id="password" 
                  class="form-input" 
                  placeholder="Minimal 8 karakter"
                  required 
                  minlength="8"
                />
                <button type="button" class="password-toggle" id="password-toggle">
                  <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <div class="password-strength" id="password-strength">
                <div class="strength-bar">
                  <div class="strength-fill"></div>
                </div>
                <span class="strength-text">Kekuatan password</span>
              </div>
              <div class="input-error" id="password-error"></div>
            </div>

            <div class="form-group">
              <label for="confirm-password" class="form-label">Konfirmasi Password</label>
              <input 
                type="password" 
                id="confirm-password" 
                class="form-input" 
                placeholder="Ulangi password Anda"
                required 
              />
              <div class="input-error" id="confirm-password-error"></div>
            </div>

            <button type="submit" class="register-btn" id="register-btn">
              <span class="btn-text">Daftar Sekarang</span>
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

          <div id="register-status" class="status-message"></div>
          
          <div class="register-footer">
            <p>Sudah punya akun? <a href="#/login" class="login-link">Masuk di sini</a></p>
          </div>
        </div>
      </div>

      <style>
        .register-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .register-container {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.08),
            0 10px 10px -5px rgba(0, 0, 0, 0.04),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          width: 100%;
          max-width: 450px;
          animation: slideUp 0.5s ease-out;
          border: 1px solid rgba(226, 232, 240, 0.8);
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

        .register-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .register-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.025em;
        }

        .register-subtitle {
          color: #64748b;
          margin: 0;
          font-size: 0.875rem;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-weight: 500;
          color: #334155;
          font-size: 0.875rem;
          margin: 0;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: #f8fafc;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          background: white;
        }

        .form-input.error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
          background: #fef2f2;
        }

        .form-input.success {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
          background: #f0fdf4;
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        .password-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: color 0.2s ease;
        }

        .password-toggle:hover {
          color: #334155;
        }

        .password-strength {
          margin-top: 0.5rem;
        }

        .strength-bar {
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 0.25rem;
        }

        .strength-fill {
          height: 100%;
          width: 0%;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .strength-text {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .input-error {
          font-size: 0.75rem;
          color: #ef4444;
          margin-top: 0.25rem;
          min-height: 1rem;
        }

        .register-btn {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: 10px;
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
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
        }

        .register-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }

        .register-btn:active {
          transform: translateY(0);
        }

        .register-btn:disabled {
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

        .register-footer {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e2e8f0;
        }

        .register-footer p {
          color: #64748b;
          margin: 0;
          font-size: 0.875rem;
        }

        .login-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .login-link:hover {
          color: #2563eb;
          text-decoration: underline;
        }

        /* Responsive design */
        @media (max-width: 480px) {
          .register-wrapper {
            padding: 1rem;
          }
          
          .register-container {
            padding: 2rem;
          }
          
          .register-title {
            font-size: 1.5rem;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .register-wrapper {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          }
          
          .register-container {
            background: #1e293b;
            color: white;
            border-color: #334155;
            box-shadow: 
              0 20px 25px -5px rgba(0, 0, 0, 0.3),
              0 10px 10px -5px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(51, 65, 85, 0.5);
          }
          
          .register-title {
            color: white;
          }
          
          .register-subtitle {
            color: #94a3b8;
          }
          
          .form-label {
            color: #cbd5e1;
          }
          
          .form-input {
            background: #334155;
            border-color: #475569;
            color: white;
          }
          
          .form-input:focus {
            background: #475569;
            border-color: #3b82f6;
          }
          
          .form-input.error {
            background: rgba(239, 68, 68, 0.1);
          }

          .form-input.success {
            background: rgba(16, 185, 129, 0.1);
          }
          
          .register-footer {
            border-top-color: #475569;
          }

          .register-footer p {
            color: #94a3b8;
          }

          .password-toggle {
            color: #94a3b8;
          }

          .password-toggle:hover {
            color: #cbd5e1;
          }

          .strength-bar {
            background: #475569;
          }

          .strength-text {
            color: #94a3b8;
          }
        }
      </style>
    `;
  }

  async afterRender() {
    const form = document.getElementById("register-form");
    const status = document.getElementById("register-status");
    const registerBtn = document.getElementById("register-btn");
    const btnText = registerBtn.querySelector(".btn-text");
    const btnLoader = registerBtn.querySelector(".btn-loader");
    const passwordToggle = document.getElementById("password-toggle");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    // Password visibility toggle
    passwordToggle.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;

      const eyeIcon = passwordToggle.querySelector(".eye-icon");
      if (type === "text") {
        eyeIcon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        `;
      } else {
        eyeIcon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        `;
      }
    });

    // Password strength checker
    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value;
      const strengthBar = document.querySelector(".strength-fill");
      const strengthText = document.querySelector(".strength-text");

      let strength = 0;
      let strengthLabel = "";

      if (password.length >= 8) strength += 1;
      if (/[a-z]/.test(password)) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;

      const strengthPercentage = (strength / 5) * 100;
      strengthBar.style.width = `${strengthPercentage}%`;

      if (strength <= 2) {
        strengthBar.style.background = "#ef4444";
        strengthLabel = "Lemah";
      } else if (strength <= 3) {
        strengthBar.style.background = "#f59e0b";
        strengthLabel = "Sedang";
      } else if (strength <= 4) {
        strengthBar.style.background = "#10b981";
        strengthLabel = "Kuat";
      } else {
        strengthBar.style.background = "#059669";
        strengthLabel = "Sangat Kuat";
      }

      strengthText.textContent = password
        ? `Kekuatan: ${strengthLabel}`
        : "Kekuatan password";
    });

    // Real-time validation
    const validateField = (field, errorElement, validator) => {
      const value = field.value.trim();
      const error = validator(value);

      if (error) {
        field.classList.add("error");
        field.classList.remove("success");
        errorElement.textContent = error;
      } else if (value) {
        field.classList.remove("error");
        field.classList.add("success");
        errorElement.textContent = "";
      } else {
        field.classList.remove("error", "success");
        errorElement.textContent = "";
      }

      return !error;
    };

    // Validators
    const nameValidator = (value) => {
      if (!value) return "Nama harus diisi";
      if (value.length < 2) return "Nama minimal 2 karakter";
      return null;
    };

    const emailValidator = (value) => {
      if (!value) return "Email harus diisi";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Format email tidak valid";
      return null;
    };

    const passwordValidator = (value) => {
      if (!value) return "Password harus diisi";
      if (value.length < 8) return "Password minimal 8 karakter";
      return null;
    };

    const confirmPasswordValidator = (value) => {
      if (!value) return "Konfirmasi password harus diisi";
      if (value !== passwordInput.value) return "Password tidak cocok";
      return null;
    };

    // Add real-time validation
    document.getElementById("name").addEventListener("blur", (e) => {
      validateField(
        e.target,
        document.getElementById("name-error"),
        nameValidator
      );
    });

    document.getElementById("email").addEventListener("blur", (e) => {
      validateField(
        e.target,
        document.getElementById("email-error"),
        emailValidator
      );
    });

    passwordInput.addEventListener("blur", (e) => {
      validateField(
        e.target,
        document.getElementById("password-error"),
        passwordValidator
      );
    });

    confirmPasswordInput.addEventListener("blur", (e) => {
      validateField(
        e.target,
        document.getElementById("confirm-password-error"),
        confirmPasswordValidator
      );
    });

    confirmPasswordInput.addEventListener("input", (e) => {
      validateField(
        e.target,
        document.getElementById("confirm-password-error"),
        confirmPasswordValidator
      );
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      // Validate all fields
      const isNameValid = validateField(
        document.getElementById("name"),
        document.getElementById("name-error"),
        nameValidator
      );
      const isEmailValid = validateField(
        document.getElementById("email"),
        document.getElementById("email-error"),
        emailValidator
      );
      const isPasswordValid = validateField(
        passwordInput,
        document.getElementById("password-error"),
        passwordValidator
      );
      const isConfirmPasswordValid = validateField(
        confirmPasswordInput,
        document.getElementById("confirm-password-error"),
        confirmPasswordValidator
      );

      if (
        !isNameValid ||
        !isEmailValid ||
        !isPasswordValid ||
        !isConfirmPasswordValid
      ) {
        return;
      }

      // Reset status
      status.className = "status-message";
      status.style.display = "none";

      // Show loading state
      registerBtn.disabled = true;
      btnText.style.display = "none";
      btnLoader.style.display = "inline-flex";

      try {
        const res = await fetch(`${CONFIG.BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!data.error) {
          status.className = "status-message success";
          status.innerHTML =
            "✅ Registrasi berhasil! Mengalihkan ke halaman login...";
          status.style.display = "block";

          // Reset form
          form.reset();
          document.querySelectorAll(".form-input").forEach((input) => {
            input.classList.remove("success", "error");
          });

          // Redirect after delay
          setTimeout(() => {
            location.hash = "/login";
          }, 2000);
        } else {
          status.className = "status-message error";
          status.innerHTML =
            "❌ " + (data.message || "Gagal melakukan registrasi");
          status.style.display = "block";
        }
      } catch (err) {
        status.className = "status-message error";
        status.innerHTML = "❌ Terjadi kesalahan koneksi";
        status.style.display = "block";
      } finally {
        // Reset button state
        registerBtn.disabled = false;
        btnText.style.display = "inline";
        btnLoader.style.display = "none";
      }
    });
  }
}
