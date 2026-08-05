import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import api from "../../services/api";

export default function ImageUpload({ onUpload }) {
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          setProgress(percent);
        },
      });

      onUpload(response.data.url);

      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (!file) return;

      if (preview?.url) {
        URL.revokeObjectURL(preview.url);
      }

      setPreview({
        file,
        url: URL.createObjectURL(file),
      });

      setProgress(0);
      setIsUploading(true);

      await uploadImage(file);
    },
    [preview]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  useEffect(() => {
    return () => {
      if (preview?.url) {
        URL.revokeObjectURL(preview.url);
      }
    };
  }, [preview]);

  const removeImage = (event) => {
    event.stopPropagation();

    if (preview?.url) {
      URL.revokeObjectURL(preview.url);
    }

    setPreview(null);
    setProgress(0);
    setIsUploading(false);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        {...getRootProps()}
        className={`
          relative
          flex h-72 w-full flex-col items-center justify-center
          overflow-hidden rounded-xl border-2 border-dashed
          cursor-pointer
          transition-all
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}
        `}
      >
        <input
          {...getInputProps({
            "aria-label": "Seleccionar imagen de portada",
          })}
        />

        {preview ? (
          <>
            <img
              src={preview.url}
              alt={`Vista previa de ${preview.file.name}`}
              className="max-h-48 object-contain"
            />

            <button
              type="button"
              onClick={removeImage}
              className="
                absolute right-3 top-3
                flex h-8 w-8 items-center justify-center
                rounded-full bg-red-700 text-white
                transition hover:bg-red-800
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              "
              aria-label="Quitar imagen seleccionada"
            >
              ✕
            </button>

            <div className="mt-5 w-11/12">
              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-blue-600 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Progreso de carga de imagen"
                />
              </div>

              <p className="mt-2 text-center text-sm text-gray-700" aria-live="polite">
                {isUploading ? `Subiendo... ${progress}%` : "Carga completada"}
              </p>
            </div>
          </>
        ) : (
          <>
            <svg
              className="mb-4 h-14 w-14 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              />
            </svg>

            {isDragActive ? (
              <p className="font-medium text-blue-700">Soltá la imagen aquí...</p>
            ) : (
              <>
                <p className="font-semibold">Arrastrá una imagen aquí</p>

                <p className="mt-2 text-sm text-gray-600">o hacé click para seleccionarla</p>

                <p className="mt-4 text-xs text-gray-600">PNG · JPG · JPEG · WEBP</p>
              </>
            )}
          </>
        )}
      </div>

      {fileRejections.length > 0 && (
        <p className="mt-3 text-center text-sm text-red-700" role="alert">
          Solo se permiten imágenes.
        </p>
      )}
    </div>
  );
}
