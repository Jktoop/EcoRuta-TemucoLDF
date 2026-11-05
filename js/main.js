const botonDetalle = document.querySelector("#btn-detalle-clima");
const detalleExtra = document.querySelector("#detalle-clima");

if (botonDetalle && detalleExtra) {
  botonDetalle.addEventListener("click", () => {
    const expandido = botonDetalle.getAttribute("aria-expanded") === "true";
    botonDetalle.setAttribute("aria-expanded", String(!expandido));
    detalleExtra.hidden = expandido;
    botonDetalle.textContent = expandido ? "Ver detalle del clima" : "Ocultar detalle del clima";
  });
}

const estadoClima = document.querySelector("#estado");
if (estadoClima) {
  const urlClima = "https://api.open-meteo.com/v1/forecast?latitude=-38.66&longitude=-71.66&current=temperature_2m,wind_speed_10m,weather_code&timezone=America%2FSantiago";
  const describirCielo = (codigo) => {
    if (codigo === 0) return "Despejado";
    if (codigo <= 3) return "Parcialmente nublado";
    if (codigo === 45 || codigo === 48) return "Niebla";
    if (codigo >= 51 && codigo <= 57) return "Llovizna";
    if (codigo >= 61 && codigo <= 67) return "Lluvia";
    if (codigo >= 71 && codigo <= 77) return "Nieve";
    if (codigo >= 80 && codigo <= 82) return "Chubascos";
    if (codigo >= 95) return "Tormenta";
    return "Sin información";
  };

  const cargarClima = async () => {
    try {
      const respuesta = await fetch(urlClima);
      if (!respuesta.ok) throw new Error("No se pudo consultar el clima");
      const datos = await respuesta.json();
      const actual = datos.current;
      document.querySelector("#temperatura").textContent = `${actual.temperature_2m} °C`;
      document.querySelector("#viento").textContent = `${actual.wind_speed_10m} km/h`;
      document.querySelector("#cielo").textContent = describirCielo(actual.weather_code);
      estadoClima.textContent = "Condiciones actuales";

      const aviso = document.querySelector("#aviso-clima");
      if (actual.temperature_2m < 8) {
        aviso.textContent = "Hace frío: lleva abrigo.";
      } else if (actual.wind_speed_10m > 40) {
        aviso.textContent = "Viento fuerte: toma precauciones en zonas expuestas.";
      } else {
        aviso.textContent = "Recuerda cuidar los senderos y llevarte tus residuos.";
      }
      aviso.hidden = false;
    } catch {
      estadoClima.textContent = "No pudimos cargar el clima. Intenta nuevamente más tarde.";
    }
  };

  cargarClima();
}

const rutas = {
  conguillio: { nombre: "Parque Nacional Conguillío", categoria: "NATURALEZA · TREKKING", descripcion: "Recorre bosques de araucarias milenarias, lagunas y senderos con vistas al volcán Llaima.", imagen: "parqueconguillio.jpg", alt: "Paisaje del Parque Nacional Conguillío", etiquetas: ["Trekking", "Volcán", "Fotografía"] },
  villarrica: { nombre: "Volcán Villarrica", categoria: "MONTAÑA · AVENTURA", descripcion: "Un paisaje volcánico emblemático, con alternativas para admirar la montaña y su entorno.", imagen: "volcanvillarrica.jpg", alt: "Volcán Villarrica", etiquetas: ["Montaña", "Naturaleza", "Aventura"] },
  museo: { nombre: "Museo Regional de La Araucanía", categoria: "CULTURA · HISTORIA", descripcion: "Conoce la historia y el patrimonio cultural de la región en una visita por Temuco.", imagen: "museo.jpg", alt: "Museo Regional de La Araucanía", etiquetas: ["Cultura", "Historia", "Temuco"] },
  mercado: { nombre: "Mercado Municipal de Temuco", categoria: "CULTURA · GASTRONOMÍA", descripcion: "Un punto de encuentro para descubrir productos, cocina y vida local.", imagen: "mercado.jpeg", alt: "Mercado Municipal de Temuco", etiquetas: ["Cultura", "Gastronomía", "Temuco"] },
  lagovillarrica: { nombre: "Lago Villarrica", categoria: "LAGO · NATURALEZA", descripcion: "Disfruta del paisaje lacustre y de las vistas abiertas hacia el volcán Villarrica.", imagen: "lagovillarrica.jpg", alt: "Lago Villarrica", etiquetas: ["Lago", "Naturaleza", "Paisaje"] },
  islacautin: { nombre: "Parque Isla Cautín", categoria: "PARQUE · TEMUCO", descripcion: "Un espacio verde junto al río para caminar, descansar y disfrutar al aire libre.", imagen: "islacautin.jpg", alt: "Parque Isla Cautín", etiquetas: ["Parque", "Temuco", "Naturaleza"] },
  bosquepehuen: { nombre: "Bosque Pehuén", categoria: "BOSQUE · NATURALEZA", descripcion: "Adéntrate en un entorno de bosque nativo y conoce de cerca el paisaje del pehuén.", imagen: "bosquepehuen.jpeg", alt: "Bosque Pehuén", etiquetas: ["Bosque", "Naturaleza", "Pehuén"] },
  nielol: { nombre: "Mirador Cerro Ñielol", categoria: "MIRADOR · SENDERISMO", descripcion: "Camina entre vegetación nativa y contempla Temuco desde uno de sus miradores.", imagen: "mirador.jpg", alt: "Mirador del cerro Ñielol", etiquetas: ["Mirador", "Senderismo", "Temuco"] }
};

const detalleRuta = document.querySelector("#ruta-nombre");
if (detalleRuta) {
  const idRuta = new URLSearchParams(window.location.search).get("ruta");
  const ruta = rutas[idRuta] || rutas.conguillio;
  document.title = `EcoRuta Temuco - ${ruta.nombre}`;
  detalleRuta.textContent = ruta.nombre;
  document.querySelector("#ruta-categoria").textContent = ruta.categoria;
  document.querySelector("#ruta-descripcion").textContent = ruta.descripcion;
  const foto = document.querySelector("#ruta-foto");
  foto.src = `../img/${ruta.imagen}`;
  foto.alt = ruta.alt;
  document.querySelector(".detalle .tags").replaceChildren(...ruta.etiquetas.map((etiqueta) => {
    const tag = document.createElement("span");
    tag.textContent = etiqueta;
    return tag;
  }));
}

const filtro = document.querySelector("#filtro-catalogo");
const tarjetasRuta = [...document.querySelectorAll(".ruta-card")];
if (filtro) {
  const actualizarResultados = () => {
    const normalizar = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
    const consulta = normalizar(filtro.value.trim());
    let visibles = 0;
    tarjetasRuta.forEach((tarjeta) => {
      const coincide = normalizar(tarjeta.dataset.search).includes(consulta);
      tarjeta.hidden = !coincide;
      if (coincide) visibles += 1;
    });
    document.querySelector("#sin-resultados").hidden = visibles > 0;
    document.querySelector("#resultado-busqueda").textContent = consulta ? `${visibles} ${visibles === 1 ? "ruta encontrada" : "rutas encontradas"}` : "";
  };
  filtro.addEventListener("input", actualizarResultados);
  const consultaInicial = new URLSearchParams(window.location.search).get("q");
  if (consultaInicial) {
    filtro.value = consultaInicial;
    actualizarResultados();
  }
}
