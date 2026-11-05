const botonDetalle = document.querySelector("#btn-detalle");
const detalleExtra = document.querySelector("#detalle-extra");

if (botonDetalle && detalleExtra) {
  botonDetalle.addEventListener("click", () => {
    const expandido = botonDetalle.getAttribute("aria-expanded") === "true";
    botonDetalle.setAttribute("aria-expanded", String(!expandido));
    detalleExtra.hidden = expandido;
    botonDetalle.textContent = expandido ? "Ver más detalle" : "Ver menos detalle";
  });
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
  const textoExtra = document.querySelector("#detalle-extra p");
  textoExtra.textContent = ruta.descripcion;
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
