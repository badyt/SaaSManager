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
    }
}
export { }