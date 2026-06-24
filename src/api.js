const API_KEY = "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

// Obtener la APOD del día
export async function getTodayAPOD() {
  try {
    const response = await fetch(
      `${BASE_URL}?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la APOD del día");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
}

// Obtener la APOD por fecha
export async function getAPODByDate(date) {
  try {
    const response = await fetch(
      `${BASE_URL}?api_key=${API_KEY}&date=${date}`
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la APOD para la fecha seleccionada");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
}