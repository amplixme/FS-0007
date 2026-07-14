import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import getRelativeDate from '../utils/getRelativeDate.js'
import ConfirmModal from '../components/common/ConfirmModal'

const Comment = ({ comment, deleteComment, updateComment }) => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(comment.content);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const handleSave = async () => {
        await updateComment(comment.id, { content: content })
    };

    const handleDelete = async () => {
        await deleteComment(comment.id);
    };

    return (
        <div className="group" key={comment.id}>
            <div className="flex gap-4">
                <img
                    alt="User"
                    className="w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                />
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-on-surface">
                                {comment.author?.name || "Autor desconocido"}
                            </span>
                            <span className="text-xs text-on-surface-variant">
                                {getRelativeDate(comment.createdAt)}
                            </span>
                        </div>
                        {user?.id === comment.authorId &&
                            !isEditing ? (
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-on-surface-variant hover:text-primary"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        edit
                                    </span>
                                </button>

                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="text-on-surface-variant hover:text-error"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        delete
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="text-on-surface-variant hover:text-green-500"
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        check
                                    </span>
                                </button>

                                <button
                                    onClick={() => {
                                        setContent(comment.content);
                                        setIsEditing(false);
                                    }}
                                    className="text-on-surface-variant hover:text-error"
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        cancel
                                    </span>
                                </button>
                            </div>
                        )
                        }
                    </div>
                    {isEditing ? (
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full rounded border p-2"
                        />
                    ) : (
                        <p className="text-on-surface-variant leading-relaxed">
                            {comment.content}
                        </p>
                    )}
                </div>
            </div>
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Eliminar comentario"
                message="¿Estás seguro de que deseas eliminar este comentario?"
            />
        </div>
    )
}

export default Comment