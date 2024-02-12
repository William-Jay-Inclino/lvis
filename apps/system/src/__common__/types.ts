

export const enum UserStatus {
    ACTIVE = 1,
    INACTIVE = 2
}

export const enum DepartmentStatus {
    ACTIVE = 1,
    INACTIVE = 2
}


export interface Division {
    id: string     
    department_id: string
    code: string    
    name: string
    status: number       
}

export interface Service {
    id: string 
    name: string 
}

export interface Feature {
    id: string 
    name: string 
    service_id: string
}

export interface Module {
    id: string 
    name: string 
    feature_id: string
}

export interface SubModule {
    id: string 
    name: string 
    module_id: string
}

export interface Classification { 
    id: string
    name: string
}

export interface UserEmployee {
    id: string 
    user_id: string 
    employee_id: string 
}

export interface JOApproverSetting { 
    id: string 
    approver_id: string 
    label: string
    order: number
}

export interface RVApproverSetting { 
    id: string 
    approver_id: string 
    label: string
    order: number
}

export interface SPRApproverSetting { 
    id: string 
    approver_id: string 
    label: string
    order: number
}

export interface MEQSApproverSetting { 
    id: string 
    approver_id: string 
    label: string
    order: number
}


export interface POApproverSetting { 
    id: string 
    approver_id: string 
    label: string
    order: number
}


export interface RRApproverSetting { 
    id: string 
    approver_id: string 
    label: string
    order: number
}