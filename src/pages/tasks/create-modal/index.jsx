import {Button, Col, Form, Input, Modal, Select, DatePicker, Row} from 'antd';
import useAddItem from "@/hooks/use-add-item.jsx";
import {createTask} from "@/services/tasksApi.js";
import {useAppContext} from "@/AppContext.js";
import {ClearOutlined} from "@ant-design/icons";
import {useState} from "react";
const {Option} = Select;

function TaskCreateModal({visible, type_task, groups}) {
    const [form] = Form.useForm();
    const {toggleModal} = useAppContext();
    const createMutation = useAddItem(createTask, "task");
    const [showGroups, setShowGroups] = useState(false);
    const [isCollaborative, setIsCollaborative] = useState(false);

    const handleOk = () => {
        form.submit();
    };

    const handleReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        const body = {
            ...values,
            groupId: values.typeTaskId === 1 ? undefined : values.groupId
        };
        createMutation.mutate(body);
        form.resetFields();
    };

    const handleTypeChange = (value) => {
        setShowGroups(value === 2);
        setIsCollaborative(value === 2);
    };

    const validateGroup = (_, value) => {
        if (isCollaborative && !value) {
            return Promise.reject(new Error('Veuillez sélectionner un groupe!'));
        }
        return Promise.resolve();
    };

    return (
        <Modal
            title={<div className="text-[#38a7ec] font-bold">Ajouter une nouvelle tâche</div>}
            open={visible}
            onCancel={() => toggleModal('createModal')}
            width={720}
            footer={
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button icon={<ClearOutlined />} onClick={handleReset}/>
                    <div>
                        <Button onClick={() => toggleModal('createModal')} className="mr-2">Annuler</Button>
                        <Button onClick={handleOk} className="">Créer</Button>
                    </div>
                </div>}
        >
            <hr className="border-b-4"/>
            <Form form={form} onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={24} className="pt-4">
                        <Form.Item
                            name="title"
                            label="Titre"
                            rules={[
                                {required: true, message: 'Veuillez entrer un titre!'}
                            ]}
                        >
                            <Input placeholder="Entrez un titre"/>
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={12} className="">
                        <Form.Item
                            name="category"
                            label="Catégorie"
                            rules={[{required: true, message: 'Veuillez entrer une catégorie!'}]}
                        >
                            <Input placeholder="Entrez une catégorie"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="deadline"
                            label="Date Limite"
                            rules={[{required: true, message: 'Veuillez sélectionner une date limite!'}]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>

                    <Col span={12}>
                        <Form.Item
                            name="typeTaskId"
                            label="Type de Tâche"
                            rules={[{required: true, message: 'Veuillez sélectionner un type de tâche!'}]}
                        >
                            <Select placeholder="Sélectionnez un type de tâche" onChange={handleTypeChange}>
                                {type_task.map(task => (
                                    <Option key={task.id} value={task.id}>
                                        {task.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    {showGroups && (
                        <Col span={12}>
                            <Form.Item
                                name="groupId"
                                label="Groupes"
                                rules={[{validator: validateGroup}]}
                            >
                                <Select
                                    placeholder="Sélectionnez des groupes"
                                >
                                    {groups?.data?.map(group => (
                                        <Option key={group.id} value={group.id}>
                                            {group.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    )}
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{required: true, message: 'Veuillez entrer une description!'}]}
                        >
                            <Input.TextArea placeholder="Entrez une description"/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </Modal>
    );
}

export default TaskCreateModal;