export const EN_PUBLICACION = import.meta.env.PROD;

export const API_URL = EN_PUBLICACION
  ? "https://api-propia.invalid"
  : "http://localhost:3001";