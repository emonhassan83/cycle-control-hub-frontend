import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Result, Button } from "antd";
import Meta from "@/components/Meta/Meta";

const PaymentPage = () => {
    const location = useLocation();
    const [status, setStatus] = useState("");
    console.log(status);
    
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setStatus(queryParams.get("status") || "");
    }, [location?.search]);

    return (
        <>
        <Meta
        title="Buyer Payment | Bikeside - Bike Shop & Service Management System"
        description="This is the buyer payment page of Medico where buyer can pay their pending payment then show this page, and more."
        keywords="React, Meta Tags, SEO, JavaScript"
      />

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            {status === "" && (
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
        </>
    );
};

export default PaymentPage;
