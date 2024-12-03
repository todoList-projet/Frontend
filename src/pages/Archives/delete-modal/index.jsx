import { useEffect } from "react";
import { Modal } from "antd";
import { useAppContext } from "@/AppContext.js";
import { deleteTask } from "@/services/tasksApi.js";
import useDeleteItem from "@/hooks/use-delete-item.jsx";

export default function TaskDeleteModal({ visible, selectedRecord }) {
    const deleteMutation = useDeleteItem(deleteTask, "tasks");
    const { toggleModal } = useAppContext();

    useEffect(() => {
        if (visible && selectedRecord) {
            const modal = Modal.confirm({
                width: '450px',
                title: "Vous êtes sur de vouloir supprimer cette tache ?",
                content: `Tache sélectionné : ${selectedRecord.title} `,
                okText: "Confirmer",
                cancelText: "Retour",
                okType: "danger",
                onOk: () => {
                    deleteMutation.mutate(selectedRecord?.id);
                },
                onCancel: () => {
                    toggleModal('deleteModal');
                }
            });

            return () => {
                modal.destroy();
            };
        }
    }, [visible, selectedRecord, deleteMutation, toggleModal]);

    return null;
}