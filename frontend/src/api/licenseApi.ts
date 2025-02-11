import useAuthStore from "../stores/authStore";
import apiClient from "./apiClient";

export const fetchAllLicenses = async () => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.get(`/licenses/getAllLicenses`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const fetchLicensesBySubscription = async (subscription_id: number) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.get(`/licenses/${subscription_id}/getAllBySubscription`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const fetchLicensesByUser = async (user_id: number) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.get(`/licenses/${user_id}/getAllByUser`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const fetchLicensesByTeam = async (team_id: number) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.get(`/licenses/getTeamLicenses/${team_id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const allocateNewLicense = async (NewLicense: { subscription_id: number, user_id: number }) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.post("/licenses/allocateLicense", NewLicense, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteLicense = async (license_id: number) => {
    const { token } = useAuthStore.getState();
    const response = await apiClient.delete(`/licenses/${license_id}/revokeLicense`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}