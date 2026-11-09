import { useState } from "react";
import ListaRutas from "../components/ListaRutas.jsx";

export default function Catalogo({ rutas }) {
  const [busqueda, setBusqueda] = useState(new URLSearchParams(window.location.search).get("q") || "");
  const resultado = rutas.filter((ruta) => `${ruta.nombre} ${ruta.descripcion}`.toLocaleLowerCase("es").includes(busqueda.trim().toLocaleLowerCase("es")));
  return <section className="catalogo-contenido">
    <section className="catalogo-intro"><p className="etiqueta">PLANIFICA TU RECORRIDO</p><h1>Catálogo de rutas</h1><p>Encuentra tu próximo destino y conoce qué hace especial cada lugar.</p><form className="filtro-rutas" role="search" onSubmit={(e) => e.preventDefault()}><input type="search" aria-label="Buscar una ruta" placeholder="Buscar una ruta…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} /><span className="visualmente-oculto" aria-live="polite">{resultado.length} resultados</span></form></section>
    <ListaRutas rutas={resultado} />{resultado.length === 0 && <p className="sin-resultados">No encontramos rutas con esa búsqueda. Prueba con otro nombre o lugar.</p>}
  </section>;
}
