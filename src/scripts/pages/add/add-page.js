import CONFIG from "../../config.js";
import { initMap, onMapClick, addMarker } from "../../utils/map-utils.js";

export default class AddPage {
  constructor() {
    // Instance variables untuk tracking
    this.stream = null;
    this.capturedBlob = null;
    this.selectedLat = null;
    this.selectedLon = null;
  }

  async render() {
    return `
      <div class="add-page">
        <div class="page-header">
          <h1>✨ Buat Story Baru</h1>
          <p class="page-subtitle">Bagikan momen spesial Anda dengan dunia</p>
        </div>

        <form id="add-form" class="story-form">
          <!-- Description Section -->
          <div class="form-section">
            <label for="description" class="form-label">
              <span class="label-icon">📝</span>
              Ceritakan pengalaman Anda
            </label>
            <textarea 
              id="description" 
              class="form-textarea" 
              placeholder="Tuliskan cerita menarik tentang foto ini..."
              rows="4" 
              required
            ></textarea>
          </div>

          <!-- Photo Section -->
          <div class="form-section">
            <h3 class="section-title">
              <span class="section-icon">📸</span>
              Pilih Foto
            </h3>
            
            <!-- Camera Controls -->
            <div class="camera-controls">
              <video id="video" class="camera-preview"></video>
              <canvas id="canvas" class="hidden-canvas"></canvas>
              
              <div class="camera-buttons">
                <button type="button" id="open-camera" class="btn btn-camera">
                  <span class="btn-icon">📷</span>
                  Buka Kamera
                </button>
                <button type="button" id="capture" class="btn btn-capture hidden">
                  <span class="btn-icon">📸</span>
                  Ambil Foto
                </button>
                <button type="button" id="close-camera" class="btn btn-secondary hidden">
                  <span class="btn-icon">❌</span>
                  Tutup
                </button>
              </div>
            </div>

            <!-- File Upload -->
            <div class="upload-section">
              <div class="upload-divider">
                <span>atau</span>
              </div>
              <label for="photo" class="upload-label">
                <span class="upload-icon">📁</span>
                <span class="upload-text">Pilih dari Galeri</span>
                <input type="file" id="photo" accept="image/*" class="upload-input">
              </label>
            </div>
          </div>

          <!-- Location Section -->
          <div class="form-section">
            <h3 class="section-title">
              <span class="section-icon">📍</span>
              Lokasi (Opsional)
            </h3>
            <div id="map" class="map-container"></div>
            <p class="map-hint">Klik pada peta untuk menandai lokasi</p>
          </div>

          <!-- Submit Button -->
          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-submit">
              <span class="btn-icon">🚀</span>
              Bagikan Story
            </button>
          </div>
        </form>

        <div id="submit-status" class="status-message"></div>
      </div>

      <style>
      /* Photo Preview Styles */
          .photo-preview-container {
            margin: 1rem 0;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 12px;
            border: 2px solid #e9ecef;
            text-align: center;
          }

          .preview-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
          }

          .preview-header h4 {
            margin: 0;
            font-size: 1rem;
            color: #333;
          }

          .btn-remove {
            background: #dc3545;
            color: white;
            border: none;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: background 0.2s ease;
          }

          .btn-remove:hover {
            background: #c82333;
          }

          .preview-image {
            width: 100%;
            max-width: 250px;
            max-height: 200px;
            object-fit: cover;
            border-radius: 8px;
            display: block;
            margin: 0 auto;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
        .add-page {
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .page-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .page-header h1 {
          margin: 0 0 0.5rem 0;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .page-subtitle {
          margin: 0;
          color: #666;
          font-size: 1rem;
        }

        .story-form {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          padding: 1.5rem;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .form-section:last-child {
          margin-bottom: 0;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .label-icon {
          font-size: 1.1em;
        }

        .form-textarea {
          width: 100%;
          padding: 0.875rem;
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.2s ease;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #007AFF;
          box-shadow: 0 0 0 3px rgba(0,122,255,0.1);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }

        .section-icon {
          font-size: 1.2em;
        }

        .camera-controls {
          margin-bottom: 1rem;
        }

        .camera-preview {
          width: 100%;
          max-width: 400px;
          min-height: 240px;
          height: auto;
          border-radius: 12px;
          background: #f0f0f0;
          margin-bottom: 1rem;
          display: none;
          object-fit: cover;
          border: 2px solid #e5e5e5;
        }

        .camera-preview:not([src]) {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 0.9rem;
        }

        .camera-preview:not([src])::before {
          content: "📷 Kamera akan muncul di sini";
        }

        .hidden-canvas {
          display: none;
        }

        .camera-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          font-family: inherit;
        }

        .btn-icon {
          font-size: 1.1em;
        }

        .btn-camera {
          background: #007AFF;
          color: white;
        }

        .btn-camera:hover {
          background: #0056CC;
          transform: translateY(-1px);
        }

        .btn-capture {
          background: #34C759;
          color: white;
        }

        .btn-capture:hover {
          background: #28A745;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: #8E8E93;
          color: white;
        }

        .btn-secondary:hover {
          background: #6D6D70;
        }

        .btn-primary {
          background: linear-gradient(135deg, #007AFF, #5856D6);
          color: white;
          font-size: 1.1rem;
          padding: 1rem 2rem;
          width: 100%;
          justify-content: center;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,122,255,0.3);
        }

        .upload-section {
          margin-top: 1.5rem;
        }

        .upload-divider {
          text-align: center;
          margin: 1.5rem 0;
          position: relative;
          color: #999;
        }

        .upload-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e5e5e5;
          z-index: 1;
        }

        .upload-divider span {
          background: white;
          padding: 0 1rem;
          position: relative;
          z-index: 2;
        }

        .upload-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem;
          border: 2px dashed #ccc;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #666;
          font-weight: 500;
        }

        .upload-label:hover {
          border-color: #007AFF;
          background: #f8f9ff;
          color: #007AFF;
        }

        .upload-icon {
          font-size: 1.5em;
        }

        .upload-input {
          display: none;
        }

        .map-container {
          height: 250px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #e5e5e5;
          margin-bottom: 0.5rem;
        }

        .map-hint {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
          text-align: center;
        }

        .form-actions {
          margin-top: 2rem;
          text-align: center;
        }

        .status-message {
          margin-top: 1rem;
          padding: 0.75rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          min-height: 1rem;
        }

        .hidden {
          display: none !important;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .add-page {
            padding: 0.75rem;
          }

          .story-form {
            padding: 1rem;
          }

          .page-header h1 {
            font-size: 1.75rem;
          }

          .camera-buttons {
            flex-direction: column;
          }

          .btn {
            justify-content: center;
          }

          /* Responsive */
          @media (max-width: 640px) {
            .preview-header {
              flex-direction: column;
              gap: 0.5rem;
              align-items: flex-start;
            }
            
            .btn-remove {
              align-self: flex-end;
            }
          }
        }
      </style>
    `;
  }

  // Method untuk menampilkan preview foto
  showPhotoPreview(dataURL) {
    // Cari atau buat elemen preview
    let previewContainer = document.getElementById("photo-preview");

    if (!previewContainer) {
      // Buat container preview jika belum ada
      previewContainer = document.createElement("div");
      previewContainer.id = "photo-preview";
      previewContainer.className = "photo-preview-container";

      // Insert setelah camera controls
      const cameraControls = document.querySelector(".camera-controls");
      cameraControls.insertAdjacentElement("afterend", previewContainer);
    }

    previewContainer.innerHTML = `
    <div class="preview-header">
      <h4>📸 Foto yang Diambil:</h4>
      <button type="button" id="remove-photo" class="btn-remove">❌ Hapus</button>
    </div>
    <img src="${dataURL}" alt="Captured photo" class="preview-image">
  `;

    // Event listener untuk hapus foto
    document.getElementById("remove-photo").addEventListener("click", () => {
      this.removeCapturedPhoto();
    });

    // Hide file upload section when photo is captured
    const uploadSection = document.querySelector(".upload-section");
    if (uploadSection) {
      uploadSection.style.display = "none";
    }
  }

  // Method untuk menghapus foto yang sudah diambil
  removeCapturedPhoto() {
    this.capturedBlob = null;

    const previewContainer = document.getElementById("photo-preview");
    if (previewContainer) {
      previewContainer.remove();
    }

    // Show file upload section again
    const uploadSection = document.querySelector(".upload-section");
    if (uploadSection) {
      uploadSection.style.display = "block";
    }

    this.showStatus("🗑️ Foto dihapus", "success");
  }
  // Method sederhana untuk inisialisasi map
  initMapSimple() {
    console.log("🗺️ Initializing map...");

    // Check if container exists
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      console.error("❌ Map container not found");
      return;
    }

    console.log(
      "📍 Map container found, size:",
      mapContainer.offsetWidth,
      "x",
      mapContainer.offsetHeight
    );

    // Load Leaflet if not loaded
    if (!window.L) {
      console.log("📚 Loading Leaflet...");
      this.loadLeafletAndInit();
    } else {
      console.log("📍 Leaflet ready, creating map...");
      this.createMap();
    }
  }

  loadLeafletAndInit() {
    // Add Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Add Leaflet JS
    if (!document.querySelector('script[src*="leaflet"]')) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => {
        console.log("✅ Leaflet loaded");
        setTimeout(() => {
          this.createMap();
        }, 100);
      };
      script.onerror = () => {
        console.error("❌ Failed to load Leaflet");
      };
      document.head.appendChild(script);
    }
  }

  createMap() {
    try {
      // Create map directly without using map-utils for now
      const map = L.map("map").setView([-6.2, 106.8], 10);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      console.log("✅ Map created successfully");

      // Add click handler
      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        this.selectedLat = lat;
        this.selectedLon = lng;

        // Clear existing markers
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        // Add new marker
        const marker = L.marker([lat, lng]).addTo(map);
        marker
          .bindPopup(
            `📍 Lokasi terpilih<br/>Lat: ${lat.toFixed(
              4
            )}<br/>Lng: ${lng.toFixed(4)}`
          )
          .openPopup();

        console.log("📍 Location selected:", lat, lng);
      });
    } catch (error) {
      console.error("❌ Map creation failed:", error);
    }
  }
  // Method untuk cleanup kamera
  cleanupCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => {
        track.stop();
        console.log("🔴 Camera track stopped:", track.kind);
      });
      this.stream = null;
    }

    // Reset UI elements
    const video = document.getElementById("video");
    const captureBtn = document.getElementById("capture");
    const closeCameraBtn = document.getElementById("close-camera");
    const openCameraBtn = document.getElementById("open-camera");

    if (video) {
      video.srcObject = null;
      video.style.display = "none";
      video.onloadedmetadata = null; // Clear event handler
    }
    if (captureBtn) captureBtn.classList.add("hidden");
    if (closeCameraBtn) closeCameraBtn.classList.add("hidden");
    if (openCameraBtn) {
      openCameraBtn.innerHTML = '<span class="btn-icon">📷</span>Buka Kamera';
    }
  }

  // Method yang dipanggil saat halaman akan ditinggalkan
  beforeUnload() {
    console.log("🧹 Cleaning up AddPage...");
    this.cleanupCamera();
  }

  async afterRender() {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const openCameraBtn = document.getElementById("open-camera");
    const captureBtn = document.getElementById("capture");
    const closeCameraBtn = document.getElementById("close-camera");

    // Simple map initialization with delay
    setTimeout(() => {
      this.initMapSimple();
    }, 500);

    // File input change event
    const fileInput = document.getElementById("photo");
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        // Clear captured photo if file is selected
        this.capturedBlob = null;
        const previewContainer = document.getElementById("photo-preview");
        if (previewContainer) {
          previewContainer.remove();
        }

        // Show file preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.showPhotoPreview(e.target.result);
        };
        reader.readAsDataURL(file);

        console.log("📁 File selected:", file.name);
      }
    });

    // Open camera event
    openCameraBtn.addEventListener("click", async () => {
      try {
        console.log("📷 Attempting to open camera...");

        // Cleanup existing stream first
        this.cleanupCamera();

        // Request camera access with fallback options
        const constraints = {
          video: {
            width: { min: 320, ideal: 640, max: 1280 },
            height: { min: 240, ideal: 480, max: 720 },
            facingMode: { ideal: "environment" }, // prefer back camera, but allow front if not available
          },
        };

        this.stream = await navigator.mediaDevices.getUserMedia(constraints);

        video.srcObject = this.stream;

        // Wait for video to be ready before showing
        video.onloadedmetadata = () => {
          video.play();
          video.style.display = "block";
          captureBtn.classList.remove("hidden");
          closeCameraBtn.classList.remove("hidden");
          openCameraBtn.innerHTML =
            '<span class="btn-icon">📹</span>Kamera Aktif';
          console.log("📷 Camera started successfully");
          this.showStatus("📷 Kamera berhasil diaktifkan!", "success");
        };
      } catch (err) {
        console.error("❌ Camera error:", err);
        let errorMessage = "Tidak bisa mengakses kamera";

        if (err.name === "NotAllowedError") {
          errorMessage = "Akses kamera ditolak. Harap izinkan akses kamera.";
        } else if (err.name === "NotFoundError") {
          errorMessage = "Kamera tidak ditemukan pada perangkat ini.";
        } else if (err.name === "NotSupportedError") {
          errorMessage = "Browser tidak mendukung akses kamera.";
        }

        this.showStatus("❌ " + errorMessage, "error");
      }
    });

    // Close camera event
    closeCameraBtn.addEventListener("click", () => {
      this.cleanupCamera();
      openCameraBtn.innerHTML = '<span class="btn-icon">📷</span>Buka Kamera';
      console.log("📷 Camera closed by user");
    });

    // Capture photo event
    // Capture photo event
    captureBtn.addEventListener("click", () => {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      // Convert canvas to data URL for preview
      const dataURL = canvas.toDataURL("image/jpeg", 0.8);

      canvas.toBlob(
        (blob) => {
          this.capturedBlob = blob;
          console.log("📸 Photo captured, size:", blob.size, "bytes");

          // Show photo preview
          this.showPhotoPreview(dataURL);
        },
        "image/jpeg",
        0.8
      );

      // Auto close camera after capture
      this.cleanupCamera();
      openCameraBtn.innerHTML = '<span class="btn-icon">📷</span>Buka Kamera';

      // Show success message
      this.showStatus("📸 Foto berhasil diambil!", "success");
    });

    // Form submit event
    const form = document.getElementById("add-form");

    // Perbaikan pada method form submit di AddPage.js
    // Ganti bagian form submit event dengan kode berikut:

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const description = document.getElementById("description").value.trim();
      const fileInput = document.getElementById("photo");
      const fileFromInput = fileInput.files[0];

      if (!description) {
        this.showStatus("❌ Deskripsi wajib diisi.", "error");
        return;
      }

      const formData = new FormData();
      formData.append("description", description);

      // Handle photo (captured or uploaded)
      if (this.capturedBlob) {
        formData.append("photo", this.capturedBlob, "captured.jpg");
        console.log("📤 Using captured photo");
      } else if (fileFromInput) {
        formData.append("photo", fileFromInput);
        console.log("📤 Using uploaded photo:", fileFromInput.name);
      } else {
        this.showStatus("❌ Gambar wajib dipilih atau diambil.", "error");
        return;
      }

      // Add location if selected
      if (this.selectedLat && this.selectedLon) {
        formData.append("lat", this.selectedLat);
        formData.append("lon", this.selectedLon);
        console.log("📍 Location added:", this.selectedLat, this.selectedLon);
      }

      // Get token from localStorage (atau dari storage management yang Anda gunakan)
      const token = localStorage.getItem("token"); // Sesuaikan dengan cara Anda menyimpan token

      if (!token) {
        this.showStatus("❌ Anda harus login terlebih dahulu.", "error");
        // Redirect ke halaman login
        setTimeout(() => {
          location.hash = "/login";
        }, 1500);
        return;
      }

      // Show loading state
      this.showStatus("⏳ Mengirim story...", "loading");

      try {
        // PERBAIKAN: Gunakan endpoint yang benar dengan Authorization header
        const res = await fetch(`${CONFIG.BASE_URL}/stories`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Jangan set Content-Type untuk FormData, browser akan set otomatis
          },
          body: formData,
        });

        const data = await res.json();

        if (!data.error) {
          this.showStatus("✅ Story berhasil dikirim!", "success");

          // Cleanup before redirect
          this.cleanupCamera();

          // Redirect after short delay
          setTimeout(() => {
            location.hash = "/";
          }, 1500);
        } else {
          this.showStatus("❌ Gagal: " + data.message, "error");

          // Handle unauthorized error
          if (res.status === 401) {
            this.showStatus(
              "❌ Session expired. Silakan login kembali.",
              "error"
            );
            setTimeout(() => {
              location.hash = "/login";
            }, 2000);
          }
        }
      } catch (err) {
        console.error("❌ Submit error:", err);
        this.showStatus("❌ Terjadi kesalahan: " + err.message, "error");
      }
    });

    // Cleanup when page visibility changes (user switches tabs)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.stream) {
        console.log("👁️ Page hidden, cleaning up camera");
        this.cleanupCamera();
        openCameraBtn.innerHTML = '<span class="btn-icon">📷</span>Buka Kamera';
      }
    });
  }

  // Helper method untuk menampilkan status
  showStatus(message, type) {
    const status = document.getElementById("submit-status");
    status.textContent = message;

    // Reset classes
    status.className = "status-message";

    // Add type-specific styling
    switch (type) {
      case "success":
        status.style.background = "#d4edda";
        status.style.color = "#155724";
        status.style.border = "1px solid #c3e6cb";
        break;
      case "error":
        status.style.background = "#f8d7da";
        status.style.color = "#721c24";
        status.style.border = "1px solid #f5c6cb";
        break;
      case "loading":
        status.style.background = "#cce7ff";
        status.style.color = "#004085";
        status.style.border = "1px solid #99d6ff";
        break;
      default:
        status.style.background = "transparent";
        status.style.color = "#333";
        status.style.border = "none";
    }

    // Auto clear success/error messages
    if (type === "success" || type === "error") {
      setTimeout(() => {
        status.textContent = "";
        status.className = "status-message";
        status.style.background = "transparent";
        status.style.border = "none";
      }, 4000);
    }
  }
}
