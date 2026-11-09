import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Inicio from "./pages/Inicio.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import DetalleRuta from "./pages/DetalleRuta.jsx";
import Contacto from "./pages/Contacto.jsx";
import { rutas } from "./datos/rutas.js";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const pagina = params.get("page") || "inicio";
  const paginaNombre = { inicio: "Inicio", catalogo: "Catálogo", contacto: "Contacto" }[pagina] || "";
  const ruta = rutas.find((item) => String(item.id) === params.get("ruta"));
  let contenido;
  if (pagina === "catalogo") contenido = <Catalogo rutas={rutas} />;
  else if (pagina === "detalle") contenido = <DetalleRuta ruta={ruta} />;
  else if (pagina === "contacto") contenido = <Contacto />;
  else contenido = <Inicio rutas={rutas} />;
  return <><Encabezado enlaces={["Inicio", "Catálogo", "Contacto"]} paginaActual={paginaNombre} /><main className="contenido">{contenido}</main><PiePagina /></>;
}
