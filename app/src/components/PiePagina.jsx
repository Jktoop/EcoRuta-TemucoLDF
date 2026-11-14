export default function PiePagina() {
  return (
    <footer className="pie-pagina">
      <div>
        <strong>EcoRuta Temuco</strong>
        <p>Recorre La Araucanía con respeto por su naturaleza y comunidades.</p>
      </div>
      <p>Un proyecto de <strong>Los del Frente</strong></p>
      <small>© {new Date().getFullYear()} EcoRuta Temuco</small>
    </footer>
  );
}