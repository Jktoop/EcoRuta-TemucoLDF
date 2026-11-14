import { NavLink, Link } from "react-router";

const enlaces = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Catálogo", ruta: "/rutas" },
  { texto: "Contacto", ruta: "/contacto" },
];

export default function Encabezado() {
  return (
    <header className="barra">
      <Link className="marca" to="/" aria-label="EcoRuta, inicio">
        <span className="logo">🌳</span>
        <span>
          <strong>EcoRuta</strong>
          <small>TEMUCO · CL</small>
        </span>
      </Link>

      <nav className="navegacion" aria-label="Navegación principal">
        {enlaces.map((enlace) => (
          <NavLink
            key={enlace.ruta}
            to={enlace.ruta}
            end={enlace.ruta === "/"}
            className={({ isActive }) => (isActive ? "activo" : "")}
          >
            {enlace.texto}
          </NavLink>
        ))}
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
