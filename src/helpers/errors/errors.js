const errors = {
  client: { message: "Error del cliente", statusCode: 400 },
  auth: { message: "Autenticación incorrecta", statusCode: 401 },
  forbidden: { message: "Acceso prohibido", statusCode: 403 },
  notFound: { message: "Recurso no encontrado", statusCode: 404 },
  fatal: { message: "Error interno del servidor", statusCode: 500 },
};

export default errors;
