import { Link } from "react-router";
import Buscador from "./Buscador.jsx";

export default function BannerPrincipal({ titulo, subtitulo }) {
  return (
    <section className="inicio-hero" aria-labelledby="hero-titulo">
      <div className="hero-copy">
        <p className="etiqueta">DESCUBRE LA ARAUCANÍA</p>
        <h1 id="hero-titulo">{titulo}</h1>
        <p>{subtitulo}</p>
        <Link className="boton-hero" to="/rutas">
          Explorar rutas <span aria-hidden="true">→</span>
        </Link>
      </div>

      <Buscador placeholder="Ej. Conguillío" />

      <section className="clima" aria-labelledby="titulo-clima">
        <div className="clima-encabezado">
          <span className="clima-icono" aria-hidden="true">☀️</span>
          <div>
            <p className="clima-etiqueta">ANTES DE SALIR</p>
            <h2 id="titulo-clima" className="clima-titulo">Clima en La Araucanía</h2>
          </div>
        </div>

        <button
          type="button"
          className="btn-detalle"
          id="btn-detalle-clima"
          aria-expanded="false"
          aria-controls="detalle-clima"
        >
          Ver detalle del clima
        </button>

        <div id="detalle-clima" className="detalle-clima" hidden>
          <p id="estado" className="clima-estado" aria-live="polite">
            Consultando el clima actual…
          </p>
          <div className="clima-datos">
            <p><span>Temperatura</span><strong id="temperatura">--</strong></p>
            <p><span>Viento</span><strong id="viento">--</strong></p>
            <p><span>Cielo</span><strong id="cielo">--</strong></p>
          </div>
          <p id="aviso-clima" className="aviso-clima" hidden></p>
          <p className="clima-fuente">Datos actuales de Open-Meteo</p>
        </div>
      </section>
    </section>
  );
}
