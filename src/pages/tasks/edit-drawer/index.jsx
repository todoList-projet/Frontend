import {Button, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {editTask} from "@/services/tasksApi.js";
import useEditItem from "@/hooks/use-edit-item.jsx";
import {ClearOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import moment from 'moment';


function TaskEditDrawer({selectedTask}) {
    const [form] = Form.useForm();
    const editMutation = useEditItem(editTask, "tasks");

    console.log(selectedTask.deadline);
    const handleOk = () => {
        form.submit();
    };

    const handleReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        editMutation.mutate({ idTask: selectedTask.id, taskData: values});
    };
    useEffect(() => {
        if (selectedTask) {
            form.setFieldsValue({
                title: selectedTask.title,
                category: selectedTask.category,
                deadline: selectedTask?.deadline ? moment(selectedTask?.deadline) : null,
                description: selectedTask.description,
            });
        }
    }, [selectedTask, form]);

    return (
        <div>
            <Form form={form} onFinish={onFinish}>

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


                    <Col span={24} className="">
                        <Form.Item
                            name="category"
                            label="Catégorie"
                            rules={[{required: true, message: 'Veuillez entrer une catégorie!'}]}
                        >
                            <Input placeholder="Entrez une catégorie"/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="deadline"
                            label="Date Limite"
                            rules={[{required: true, message: 'Veuillez sélectionner une date limite!'}]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                        </Form.Item>
                    </Col>



                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{required: true, message: 'Veuillez entrer une description!'}]}
                        >
                            <Input.TextArea placeholder="Entrez une description"/>
                        </Form.Item>
                    </Col>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button icon={<ClearOutlined/>} onClick={handleReset}/>
                    <div>
                        <Button onClick={handleOk}>Modifier</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default TaskEditDrawer;