import express from "express";
import cors from "cors";
import {errorHandler} from "./src/middlewares/error.middleware.js"
import router from "./src/routers/auth.routes.js";
import passport from "./src/config/passport.jwt.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize())
app.use(router)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});

export default app;
