import { useAppContext } from "@/AppContext.js";
import ComponentHeader from "@/components/HeaderContent.jsx";
import {Badge, Button, Card, Divider, Row, Col, Tag} from "antd";
import { useQuery } from "@tanstack/react-query";
import { getArchivedTasks } from "@/services/tasksApi.js";
import {DeleteOutlined, FieldTimeOutlined, HourglassOutlined, WarningOutlined} from "@ant-design/icons";
import TaskDeleteModal from "@/pages/Archives/delete-modal/index.jsx";
import React, { useState } from "react";

const cardTitleStyle = {
    maxWidth: '80%',
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
};


function parseDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}
const Archives= () => {
    const { toggleModal, open } = useAppContext();
    const [selectedTask, setSelectedTask] = useState(null);
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const { data: ArchivedTasks } = useQuery({
        queryKey: ["ArchivedTasks"],
        queryFn: () => getArchivedTasks(),
    });

    const personalTasks = ArchivedTasks?.data.filter(task => task.type.name === "personal");
    const collaborativeTasks = ArchivedTasks?.data.filter(task => task.type.name === "collaborative");

    return (
        <div >
            <div className="flex justify-between">
                <ComponentHeader title={"Mes Taches Archivés"} />
            </div>
            <Divider className="mt-0"></Divider>
            <div className="flex">
                <div className="w-[50%] h-[570px] px-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <div
                        className="w-full mb-4 text-center text-blue-500 rounded border border-gray-300 p-2 shadow-lg bg-gray-100 text-xl">
                        Tâches Personnelles
                    </div>
                    <Row gutter={[16, 16]}>
                        {personalTasks?.map(task => (
                            <Col key={task.id} span={24}>
                                <Badge.Ribbon
                                    text={<> {parseDate(task?.deadline)} <FieldTimeOutlined /></>}

                                    color='black'
                                    onClick={() => toggleModal('deleteModal')}
                                >
                                    <Card
                                        title={<div style={cardTitleStyle}>{task.title}</div>}
                                        className="mb-4"
                                        style={{backgroundColor: '#eeecec'}}
                                        styles={{
                                            header: { backgroundColor: '#b8b8ef' },
                                            body: { maxHeight: expandedTaskId === task.id ? 'none' : '150px', overflow: 'hidden' }
                                        }}
                                        onClick={() => setExpandedTaskId(task.id)}

                                    >
                                        <div className="flex">
                                            <div className="w-[95%] ">
                                                <div className="text-sm font-semibold">
                                                    Categorie : <Tag color="blue">{task.category}</Tag>
                                                </div>


                                                <div className="text-lg font-bold">Description</div>
                                                <div className="text-lg">
                                                    {expandedTaskId === task.id ? task?.description : `${task?.description.substring(0, 100)}...`}
                                                </div>
                                            </div>
                                            <div className="text-right w-[5%] font-bold rounded ">
                                                <Button
                                                    className="bg-red-400"
                                                    icon={<DeleteOutlined/>}
                                                    onClick={(e) => {
                                                        setSelectedTask(task);
                                                        toggleModal('deleteModal');
                                                    }}
                                                >
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </Badge.Ribbon>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className="w-px bg-gray-300 mx-4"></div>
                <div className="w-[50%] h-[570px] px-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <div
                        className="w-full mb-4 text-center text-blue-500 rounded border border-gray-300 p-2 shadow-lg bg-gray-100 text-xl">
                        Tâches Collaborative
                    </div>
                    <Row gutter={[16, 16]}>
                        {collaborativeTasks?.map(task => (
                            <Col key={task.id} span={24}>
                                <Badge.Ribbon
                                    text={<> {parseDate(task?.deadline)} <FieldTimeOutlined /></>}
                                    color='black'
                                    onClick={() => toggleModal('deleteModal')}
                                >
                                    <Card
                                        title={<div style={cardTitleStyle}>{task.title}</div>}
                                        onClick={() => setExpandedTaskId(task.id)}
                                        className="mb-4 "
                                        style={{ backgroundColor: '#eeecec' }}
                                        styles={{
                                            header: { backgroundColor: '#b8b8ef' },
                                            body: { maxHeight: expandedTaskId === task.id ? 'none' : '150px', overflow: 'hidden' }
                                        }}
                                    >
                                        <div className="flex">
                                            <div className="w-[95%]">
                                                <div className="text-sm font-semibold">
                                                    Categorie : <Tag color="blue">{task.category}</Tag>
                                                </div>
                                                <div className="text-lg font-bold">Description</div>
                                                <div className="text-lg">
                                                    {expandedTaskId === task.id ? task?.description : `${task?.description.substring(0, 100)}...`}
                                                </div>
                                            </div>
                                            <div className="text-right w-[5%] font-bold rounded ">
                                                <Button
                                                    className="bg-red-400"
                                                    icon={<DeleteOutlined />}
                                                    onClick={(e) => {
                                                        setSelectedTask(task);
                                                        toggleModal('deleteModal');
                                                    }}
                                                >
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </Badge.Ribbon>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <TaskDeleteModal
                visible={open.deleteModal}
                selectedRecord={selectedTask}
            />
        </div>
    );
}

export default Archives;