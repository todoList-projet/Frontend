import { Form, Input, Button, notification } from 'antd';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/services/authApi.js";

const Login = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries("login");
            router.push('/tasks');
        },
        onError: (error) => {
            notification.error({
                message: 'Error',
                description: 'Email ou Mot de passe incorrect.',
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
                    <img src="/login.png" alt="Profile Image" className="w-full h-90 rounded-l-lg" />
                </div>
                <div className="w-3/5 rounded-r-lg">
                    <img src="/title.png" alt="Profile Image" className="w-full h-90 rounded-tr-lg"/>

                    <Form
                        name="login"
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark="optional"
                        className="p-8"

                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {required: true, message: 'Veuillez entrer votre email !'},
                                {type: 'email', message: "L'email n'est pas valide !"},
                            ]}
                        >
                            <Input placeholder="Votre email"/>
                        </Form.Item>
                        <Form.Item
                            label="Mot de passe"
                            name="password"
                            rules={[
                                {required: true, message: 'Veuillez entrer votre mot de passe !'},
                            ]}
                        >
                            <Input.Password placeholder="Votre mot de passe"/>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                className="bg-blue-500 hover:bg-blue-600"
                            >
                                Se connecter
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="text-center">
                        <a
                            onClick={() => router.push('/register')}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Pas encore inscrit ? Cliquez ici !
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;