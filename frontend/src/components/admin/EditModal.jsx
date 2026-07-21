import { useEffect, useState } from "react";
import { createAdminUser, updateAdminUser } from "../../services/admin.service";

export const ModalEditUser = ({ isOpen, onClose, user = null }) => {
    const [date, setDate] = useState({ name: "", email: "", role: "", password: "" });

    useEffect(() => {
        if (isOpen) {
            setDate(user || { name: "", email: "", role: "", password: "" });
        }
    }, [isOpen, user]);

    if (!isOpen) return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            try {
                await updateAdminUser(user.id, date);
                onClose();
            } catch (error) {
                console.error("Error al editar el usuario:", error);
            }
        } else {
            try {
                await createAdminUser(date);
                onClose();
            } catch (error) {
                console.error("Error al crear el usuario:", error);
            }
        }
    }
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            {/* <!-- Modal Content --> */}
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all">
                {/* <!-- Modal Header --> */}
                <div className="px-8 py-6 flex justify-between items-center border-b border-slate-100">
                    <h2 className="title-md text-slate-900">{user ? "Editar usuario" : "Crear nuevo usuario"}</h2>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors" onClick={onClose}>
                        <span className="material-symbols-outlined" data-icon="close">close</span>
                    </button>
                </div>
                {/* <!-- Modal Body (Form) --> */}
                <form id="user-form" className="p-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block label-md text-slate-500 uppercase tracking-widest mb-2">Nombre completo</label>
                        <input
                            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"
                            value={date.name}
                            onChange={(e) => setDate({ ...date, name: e.target.value })}
                            placeholder="Ej. Juan Pérez" type="text" />
                    </div>
                    <div>
                        <label className="block label-md text-slate-500 uppercase tracking-widest mb-2">Correo electrónico</label>
                        <input
                            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"
                            value={date.email}
                            onChange={(e) => setDate({ ...date, email: e.target.value })}
                            placeholder="usuario@ejemplo.com" type="email" />
                    </div>
                    {!user && (
                        <div>
                            <label className="block label-md text-slate-500 uppercase tracking-widest mb-2">Contraseña</label>
                            <input
                                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all"
                                onChange={(e) => setDate({ ...date, password: e.target.value })}
                                placeholder="••••••••" type="password" />
                        </div>
                    )}
                    <div>
                        <label className="block label-md text-slate-500 uppercase tracking-widest mb-4">Selector de rol</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input checked={date.role === "USER"}
                                        onChange={(e) => setDate({ ...date, role: e.target.value })}
                                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-primary transition-all"
                                        name="role" type="radio" value="USER" />
                                    <div
                                        className="absolute w-2.5 h-2.5 bg-primary rounded-full scale-0 peer-checked:scale-100 transition-transform">
                                    </div>
                                </div>
                                <span
                                    className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">USER</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input checked={date.role === "ADMIN"}
                                        onChange={(e) => setDate({ ...date, role: e.target.value })}
                                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-primary transition-all"
                                        name="role" type="radio" value="ADMIN" />
                                    <div
                                        className="absolute w-2.5 h-2.5 bg-primary rounded-full scale-0 peer-checked:scale-100 transition-transform">
                                    </div>
                                </div>
                                <span
                                    className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">ADMIN</span>
                            </label>
                        </div>
                    </div>
                </form>

                {/* <!-- Modal Footer --> */}
                <div className="px-8 py-6 bg-slate-50 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-full text-slate-600 font-semibold border-2 border-slate-200 hover:bg-slate-100 transition-all">
                        Cancelar
                    </button>
                    <button form="user-form"
                        className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
                        type="submit">
                        {user ? "Guardar cambios" : "Crear usuario"}
                    </button>
                </div>
            </div>
        </div>
    )
}