const EmptyState = ({
    message = "No hay datos",
    actionText,
    onAction
}) => {
    return (
        <div className="flex flex-col items-center gap-4 py-10">

            <span className="text-5xl">
                📭
            </span>

            <p>{message}</p>

            {actionText && onAction && (
                <button
                    onClick={onAction}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    {actionText}
                </button>
            )}

        </div>
    );
};

export default EmptyState;