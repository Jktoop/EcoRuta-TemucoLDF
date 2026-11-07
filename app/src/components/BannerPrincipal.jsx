import Buscador from "./Buscador";

export default function BannerPrincipal() {
  return (
    <section className="inicio-hero" aria-labelledby="hero-titulo">

      <div className="hero-copy">
        <p className="etiqueta">DESCUBRE LA ARAUCANÍA</p>

        <h1 id="hero-titulo">
          Cada ruta deja huella. Que sea una huella sostenible.
        </h1>

        <p>
          Explora paisajes, cultura y sabores locales viajando con respeto por la
          naturaleza y las comunidades de La Araucanía.
        </p>

        <a className="boton-hero" href="pages/catalogo.html">
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
          aria-expanded="false"
          aria-controls="detalle-clima"
        >
          Ver detalle del clima
        </button>

        <div id="detalle-clima" className="detalle-clima" hidden>

          <p
            id="estado"
            className="clima-estado"
            aria-live="polite"
          >
            Consultando el clima actual…
          </p>

          <div className="clima-datos">
            <p>
              <span>Temperatura</span>
              <strong id="temperatura">--</strong>
            </p>

            <p>
              <span>Viento</span>
              <strong id="viento">--</strong>
            </p>

            <p>
              <span>Cielo</span>
              <strong id="cielo">--</strong>
            </p>
          </div>

          <p id="aviso-clima" className="aviso-clima" hidden></p>

          <p className="clima-fuente">
            Datos actuales de Open-Meteo
          </p>

        </div>
      </section>

    </section>
  );
}