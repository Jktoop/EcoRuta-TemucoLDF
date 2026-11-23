import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ListaRutas from "../components/ListaRutas.jsx";
import { API_URL } from "../api.js";

const categorias = ["todas", "trekking", "aventura", "cultural", "gastronomia", "naturaleza", "parque"];

export default function Catalogo() {
  const [parametros] = useSearchParams();
  const [busqueda, setBusqueda] = useState(parametros.get("q") || "");
  const [categoria, setCategoria] = useState("todas");
  const [rutas, setRutas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarRutas() {
      try {
        const respuesta = await fetch(`${API_URL}/rutas`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setRutas(await respuesta.json());
      } catch {
        setError("No se pudieron cargar las rutas. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }
    cargarRutas();
  }, []);

  const texto = busqueda.trim().toLocaleLowerCase("es");
  const visibles = rutas.filter(
    (ruta) =>
      (categoria === "todas" || ruta.categoria === categoria) &&
      `${ruta.nombre} ${ruta.descripcion}`.toLocaleLowerCase("es").includes(texto)
  );

  return (
    <section className="catalogo-contenido">
      <section className="catalogo-intro">
        <p className="etiqueta">PLANIFICA TU RECORRIDO</p>
        <h1>Catálogo de rutas</h1>
        <p>Encuentra tu próximo destino y conoce qué hace especial cada lugar.</p>
        <form className="filtro-rutas" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            aria-label="Buscar una ruta"
            placeholder="Buscar una ruta…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <span className="visualmente-oculto" aria-live="polite">
            {visibles.length} resultados
          </span>
        </form>
        <div className="filtros" role="group" aria-label="Filtrar por categoría">
          {categorias.map((opcion) => (
            <button
              key={opcion}
              type="button"
              aria-pressed={categoria === opcion}
              onClick={() => setCategoria(opcion)}
            >
              {opcion}
            </button>
          ))}
        </div>
      </section>

      {cargando && (
        <p className="estado" role="status">
          Cargando rutas…
        </p>
      )}
      {error && (
        <p className="estado error" role="alert">
          {error}
        </p>
      )}

      {!cargando && !error && <ListaRutas rutas={visibles} />}
      {!cargando && !error && visibles.length === 0 && (
        <p className="sin-resultados">
          No encontramos rutas con esa búsqueda. Prueba con otro nombre, lugar o categoría.
        </p>
      )}
    </section>
  );
}
