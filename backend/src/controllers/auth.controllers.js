import { register } from "./auth.service.js";

export const registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        await register(email, password, name);
        return res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (err) {
        if (err.status === 409) {
            return res.status(409).json({ message: err.message });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};