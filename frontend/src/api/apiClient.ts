import axios from "axios";
import useAuthStore from "../stores/authStore";
const apiClient = axios.create({
    baseURL: "http://localhost:8080", // Base URL for all requests
});


//Request Interceptor: Automatically Attach Token to Every Request
apiClient.interceptors.request.use(
    (config) => {
        const { token } = useAuthStore.getState();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//Response Interceptor: Automatically ask for refresh token when unauthorized response is received.
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            const { refreshToken, setUserInfo } = useAuthStore.getState();

            try {
                // Send request to refresh token endpoint
                const res = await axios.post("/auth/refresh", {}, {
                    headers: { Authorization: `Bearer ${refreshToken}` },
                });

                setUserInfo(
                    res.data.user_id,
                    res.data.access_token,
                    res.data.refresh_token,
                    res.data.name,
                    res.data.role,
                    res.data.email,
                    res.data.status
                );

                // Retry the original request with new token
                error.config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
                return axios(error.config);
            } catch (refreshError) {
                console.error("Session expired, logging out...");
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;