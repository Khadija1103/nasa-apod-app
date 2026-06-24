import { getTodayAPOD, getAPODByDate } from "./api.js";

const fechaInput = document.getElementById("fecha");
const buscarBtn = document.getElementById("buscarBtn");
const mensajeError = document.getElementById("mensajeError");
const contenido = document.getElementById("contenido");

buscarBtn.addEventListener("click", async () => {
  const fechaSeleccionada = fechaInput.value;

  mensajeError.textContent = "";

  if (!fechaSeleccionada) {
    mensajeError.textContent = "Seleccione una fecha";
    return;
  }

  const hoy = new Date().toISOString().split("T")[0];

  if (fechaSeleccionada > hoy) {
    mensajeError.textContent =
      "No se permiten fechas futuras";
    return;
  }

  try {
    const data = await getAPODByDate(fechaSeleccionada);

    contenido.innerHTML = `
      <h2>${data.title}</h2>
      <img src="${data.url}" width="500">
      <p>${data.explanation}</p>
    `;
  } catch (error) {
    mensajeError.textContent =
      "Error al consultar la API";
  }
});