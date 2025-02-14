import apiClient from "./apiClient";

export const fetchUsageLogs = async ({
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

    // Construct query parameters dynamically
    const params = new URLSearchParams();

    if (userName) params.append("userName", userName.toString());
    if (toolName) params.append("toolName", toolName.toString());
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (activityType) params.append("activityType", activityType);

    const response = await apiClient.get(`/usage/getLogs?${params.toString()}`);

    return response.data;
};

export const fetchUnderutilizedLicenses = async ({
    threshold = 5,
    period = "30d",
}: {
    threshold?: number;
    period?: string;
}) => {

    // Construct query parameters
    const params = new URLSearchParams();
    params.append("threshold", threshold.toString());
    params.append("period", period);

    const response = await apiClient.get(`/usage/getUnderutilized?${params.toString()}`);

    return response.data;
};

export const logUserInteraction = async (UsageLogRequest: {licenseId: number, activityType: string}) => {
    const response = await apiClient.post("/usage/logUser", UsageLogRequest);
    return response.data;
}
