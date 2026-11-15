import { Link } from "react-router";

export default function NoEncontrada() {
  return (
    <section className="detalle">
      <h1>Página no encontrada</h1>
      <p>La dirección que escribiste no existe en EcoRuta.</p>
      <p>
        <Link to="/">← Volver al inicio</Link>
      </p>
    </section>
  );
}
