import { Menu } from 'antd';
import {TeamOutlined, ProfileOutlined, FolderOpenOutlined} from '@ant-design/icons';
import { useRouter } from 'next/router';

export default function SideMenu() {
    const router = useRouter();
    const menuItems = [
        {
            key: 'tasks',
            icon: <ProfileOutlined />,
            label: 'Mes Taches',
            onClick: () => router.push('/tasks')
        },
        {
            key: 'groups',
            icon: <TeamOutlined />,
            label: 'Mes Groupes',
            onClick: () => router.push('/groups')
        },
        {
            key: 'archives',
            icon: <FolderOpenOutlined />,
            label: 'Mes Taches Archivés',
            onClick: () => router.push('/archives')
        }
    ];

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['tasks']}
            items={menuItems}
            theme="light"
        />
    );
}