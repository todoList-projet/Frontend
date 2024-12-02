import {Button, Col, Form, Input, Modal, Select} from 'antd';
import useAddItem from "@/hooks/use-add-item.jsx";
import {createGroup} from "@/services/groupsApi.js";
import {useAppContext} from "@/AppContext.js";
import {ClearOutlined} from "@ant-design/icons";
const {Option} = Select;

function GroupCreateModal({visible, users}) {
    const [form] = Form.useForm();
    const {toggleModal} = useAppContext();
    const createMutation = useAddItem(createGroup, "groups");

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
        createMutation.mutate(body);
        form.resetFields();
    };
    return (
        <Modal
            title={<div className="text-[#38a7ec] font-bold">Ajouter un nouveau group</div>}
            open={visible}
            onCancel={() => toggleModal('createModal')}
            width={480}
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
                <Col span={22} className="pt-4">
                    <Form.Item
                        name="name"
                        label="Nom du Groupe"
                        rules={[
                            {required: true, message: 'Veuillez entrer un nom!'},
                            {max: 20, message: 'Le nom ne doit pas dépasser 20 caractères!'}
                        ]}
                    >
                        <Input placeholder="Entrez un code"/>
                    </Form.Item>
                </Col>
                <Col span={22}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{required: true, message: 'Veuillez entrer une description!'}]}
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
                        >
                            {users?.map(user => (
                                <Option key={user.id} value={user.id}>
                                    {user.first_name} {user.last_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

            </Form>
        </Modal>
    );
}

export default GroupCreateModal;