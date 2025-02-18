import { Button } from "antd";
import { useState } from "react";
import { DatabaseOutlined } from '@ant-design/icons';
import ShowCredentialsModal from "../dialog/ShowCredentialsDialog";


const ShowCredentialButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ShowCredentialsModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Button
        onClick={() => setIsModalOpen(true)}
        style={{
          fontSize: "14px",
          fontWeight: "semibold",
          color: "white",
          width: "100%",
        }}
        icon={<DatabaseOutlined style={{color: "white"}} />}
      >
        Show Demo Credentials
      </Button>
    </>
  );
};

export default ShowCredentialButton;
