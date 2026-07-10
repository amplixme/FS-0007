import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  getAll, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from "../services/category.service"; 
import ConfirmModal from "../components/common/ConfirmModal";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

 
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);


  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-z0-9\s-]/g, "") 
      .trim()
      .replace(/\s+/g, "-"); 
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await getAll(); 
      
      const listaLimpia = res?.data || res; 
      
      setCategories(Array.isArray(listaLimpia) ? listaLimpia : []);
      
    } catch (err) {
      setError("No se pudieron cargar las categorías.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  
  const handleNameChange = (e, target) => {
    const val = e.target.value;
    if (target === "create") {
      setNewName(val);
      setNewSlug(generateSlug(val));
    } else {
      setEditName(val);
      setEditSlug(generateSlug(val));
    }
  };


  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      await createCategory(newName, newSlug);
      setNewName("");
      setNewSlug("");
      showToast("Categoría creada con éxito!");
      fetchCategories();
    } catch (err) {
      showToast(err.message || "Error al crear la categoría", "error");
    }
  };


  const openEditModal = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditSlug(category.slug);
    setIsEditModalOpen(true);
  };


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(editingCategory.id, editName, editSlug);
      setIsEditModalOpen(false);
      showToast("Categoría actualizada con éxito!");
      fetchCategories();
    } catch (err) {
      showToast(err.message || "Error al actualizar", "error");
    }
  };

 
  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleteModalOpen(false);
      await deleteCategory(categoryToDelete.id);
      showToast("Categoría eliminada con éxito!");
      fetchCategories();
    } catch (err) {
      showToast(err.message || "Error al eliminar", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 relative">

      {toast.show && (
        <div className={`fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-lg px-6 py-4 text-white shadow-2xl transition-all duration-300 ${
          toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
        }`}>
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          <p className="font-semibold whitespace-nowrap">{toast.message}</p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-slate-900 mb-6">Administrar Categorías</h1>

      {}
      <form onSubmit={handleCreateSubmit} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Nueva Categoría</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Nombre</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => handleNameChange(e, "create")}
              placeholder="Ej: Programación"
              className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Slug (Auto-generado)</label>
            <input
              type="text"
              value={newSlug}
              className="w-full rounded-lg border border-slate-100 bg-slate-50 p-2 text-sm text-slate-500 cursor-not-allowed focus:outline-none"
              readOnly
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg p-2 text-sm font-medium hover:bg-blue-700 transition"
          >
            Agregar Categoría
          </button>
        </div>
      </form>

      {}
      {isLoading ? (
        <p className="text-center text-slate-500">Cargando categorías...</p>
      ) : error ? (
        <p className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">{error}</p>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase border-b border-slate-200">
                <th className="p-4">Nombre</th>
                <th className="p-4">Slug</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-medium text-slate-900">{cat.name}</td>
                  <td className="p-4 text-slate-500">{cat.slug}</td>
                  <td className="p-4 text-right flex justify-end gap-3">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => openDeleteModal(cat)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-slate-400">No hay categorías registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Editar Categoría</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Nombre</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => handleNameChange(e, "edit")}
                  className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Slug</label>
                <input
                  type="text"
                  value={editSlug}
                  className="w-full rounded-lg border border-slate-100 bg-slate-50 p-2 text-sm text-slate-500 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="¿Estás seguro de que deseas eliminar esta categoría?"
        message={`Esta acción eliminará de forma permanente la categoría "${categoryToDelete?.name}".`}
      />
    </div>
  );
}