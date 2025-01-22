declare global {
    interface UserDTO {
        userId: number;
        email?: string;
        password?: string;
        createdAt?: string;
        updatedAt?: string;
        status?: string;
        role?: integer;
        name?: string;
    }

    interface CatalogTool {
        tool_id: number;
        name: string;
        description: string;
        default_cost: number;
        created_at: string;
    }

    interface Subscription {
        subscription_id: number;
        tool_id: number;
        renewal_date: string;
        cost: number;
        created_at: string;
        license_count: number;
        allocated_licenses: number;
    }

    interface SubscriptionEnrichedEntity {
        subscription: Subscription;
        tool: CatalogTool;
    }

    interface License {
        license_id: number;
        subscription_id: number;
        user_id: number;
        allocated_at: string;
        last_used_at: string;
    }
}
export { }