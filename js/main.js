const URL_CLIMA = "https://api.open-meteo.com/v1/forecast"
  + "?latitude=-38.66&longitude=-71.66"
  + "&current=temperature_2m,wind_speed_10m,weather_code"
  + "&timezone=America/Santiago";

const estado = document.querySelector("#estado");
const temperatura = document.querySelector("#temperatura");
const viento = document.querySelector("#viento");
const cielo = document.querySelector("#cielo");
const aviso = document.querySelector("#aviso-clima");

async function mostrarClima() {
  estado.textContent = "Cargando clima…";
  try {
    const respuesta = await fetch(URL_CLIMA);
    if (!respuesta.ok) {
      throw new Error("La API respondió con error");
    }
    const datos = await respuesta.json();
    console.log(datos);
    temperatura.textContent = `${datos.current.temperature_2m} °C`;
    viento.textContent = `${datos.current.wind_speed_10m} km/h`;
    cielo.textContent = describirCielo(datos.current.weather_code); 
    mostrarAviso(datos.current);
    estado.textContent = "Clima actualizado.";
  } catch (error) {
    console.error(error);
    estado.textContent = "No pudimos cargar el clima.";
  }
}

if (estado) {
  mostrarClima();
}

function mostrarAviso(clima) {
  if (clima.temperature_2m < 8) {
    aviso.textContent = "Hace frío: lleva abrigo.";
  } else if (clima.wind_speed_10m > 40) {
    aviso.textContent = "Viento fuerte: evita los miradores.";
  } else {
    aviso.textContent = "Buen momento para salir.";
  }
  aviso.hidden = false;
}

function describirCielo(codigo) {
  if (codigo === 0) {
    return "Despejado";
  } else if (codigo <= 3) {
    return "Parcialmente nublado a nublado";
  } else if (codigo === 45 || codigo === 48) {
    return "Niebla";
  } else if (codigo >= 51 && codigo <= 57) {
    return "Llovizna";
  } else if (codigo >= 61 && codigo <= 67) {
    return "Lluvia";
  } else if (codigo >= 71 && codigo <= 77) {
    return "Nieve";
  } else if (codigo >= 80 && codigo <= 82) {
    return "Chubascos";
  } else if (codigo >= 95) {
    return "Tormenta";
  }
  return "Sin información";
}