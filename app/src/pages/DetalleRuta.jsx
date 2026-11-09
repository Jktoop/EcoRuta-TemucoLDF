export default function DetalleRuta({ ruta }) {
  if (!ruta) return <section className="detalle"><h1>Ruta no encontrada</h1><a href="?page=catalogo">Volver al catálogo</a></section>;
  return <article className="detalle"><img className="detalle-foto" src={ruta.imagen} alt={ruta.alt} /><p className="detalle-titulo">{ruta.categoria || "NATURALEZA · TURISMO"}</p><h1>{ruta.nombre}</h1><p>{ruta.descripcion}</p><div className="tags"><span>La Araucanía</span><span>Turismo sostenible</span></div><p><a href="?page=catalogo">← Volver al catálogo</a></p></article>;
}
