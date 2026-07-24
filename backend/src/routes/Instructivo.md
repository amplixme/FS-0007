# Guía para agregar nuevas rutas

Este documento explica cómo agregar un nuevo conjunto de rutas al proyecto utilizando el `index.router.js`.

## Estructura actual

```text
routes/
├── index.router.js
├── auth.routes.js
└── ...
```

El archivo `index.router.js` centraliza todas las rutas de la aplicación.

```javascript
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

const router = Router();

router.use("/auth", authRoutes);

router.get("/health", (req, res) => res.json({ status: "ok" }));

router.use(errorHandler);

export default router;
```

---

# Paso 1: Crear el archivo de rutas

Dentro de la carpeta `routes`, crear un archivo para el nuevo recurso.

Ejemplo:

```text
routes/
├── auth.routes.js
├── users.routes.js
└── index.router.js
```

Ejemplo de `users.routes.js`:

```javascript
import { Router } from "express";
import * as usersController from "../src/controllers/users.controller.js";

const router = Router();

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

export default router;
```

---

# Paso 2: Importar las rutas

En `index.router.js`, importar el nuevo archivo.

```javascript
import usersRoutes from "./users.routes.js";
```

---

# Paso 3: Registrar las rutas

Agregar un nuevo `router.use()` antes del middleware de errores.

```javascript
router.use("/users", usersRoutes);
```

El archivo quedará similar a:

```javascript
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import usersRoutes from "./users.routes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use(errorHandler);

export default router;
```

---

# Paso 4: Verificar la URL final

La URL final estará compuesta por:

```
Prefijo del router + Ruta definida en el archivo
```

Ejemplo:

En `index.router.js`

```javascript
router.use("/users", usersRoutes);
```

Y en `users.routes.js`

```javascript
router.get("/");
```

La ruta será:

```
GET /users
```

Otro ejemplo:

```javascript
router.get("/:id");
```

Se accederá mediante:

```
GET /users/15
```

---

# Agregar middleware a una ruta

Es posible agregar middleware únicamente a determinadas rutas.

```javascript
router.post("/", validate(userSchema), authMiddleware, usersController.createUser);
```

También puede aplicarse a todas las rutas del router:

```javascript
router.use(authMiddleware);

router.get("/", controller.getAll);
router.post("/", controller.create);
```

---

# Recomendaciones

- Crear un archivo de rutas por recurso (`users`, `products`, `reservations`, etc.).
- Mantener la lógica de negocio en los controladores.
- Utilizar middlewares para autenticación y validación.
- Registrar siempre las nuevas rutas en `index.router.js`.
- Mantener el middleware `errorHandler` como el último middleware registrado.

---

# Orden recomendado

```text
1. Importar el router.
2. Registrar el router con router.use().
3. Mantener /health.
4. Registrar el errorHandler al final.
```

Ejemplo:

```javascript
import { Router } from "express";

import authRoutes from "./auth.routes.js";
import usersRoutes from "./users.routes.js";
import reservationsRoutes from "./reservations.routes.js";

import { errorHandler } from "./src/middlewares/error.middleware.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/reservations", reservationsRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use(errorHandler);

export default router;
```
