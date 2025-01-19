import useAuthStore from "../stores/authStore";
import apiClient from "./apiClient";

export const fetchAllSubscriptions = async () => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.get("/subscriptions/getAllSubscriptions", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const createNewSubscription = async (subscriptionData: { tool_id: number, renewal_date: string, cost: number, license_count: number }) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.post("/subscriptions/createNewSubscription", subscriptionData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getSubscription = async (subscription_id: number) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.get(`/subscriptions/${subscription_id}/getSubscription`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateSubscription = async (
    subscriptionData: { subscription_id: number, renewal_date: string, cost: number, license_count: number }) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.put(`/subscriptions/${subscriptionData.subscription_id}/updateSubscription`, subscriptionData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteSubscription = async (subscription_id: number) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.delete(`/subscriptions/removeSubscription/${subscription_id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}
