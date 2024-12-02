import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from '@/services/authApi.js';

const Register = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: register,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["register"] });
            router.push('/login');
            notification.success({
                message: 'Succès',
                description: 'Inscription réussie !',
                placement: 'topRight',
                duration: 3,
            });
        },
        onError: (error) => {
            notification.error({
                message: 'Error',
                description: 'Erreur lors de l\'inscription.',
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
        <div className="flex items-center justify-center h-screen bg-blue-50">
            <div className="flex w-3/5 shadow-lg bg-white rounded-lg">
                <div className="w-2/5">
                    <img src="/register.png" alt="Profile Image" className="w-full h-90 rounded-l-lg" />
                </div>
                <div className="w-3/5 ">
                    <img src="/title.png" alt="Profile Image" className="w-full h-90 rounded-tr-lg"/>

                    <Form
                        name="register"
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark="optional"
                        className="p-8"
                    >
                        <Form.Item
                            label="Prénom"
                            name="first_name"
                            rules={[{ required: true, message: 'Veuillez entrer votre prénom !' }]}
                        >
                            <Input placeholder="Votre prénom" />
                        </Form.Item>
                        <Form.Item
                            label="Nom"
                            name="last_name"
                            rules={[{ required: true, message: 'Veuillez entrer votre nom !' }]}
                        >
                            <Input placeholder="Votre nom" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Veuillez entrer votre email !' },
                                { type: 'email', message: "L'email n'est pas valide !" },
                            ]}
                        >
                            <Input placeholder="Votre email" />
                        </Form.Item>
                        <Form.Item
                            label="Mot de passe"
                            name="password"
                            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
                        >
                            <Input.Password placeholder="Votre mot de passe" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                className="bg-blue-500 hover:bg-blue-600"
                            >
                                {"S'inscrire"}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="text-center">
                        <a
                            onClick={() => router.push('/login')}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Déjà inscrit ? Connectez-vous ici !
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;