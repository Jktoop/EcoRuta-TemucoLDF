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
