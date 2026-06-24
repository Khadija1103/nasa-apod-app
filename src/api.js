const API_KEY = "nzQsoER8kjKLrAUvIurNQFs2bRM304AXuqgMSmkS";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

/**
 * 🔥 Función base para consumir NASA APOD
 * Maneja errores HTTP, 503 y respuestas no JSON
 */
async function fetchAPOD(params = "") {
  try {
    const response = await fetch(
      `${BASE_URL}?api_key=${API_KEY}${params}`
    );

    // 🚨 Error HTTP (503, 429, etc.)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error en NASA API");
    }

    // 🚨 Evita crash por JSON inválido
    const textData = await response.text();

    try {
      return JSON.parse(textData);
    } catch (err) {
      throw new Error("Respuesta inválida de NASA API: " + textData);
    }

  } catch (error) {
    console.error("❌ Error de conexión con NASA API:", error);
    throw error;
  }
}

/**
 * 🌌 APOD del día
 */
export async function getTodayAPOD() {
  return await fetchAPOD();
}

/**
 * 📅 APOD por fecha
 */
export async function getAPODByDate(date) {
  if (!date) {
    throw new Error("Debes enviar una fecha válida");
  }

  return await fetchAPOD(`&date=${date}`);
}