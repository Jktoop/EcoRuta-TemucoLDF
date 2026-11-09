export default function TarjetaRuta({
  nombre,
  imagen,
  alt,
  distanciaKm,
  dificultad,
  accesible,
  descripcion,
  href,
  categoria,
}) {
  return (
    <a className="ruta-card" href={href}>
      <img src={imagen} alt={alt} loading="lazy" />

      <div className="ruta-info">
        <span className="ruta-categoria">{categoria || "RUTA DESTACADA"}</span>
        <h2>{nombre}</h2>

        {descripcion && (
          <p>{descripcion}</p>
        )}

        {(distanciaKm != null || dificultad || typeof accesible === "boolean") && <dl className="tarjeta-ruta__datos">
          {distanciaKm != null && (
            <div className="tarjeta-ruta__dato">
              <dt>Distancia</dt>
              <dd>{distanciaKm} km</dd>
            </div>
          )}

          {dificultad && (
            <div className="tarjeta-ruta__dato">
              <dt>Dificultad</dt>
              <dd className="tarjeta-ruta__dificultad">{dificultad}</dd>
            </div>
          )}

          {typeof accesible === "boolean" && (
            <div className="tarjeta-ruta__dato">
              <dt>Accesibilidad</dt>
              <dd>{accesible ? "Accesible" : "No accesible"}</dd>
            </div>
          )}
        </dl>}
      </div>
        <span className="ruta-link">Ver detalle <span aria-hidden="true">→</span></span>
    </a>
  );
}
