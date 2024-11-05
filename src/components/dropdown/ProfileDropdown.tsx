import { logout } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { toast } from 'sonner';

const items: MenuProps['items'] = [
  {
    label: <a href="/buyer/profile">Visit Profile</a>,
    key: '0',
  },
  {
    label: <a href="/register">Add Another Account</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Logout',
    key: '3',
  },
];

const ProfileDropdown = ({data}: any) => {
  const dispatch = useAppDispatch();
  console.log(data);

  const handleLogout = () => {
    toast.success("User logged out successfully!");
    dispatch(logout());
  };

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <span style={{ color: "#fff" }}>Click me</span>
          <DownOutlined style={{ color: "#fff" }} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default ProfileDropdown;
