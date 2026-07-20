const ConfirmDialog = ({ open, title, message, confirmLabel = "Confirmar", onConfirm, onCancel }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl shadow-2xl overflow-hidden p-8">
                <div className="flex items-center gap-3 text-error mb-4">
                    <span className="material-symbols-outlined text-3xl">warning</span>
                    <h3 className="text-xl font-bold">{title}</h3>
                </div>
                <p className="text-on-surface-variant mb-8">{message}</p>
                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 px-4 rounded-full font-bold text-on-surface bg-surface-container-high hover:bg-surface-container-highest transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 px-4 rounded-full font-bold text-white bg-error hover:opacity-90 transition-opacity"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;