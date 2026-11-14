import Buscador from "./Buscador.jsx";

export default function BannerPrincipal({ titulo, subtitulo }) {
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

      <Buscador placeholder="Ej. Conguillío" />

      <details className="clima">
        <summary className="clima-encabezado">
          <span className="clima-icono" aria-hidden="true">☀️</span>
          <span>
            <span className="clima-etiqueta">ANTES DE SALIR</span>
            <span className="clima-titulo">Clima en La Araucanía</span>
          </span>
        </summary>
        <div className="detalle-clima">
          <p>Revisa el pronóstico local antes de iniciar tu recorrido.</p>
          <p className="clima-fuente">La información del clima se agregará más adelante.</p>
        </div>
      </details>
    </section>
  );
}
