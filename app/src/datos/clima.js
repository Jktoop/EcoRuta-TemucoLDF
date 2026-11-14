const URL_CLIMA =
  "https://api.open-meteo.com/v1/forecast?latitude=-38.74&longitude=-72.59" +
  "&current=temperature_2m,wind_speed_10m,weather_code&timezone=America%2FSantiago";

function describirCielo(codigo) {
  if (codigo === 0) return "Despejado";
  if (codigo <= 3) return "Parcialmente nublado";
  if (codigo === 45 || codigo === 48) return "Niebla";
  if (codigo >= 51 && codigo <= 57) return "Llovizna";
  if (codigo >= 61 && codigo <= 67) return "Lluvia";
  if (codigo >= 71 && codigo <= 77) return "Nieve";
  if (codigo >= 80 && codigo <= 82) return "Chubascos";
  if (codigo >= 95) return "Tormenta";
  return "Sin información";
}

async function cargarClima() {
  const estado = document.querySelector("#estado");
  if (!estado) return;
  try {
    const respuesta = await fetch(URL_CLIMA);
    if (!respuesta.ok) throw new Error("No se pudo consultar el clima");
    const actual = (await respuesta.json()).current;

    document.querySelector("#temperatura").textContent = `${actual.temperature_2m} °C`;
    document.querySelector("#viento").textContent = `${actual.wind_speed_10m} km/h`;
    document.querySelector("#cielo").textContent = describirCielo(actual.weather_code);
    estado.textContent = "Condiciones actuales";

    const aviso = document.querySelector("#aviso-clima");
    if (actual.temperature_2m < 8) {
      aviso.textContent = "Hace frío: lleva abrigo.";
    } else if (actual.wind_speed_10m > 40) {
      aviso.textContent = "Viento fuerte: toma precauciones en zonas expuestas.";
    } else {
      aviso.textContent = "Recuerda cuidar los senderos y llevarte tus residuos.";
    }
    aviso.hidden = false;
  } catch {
    estado.textContent = "No pudimos cargar el clima. Intenta nuevamente más tarde.";
  }
}

// Un solo "oyente" para todo el documento: reacciona al botón del clima.
document.addEventListener("click", (evento) => {
  const boton = evento.target.closest("#btn-detalle-clima");
  if (!boton) return;

  const detalle = document.querySelector("#detalle-clima");
  const expandido = boton.getAttribute("aria-expanded") === "true";

  boton.setAttribute("aria-expanded", String(!expandido));
  detalle.hidden = expandido; // aquí se usa hidden
  boton.textContent = expandido ? "Ver detalle del clima" : "Ocultar detalle del clima";

  // La primera vez que se abre, se consulta la API
  if (!expandido && !detalle.dataset.cargado) {
    detalle.dataset.cargado = "si";
    cargarClima();
  }
});