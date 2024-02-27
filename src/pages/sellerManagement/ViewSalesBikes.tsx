import BikeCard from "@/components/card/BikeCard";
import { useGetSalesBikesQuery } from "@/redux/features/bikeManagement/bikeManagementApi";
// import { TQueryParam } from "@/types";
import { Pagination, Row } from "antd";
import { Input } from 'antd';
import { SearchProps } from "antd/es/input";
const { Search } = Input;
import { useState } from "react";

const ViewSalesBikes = () => {
  // const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: bikeData, isLoading } = useGetSalesBikesQuery([
    {
    name: "page",
    value: page,
  },
    {
    name: "searchTerm",
    value: searchTerm,
  }
]);
  const metaData = bikeData?.meta;

  const onSearch: SearchProps['onSearch'] = (value) => setSearchTerm(value);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "end", marginRight: '40px'}}>
      <Row style={{width: "50%"}}>
      <Search placeholder="Search Bike" onSearch={onSearch} enterButton />
      </Row>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && <>Loading ....</>}
        {bikeData &&
          bikeData.data?.map((item) => <BikeCard key={item._id} bike={item} />)}
      </div>
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

export default ViewSalesBikes;
