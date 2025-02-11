import apiClient from "./apiClient";

export const fetchAllSubscriptions = async () => {
    const response = await apiClient.get("/subscriptions/getAllSubscriptions");
    return response.data;
};

export const createNewSubscription = async (subscriptionData: { tool_id: number, renewal_date: string, cost: number, license_count: number }) => {
    const response = await apiClient.post("/subscriptions/createNewSubscription", subscriptionData);
    return response.data;
};

export const getSubscription = async (subscription_id: number) => {
    const response = await apiClient.get(`/subscriptions/${subscription_id}/getSubscription`);
    return response.data;
};

export const updateSubscription = async (
    subscriptionData: { subscription_id: number, renewal_date: string, cost: number, license_count: number }) => {
    const response = await apiClient.put(`/subscriptions/${subscriptionData.subscription_id}/updateSubscription`, subscriptionData);
    return response.data;
};

export const deleteSubscription = async (subscription_id: number) => {
    const response = await apiClient.delete(`/subscriptions/removeSubscription/${subscription_id}`);
    return response.data;
}
