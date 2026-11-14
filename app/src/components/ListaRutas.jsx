import TarjetaRuta from "./TarjetaRuta.jsx";
import "../styles/catalogo.css";

export default function ListaRutas({ rutas }) {
  return (
    <section className="lista rutas-lista" aria-label="Rutas disponibles">
      {rutas.map((ruta) => (
        <TarjetaRuta
          key={ruta.id}
          {...ruta}
          href={`?page=detalle&ruta=${ruta.id}`}
        />
      ))}
    </section>
  );
}
