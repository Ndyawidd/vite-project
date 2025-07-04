// map-utils.js (Versi yang diperbaiki)

// Menggunakan Leaflet sebagai pengganti Mapbox (lebih mudah dan tidak perlu token)
let map;
let markers = [];

export function initMap(containerId, lat = -6.2, lon = 106.8, zoom = 10) {
  // Load Leaflet CSS dan JS jika belum ada
  if (!window.L) {
    // Add Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    // Add Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      initLeafletMap(containerId, lat, lon, zoom);
    };
    document.head.appendChild(script);
  } else {
    initLeafletMap(containerId, lat, lon, zoom);
  }
}

function initLeafletMap(containerId, lat, lon, zoom) {
  // Initialize map
  map = L.map(containerId).setView([lat, lon], zoom);

  // Add tile layer (OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  console.log("Map initialized successfully");
}

export function addMarker(lat, lon, popupText = "", storyData = null) {
  if (!map) {
    console.error("Map not initialized yet");
    return;
  }

  // Custom icon for story markers
  const storyIcon = L.divIcon({
    html: "📍",
    iconSize: [30, 30],
    className: "story-marker",
    iconAnchor: [15, 15],
  });

  // Create marker
  const marker = L.marker([lat, lon], { icon: storyIcon }).addTo(map);

  // Add popup with story information
  if (popupText || storyData) {
    const popupContent = storyData
      ? `<div class="story-popup">
        <h4>${storyData.name}</h4>
        <p>${storyData.description.substring(0, 100)}...</p>
        <small>📅 ${formatDate(storyData.createdAt)}</small>
       </div>`
      : popupText;

    marker.bindPopup(popupContent);
  }

  // Store marker reference
  markers.push(marker);

  console.log(`Marker added at [${lat}, ${lon}] with text: ${popupText}`);
  return marker;
}

export function clearMarkers() {
  markers.forEach((marker) => {
    map.removeLayer(marker);
  });
  markers = [];
}

export function fitMapToMarkers() {
  if (markers.length > 0) {
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
  }
}

export function onMapClick(callback) {
  if (!map) {
    console.error("Map not initialized yet");
    return;
  }

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    callback(lat, lng);
  });
}

// Helper function
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Add CSS for custom markers
const style = document.createElement("style");
style.textContent = `
  .story-marker {
    background: none !important;
    border: none !important;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
  }
  
  .story-popup {
    min-width: 200px;
  }
  
  .story-popup h4 {
    margin: 0 0 8px 0;
    color: #2d3748;
    font-size: 16px;
  }
  
  .story-popup p {
    margin: 0 0 8px 0;
    color: #4a5568;
    font-size: 14px;
    line-height: 1.4;
  }
  
  .story-popup small {
    color: #718096;
    font-size: 12px;
  }
`;
document.head.appendChild(style);
