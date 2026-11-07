import TarjetaRuta from "./TarjetaRuta.jsx";

export default function ListaRutas({ rutas }) {
  return (
    <section className="top3" aria-label="Rutas disponibles">
      {rutas.map((ruta) => (
        <TarjetaRuta key={ruta.id} {...ruta} />
      ))}
    </section>
  );
}
