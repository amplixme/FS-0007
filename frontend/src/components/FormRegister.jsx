import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormRegister() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
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

        if (!form.username.trim()) {
            newErrors.username = "El nombre es requerido.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            newErrors.email = "El formato del email no es válido.";
        }

        if (form.password.length < 8) {
            newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
        }

        if (form.password !== form.confirm_password) {
            newErrors.confirm_password = "Las contraseñas no coinciden.";
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
            await apiClient.post("/api/auth/register", {
                username: form.username,
                email: form.email,
                password: form.password,
            });

            navigate("/login", { state: { successMessage: "Cuenta creada. ¡Ya podés iniciar sesión!" } });

        } catch (err) {
            const msg = err?.response?.data?.message || "Ocurrió un error. Intentá de nuevo.";
            setServerError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="px-8 pb-10 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 ml-1" htmlFor="username">Nombre completo</label>
                <div className="relative">
                    <span
                        className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-slate-400"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />
                </div>
                {errors.username && <span className="text-sm font-small text-slate-700 ml-1 text-error">{errors.username}</span>}
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 ml-1" htmlFor="email">Correo electrónico</label>
                <div className="relative">
                    <span
                        className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                    <input
                        type="email"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-slate-400"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="text-sm font-small text-slate-700 ml-1 text-error">{errors.email}</span>}
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 ml-1" htmlFor="password">Contraseña</label>
                <div className="relative">
                    <span
                        className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                    <input
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-slate-400"
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="text-sm font-small text-slate-700 ml-1 text-error">{errors.password} </span>}
                </div>
                <div className="mt-2 flex items-center gap-2 px-1">
                    <div className="flex-1 h-1 rounded-full bg-primary"></div>
                    <div className="flex-1 h-1 rounded-full bg-primary"></div>
                    <div className="flex-1 h-1 rounded-full bg-slate-200"></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary ml-1">Media</span>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 ml-1" htmlFor="confirm-password">Confirmar contraseña</label>
                <div className="relative">
                    <span
                        className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">enhanced_encryption</span>
                    <input
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-slate-400"
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={form.confirm_password}
                        onChange={handleChange}
                    />
                    {errors.confirm_password && <span className="text-sm font-small text-slate-700 ml-1 text-error">{errors.confirm_password} </span>}
                </div>

                {serverError && <p className="error server-error">{serverError}</p>}
            </div>

            <label className="flex items-start gap-3 mt-1 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                    <input
                        className="peer h-5 w-5 appearance-none rounded-lg border-2 border-slate-200 bg-white checked:bg-primary checked:border-primary transition-all cursor-pointer"
                        type="checkbox" />
                    <span
                        className="material-symbols-outlined absolute text-white text-sm scale-0 peer-checked:scale-100 transition-transform pointer-events-none">check</span>
                </div>
                <span className="text-xs text-slate-500 leading-tight">
                    Acepto los <a className="text-primary font-semibold hover:underline" href="#">Términos y Condiciones</a> y la <a
                        className="text-primary font-semibold hover:underline" href="#">Política de Privacidad</a> de TuProyecto.
                </span>
            </label>

            <button
                className="w-full py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-[0.98] transition-all mt-4"
                type="submit"
                disabled={loading}>
                {loading ? "Procesando..." : "Registrarse"}
            </button>
        </form>
    );
}