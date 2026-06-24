import { getTodayAPOD } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {

    try {

        const data = await getTodayAPOD();

        data.title;

        document.getElementById("titulo").textContent = data.title;

        document.getElementById("fecha").textContent =
            data.date;

        document.getElementById("descripcion").textContent =
            data.explanation;

        const contenedor =
            document.getElementById("contenido-media");

        if (data.media_type === "image") {

            contenedor.innerHTML = `
                <img
                    src="${data.url}"
                    alt="${data.title}"
                    class="nasa-media">
            `;

        } else if (data.media_type === "video") {

            // Si es un archivo MP4
            if (data.url.endsWith(".mp4")) {

                contenedor.innerHTML = `
                    <video
                        controls
                        class="nasa-media">
                        <source src="${data.url}" type="video/mp4">
                        Tu navegador no soporta videos HTML5.
                    </video>
                `;

            }

            // Si es YouTube
            else if (
                data.url.includes("youtube.com") ||
                data.url.includes("youtu.be")
            ) {

                let videoUrl = data.url;

                if (videoUrl.includes("watch?v=")) {

                    videoUrl = videoUrl.replace(
                        "watch?v=",
                        "embed/"
                    );

                }

                contenedor.innerHTML = `
                    <iframe
                        src="${videoUrl}"
                        class="nasa-media"
                        allowfullscreen>
                    </iframe>
                `;

            }

            // Cualquier otro tipo de video
            else {

                contenedor.innerHTML = `
                    <p>🎥 Video disponible:</p>

                    <a href="${data.url}" target="_blank">
                        Ver video
                    </a>
                `;

            }

        }

    } catch (error) {

        document.getElementById("titulo").textContent =
            "Error al cargar información";

        document.getElementById("descripcion").textContent =
            error.message;

        console.error("Error:", error);

    }

});