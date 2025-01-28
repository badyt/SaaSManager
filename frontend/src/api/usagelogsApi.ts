import useAuthStore from "../stores/authStore";
import apiClient from "./apiClient";

export const fetchUsageLogs = async ({
    userId,
    toolId,
    startDate,
    endDate,
    activityType,
}: {
    userId?: number;
    toolId?: number;
    startDate?: string;
    endDate?: string;
    activityType?: string;
}) => {
    const { token } = useAuthStore.getState();

    // Construct query parameters dynamically
    const params = new URLSearchParams();

    if (userId) params.append("userId", userId.toString());
    if (toolId) params.append("toolId", toolId.toString());
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (activityType) params.append("activityType", activityType);

    const response = await apiClient.get(`/usage/getLogs?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const fetchUnderutilizedSubscriptions = async ({
    threshold = 5,
    period = "30d",
}: {
    threshold?: number;
    period?: string;
}) => {
    const { token } = useAuthStore.getState();

    // Construct query parameters
    const params = new URLSearchParams();
    params.append("threshold", threshold.toString());
    params.append("period", period);

    const response = await apiClient.get(`/usage/getUnderutilized?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const logUserInteraction = async (UsageLogRequest: {licenseId: number, activityType: string}) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.post("/usage/logUser", UsageLogRequest, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}
