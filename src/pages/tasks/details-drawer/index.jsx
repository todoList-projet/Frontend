import {Button, Card, Divider, notification, Tag} from 'antd';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    DeleteOutlined,
    EditOutlined,
    FolderOpenOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import { useAppContext } from "@/AppContext.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { updateStatusTask } from '@/services/tasksApi';
import {lighten} from "polished";
import TaskArchiveModal from "@/pages/tasks/archive-modal/index.jsx";
import {getGroupMembers} from "@/services/groupsApi.js";
import React from "react";

function TaskDetailsDrawer({ selectedTask, parseDate, getDeadlineColor, getStatusColor  }) {
    const { open, toggleModal } = useAppContext();
    const queryClient = useQueryClient();

    const {data: groupMembers} = useQuery({
        queryKey: ["groupMembers", selectedTask?.group.id],
        queryFn: () => getGroupMembers(selectedTask?.group.id),
        enabled: !!selectedTask?.group.id,
    });
    const mutation = useMutation({
        mutationFn: updateStatusTask,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            notification.success({
                message: 'Succès',
                description: data?.data?.message || 'Status mis à jour avec succès.',
                placement: 'topRight',
                duration: 3,
            });
            toggleModal('detailsDrawer');
        },
        onError: (error) => {
            const errorMsg = error?.response?.data?.error || 'Erreur';
            const errorDescription = error?.response?.data?.message || 'Erreur lors de la mise à jour du status.';
            notification.error({
                message: errorMsg,
                description: errorDescription,
                placement: 'topRight',
                duration: 3,
            });
            console.error("Erreur lors de la requête PUT :", error);
        },
    });

    const handleStatusUpdate = (newStatusId) => {
        mutation.mutate({ statusId: newStatusId, taskId: selectedTask?.id });
    };

    const showchildrenEditDrawer = () => {
        toggleModal('childrenEditDrawer');
    };
    const handleArchive = () => {
        toggleModal('deleteModal');
    }
    return (
        <div className="flex h-full">
            <div
                className="w-[65%] border-r border-gray-300 pr-5 overflow-y-auto custom-scrollbar flex flex-col justify-between">
                <div className="flex flex-col">
                    <div className="text-lg font-bold">Titre</div>
                    <div className="text-lg mb-5">{selectedTask?.title}</div>
                    <div className="text-lg font-bold">Description</div>
                    <div className="text-lg">{selectedTask?.description}</div>
                </div>

                <div className="flex justify-between mt-auto border-gray-800 border-t-4 pt-4 rounded">
                    {[1, 2, 3, 4].filter(id => id !== selectedTask?.status.id).map((statusId, index) => (
                        <Button
                            key={statusId}
                            className={index === 0 ? "self-start" : index === 1 ? "self-center" : "self-end"}
                            onClick={() => handleStatusUpdate(statusId)}
                            loading={mutation.isLoading}
                            style={{
                                backgroundColor: lighten(0.1, getStatusColor(
                                    statusId === 1 ? "to do" :
                                        statusId === 2 ? "in progress" :
                                            statusId === 3 ? "completed" :
                                                "abandoned"
                                )),
                                color: 'white'
                            }}
                        >
                            {statusId === 1 ? "To Do" : statusId === 2 ? "In Progress" : statusId === 3 ? "Completed" : "Abandoned"}
                        </Button>
                    ))}
                </div>


            </div>


            <div className="w-[35%] pl-4  flex  flex-col justify-between ">
                <div className=" flex flex-col">

                    <div className="flex items-center mb-2">
                        <div className="text-lg font-semibold">Catégorie  &nbsp;</div>
                        <Tag color="purple">{selectedTask?.category}</Tag>
                    </div>


                    <div className="flex items-center mb-2">
                        <div className="text-lg font-semibold">Status &nbsp; </div>
                        <Tag color={getStatusColor(selectedTask?.status.name)}>
                            {selectedTask?.status.name}
                        </Tag>
                    </div>


                    <div className="flex flex-row justify-between mb-2">
                        <div className="flex flex-col">
                            <div className="text-lg font-semibold">Date de création</div>
                                <div className="text-sm">{parseDate(selectedTask?.creation_date)}</div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-lg font-semibold">À finir pour le</div>
                                <div className="text-sm" style={{color: getDeadlineColor(selectedTask.deadline).color}}>
                                    {getDeadlineColor(selectedTask.deadline).icon} {parseDate(selectedTask.deadline)}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mb-2 ">
                            <div className="text-lg font-semibold">Type &nbsp; </div>
                            <Tag color="cyan" className="text-sm">
                                {selectedTask?.type.name === "Personal" ? <UserOutlined/> : <TeamOutlined/>}
                                &nbsp; {selectedTask?.type.name}
                            </Tag>
                        </div>

                        {selectedTask?.type.name !== "personal" && (
                            <>
                                <div className="flex flex-row mb-2">
                                    <div className="text-lg font-semibold">Groupe  &nbsp;</div>
                                    <div className="text-lg">
                                        <Tag color="gold">
                                            {selectedTask?.group.name}
                                        </Tag>
                                    </div>
                                </div>


                                <div className="flex flex-col ">
                                    <div className="text-lg font-semibold">Membres</div>
                                    <div className="flex flex-col mt-2">
                                        {groupMembers?.data?.map(user => (
                                            <div key={user.id} className="flex items-center mt-1">
                                                <div className="flex w-8 h-8 rounded-full bg-gray-300 text-center p-2">
                                                    <UserOutlined/>
                                                </div>
                                                <div
                                                    className="ml-2 text-black">{user.first_name} {user.last_name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex  flex-col space-y-2 ">
                        <Button
                            className="w-full border-blue-600 text-blue-600"
                            onClick={showchildrenEditDrawer}
                            icon={<EditOutlined/>}
                        >
                            Modifier la tâche
                        </Button>
                        <Button
                            onClick={handleArchive}
                            className="w-full border-amber-500 text-amber-500 "                        //onClick={handleLeave}
                            icon={<FolderOpenOutlined/>}
                        >
                            Archiver la tâche
                        </Button>
                    </div>
                </div>
                <TaskArchiveModal
                    visible={open.deleteModal}
                    selectedRecord={selectedTask}
                />
            </div>

            );
            }

            export default TaskDetailsDrawer;