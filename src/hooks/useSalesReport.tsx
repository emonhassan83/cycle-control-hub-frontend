/* eslint-disable react-hooks/rules-of-hooks */
import {
  useDailySealsReportQuery,
  useWeeklySealsReportQuery,
  useMonthlySealsReportQuery,
  useYearlySealsReportQuery,
} from "@/redux/features/salesManagement/salesManagementApi";
import { UseQueryHookResult } from "node_modules/@reduxjs/toolkit/dist/query/react/buildHooks";

const useSalesReport = (selectedFilter: string): UseQueryHookResult<any> => {
    const dailyQuery = useDailySealsReportQuery(undefined);
    const weeklyQuery = useWeeklySealsReportQuery(undefined);
    const monthlyQuery = useMonthlySealsReportQuery(undefined);
    const yearlyQuery = useYearlySealsReportQuery(undefined);
  
    switch (selectedFilter) {
      case 'Daily':
        return dailyQuery || { data: null, isLoading: false, isError: false };
      case 'Weekly':
        return weeklyQuery || { data: null, isLoading: false, isError: false };
      case 'Monthly':
        return monthlyQuery || { data: null, isLoading: false, isError: false };
      case 'Yearly':
        return yearlyQuery || { data: null, isLoading: false, isError: false };
      default:
        return dailyQuery || { data: null, isLoading: false, isError: false };
    }
  };
  
  

export default useSalesReport;
