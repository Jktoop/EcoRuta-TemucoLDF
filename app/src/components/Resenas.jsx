
import { useEffect, useState } from "react";
import FormularioResena from "./FormularioResena.jsx";
import { API_URL } from "../api.js";

function formatearFecha(fecha) {
  const f = new Date(fecha);
  return Number.isNaN(f.getTime()) ? "" : f.toLocaleDateString("es-CL");
}

export default function Resenas({ rutaId }) {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarResenas() {
      setCargando(true);
      setError("");
      try {
        const respuesta = await fetch(`${API_URL}/resenas?rutaId=${rutaId}`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setResenas(await respuesta.json());
      } catch {
        setError("No se pudieron cargar las reseñas. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }
    cargarResenas();
  }, [rutaId]);

  async function borrar(idResena) {
    try {
      const respuesta = await fetch(`${API_URL}/resenas/${idResena}`, {
        method: "DELETE",
      });
      if (!respuesta.ok) {
        throw new Error(`La API respondió ${respuesta.status}`);
      }
      setError("");
      setResenas(resenas.filter((r) => r.id !== idResena));
    } catch {
      setError("No se pudo borrar la reseña. Intenta de nuevo.");
    }
  }

  function agregar(nueva) {
    setResenas([...resenas, nueva]);
  }

  return (
    <section className="resenas" aria-labelledby="titulo-resenas">
      <h2 id="titulo-resenas">Reseñas</h2>
      {cargando && <p role="status">Cargando reseñas…</p>}
      {error && (
        <p className="estado error" role="alert">
          {error}
        </p>
      )}
      {!cargando && !error && resenas.length === 0 && (
        <p>Todavía no hay reseñas. ¡Sé la primera persona en opinar!</p>
      )}
      <ul>
        {resenas.map((resena) => (
          <li key={resena.id} className="resena">
            <p>
              <strong>{resena.autor}</strong>{" "}
              <span className="estrellas" aria-label={`${resena.calificacion} de 5`}>
                {"★".repeat(resena.calificacion)}
                {"☆".repeat(5 - resena.calificacion)}
              </span>
              {resena.fecha && formatearFecha(resena.fecha) && (
                <span className="fecha"> · {formatearFecha(resena.fecha)}</span>
              )}
            </p>
            <p>{resena.comentario}</p>
            <button
              type="button"
              className="borrar"
              onClick={() => borrar(resena.id)}
              aria-label={`Borrar la reseña de ${resena.autor}`}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
      <FormularioResena rutaId={rutaId} onCreada={agregar} />
    </section>
  );
}
