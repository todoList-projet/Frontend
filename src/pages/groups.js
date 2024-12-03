import React from 'react';
import {Alert, Button, Col, Divider, Drawer, Row} from "antd";
import ComponentHeader from "@/components/HeaderContent";
import {useQuery} from "@tanstack/react-query";
import {getGroupMembers, getGroups, getTasksByGroup} from "@/services/groupsApi.js";
import {GroupOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useAppContext} from "@/AppContext.js";
import GroupCreateModal from "./groups/create-modal";
import {getAllUsers} from "@/services/usersApi.js";
import { useState} from "react";
import GroupDetailsDrawer from "./groups/details-drawer";
import GroupEditDrawer from "./groups/edit-drawer";

const Groups = () => {
    const { toggleModal, open } = useAppContext();
    const [selectedGroup, setSelectedGroup] = useState(null);

    const {data: groups} = useQuery({
        queryKey: ["groups" ],
        queryFn: () => getGroups(),
    });

    const {data: tasksByGroup} = useQuery({
        queryKey: ["tasksByGroup", selectedGroup?.id],
        queryFn: () => getTasksByGroup(selectedGroup?.id),
        enabled: !!selectedGroup,
    });

    const {data: groupMembers} = useQuery({
        queryKey: ["groupMembers", selectedGroup?.id],
        queryFn: () => getGroupMembers(selectedGroup?.id),
        enabled: !!selectedGroup,

    });


    const {data: users} = useQuery({
        queryKey: ["users"],
        queryFn: () => getAllUsers(),
    });

    function handleCreate() {
        toggleModal('createModal');
    }
    function handleDetails(group) {
        setSelectedGroup(group);
        toggleModal('detailsDrawer');
    }

    const onClose = () => {
        toggleModal('detailsDrawer');
    };

    const showchildrenEditDrawer = () => {
        toggleModal('childrenEditDrawer');
    };

    const onchildrenEditDrawerClose = () => {
        toggleModal('childrenEditDrawer');
    };
    return (
        <div className="">
            <div className="flex justify-between">
                <ComponentHeader title={"Mes Groupes"} className="w-[80%]"/>
                <Button icon={<PlusCircleOutlined />} onClick={handleCreate} className="flex items-center ">
                    <label className="cursor-pointer">Créer un groupe</label>
                </Button>
            </div>
            <Divider className="mt-0"></Divider>

            <div>
                {groups?.data?.length === 0 ? (
                    <Alert
                        message="Avertissement"
                        description="Vous n'avez pas encore de groupes. Créez un groupe pour commencer."
                        type="warning"
                        showIcon
                    />
                ) : (
                    <Row gutter={[16, 16]}>
                        {groups?.data?.map(group => (
                            <Col key={group.id} span={6}>
                                <div
                                    className="flex flex-col bg-blue-300 h-40 drop-shadow-lg hover:scale-105 border border-gray-200 bg-clip-padding rounded-lg cursor-pointer"
                                    onClick={() => handleDetails(group)}

                                >
                                    <div className="flex flex-1 justify-between">
                                        <div className="p-4 font-bold  text-white text-3xl"> {group.name} </div>
                                        <div className="m-3 ">
                                            <GroupOutlined className="font-bold text-5xl"/>
                                        </div>
                                    </div>
                                    <div
                                        className="border-t-2 text-center text-white py-1 rounded-b-lg text-lg"
                                    >
                                        Nombre de membres : {group.nbUsers}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>

            <Drawer
                title={selectedGroup?.name}
                width={tasksByGroup && tasksByGroup.length > 0 ? 500 : 750}
                closable={false}
                onClose={onClose}
                open={open.detailsDrawer}
            >
                <GroupDetailsDrawer
                    showchildrenEditDrawer={showchildrenEditDrawer}
                    selectedGroup={selectedGroup}
                    tasksByGroup={tasksByGroup?.data}
                    groupMembers={groupMembers?.data}
                />
                <Drawer
                    title={`Modifier le groupe : ${selectedGroup?.name}`}
                    width={500}
                    closable={false}
                    onClose={onchildrenEditDrawerClose}
                    open={open.childrenEditDrawer}
                >
                    <GroupEditDrawer
                        selectedGroup={selectedGroup}
                        users={users?.data}
                        onClose={onchildrenEditDrawerClose}
                        groupMembers={groupMembers?.data}
                    />
                </Drawer>
            </Drawer>


            <GroupCreateModal
                visible={open.createModal}
                users={users?.data}
            />

            {/*<GroupDetailsModal*/}
            {/*    visible={open.detailsModal}*/}
            {/*    selectedGroup={selectedGroup}*/}
            {/*/>*/}
        </div>
    );
};

export default Groups;
