export default function Contacto() {
  return <section className="contacto-formulario"><h1>Contacto</h1><p>¿Tienes alguna pregunta o quieres contactarnos?</p><form onSubmit={(e) => e.preventDefault()}><div><label htmlFor="nombre">Nombre</label><input type="text" id="nombre" name="nombre" /></div><div><label htmlFor="correo">Correo electrónico</label><input type="email" id="correo" name="correo" /></div><div><label htmlFor="mensaje">Mensaje</label><textarea id="mensaje" name="mensaje" rows="5" /></div><button type="submit">Enviar mensaje</button></form></section>;
}
