/* eslint-disable react-hooks/rules-of-hooks */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import useSalesReport from "@/hooks/useSalesReport";

interface SalesData {
  data?: {
    count?: number;
    totalSales?: number;
    sales?: any[];
  };
}

const SalesHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const {
    data: salesData,
    isLoading,
    isError,
  } = useSalesReport(selectedFilter);

  const data: any[] | undefined = (salesData as SalesData)?.data?.sales;

  return (
    <>
      <div>
        <Select
          onValueChange={(value) => setSelectedFilter(value)}
          value={selectedFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select sales filtering" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sales Report</SelectLabel>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Yearly">Yearly</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      <div className="mt-10">
        <LineChart
          width={700}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
        {data && (
          <div className="text-blue-600 text-sm font-medium">
            <p>Total Product Count: {(salesData as SalesData)?.data?.count}</p>
            <p>
              Total Product sales: ${(salesData as SalesData)?.data?.totalSales}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SalesHistory;
