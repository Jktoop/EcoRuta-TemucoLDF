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