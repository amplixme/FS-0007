import {register,login} from "../services/auth.service.js";
import { success } from "../utils/response.js";

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

export const loginUser = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);
        success(result,"User logged",200)
    } 
    catch (error) {
        next(error);
    }
};