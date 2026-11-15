
import { Link } from "react-router";

export default function TarjetaRuta({
  id,
  nombre,
  imagen,
  alt,
  distanciaKm,
  dificultad,
  accesible,
  descripcion,
  categoria,
}) {
  const tieneDatos = distanciaKm != null || dificultad || typeof accesible === "boolean";

  return (
    <Link className="ruta-card" to={`/rutas/${id}`}>
      <img src={imagen} alt={alt} loading="lazy" />
      <div className="ruta-info">
        <span className="ruta-categoria">{categoria || "RUTA DESTACADA"}</span>
        <h2>{nombre}</h2>
        {descripcion && <p>{descripcion}</p>}
        {tieneDatos && (
          <dl className="tarjeta-ruta__datos">
            {distanciaKm != null && <div className="tarjeta-ruta__dato"><dt>Distancia</dt><dd>{distanciaKm} km</dd></div>}
            {dificultad && <div className="tarjeta-ruta__dato"><dt>Dificultad</dt><dd className="tarjeta-ruta__dificultad">{dificultad}</dd></div>}
            {typeof accesible === "boolean" && <div className="tarjeta-ruta__dato"><dt>Accesibilidad</dt><dd>{accesible ? "Accesible" : "No accesible"}</dd></div>}
          </dl>
        )}
        <span className="ruta-link">Ver detalle <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
