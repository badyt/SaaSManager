import useAuthStore from "../stores/authStore";
import apiClient from "./apiClient";

export const fetchCatalog = async () => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.get("/catalog/getCatalog", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const addSaaSTool = async (NewSaaSTool: { name: string, description: string, default_cost: number }) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.post("/catalog/addSaaSTool", NewSaaSTool, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const removeSaaSTool = async (toolId: number) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.delete(`/catalog/removeTool/${toolId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getTool = async (tool_id : number) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.get(`/catalog/getTool/${tool_id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};