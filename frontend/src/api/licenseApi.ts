import apiClient from "./apiClient";

export const fetchAllLicenses = async () => {
    const response = await apiClient.get(`/licenses/getAllLicenses`);
    return response.data;
};

export const fetchLicensesBySubscription = async (subscription_id: number) => {
    const response = await apiClient.get(`/licenses/${subscription_id}/getAllBySubscription`);
    return response.data;
};

export const fetchLicensesByUser = async (user_id: number) => {
    const response = await apiClient.get(`/licenses/${user_id}/getAllByUser`);
    return response.data;
};

export const fetchLicensesByTeam = async (team_id: number) => {
    const response = await apiClient.get(`/licenses/getTeamLicenses/${team_id}`);
    return response.data;
};

export const allocateNewLicense = async (NewLicense: { subscription_id: number, user_id: number }) => {
    const response = await apiClient.post("/licenses/allocateLicense", NewLicense);
    return response.data;
};

export const deleteLicense = async (license_id: number) => {
    const response = await apiClient.delete(`/licenses/${license_id}/revokeLicense`);
    return response.data;
}