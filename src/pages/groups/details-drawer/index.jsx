import { Badge, Card, Button} from "antd";
import { lighten } from 'polished';
import { useState} from "react";
import {WarningOutlined, HourglassOutlined, UserOutlined, RightCircleOutlined, EditOutlined} from "@ant-design/icons";
import { useAppContext } from "@/AppContext.js";
import GroupLeaveModal from "@/pages/groups/leave-modal/index.jsx";

const getStatusColor = (status) => {
    switch (status) {
        case "to do":
        case "To Do":
            return "blue";
        case "in progress":
        case "In Progress":
            return "orange";
        case "completed":
        case "Completed":
            return "green";
        case "abandoned":
        case "Abandoned":
            return "red";
        default:
            return "gray";
    }
};

const getDeadlineStatus = (deadline) => {
    const currentDate = new Date();
    if (deadline < currentDate) {
        return { icon: <WarningOutlined />, color: 'red' };
    } else {
        return { icon: <HourglassOutlined />, color: 'black' };
    }
};

function GroupDetailsDrawer({selectedGroup, tasksByGroup, groupMembers}) {
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const { open,toggleModal } = useAppContext();

    const toggleExpand = (taskId) => {
        setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
    };

    const showchildrenEditDrawer = () => {
        toggleModal('childrenEditDrawer');
    };
    const handleLeave = () => {
        toggleModal('deleteModal');
    }

    return (
        <>
        <div className="flex h-full">
            <div className="w-[70%] border-r border-gray-300  pr-5 overflow-y-auto custom-scrollbar">
                {tasksByGroup?.map(task => (
                    <Badge.Ribbon key={task.id} text={task.status.name} color={getStatusColor(task.status.name)}>
                        <Card
                            title={task.title}
                            size="small"
                            className={`mb-4 cursor-pointer`}
                            style={{ backgroundColor: '#f0f0f5' }}
                            styles={{ header : {backgroundColor: lighten(0.5    , getStatusColor(task.status.name))} }}
                            onClick={() => toggleExpand(task.id)}
                        >
                            <div className="flex ">

                                <div className="w-[80%]">
                                    {expandedTaskId === task.id ? task.description : `${task.description?.substring(0, 100) || ''}...`}
                                </div>
                                <div className="text-right w-[20%] font-bold"
                                     style={{color: getDeadlineStatus(task.deadline).color}}>
                                    {getDeadlineStatus(task.deadline).icon} {task?.deadline}
                                </div>
                            </div>
                        </Card>
                    </Badge.Ribbon>
                ))}
            </div>
            <div className="w-[30%]  pl-4 flex flex-col justify-between ">
                <div>
                    <div className="flex flex-col">
                        <div className="text-lg font-bold">Description du Groupe</div>
                        <div className="text-lg">{selectedGroup?.description}</div>
                    </div>
                    <div className="flex flex-col mt-4">
                        <div className="text-lg font-bold">Membres du Groupe</div>
                        <div className="flex flex-col mt-2">
                            {groupMembers?.map(user => (
                                <div key={user.id} className="flex items-center mt-1">
                                    <div className="flex w-8 h-8 rounded-full bg-gray-300 text-center p-2">
                                        <UserOutlined/>
                                    </div>
                                    <div className="ml-2 text-black">{user.first_name} {user.last_name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-end w-full space-y-2">
                    <Button
                        type="primary"
                        className="w-full"
                        onClick={showchildrenEditDrawer}
                        icon={<EditOutlined />}
                    >
                        Modifier le groupe
                    </Button>
                    <Button
                        danger
                        type="primary"
                        className="hover:bg-white hover:text-red-500 w-full"
                        onClick={handleLeave}
                        icon={<RightCircleOutlined/>}
                    >
                        Quitter le groupe
                    </Button>
                </div>
            </div>
        </div>
    <GroupLeaveModal
        visible={open.deleteModal}
        selectedGroup={selectedGroup}
    />
</>
    );
}

export default GroupDetailsDrawer;