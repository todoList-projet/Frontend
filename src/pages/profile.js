import {Form, Input, Button, notification, Divider} from 'antd';
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserById, updateProfile } from "@/services/usersApi.js";
import queryClient from "@/utils/queryClient.jsx";
import ComponentHeader from "@/components/HeaderContent.jsx";
import {PlusCircleOutlined} from "@ant-design/icons";
import React from "react";

const Profile = () => {
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => getUserById(),
    });

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            notification.success({
                message: 'Succès',
                description: 'Profil mis à jour avec succès.',
                placement: 'topRight',
                duration: 3,
            });
        },
        onError: (error) => {
            notification.error({
                message: 'Error',
                description: 'Erreur lors de la modification du profil.',
                placement: 'topRight',
                duration: 3,
            });

            console.error("Erreur lors de la requête POST :", error);
        },
    });

    const onFinish = (values) => {
        mutate(values);
    };

    return (
        <div className="">
            <div className="flex justify-between">
                <ComponentHeader title={"Mes Informations"} className="w-[80%]"/>
            </div>
            <Divider className="mt-0"></Divider>

            <div className="flex ">
                <div className="w-2/5">
                    <img src="/profile.webp" alt="Profile Image" className="w-full h-auto rounded-3xl"/>
                </div>
                <div className=" border-r mx-6"></div>
                <div className="w-3/5 mt-12">
                    <Form
                        name="profile"
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            first_name: user?.data?.first_name || '',
                            last_name: user?.data?.last_name || '',
                            email: user?.data?.email || '',
                            password: '',
                        }}
                    >
                        <Form.Item
                            label="Nom"
                            name="first_name"
                        >
                            <Input placeholder="First Name" className="w-2/4"/>
                        </Form.Item>
                        <Form.Item
                            label="Prénom"
                            name="last_name"
                        >
                            <Input placeholder="Last Name" className="w-2/4"/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {type: 'email', message: "The email is not valid!"},
                            ]}
                        >
                            <Input placeholder="Email" className="w-2/4"/>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                        >
                            <Input.Password placeholder="Password" className="w-2/4"/>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-2/4 bg-blue-500 hover:bg-blue-600"
                            >
                                Modifier
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
            );
            }

            export default Profile;