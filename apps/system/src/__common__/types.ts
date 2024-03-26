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
    status: UserStatus
    role: Role
    password: string
    created_by: string
    permissions?: UserPermissions
}

export interface SystemPermissions {

    // ========= DATA MANAGEMENT ========= 
    canManageAccount?: {
        create?: boolean,
        read?: boolean,
        update?: boolean,
        delete?: boolean,
    },
    canManageClassification?: {
        create?: boolean,
        read?: boolean,
        update?: boolean,
        delete?: boolean,
    },
    canManageDepartment?: {
        create?: boolean,
        read?: boolean,
        update?: boolean,
        delete?: boolean,
    },
    canManageEmployee?: {
        create?: boolean,
        read?: boolean,
        update?: boolean,
        delete?: boolean,
    },

}

export interface WarehousePermissions {

    // ========= PURCHASING ========= 
    canManageCanvass?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageCanvassItem?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageRV?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageRVApprover?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageSPR?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageSPRApprover?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageJO?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageJOApprover?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageMEQS?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageMEQSApprover?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageMEQSSupplier?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageMEQSSupplierItem?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageMEQSSupplierAttachment?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManagePO?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManagePOApprover?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageRR?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageRRApprover?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },
    canManageRRItem?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
    },


    // ========= DATA MANAGEMENT ========= 
    canManageSupplier?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
        update?: boolean,
        delete?: boolean,
    },
    canManageUnit?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
        update?: boolean,
        delete?: boolean,
    },
    canManageVehicle?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
        update?: boolean,
        delete?: boolean,
    },


    // ========= STOCK INVENTORY ========= 
    canManageItem?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
        update?: boolean,
        delete?: boolean,
    },
    canManageItemType?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
        update?: boolean,
        delete?: boolean,
    },
    canManageItemBrand?: {
        create?: boolean,
        search?: boolean,
        viewDetails?: boolean
        update?: boolean,
        delete?: boolean,
    },
}

export interface UserPermissions {
    canViewSystem?: boolean
    canViewWarehouse?: boolean
    system?: SystemPermissions,
    warehouse?: WarehousePermissions,
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



export enum MODULES {


    // ========= DATA MANAGEMENT ========= 
    ACCOUNT = 'ACCOUNT',
    CLASSIFICATION = 'CLASSIFICATION',
    DEPARTMENT = 'DEPARTMENT',
    EMPLOYEE = 'EMPLOYEE',

}


export enum RESOLVERS {

    // ========= ACCOUNT ========= 
    createAccount = 'createAccount',
    accounts = 'accounts',
    account = 'account',
    updateAccount = 'updateAccount',
    removeAccount = 'removeAccount',


    // ========= CLASSIFICATION ========= 
    createClassification = 'createClassification',
    classifications = 'classifications',
    classification = 'classification',
    updateClassification = 'updateClassification',
    removeClassification = 'removeClassification',


    // ========= DEPARTMENT ========= 
    createDepartment = 'createDepartment',
    departments = 'departments',
    department = 'department',
    updateDepartment = 'updateDepartment',
    removeDepartment = 'removeDepartment',


    // ========= EMPLOYEE ========= 
    createEmployee = 'createEmployee',
    employees = 'employees',
    employeesByName = 'employeesByName',
    employee = 'employee',
    updateEmployee = 'updateEmployee',
    removeEmployee = 'removeEmployee',

}