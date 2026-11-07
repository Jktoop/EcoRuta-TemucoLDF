import "./TarjetaRuta.css";

export default function TarjetaRuta({
  nombre,
  imagen,
  alt,
  distanciaKm,
  dificultad,
  accesible,
  descripcion,
}) {
  return (
    <article className="tarjeta-ruta">
      <img className="tarjeta-ruta__imagen" src={imagen} alt={alt} loading="lazy" />

      <div className="tarjeta-ruta__contenido">
        <h2 className="tarjeta-ruta__nombre">{nombre}</h2>

        {descripcion && (
          <p className="tarjeta-ruta__descripcion">{descripcion}</p>
        )}

        <dl className="tarjeta-ruta__datos">
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
        </dl>
      </div>
    </article>
  );
}