import CONFIG from "../config.js";

export async function getStories() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${CONFIG.BASE_URL}/stories?location=1`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Gagal ambil story:", errorData.message);
    throw new Error("Gagal memuat data dari API");
  }

  return await response.json();
}
