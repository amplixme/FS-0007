import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Blog - Documentación",
      version: "1.0.0",
      description: "Documentación interactiva de la API con Swagger. Incluye endpoints de Auth, Posts, Comentarios, Categorías, Usuarios y Administración.",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor Local de Desarrollo",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingresa tu token JWT en el formato: Bearer <TOKEN>",
        },
      },
      responses: {
        BadRequest: {
          description: "400 - Datos de entrada inválidos o faltantes.",
          content: {
            "application/json": {
              example: { error: "ValidationError", message: "El campo título es obligatorio." },
            },
          },
        },
        Unauthorized: {
          description: "401 - No autorizado. Token no provisto o expirado.",
          content: {
            "application/json": {
              example: { error: "Unauthorized", message: "No autorizado" },
            },
          },
        },
        Forbidden: {
          description: "403 - Acceso denegado. Se requieren permisos de ADMIN.",
          content: {
            "application/json": {
              example: { error: "Forbidden", message: "Requiere rol de administrador" },
            },
          },
        },
        NotFound: {
          description: "404 - Recurso no encontrado.",
          content: {
            "application/json": {
              example: { error: "NotFound", message: "El recurso solicitado no existe." },
            },
          },
        },
        Conflict: {
          description: "409 - Conflicto. El recurso ya existe (ej. email registrado).",
          content: {
            "application/json": {
              example: { error: "Conflict", message: "El email ya se encuentra registrado." },
            },
          },
        },
      },
    },
  },
  // Lee los comentarios JSDoc dentro de todas las rutas
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);