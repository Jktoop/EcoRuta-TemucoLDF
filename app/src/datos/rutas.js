import bosquePehuen from "../assets/rutas/bosquepehuen.jpeg";
import islaCautin from "../assets/rutas/islacautin.jpg";
import lagoVillarrica from "../assets/rutas/lagovillarrica.jpg";
import mercado from "../assets/rutas/mercado.jpeg";
import nielol from "../assets/rutas/mirador.jpg";
import museo from "../assets/rutas/museo.jpg";
import conguillio from "../assets/rutas/parqueconguillio.jpg";
import villarrica from "../assets/rutas/volcanvillarrica.jpg";

export const rutas = [
  {
    id: 1,
    categoria: "NATURALEZA · TREKKING",
    nombre: "Parque Nacional Conguillío",
    imagen: conguillio,
    alt: "Paisaje del Parque Nacional Conguillío",
    descripcion:
      "Recorre bosques de araucarias milenarias, lagunas y senderos con vistas al volcán Llaima.",
  },
  {
    id: 2,
    categoria: "MONTAÑA · AVENTURA",
    nombre: "Volcán Villarrica",
    imagen: villarrica,
    alt: "Volcán Villarrica",
    descripcion:
      "Un paisaje volcánico emblemático, con alternativas para admirar la montaña y su entorno.",
  },
  {
    id: 3,
    categoria: "CULTURA · HISTORIA",
    nombre: "Museo Regional de La Araucanía",
    imagen: museo,
    alt: "Museo Regional de La Araucanía",
    descripcion:
      "Conoce la historia y el patrimonio cultural de la región en una visita por Temuco.",
  },
  {
    id: 4,
    categoria: "CULTURA · GASTRONOMÍA",
    nombre: "Mercado Municipal de Temuco",
    imagen: mercado,
    alt: "Mercado Municipal de Temuco",
    descripcion:
      "Un punto de encuentro para descubrir productos, cocina y vida local.",
  },
  {
    id: 5,
    categoria: "LAGO · NATURALEZA",
    nombre: "Lago Villarrica",
    imagen: lagoVillarrica,
    alt: "Lago Villarrica",
    descripcion:
      "Disfruta del paisaje lacustre y de las vistas abiertas hacia el volcán Villarrica.",
  },
  {
    id: 6,
    categoria: "PARQUE · TEMUCO",
    nombre: "Parque Isla Cautín",
    imagen: islaCautin,
    alt: "Parque Isla Cautín",
    descripcion:
      "Un espacio verde junto al río para caminar, descansar y disfrutar al aire libre.",
  },
  {
    id: 7,
    categoria: "BOSQUE · NATURALEZA",
    nombre: "Bosque Pehuén",
    imagen: bosquePehuen,
    alt: "Bosque Pehuén",
    descripcion:
      "Adéntrate en un entorno de bosque nativo y conoce de cerca el paisaje del pehuén.",
  },
  {
    id: 8,
    categoria: "MIRADOR · SENDERISMO",
    nombre: "Mirador Cerro Ñielol",
    imagen: nielol,
    alt: "Mirador del cerro Ñielol",
    descripcion:
      "Camina entre vegetación nativa y contempla Temuco desde uno de sus miradores.",
  },
];
