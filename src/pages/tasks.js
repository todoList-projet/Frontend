import React from 'react';
import ComponentHeader from "@/components/HeaderContent.jsx";
import {Button, Divider, Card, Col, Row, Tag, Drawer, Select} from "antd";
import {HourglassOutlined, PlusCircleOutlined, WarningOutlined} from "@ant-design/icons";
import { useAppContext } from "@/AppContext.js";
import { useState } from "react";
import {lighten} from "polished";
import {useQuery} from "@tanstack/react-query";
import {getCollaborativeTasks, getPersonalTasks, getTasks} from "@/services/tasksApi.js";
import TaskCreateModal from "@/pages/tasks/create-modal/index.jsx";
import TaskDetailsDrawer from "@/pages/tasks/details-drawer/index.jsx";
import TaskEditDrawer from "@/pages/tasks/edit-drawer/index.jsx";
import {getGroups} from "@/services/groupsApi.js";


const statuses = [{id: 1, name: "To Do"}, {id: 2, name: "In Progress"}, {id: 3, name: "Completed"}, {id: 4, name: "Abandoned"}];
const type_task = [ {id: 2, name: "Collaborative"}, {id: 1, name: "personal"}];
function parseDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}
function formatDate(dateString) {
    return new Date(dateString);
}
const getDeadlineColor = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = formatDate(deadline);
    if (deadlineDate < currentDate) {
        return { icon: <WarningOutlined />, color: 'red' };
    } else {
        return { icon: <HourglassOutlined />, color: 'black' };
    }
};
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

const Tasks = () => {
    const { toggleModal, open } = useAppContext();
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState('all');

    const {data: tasks} = useQuery({
        queryKey: ["tasks"],
        queryFn: () => getTasks(),
    });
    const {data: personalTasks} = useQuery({
        queryKey: ["personalTasks"],
        queryFn: () => getPersonalTasks(),
    });
    const {data: collaborativeTasks} = useQuery({
        queryKey: ["collaborativeTasks"],
        queryFn: () => getCollaborativeTasks(),
    });

    const {data: groups} = useQuery({
        queryKey: ["groups" ],
        queryFn: () => getGroups(),
    });
    const handleFilterChange = (value) => {
        setFilter(value);
    };
    const filteredTasks = () => {
        switch (filter) {
            case 'personal':
                return personalTasks?.data || [];
            case 'collaborative':
                return collaborativeTasks?.data || [];
            default:
                return tasks?.data || [];
        }
    };

    function handleCreate() {
        toggleModal('createModal');
    }
    function handleDetails(task) {
        setSelectedTask(task);
        toggleModal('detailsDrawer');
    }
    const onClose = () => {
        toggleModal('detailsDrawer');
    };

    const showEditDrawer = () => {
        toggleModal('childrenEditDrawer');
    };

    const onEditDrawerClose = () => {
        toggleModal('childrenEditDrawer');
    };
    return (
        <div className="">
            <div className="flex justify-between">
                <ComponentHeader title={"Mes Taches"} className="w-[80%]"/>
                <div className="flex items-center">
                    <Select defaultValue="all" style={{width: 170}} onChange={handleFilterChange}>
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="personal">Personal</Select.Option>
                        <Select.Option value="collaborative">Collaborative</Select.Option>
                    </Select>
                    <Button icon={<PlusCircleOutlined/>} onClick={handleCreate} className="flex items-center ml-2">
                        <label className="cursor-pointer">Créer une tache</label>
                    </Button>
                </div>
            </div>
            <Divider className="mt-0"></Divider>
            <div>
                <Row gutter={16}>
                    {statuses.map((status) => (
                        <Col span={6} key={status.id}>
                            <Card title={status.name} bordered={true} size="small"
                                  styles={{header: {backgroundColor: lighten(0.1, getStatusColor(status.name))}}}
                                  style={{backgroundColor: lighten(0.4, getStatusColor(status.name))}}
                            >
                                {filteredTasks().filter(task => task.status.id === status.id).map(task => (
                                    <Card
                                        key={task.id} bordered={true}
                                        className="cursor-pointer mb-2"
                                        styles={{ body : {backgroundColor: '#f0f0f5', margin: 0, padding: '10px'}}}
                                        onClick={() => handleDetails(task)}

                                    >
                                        <div className="flex justify-between " >
                                            <Tag className="self-start">{task.category}</Tag>
                                            <div className="text-right font-bold"
                                                 style={{color: getDeadlineColor(task.deadline).color}}>
                                                {getDeadlineColor(task.deadline).icon} {parseDate(task.deadline)}
                                            </div>
                                        </div>
                                        <p className="font-semibold text-sm mt-2">
                                            {task.title.length > 70 ? `${task.title.substring(0, 70)}....` : task.title}
                                        </p>
                                    </Card>
                                ))}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <Drawer
                title="Information de la tâche"
                width={1000}
                closable={false}
                onClose={onClose}
                open={open.detailsDrawer}
                classNames=""
                styles={{ header: { backgroundColor: lighten(0.1,getStatusColor(selectedTask?.status.name)), color :'white' } }}

            >
                <TaskDetailsDrawer
                    showEditDrawer={showEditDrawer}
                    selectedTask={selectedTask}
                    groups={groups}
                    parseDate={parseDate}
                    getDeadlineColor={getDeadlineColor}
                    getStatusColor={getStatusColor}
                />

                <Drawer
                    title={`Modifier la tâche : ${selectedTask?.title}`}
                    width={500}
                    closable={false}
                    onClose={onEditDrawerClose}
                    open={open.childrenEditDrawer}

                >
                    <TaskEditDrawer
                        selectedTask={selectedTask}
                        groups={groups}
                        onClose={onEditDrawerClose}
                    />
                </Drawer>
            </Drawer>
            <TaskCreateModal
                visible={open.createModal}
                type_task={type_task}
                groups={groups}
            />
        </div>
    );
};

export default Tasks;
