import { useNavigate } from "react-router";

export default function Buscador({ placeholder }) {
  const navigate = useNavigate();

  function buscar(evento) {
    evento.preventDefault();
    const texto = new FormData(evento.currentTarget).get("q").trim();
    navigate(texto ? `/rutas?q=${encodeURIComponent(texto)}` : "/rutas");
  }

  return (
    <aside className="buscador-rutas" aria-labelledby="buscar-titulo">
      <h2 id="buscar-titulo">Encuentra tu próxima ruta</h2>

      <label htmlFor="busqueda-ruta">
        Buscar por nombre o lugar
      </label>

      <form onSubmit={buscar}>
        <input
          id="busqueda-ruta"
          name="q"
          type="search"
          placeholder={placeholder}
          autoComplete="off"
        />

        <button type="submit" aria-label="Buscar rutas">
          Buscar
        </button>
      </form>

      <p>O descubre todos los destinos del catálogo.</p>
    </aside>
  );
}