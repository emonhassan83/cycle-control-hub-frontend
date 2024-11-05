import { logout } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, UserOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar, MenuProps } from 'antd';
import { toast } from 'sonner';

const ProfileDropdown = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
//   console.log(data);
  
  const handleLogout = () => {
    dispatch(logout());
    toast.success("User logged out successfully!");
    navigate('/login');
  };

  const handleAddAccount = () => {
    dispatch(logout());
    toast.success("Logged out to add another account");
    navigate('/sign-up');
  };

  const menuItems: MenuProps['items'] = [
    {
      label: (
        <a onClick={() => navigate(`/${data?.data?.role}/profile`)}>
          <UserOutlined /> Visit Profile
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a onClick={handleAddAccount}>
          <PlusOutlined /> Add Another Account
        </a>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <a onClick={handleLogout}>
          <LogoutOutlined /> Logout
        </a>
      ),
      key: '3',
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar
            src={data?.photoUrl}
            icon={!data?.photoUrl && <UserOutlined />}
            style={{ backgroundColor: '#a8a4a4' }}
          />
          <DownOutlined style={{ color: "#fff" }} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default ProfileDropdown;
