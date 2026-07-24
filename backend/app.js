import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";
import passport from "./src/config/passport.jwt.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});

export default app;
