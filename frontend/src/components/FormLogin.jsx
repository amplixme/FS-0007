import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            newErrors.email = "El formato del email no es válido.";
        }

        if (form.password.length < 8) {
            newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            // eslint-disable-next-line no-undef
            const { data } = await apiClient.post("/api/auth/login", {
                email: form.email,
                password: form.password,
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/dashboard", { state: { successMessage: "¡Bienvenido de nuevo!" } });

        } catch (err) {
            const msg = err?.response?.data?.message || "Ocurrió un error. Intentá de nuevo.";
            setServerError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface ml-1" htmlFor="email">
                    Correo electrónico
                </label>
                <div className="relative group">
                    <div
                        className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <input
                        type="email"
                        className="block w-full pl-11 pr-4 py-3.5 bg-surface-container-low border-transparent rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary/30 focus:bg-surface-container-lowest transition-all"
                        id="email"
                        name="email"
                        placeholder="ejemplo@correo.com"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="text-sm font-small ml-1 text-error">{errors.email}</span>}
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                    <label className="block text-sm font-semibold text-on-surface" htmlFor="password">
                        Contraseña
                    </label>
                    <a className="text-sm font-semibold text-primary hover:text-on-primary-fixed-variant transition-colors" href="#">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                <div className="relative group">
                    <div
                        className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                    </div>
                    <input
                        type="password"
                        className="block w-full pl-11 pr-12 py-3.5 bg-surface-container-low border-transparent rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary/30 focus:bg-surface-container-lowest transition-all"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="text-sm font-small ml-1 text-error">{errors.password}</span>}
                    <button
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface transition-colors"
                        type="button">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                </div>

            </div>
            {serverError && <p className="text-sm font-small ml-1 text-error">{serverError}</p>}

            <button className="w-full bg-primary text-on-primary font-bold py-4 px-6 rounded-full hover:bg-on-primary-fixed-variant active:scale-[0.98] transition-all ambient-shadow text-base"
                type="submit" disabled={loading}>
                {loading ? "Procesando..." : "Iniciar sesión"}
            </button>
        </form>
    );
}