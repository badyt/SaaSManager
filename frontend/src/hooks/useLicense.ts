import { useMutation, useQuery } from "react-query";
import { allocateNewLicense, deleteLicense, fetchAllLicenses, fetchLicensesByTeam, fetchLicensesByUser } from "../api/licenseApi";

//Queries
export const useFetchLicenses = () => {
    return useQuery(["licenses"], fetchAllLicenses)
}

export const useFetchLicensesByUser = (user_id?: number) => {
    return useQuery(["licenses", user_id], () => fetchLicensesByUser(user_id!), {
        enabled: !!user_id, // Ensures the query does not run if user_id is falsy (e.g., null or undefined)
    });
};

export const useFetchLicensesByTeam = (team_id?: number) => {
    return useQuery(["team-licenses", team_id], () => fetchLicensesByTeam(team_id!), {
        enabled: !!team_id, // Ensures the query does not run if user_id is falsy (e.g., null or undefined)
    });
};


//Mutation
export const useAllocateLicense = () => {
    return useMutation(allocateNewLicense);
};

export const useRemoveLicense = () => {
    return useMutation(deleteLicense);
}
