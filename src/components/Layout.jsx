import { Layout } from 'antd';
import { useState } from 'react';
import SideMenu from './SideMenu.jsx';
import HeaderBar from './HeaderBar.jsx';
import AppContext from "@/AppContext.js";


const { Header, Sider, Content } = Layout;

export default function MainLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    const [open, setOpen] = useState({
        createModal: false,
        deleteModal: false,
        editModal: false,
        detailsModal: false,
        detailsDrawer: false,
        childrenEditDrawer: false,
    });
    const toggleModal = (action) => {
        setOpen({
            ...open,
            [action]: !open[action],
        });
    };
    return (
        <AppContext.Provider value={{ open, toggleModal }}>
        <Layout className="min-h-screen">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme="light"
            >
                <img src="/file.png" alt="Logo" className={`m-4 ${collapsed ? 'h-10' : 'h-40'}`}/>
                <SideMenu/>
            </Sider>
            <Layout>
                <Header className="red-header">
                    <HeaderBar />
                </Header>
                <Content className="m-4">
                    <div className="p-6 min-h-[360px] bg-white">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
        </AppContext.Provider>
    );
}