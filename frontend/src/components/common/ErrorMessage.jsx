const ErrorMessage = ({
    message = "Ocurrió un error",
    onRetry
}) => {
    return (
        <div className="flex flex-col items-center gap-4 py-10">

            <span className="text-5xl">
                ❌
            </span>

            <p className="text-red-600">
                {message}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="rounded bg-red-600 px-4 py-2 text-white"
                >
                    Reintentar
                </button>
            )}

        </div>
    );
};

export default ErrorMessage;