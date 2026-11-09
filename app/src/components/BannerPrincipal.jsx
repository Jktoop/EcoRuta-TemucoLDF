import { useEffect, useState } from "react";
import Buscador from "./Buscador.jsx";

export default function BannerPrincipal({ titulo, subtitulo }) {
  const [expandido, setExpandido] = useState(false);
  const [clima, setClima] = useState({ estado: "Consultando el clima actual…", temperatura: "--", viento: "--", cielo: "--" });
  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=-38.66&longitude=-71.66&current=temperature_2m,wind_speed_10m,weather_code&timezone=America%2FSantiago")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(({ current }) => setClima({ estado: "Condiciones actuales en La Araucanía.", temperatura: `${Math.round(current.temperature_2m)} °C`, viento: `${Math.round(current.wind_speed_10m)} km/h`, cielo: ({ 0: "Despejado", 1: "Mayormente despejado", 2: "Parcialmente nublado", 3: "Nublado", 45: "Niebla", 61: "Lluvia", 63: "Lluvia", 65: "Lluvia intensa" })[current.weather_code] || "Variable" }))
      .catch(() => setClima((c) => ({ ...c, estado: "No fue posible cargar el clima." })));
  }, []);
  return (
    <section className="inicio-hero" aria-labelledby="hero-titulo">

      <div className="hero-copy">
        <p className="etiqueta">DESCUBRE LA ARAUCANÍA</p>

        <h1 id="hero-titulo">{titulo}</h1>
        <p>{subtitulo}</p>

        <a className="boton-hero" href="?page=catalogo">
          Explorar rutas <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* Componente buscador */}
      <Buscador placeholder="Ej. Conguillío" />

      {/* Sección del clima */}
      <section className="clima" aria-labelledby="titulo-clima">

        <div className="clima-encabezado">
          <span className="clima-icono" aria-hidden="true">
            ☀️
          </span>

          <div>
            <p className="clima-etiqueta">ANTES DE SALIR</p>
            <h2 id="titulo-clima">Clima en La Araucanía</h2>
          </div>
        </div>

        <button
          type="button"
          className="btn-detalle"
          id="btn-detalle-clima"
          aria-expanded={expandido}
          aria-controls="detalle-clima"
          onClick={() => setExpandido((valor) => !valor)}
        >
          {expandido ? "Ocultar detalle del clima" : "Ver detalle del clima"}
        </button>

        {expandido && <div id="detalle-clima" className="detalle-clima">

          <p
            id="estado"
            className="clima-estado"
            aria-live="polite"
          >
            {clima.estado}
          </p>

          <div className="clima-datos">
            <p>
              <span>Temperatura</span>
              <strong>{clima.temperatura}</strong>
            </p>

            <p>
              <span>Viento</span>
              <strong>{clima.viento}</strong>
            </p>

            <p>
              <span>Cielo</span>
              <strong>{clima.cielo}</strong>
            </p>
          </div>

          <p id="aviso-clima" className="aviso-clima" hidden></p>

          <p className="clima-fuente">
            Datos actuales de Open-Meteo
          </p>

        </div>}
      </section>

    </section>
  );
}
