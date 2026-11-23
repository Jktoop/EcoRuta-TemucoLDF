import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Resenas from "../components/Resenas.jsx";
import { API_URL } from "../api.js";

export default function DetalleRuta() {
  const { id } = useParams();
  const [ruta, setRuta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarRuta() {
      setCargando(true);
      setError("");
      try {
        const respuesta = await fetch(`${API_URL}/rutas/${id}`);
        if (respuesta.status === 404) {
          setRuta(null);
          return;
        }
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setRuta(await respuesta.json());
      } catch {
        setError("No se pudo cargar la ruta. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }
    cargarRuta();
  }, [id]);

  if (cargando) {
    return (
      <p className="estado" role="status">
        Cargando ruta…
      </p>
    );
  }

  if (error) {
    return (
      <p className="estado error" role="alert">
        {error}
      </p>
    );
  }

  if (!ruta) {
    return (
      <section className="detalle">
        <h1>Ruta no encontrada</h1>
        <p>No existe una ruta con el número {id}.</p>
        <p><Link to="/rutas">← Volver al catálogo</Link></p>
      </section>
    );
  }

  return (
    <>
      <article className="detalle">
        <img className="detalle-foto" src={ruta.imagen} alt={ruta.alt} />
        <p className="detalle-titulo">{ruta.categoria}</p>
        <h1>{ruta.nombre}</h1>
        <p>{ruta.descripcion}</p>
        <div className="tags"><span>La Araucanía</span><span>Turismo sostenible</span></div>
        <p><Link to="/rutas">← Volver al catálogo</Link></p>
      </article>
      <Resenas rutaId={ruta.id} />
    </>
  );
}
