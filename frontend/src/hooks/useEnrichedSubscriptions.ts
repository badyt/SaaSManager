import { useFetchAllSubscriptions } from "./useSubscription";
import { useFetchCatalog } from "./useCatalog";

export const useEnrichedSubscriptions =  () => {
    const { data: subscriptions, ...subscriptionQuery } = useFetchAllSubscriptions();
    const { data: catalog, ...catalogQuery } = useFetchCatalog();

    const  enrichedSubscriptions: SubscriptionEnrichedEntity[] | undefined = subscriptions?.map((subscription: Subscription) => {
        const tool = catalog?.find((tool: CatalogTool) => tool.tool_id === subscription.tool_id);
        return {
            subscription,
            tool: tool
        };
    });

    return { enrichedSubscriptions, subscriptionQuery, catalogQuery };
};
