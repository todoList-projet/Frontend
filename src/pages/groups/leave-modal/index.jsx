import { Modal } from "antd";
import { useEffect } from "react";
import { useAppContext } from "@/AppContext.js";
import { leaveGroup } from "@/services/groupsApi";
import useLeaveItem from "@/hooks/use-leave-item.jsx";

export default function GroupLeaveModal({ visible, selectedGroup }) {
    const leaveMutation = useLeaveItem(leaveGroup, "groups");
    const { toggleModal } = useAppContext();
console.log('GroupLeaveModa',selectedGroup.id)
    useEffect(() => {
        if (visible && selectedGroup) {
            const modal = Modal.confirm({
                width: '450px',
                title: "Vous êtes sur de vouloir quitter ce groupe ?",
                content: `Groupe sélectionné : ${selectedGroup.name} `,
                okText: "Confirmer",
                cancelText: "Retour",
                okType: "danger",
                onOk: () => {
                    leaveMutation.mutate(selectedGroup.id);
                },
                onCancel: () => {
                    console.log('Cancel');
                    toggleModal('deleteModal');
                }
            });
            return () => {
                modal.destroy();
            };
        }
    }, [visible, selectedGroup, leaveMutation, toggleModal]);

    return null;
}