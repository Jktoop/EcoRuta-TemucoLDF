
import { useParams, Link } from "react-router";
import { rutas } from "../datos/rutas.js";

export default function DetalleRuta() {
  const { id } = useParams();
  const ruta = rutas.find((r) => r.id === Number(id));

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
    <article className="detalle">
      <img className="detalle-foto" src={ruta.imagen} alt={ruta.alt} />
      <p className="detalle-titulo">{ruta.categoria}</p>
      <h1>{ruta.nombre}</h1>
      <p>{ruta.descripcion}</p>
      <div className="tags"><span>La Araucanía</span><span>Turismo sostenible</span></div>
      <p><Link to="/rutas">← Volver al catálogo</Link></p>
    </article>
  );
}