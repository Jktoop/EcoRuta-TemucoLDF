export default function Encabezado() {
  return (
    <header className="barra">
      <a className="marca" href="index.html" aria-label="EcoRuta, inicio">
        <span className="logo">🌳</span>
        <span>
          <strong>EcoRuta</strong>
          <small>TEMUCO · CL</small>
        </span>
      </a>

      <nav className="navegacion" aria-label="Navegación principal">
        <a href="index.html" aria-current="page">
          Inicio
        </a>
        <a href="pages/catalogo.html">Catálogo</a>
        <a href="pages/contacto.html">Contacto</a>
      </nav>

      <div className="barra-derecha">
        <input className="tema-checkbox" type="checkbox" id="tema-oscuro" />
        <label className="tema-control" htmlFor="tema-oscuro">
          <span className="icono-sol" aria-hidden="true">
            ☀️
          </span>
          <span className="icono-luna" aria-hidden="true">
            🌙
          </span>
          <span className="texto-cambiar-oscuro">Tema oscuro</span>
          <span className="texto-cambiar-claro">Tema claro</span>
        </label>

        <span className="puntos">
          <i className="p1" />
          <i className="p2" />
          <i className="p3" />
        </span>

        <details className="language-dropdown">
          <summary className="dropdown-toggle" aria-label="Cambiar idioma">
            <span>🇨🇱</span>
            <span>CL ES</span>
            <span className="arrow">▼</span>
          </summary>
          <ul className="dropdown-menu" role="menu">
            <li>
              <button
                className="dropdown-item active"
                role="menuitem"
                type="button"
              >
                🇨🇱 Español (CL)
              </button>
            </li>
            <li>
              <button className="dropdown-item" role="menuitem" type="button">
                🇬🇧 English (UK)
              </button>
            </li>
            <li>
              <button className="dropdown-item" role="menuitem" type="button">
                🇧🇷 Português (BR)
              </button>
            </li>
          </ul>
        </details>
      </div>
    </header>
  );
}
