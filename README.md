# EcoRuta Temuco / Los Del Frente
 
## Integrantes y roles (Sprint 2)
 
| Nombre | Rol ágil |
|---|---|
| Kevin Inalaf | Developer |
| Sakin Contreras | Product Owner |
| Joaquin Carrillo | QA/Tester |
| Sebastian San Martin | Scrum Master |
 
## Descripción breve
 
> Desarrollo de una plataforma web para EcoRuta Temuco, emprendimiento dedicado al turismo sustentable en La Araucanía. El objetivo es centralizar la oferta de rutas y emprendimientos locales en una interfaz accesible, tanto de dispositivos móviles y computadores, facilitando a los usuarios el acceso a la información turística de manera rápida y confiable.
 
## Tecnologías utilizadas
 
- HTML5 / CSS3
- JavaScript
- React 19 + Vite
- React Router 7 (HashRouter)
- API consumida: Open-Meteo (clima)
- json-server (API propia, semana 12)
## Cómo ejecutar el proyecto
 
```bash
# Entrar a la carpeta de la aplicación
cd app
 
# Instalar dependencias
npm install
 
# Ejecutar en modo desarrollo
npm run dev
```
 
## Estado del proyecto
 
- Sprint actual: Sprint 2
- Última actualización: (19/11/2026)
## Tablero Kanban
 
Enlace al tablero: https://trello.com/invite/b/6a7dd5eb5157718e082ae58c/ATTIec679906585416939236bb106afd3aa663364091/ecoruta-temuco-ldf
 
## Enlace de despliegue
 
https://jktoop.github.io/EcoRuta-TemucoLDF/
 
## API propia
 
Contrato acordado en la reunión frontend-backend del jueves 12 de noviembre de 2026.
Firmado por Sakin Contreras (PO), Kevin Inalaf (frontend) y Sebastian San Martin (backend).
La foto de la hoja firmada está en la tarjeta «Contrato API» de Trello.
 
Si el contrato cambia, se cambia primero aquí y después en el código.
 
### Recursos
 
| Recurso | La interfaz lo… | Vistas que lo usan | Para qué le sirve al usuario |
|---|---|---|---|
| `rutas` | solo lee | Inicio, Catalogo, DetalleRuta | Elegir una ruta |
| `emprendimientos` | solo lee | Inicio (sección informativa) | Encontrar negocios locales para visitar |
| `resenas` | lee, crea y borra | DetalleRuta | Leer experiencias de otros |
 
Decisiones del equipo:
 
- Emprendimientos: basta con Inicio, que es una sección informativa. No tienen página propia ni llevan `rutaId`.
- Reseñas: cualquier visitante puede borrar una reseña desde DetalleRuta. Es aceptable en este curso porque no hay backend ni sesiones.
### Modelo de datos
 
Un bloque por recurso. El `id` siempre es `number` y lo genera el servidor.
 
**`rutas`**
 
```ts
interface Ruta {
  id: number;
  nombre: string;
  categoria: "trekking" | "aventura" | "cultural" | "gastronomia" | "naturaleza" | "parque";
  imagen: string;          // ruta del archivo, por ejemplo "/img/rutas/parqueconguillio.jpg"
  alt: string;             // obligatorio
  descripcion: string;     // máx 200 caracteres
  distanciaKm?: number;    // opcional, mayor que 0
  dificultad?: "baja" | "media" | "alta";  // opcional
  accesible?: boolean;     // opcional
}
```
 
```json
{ "id": 1, "nombre": "Parque Nacional Conguillío", "categoria": "trekking", "imagen": "/img/rutas/parqueconguillio.jpg", "alt": "Paisaje del Parque Nacional Conguillío", "descripcion": "Recorre bosques de araucarias milenarias, lagunas y senderos con vistas al volcán Llaima.", "distanciaKm": 12, "dificultad": "media", "accesible": false }
```
 
**`emprendimientos`**
 
```ts
interface Emprendimiento {
  id: number;
  nombre: string;
  tipo: "artesania" | "gastronomia" | "experiencias";
  descripcion: string;     // máx 200 caracteres
  icono?: string;          // opcional, decorativo (aria-hidden="true")
  ubicacion?: string;      // opcional, comuna o dirección
  contacto?: string;       // opcional, teléfono, Instagram o web
}
```
 
```json
{ "id": 1, "nombre": "Artesanía de La Araucanía", "tipo": "artesania", "descripcion": "Descubre piezas y tejidos elaborados por emprendedores de la región.", "icono": "🧺", "ubicacion": "Temuco", "contacto": "@artesania.araucania" }
```
 
**`resenas`**
 
```ts
interface Resena {
  id: number;
  rutaId: number;          // relación con rutas
  autor: string;
  calificacion: number;    // entero de 1 a 5
  comentario: string;      // máx 150 palabras
  fecha?: string;          // opcional, la pone el JavaScript con new Date().toISOString()
}
```
 
```json
{ "id": 1, "rutaId": 1, "autor": "Yonaiker Maikol Jevenez", "calificacion": 5, "comentario": "Ruta muy limpia y bien señalizada.", "fecha": "2026-11-12T12:45:00Z" }
```
 
### Contrato
 
| Método | Endpoint | Envía el frontend | Responde la API | Código | Vista o componente |
|---|---|---|---|---|---|
| `GET` | `/rutas` | nada | arreglo de rutas | 200 | Inicio, Catalogo |
| `GET` | `/rutas/:id` | nada | una ruta | 200 · 404 | DetalleRuta |
| `GET` | `/resenas?rutaId=:id` | nada | reseñas de esa ruta | 200 | DetalleRuta |
| `POST` | `/resenas` | `{ rutaId, autor, calificacion, comentario, fecha }` | la reseña creada, con su `id` | 201 | DetalleRuta |
| `DELETE` | `/resenas/:id` | nada | `{}` (objeto vacío); la reseña queda eliminada | 200 | DetalleRuta |
| `GET` | `/emprendimientos` | nada | arreglo de emprendimientos | 200 | Inicio |
 
La búsqueda y los filtros del Catálogo se hacen en el frontend con `useState`, sobre la lista completa.
 
### Cómo levantar la API en local
 
Se completa en la semana 12, cuando la API se construya con json-server.
 
### API pública externa
 
| Dato | Valor |
|---|---|
| Nombre | Open-Meteo |
| URL base | https://api.open-meteo.com/v1 |
| Endpoint que usaremos | `/forecast?latitude=-38.74&longitude=-72.6&current=temperature_2m,wind_speed_10m,weather_code` |
| Requiere autenticación | No (es un requisito del curso) |
| Vista en que aparece | Inicio (widget «Clima en La Araucanía») |
| Para qué le sirve al usuario | Saber si es buen momento para salir a una ruta |
