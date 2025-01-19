import { useMutation, useQuery } from "react-query";
import { addSaaSTool, fetchCatalog, removeSaaSTool } from "../api/catalogApi";

export const useFetchCatalog = () => {
    return useQuery(["catalog"], fetchCatalog)
  }

  export const useAddSaasTool = () => {
    return useMutation(addSaaSTool);
  };

  export const useRemoveSaaSTool = () => {
    return useMutation(removeSaaSTool);
  }
  