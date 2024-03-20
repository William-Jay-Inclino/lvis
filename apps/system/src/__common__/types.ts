import { Role } from "apps/system/prisma/generated/client"


export const enum UserStatus {
    ACTIVE = 1,
    INACTIVE = 2
}

export const enum DepartmentStatus {
    ACTIVE = 1,
    INACTIVE = 2
}

export interface User {
    id: string
    username: string
    password: string
    status: UserStatus
    role: Role
    created_by: string
}

export interface Employee {
    id: string
    firstname: string
    middlename: string
    lastname: string
    created_by: string
}

export interface Division {
    id: string
    department_id: string
    code: string
    name: string
    status: number
    created_by: string
}

export interface Department {
    id: string
    code: string
    name: string
    status: number
    created_by: string
}

export interface Account {
    id: string
    code: string
    name: string
    description: string
    created_by: string
}

export interface Service {
    id: string
    name: string
    created_by: string
}

export interface Feature {
    id: string
    name: string
    service_id: string
    created_by: string
}

export interface Module {
    id: string
    name: string
    feature_id: string
    created_by: string
}

export interface SubModule {
    id: string
    name: string
    module_id: string
    created_by: string
}

export interface Classification {
    id: string
    name: string
    created_by: string
}

export interface UserEmployee {
    id: string
    user_id: string
    employee_id: string
    created_by: string
}

export interface JOApproverSetting {
    id: string
    approver_id: string
    label: string
    order: number
    created_by: string
}

export interface RVApproverSetting {
    id: string
    approver_id: string
    label: string
    order: number
    created_by: string
}

export interface SPRApproverSetting {
    id: string
    approver_id: string
    label: string
    order: number
    created_by: string
}

export interface MEQSApproverSetting {
    id: string
    approver_id: string
    label: string
    order: number
    created_by: string
}

export interface POApproverSetting {
    id: string
    approver_id: string
    label: string
    order: number
    created_by: string
}

export interface RRApproverSetting {
    id: string
    approver_id: string
    label: string
    order: number
    created_by: string
}