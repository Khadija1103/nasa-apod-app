const API_KEY = "nzQsoER8kjKLrAUvIurNQFs2bRM304AXuqgMSmkS";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

/**
 * Función base para consumir NASA APOD
 */
async function fetchAPOD(params = "") {
  try {
    const response = await fetch(
      `${BASE_URL}?api_key=${API_KEY}${params}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error en NASA API");
    }

    const textData = await response.text();

    try {
      return JSON.parse(textData);
    } catch {
      throw new Error("Respuesta inválida de NASA API");
    }

  } catch (error) {

    console.error("❌ Error de conexión con NASA API:", error);

    // Respuesta de respaldo si NASA falla
    return {
      title: "NASA APOD no disponible",
      date: new Date().toISOString().split("T")[0],
      explanation:
        "La API de NASA no respondió correctamente. Intenta nuevamente más tarde.",
      media_type: "image",
      url: "https://apod.nasa.gov/apod/image/1901/IC1805_Lindemann_960.jpg"
    };
  }
}

/**
 * APOD del día
 */
export async function getTodayAPOD() {
  return await fetchAPOD();
}

/**
 * APOD por fecha
 */
export async function getAPODByDate(date) {
  if (!date) {
    throw new Error("Debes enviar una fecha válida");
  }

  return await fetchAPOD(`&date=${date}`);
}