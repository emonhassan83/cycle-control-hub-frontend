import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Result, Button } from "antd";

const PaymentPage = () => {
    const location = useLocation();
    const [status, setStatus] = useState("");
    console.log(location);
    

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setStatus(queryParams.get("status") || "");
    }, [location.search]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            {status === "success" && (
                <Result
                    status="success"
                    title="Payment Successful!"
                    subTitle="Thank you for your purchase. Your transaction has been successfully completed."
                    extra={<Button type="primary" href="/buyer/available-bikes">Go Dashboard</Button>}
                />
            )}
            {status === "fail" && (
                <Result
                    status="error"
                    title="Payment Failed"
                    subTitle="We couldn't complete your transaction. Please try again or contact support."
                    extra={<Button type="primary" href="/buyer/available-bikes">Go Dashboard</Button>}
                />
            )}
            {status === "cancel" && (
                <Result
                    status="warning"
                    title="Payment Canceled"
                    subTitle="You have canceled the payment. You can try again anytime."
                    extra={<Button href="/buyer/available-bikes">Go Dashboard</Button>}
                />
            )}
        </div>
    );
};

export default PaymentPage;
