import { useMutation, useQuery } from "react-query";
import { allocateNewLicense, deleteLicense, fetchAllLicenses } from "../api/licenseApi";

//Queries
export const useFetchLicenses = () => {
    return useQuery(["licenses"], fetchAllLicenses)
}


//Mutation
export const useAllocateLicense = () => {
    return useMutation(allocateNewLicense);
};

export const useRemoveLicense = () => {
    return useMutation(deleteLicense);
}
