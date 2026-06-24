import { getTodayAPOD, getAPODByDate } from "./api.js";

const fechaInput = document.getElementById("fecha");
const buscarBtn = document.getElementById("buscarBtn");
const mensajeError = document.getElementById("mensajeError");

const titulo = document.getElementById("titulo");
const fechaResultado = document.getElementById("fechaResultado");
const media = document.getElementById("contenido-media");
const descripcion = document.getElementById("descripcion");

// 🚀 CARGAR APOD DEL DÍA AL INICIAR
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await getTodayAPOD();
    renderAPOD(data);
  } catch (error) {
    mensajeError.textContent = "Error al cargar la imagen del día";
    console.error(error);
  }
});

// 🔍 BUSCAR POR FECHA
buscarBtn.addEventListener("click", async () => {

  const fechaSeleccionada = fechaInput.value;

  mensajeError.textContent = "";

  if (!fechaSeleccionada) {
    mensajeError.textContent = "Seleccione una fecha";
    return;
  }

  const hoy = new Date().toISOString().split("T")[0];

  if (fechaSeleccionada > hoy) {
    mensajeError.textContent = "No se permiten fechas futuras";
    return;
  }

  try {
    const data = await getAPODByDate(fechaSeleccionada);
    renderAPOD(data);
  } catch (error) {
    mensajeError.textContent = "Error al consultar la API";
    console.error(error);
  }
});

// 🎯 RENDER CENTRAL
function renderAPOD(data) {

  titulo.textContent = data.title;
  fechaResultado.textContent = data.date;
  descripcion.textContent = data.explanation;

  const contenedor = media;

  if (data.media_type === "image") {

    contenedor.innerHTML = `
      <img src="${data.url}" alt="${data.title}" class="nasa-media">
    `;

  } else if (data.media_type === "video") {

    // MP4
    if (data.url.endsWith(".mp4")) {

      contenedor.innerHTML = `
        <video controls class="nasa-media">
          <source src="${data.url}" type="video/mp4">
        </video>
      `;

    }
    // YouTube
    else if (
      data.url.includes("youtube.com") ||
      data.url.includes("youtu.be")
    ) {

      let videoUrl = data.url;

      if (videoUrl.includes("watch?v=")) {
        videoUrl = videoUrl.replace("watch?v=", "embed/");
      }

      contenedor.innerHTML = `
        <iframe src="${videoUrl}" class="nasa-media" allowfullscreen></iframe>
      `;

    }
    // Otro tipo de video
    else {

      contenedor.innerHTML = `
        <a href="${data.url}" target="_blank">
          Ver video
        </a>
      `;
    }
  }
}