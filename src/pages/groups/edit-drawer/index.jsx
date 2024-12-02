import {Button, Col, Form, Input, Select} from "antd";
import useEditItem from "@/hooks/use-edit-item.jsx";
import {editGroup, getGroupMembers, getGroups, getMembersGroup} from "@/services/groupsApi.js";
import {useEffect, useState} from "react";
import {ClearOutlined} from "@ant-design/icons";
import queryClient from "@/utils/queryClient.jsx";
import {useQuery} from "@tanstack/react-query";
const {Option} = Select;

function GroupEditDrawer({selectedGroup, users, groupMembers}) {
    const [form] = Form.useForm();
    const editMutation = useEditItem(editGroup, "groups");

    useEffect(() => {
        queryClient.invalidateQueries("groups");
    }, []);

    console.log("assignedMembers", groupMembers);

    useEffect(() => {
        if (selectedGroup) {
            form.setFieldsValue({
                name: selectedGroup.name,
                description: selectedGroup.description,
                assignedTo: groupMembers?.map(member => ({label: `${member.first_name} ${member.last_name}`, value: member.id}))
            });
        }
    }, [selectedGroup, form, groupMembers]);

    const handleOk = () => {
        form.submit();
    };

    const handleReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        const body = {
            ...values,
            assignedTo: values.assignedTo ? values.assignedTo.map(user => user.value) : []
        };
        editMutation.mutate({id: selectedGroup?.id, groupData: body});
        form.resetFields();
    };

    return (
        <div>
            <Form form={form} onFinish={onFinish}>
                <Col span={22} className="pt-4">
                    <Form.Item
                        name="name"
                        label="Nom du Groupe"
                        rules={[{required: true, message: 'Veuillez entrer un nom!'},
                            {max: 20, message: 'Le nom doit contenir au maximum 20 caractères!'}]}
                    >
                        <Input placeholder="Entrez un code"/>
                    </Form.Item>
                </Col>
                <Col span={22}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{required: true, message: 'Veuillez entrer une description!'},
                            {max: 300, message: 'La description doit contenir au maximum 200 caractères!'}]}
                    >
                        <Input.TextArea placeholder="Entrez une description"/>
                    </Form.Item>
                </Col>
                <Col span={22}>
                    <Form.Item
                        name="assignedTo"
                        label="Assigné à"
                    >
                        <Select
                            mode="multiple"
                            labelInValue
                            placeholder="Sélectionnez des utilisateurs"
                            defaultValue={groupMembers}
                        >
                            {users?.map(user => (
                                <Option key={user.id} value={user.id}>
                                    {user.first_name} {user.last_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button icon={<ClearOutlined/>} onClick={handleReset}/>
                    <div>
                        <Button onClick={handleOk} >Modifier</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default GroupEditDrawer;