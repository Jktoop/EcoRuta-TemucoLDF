import { useState } from "react";
import { API_URL } from "../api.js";

const MAX_PALABRAS = 150;

export default function FormularioResena({ rutaId, onCreada }) {
  const [autor, setAutor] = useState("");
  const [calificacion, setCalificacion] = useState("5");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();

    const texto = comentario.trim();
    const palabras = texto === "" ? 0 : texto.split(/\s+/).length;

    if (autor.trim() === "" || texto.length < 10) {
      setMensaje("Escribe tu nombre y un comentario de al menos 10 caracteres.");
      return;
    }
    if (palabras > MAX_PALABRAS) {
      setMensaje(`El comentario puede tener como máximo ${MAX_PALABRAS} palabras.`);
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await fetch(`${API_URL}/resenas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rutaId: rutaId,
          autor: autor.trim(),
          calificacion: Number(calificacion),
          comentario: texto,
          fecha: new Date().toISOString(),
        }),
      });
      if (respuesta.status !== 201) {
        throw new Error(`La API respondió ${respuesta.status}`);
      }
      const nueva = await respuesta.json();
      onCreada(nueva);
      setAutor("");
      setCalificacion("5");
      setComentario("");
      setMensaje("¡Gracias! Tu reseña quedó publicada.");
    } catch {
      setMensaje("No se pudo publicar la reseña. ¿Está corriendo la API?");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="formulario-resena" onSubmit={enviar} noValidate>
      <h3>Deja tu reseña</h3>

      <label htmlFor="resena-autor">Tu nombre</label>
      <input
        id="resena-autor"
        type="text"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />

      <label htmlFor="resena-calificacion">Calificación</label>
      <select
        id="resena-calificacion"
        value={calificacion}
        onChange={(e) => setCalificacion(e.target.value)}
      >
        <option value="5">5 · Excelente</option>
        <option value="4">4 · Muy buena</option>
        <option value="3">3 · Buena</option>
        <option value="2">2 · Regular</option>
        <option value="1">1 · Mala</option>
      </select>

      <label htmlFor="resena-comentario">Comentario</label>
      <textarea
        id="resena-comentario"
        rows="3"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />

      <button type="submit" disabled={enviando}>
        {enviando ? "Publicando…" : "Publicar reseña"}
      </button>

      <p className="mensaje" role="status">
        {mensaje}
      </p>
    </form>
  );
}
