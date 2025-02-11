import apiClient from "./apiClient";

export const fetchCatalog = async () => {
    const response = await apiClient.get("/catalog/getCatalog");
    return response.data;
};

export const addSaaSTool = async (NewSaaSTool: { name: string, description: string, default_cost: number }) => {
    const response = await apiClient.post("/catalog/addSaaSTool", NewSaaSTool);
    return response.data;
};

export const removeSaaSTool = async (toolId: number) => {
    const response = await apiClient.delete(`/catalog/removeTool/${toolId}`);
    return response.data;
};

export const getTool = async (tool_id : number) => {
    const response = await apiClient.get(`/catalog/getTool/${tool_id}`);
    return response.data;
};