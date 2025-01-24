import { useMyProfileQuery } from "@/redux/features/user/userApi";
import ProfileCardSection from "./components/ProfileCardSection";

const BuyerDashboard = () => {
    const { data, profileLoading } = useMyProfileQuery("");
    
    return (
        <>
            <ProfileCardSection data={data?.data}/>

        </>
    );
};

export default BuyerDashboard;