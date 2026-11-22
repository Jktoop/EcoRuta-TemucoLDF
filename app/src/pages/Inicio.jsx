
import { useEffect, useState } from "react";
import { Link } from "react-router";
import BannerPrincipal from "../components/BannerPrincipal.jsx";
import { API_URL } from "../api.js";

export default function Inicio() {
  const [rutas, setRutas] = useState([]);
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [respuestaRutas, respuestaEmprendimientos] = await Promise.all([
          fetch(`${API_URL}/rutas`),
          fetch(`${API_URL}/emprendimientos`),
        ]);
        if (!respuestaRutas.ok) {
          throw new Error(`La API respondió ${respuestaRutas.status}`);
        }
        if (!respuestaEmprendimientos.ok) {
          throw new Error(`La API respondió ${respuestaEmprendimientos.status}`);
        }
        setRutas(await respuestaRutas.json());
        setEmprendimientos(await respuestaEmprendimientos.json());
      } catch {
        setError("No se pudieron cargar las rutas. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }
    cargarDatos();
  }, []);

  const destacadas = [rutas[0], rutas[1], rutas[7]];

  return (
    <>
      <BannerPrincipal
        titulo="Cada ruta deja huella. Que sea una huella sostenible."
        subtitulo="Explora paisajes, cultura y sabores locales viajando con respeto por la naturaleza y las comunidades de La Araucanía."
      />

      {cargando && (
        <p className="estado" role="status">
          Cargando rutas y emprendimientos…
        </p>
      )}
      {error && (
        <p className="estado error" role="alert">
          {error}
        </p>
      )}

      {!cargando && !error && (
        <>
          <section className="rutas-destacadas" aria-labelledby="destacadas-titulo">
            <div className="seccion-encabezado">
              <p className="etiqueta">INSPIRACIÓN PARA TU VIAJE</p>
              <h2 id="destacadas-titulo">Rutas más destacadas</h2>
              <p>Algunos de los lugares favoritos para comenzar a explorar.</p>
            </div>
            <div className="top3">
              {destacadas.map(
                (ruta, index) =>
                  ruta && (
                    <Link className={`destacado n${index + 1}`} to={`/rutas/${ruta.id}`} key={ruta.id}>
                      <img className="foto" src={ruta.imagen} alt={ruta.alt} />
                      {index === 0 && <span className="chip">🌿 Naturaleza</span>}
                      <div className="info">
                        <h3>{ruta.nombre}</h3>
                        <p>{ruta.descripcion}</p>
                      </div>
                    </Link>
                  )
              )}
            </div>
            <p>
              <Link className="ruta-link" to="/rutas">
                Ver todas las rutas <span aria-hidden="true">→</span>
              </Link>
            </p>
          </section>

          <section className="emprendimientos" aria-labelledby="emprendimientos-titulo">
            <div className="seccion-encabezado">
              <p className="etiqueta">COMPRA LOCAL, VIAJA MEJOR</p>
              <h2 id="emprendimientos-titulo">Negocios de emprendedores</h2>
              <p>Conoce iniciativas locales para complementar tu recorrido.</p>
            </div>
            <div className="negocios-lista">
              {emprendimientos.map((negocio) => (
                <article className="negocio" key={negocio.id}>
                  <span className="negocio-icono" aria-hidden="true">
                    {negocio.icono}
                  </span>
                  <div>
                    <p className="negocio-tipo">{negocio.tipo}</p>
                    <h3>{negocio.nombre}</h3>
                    <p>{negocio.descripcion}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
