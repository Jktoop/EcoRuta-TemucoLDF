import { useEffect, useState } from "react";

const URL_AIRE =
  "https://air-quality-api.open-meteo.com/v1/air-quality" +
  "?latitude=-38.74&longitude=-72.59" +
  "&current=pm2_5,pm10,uv_index";

function avisoSegunAire(aire) {
  if (aire.pm2_5 > 50) {
    return "Aire muy contaminado: mejor evita hacer ejercicio al aire libre.";
  }
  if (aire.pm2_5 > 25) {
    return "Calidad del aire regular: si tienes sensibilidad, elige una ruta corta.";
  }
  return "Buena calidad del aire: buen momento para salir a una ruta.";
}

export default function CalidadAire() {
  const [aire, setAire] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarAire() {
      try {
        const respuesta = await fetch(URL_AIRE);
        if (!respuesta.ok) {
          throw new Error(`Open-Meteo respondió ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setAire(datos.current);
      } catch {
        setError("No pudimos cargar la calidad del aire. Revisa tu conexión.");
      } finally {
        setCargando(false);
      }
    }
    cargarAire();
  }, []);

  return (
    <section className="clima" aria-labelledby="titulo-aire">
      <h2 id="titulo-aire">Calidad del aire en la ruta</h2>
      {cargando && (
        <p className="estado" role="status">
          Cargando calidad del aire…
        </p>
      )}
      {error && (
        <p className="estado error" role="alert">
          {error}
        </p>
      )}
      {aire && (
        <>
          <p>PM2.5: {aire.pm2_5} µg/m³</p>
          <p>PM10: {aire.pm10} µg/m³</p>
          <p>Índice UV: {aire.uv_index}</p>
          <p className="aviso-clima">{avisoSegunAire(aire)}</p>
          <p className="fuente">
            Datos de <a href="https://open-meteo.com/">Open-Meteo</a>
          </p>
        </>
      )}
    </section>
  );
}