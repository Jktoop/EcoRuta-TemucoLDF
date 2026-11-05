export default function RutasDestacadas() {
  return (
    <>
      <a className="destacado n1" href="pages/detalle.html?ruta=conguillio">
        <img
          className="foto"
          src="img/rutas/parqueconguillio.jpg"
          alt="Araucarias y paisaje del Parque Nacional Conguillío"
        />
        <span className="chip">🌿 Naturaleza</span>
        <div className="info">
          <h3>Parque Nacional Conguillío</h3>
          <p>Senderos entre araucarias, lagunas y volcanes.</p>
        </div>
      </a>

      <a className="destacado n2" href="pages/detalle.html?ruta=villarrica">
        <img
          className="foto"
          src="img/rutas/volcanvillarrica.jpg"
          alt="Volcán Villarrica"
        />
        <div className="info">
          <h3>Volcán Villarrica</h3>
          <p>Aventura y vistas inolvidables.</p>
        </div>
      </a>

      <a className="destacado n3" href="pages/detalle.html?ruta=nielol">
        <img
          className="foto"
          src="img/rutas/mirador.jpg"
          alt="Mirador del cerro Ñielol"
        />
        <div className="info">
          <h3>Cerro Ñielol</h3>
          <p>Naturaleza a pasos de Temuco.</p>
        </div>
      </a>
    </>
  );
}
