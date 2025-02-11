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

    interface TeamDTO {
        id: number;
        name: string;
        description: string;
        createdBy: number;
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
        tool: CatalogTool;
        renewal_date: string;
        cost: number;
        created_at: string;
        license_count: number;
        allocated_licenses: number;
    }

    interface License {
        license_id: number;
        subscription_id: number;
        user_id: number;
        user_name: string;
        cost: number;
        tool_name: string;
        allocated_at: string;
        last_used_at: string;
    }

    interface UsageLog {
        logId: number;
        licenseId: number;
        userName: string;
        toolName: string;
        activityDate: string;
        activityType: string;
    }

    interface UnderutilizedLicense {
        licenseId: number;
        userName: string;
        toolName: string;
        licenseCost: number;
        activityCount: number;
        allocated_at: string;
    }
}
export { }