import { useMyProfileQuery } from "@/redux/features/user/userApi";
import ProfileCardSection from "./components/ProfileCardSection";
import FullPageLoading from "@/components/Loader/FullPageLoader";

const BuyerDashboard = () => {
    const { data, isLoading } = useMyProfileQuery("");
    
    if (isLoading) {
        return <FullPageLoading />;
    }

    return (
        <>
            <ProfileCardSection data={data?.data}/>
        </>
    );
};

export default BuyerDashboard;
