import { useEffect } from "react";
import { Modal } from "antd";
import { useAppContext } from "@/AppContext.js";
import {archiveTask, editTask} from "@/services/tasksApi.js";

import useArchiveItem from "@/hooks/use-archive-item.jsx";

export default function TaskArchiveModal({ visible, selectedRecord }) {
    const archiveMutation = useArchiveItem(archiveTask, "tasks");
    const { toggleModal } = useAppContext();

    useEffect(() => {
        if (visible && selectedRecord) {
            const modal = Modal.confirm({
                width: '450px',
                title: "Vous êtes sur de vouloir archiver cette tache ?",
                content: `Tache sélectionné : ${selectedRecord.title} `,
                okText: "Confirmer",
                cancelText: "Retour",
                okType: "danger",
                onOk: () => {
                    archiveMutation.mutate(selectedRecord.id);
                    toggleModal('detailsDrawer');
                },
                onCancel: () => {
                    toggleModal('deleteModal');
                }
            });

            return () => {
                modal.destroy();
            };
        }
    }, [visible, selectedRecord, archiveMutation, toggleModal]);

    return null;
}