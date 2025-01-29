import { useMutation, useQuery } from "react-query";
import { fetchUnderutilizedSubscriptions, fetchUsageLogs, logUserInteraction } from "../api/usagelogsApi";

//Queries
export const useFetchUsageLogs = ({
    userName,
    toolName,
    startDate,
    endDate,
    activityType,
}: {
    userName?: string;
    toolName?: string;
    startDate?: string;
    endDate?: string;
    activityType?: string;
}) => {
    return useQuery(
        ["usageLogs", { userName, toolName, startDate, endDate, activityType }],
        () =>
            fetchUsageLogs({
                userName,
                toolName,
                startDate,
                endDate,
                activityType,
            }),
        // {
        //     enabled: !!userName || !!toolName || !!startDate || !!endDate || !!activityType, // Run only if any parameter is provided
        // }
    );
};

export const useFetchUnderutilizedSubscriptions = ({
    threshold = 5,
    period = "30d",
}: {
    threshold?: number;
    period?: string;
}) => {
    return useQuery(
        ["underutilizedSubscriptions", { threshold, period }],
        () => fetchUnderutilizedSubscriptions({ threshold, period }),
        {
            keepPreviousData: true, // Keep previous data while fetching new data
            staleTime: 300000, // 5 minutes
        }
    );
};

//Mutation
export const useLogUserInteraction = () => {
    return useMutation(logUserInteraction);
};