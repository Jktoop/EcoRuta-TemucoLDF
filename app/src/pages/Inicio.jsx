import BannerPrincipal from "../components/BannerPrincipal.jsx";
import { emprendimientos } from "../datos/emprendimientos.js";

export default function Inicio({ rutas }) {
  const destacadas = [rutas[0], rutas[1], rutas[7]];
  return <>
    <BannerPrincipal titulo="Cada ruta deja huella. Que sea una huella sostenible." subtitulo="Explora paisajes, cultura y sabores locales viajando con respeto por la naturaleza y las comunidades de La Araucanía." />
    <section className="rutas-destacadas" aria-labelledby="destacadas-titulo">
      <div className="seccion-encabezado"><p className="etiqueta">INSPIRACIÓN PARA TU VIAJE</p><h2 id="destacadas-titulo">Rutas más destacadas</h2><p>Algunos de los lugares favoritos para comenzar a explorar.</p></div>
      <div className="top3">{destacadas.map((ruta, index) => ruta && <a className={`destacado n${index + 1}`} href={`?page=detalle&ruta=${ruta.id}`} key={ruta.id}><img className="foto" src={ruta.imagen} alt={ruta.alt} />{index === 0 && <span className="chip">🌿 Naturaleza</span>}<div className="info"><h3>{ruta.nombre}</h3><p>{ruta.descripcion}</p></div></a>)}</div>
    </section>
    <section className="emprendimientos" aria-labelledby="emprendimientos-titulo">
      <div className="seccion-encabezado"><p className="etiqueta">COMPRA LOCAL, VIAJA MEJOR</p><h2 id="emprendimientos-titulo">Negocios de emprendedores</h2><p>Conoce iniciativas locales para complementar tu recorrido.</p></div>
      <div className="negocios-lista">{emprendimientos.map((negocio) => <article className="negocio" key={negocio.nombre}><span className="negocio-icono" aria-hidden="true">{negocio.icono}</span><div><p className="negocio-tipo">{negocio.tipo}</p><h3>{negocio.nombre}</h3><p>{negocio.descripcion}</p></div></article>)}</div>
    </section>
  </>;
}
