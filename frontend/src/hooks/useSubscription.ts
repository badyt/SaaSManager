import { useMutation, useQuery } from "react-query";
import { createNewSubscription, deleteSubscription, fetchAllSubscriptions, getSubscription, updateSubscription } from "../api/subscriptionApi";


// Queries
export const useFetchAllSubscriptions = () => {
  return useQuery(["subscriptions"], fetchAllSubscriptions);
};

export const useFetchToolById = (toolId: number) => {
  return useQuery({
    queryKey: ["tool", toolId],  // Unique key for caching
    queryFn: () => getSubscription(toolId),  // Function to fetch the tool
    enabled: !!toolId,  // Only fetch if toolId is valid (prevents unwanted requests)
  });
};

// Mutations
export const useCreateSubscription = () => {
  return useMutation(createNewSubscription);
};

export const useUpdateSubscription = () => {
  return useMutation(updateSubscription);
};

export const useDeleteSubscription = () => {
  return useMutation(deleteSubscription);
};