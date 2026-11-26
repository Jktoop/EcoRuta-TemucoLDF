import { EN_PUBLICACION } from "../api.js";

export default function AvisoPublicacion() {
  if (!EN_PUBLICACION) return null;

  return (
    <p className="aviso-publicacion" role="note">
      Estás viendo la versión publicada. Las rutas, los emprendimientos y las
      reseñas vienen de la API propia, que funciona en local y se muestra en el
      Demo Day. La calidad del aire de Open-Meteo (API externa) sí está en
      vivo.
    </p>
  );
}