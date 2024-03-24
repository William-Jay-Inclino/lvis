import { Role } from "./types";

export class User {
    id: string;
    username: string;
    status: number;
    role: Role
    password: string;
    permissions?: UserPermissions
}



export interface UserPermissions {
    canViewSystem?: boolean
    canViewWarehouse?: boolean
    warehouse?: {
        canManageCanvass?: {
            create?: boolean,
            search?: boolean,
            viewDetails?: boolean
        },
        canManageRV?: {
            create?: boolean,
            search?: boolean,
            viewDetails?: boolean
        }
    }
}