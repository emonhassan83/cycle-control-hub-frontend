import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from "@ant-design/icons";
import Meta from "@/components/Meta/Meta";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
    <Meta
        title="Error Page | Bikeside - Bike Shop & Service Management System"
        description="This is the error page of Bikeside where all users can show this page when page is not available or not found."
        keywords="React, Meta Tags, SEO, JavaScript"
      />

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Result
        icon={<FrownOutlined style={{ fontSize: "48px", color: "#1890ff" }} />}
        status="404"
        title="404 - Page Not Found"
        subTitle="Sorry, the page you are looking for does not exist or has been moved."
        extra={
          <Button
            type="primary"
            size="large"
            onClick={handleGoHome}
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              borderRadius: "4px",
              padding: "0 24px",
            }}
          >
            Go Back Home
          </Button>
        }
      />
    </div>
    </>
  );
};

export default ErrorPage;
