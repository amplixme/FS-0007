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
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          setProgress(percent);
        },
      });
      onUpload(response.data.url)

      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    // Elimina la preview anterior si existe
    if (preview?.url) {
      URL.revokeObjectURL(preview.url);
    }

    setPreview({
      file,
      url: URL.createObjectURL(file),
    });

    // Simulación de subida
    setProgress(0);
    setIsUploading(true);

    await uploadImage(file);

  }, [preview]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5 MB
  });

  useEffect(() => {
    return () => {
      if (preview?.url) {
        URL.revokeObjectURL(preview.url);
      }
    };
  }, [preview]);

  const removeImage = (e) => {
    e.stopPropagation();

    if (preview?.url) {
      URL.revokeObjectURL(preview.url);
    }

    setPreview(null);
    setProgress(0);
    setIsUploading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative
          flex flex-col items-center justify-center
          w-full h-72
          border-2 border-dashed rounded-xl
          cursor-pointer
          overflow-hidden
          transition-all
          ${isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
          }
        `}
      >
        <input {...getInputProps()} />

        {preview ? (
          <>
            <img
              src={preview.url}
              alt="Preview"
              className="max-h-48 object-contain"
            />

            <button
              type="button"
              onClick={removeImage}
              className="
                absolute
                top-3
                right-3
                w-8
                h-8
                rounded-full
                bg-red-500
                text-white
                hover:bg-red-600
                flex
                items-center
                justify-center
                transition
              "
            >
              ✕
            </button>

            <div className="w-11/12 mt-5">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-sm text-center mt-2 text-gray-700">
                {isUploading
                  ? `Subiendo... ${progress}%`
                  : "Carga completada"}
              </p>
            </div>
          </>
        ) : (
          <>
            <svg
              className="w-14 h-14 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              />
            </svg>

            {isDragActive ? (
              <p className="text-blue-600 font-medium">
                Soltá la imagen aquí...
              </p>
            ) : (
              <>
                <p className="font-semibold">
                  Arrastrá una imagen aquí
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  o hacé click para seleccionarla
                </p>

                <p className="text-xs text-gray-400 mt-4">
                  PNG · JPG · JPEG · WEBP
                </p>
              </>
            )}
          </>
        )}
      </div>

      {fileRejections.length > 0 && (
        <p className="mt-3 text-center text-red-500 text-sm">
          Solo se permiten imágenes.
        </p>
      )}
    </div>
  );
}