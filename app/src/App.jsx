import Encabezado from "./components/Encabezado.jsx";
import BannerPrincipal from "./components/BannerPrincipal.jsx";
import TarjetaRuta from "./components/TarjetaRuta.jsx";
import ListaRutas from "./components/ListaRutas.jsx";
import PiePagina from "./components/PiePagina.jsx";
import { rutas } from "./datos/rutas.js";
import imagenPrueba from "./assets/react.svg";
 
function App() {
  return (
    <>
      <Encabezado
        enlaces={["Inicio", "Rutas", "Contacto"]}
        paginaActual="Inicio"
      />
      <main>
        <BannerPrincipal
          titulo="Rutas sostenibles de La Araucanía"
          subtitulo="Senderos y emprendimientos cerca de Temuco"
        />
        {/* Tarjeta de prueba (encargo C): se quita al final */}
        <TarjetaRuta
          nombre="Cerro Ñielol"
          imagen={imagenPrueba}
          alt="Imagen de prueba"
          distanciaKm={4}
          dificultad="baja"
          accesible={true}
        />
        <ListaRutas rutas={rutas} />
      </main>
      <PiePagina />
    </>
  );
}
 
export default App;
