import { AuthUser } from "./auth-user.entity"
import { APPROVAL_STATUS, ITEM_TRANSACTION_TYPE, MODULES, RESOLVERS, Role } from "./types"
import { User, UserPermissions } from "./user.entity"


export const isValidApprovalStatus = (status: number): boolean => {

    const approvalStatusArray = [
        APPROVAL_STATUS.APPROVED,
        APPROVAL_STATUS.DISAPPROVED,
        APPROVAL_STATUS.PENDING,
        APPROVAL_STATUS.CANCELLED
    ]

    if (approvalStatusArray.includes(status)) {
        return true
    }

    return false

}

export const isValidItemTransactionType = (type: number): boolean => {

    const transactionTypeArray = [
        ITEM_TRANSACTION_TYPE.STOCK_IN,
        ITEM_TRANSACTION_TYPE.STOCK_OUT,
    ]

    if (transactionTypeArray.includes(type)) {
        return true
    }

    return false

}

export function getFullname(firstname: string, middlename: string | null, lastname: string) {
    if (middlename) {
        return lastname + ', ' + firstname + ' ' + convertMiddleNameToInitial(middlename)
    }
    return lastname + ', ' + firstname
}

export function convertMiddleNameToInitial(middleName: string) {
    if (middleName && middleName.length > 0) {
        return middleName.charAt(0).toUpperCase() + ".";
    } else {
        return "";
    }
}

export function getDateRange(dateString: string): { startDate: string, endDate: string } {
    const requestedDate = new Date(dateString);
    const startDate = new Date(
        requestedDate.getFullYear(),
        requestedDate.getMonth(),
        requestedDate.getDate(),
        0,
        0,
        0
    );
    const endDate = new Date(
        requestedDate.getFullYear(),
        requestedDate.getMonth(),
        requestedDate.getDate(),
        23,
        59,
        59
    );
    return {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
    };
}




export function canAccess(user: User, module: MODULES, resolver: RESOLVERS): boolean {

    console.log('canAccess()', user)
    console.log('module', module)
    console.log('resolver', resolver)

    if (user.role === Role.ADMIN) {
        console.log('user is admin')
        return true
    }

    console.log('user is normal user')

    if (!user.permissions) {
        console.log('no user.permissions')
        return false;
    }

    // @ts-ignore
    const permissions = JSON.parse(user.permissions) as UserPermissions

    console.log('permissions', permissions)

    if (!permissions) {
        console.log('No permissions Object')
        return
    }

    if (!permissions.warehouse) {
        console.log('no permissions.warehouse')
        return false
    }

    const warehousePermissions = permissions.warehouse;

    const accessMap = {
        [MODULES.CANVASS]: {
            [RESOLVERS.createCanvass]: warehousePermissions.canManageCanvass?.create ?? false,
            [RESOLVERS.canvasses]: warehousePermissions.canManageCanvass?.search ?? false,
            [RESOLVERS.rc_numbers]: warehousePermissions.canManageCanvass?.search ?? false,
            [RESOLVERS.canvass]: warehousePermissions.canManageCanvass?.viewDetails ?? false,
        },
        [MODULES.RV]: {
            [RESOLVERS.createRv]: warehousePermissions.canManageRV?.create ?? false,
            [RESOLVERS.rvs]: warehousePermissions.canManageRV?.search ?? false,
            [RESOLVERS.rv_numbers]: warehousePermissions.canManageRV?.search ?? false,
            [RESOLVERS.rv]: warehousePermissions.canManageRV?.viewDetails ?? false,
        },
    };

    return accessMap[module]?.[resolver] ?? false;
}



export function isAdmin(authUser: AuthUser): boolean {
    return (authUser.user.role === Role.ADMIN)
}

export function isNormalUser(authUser: AuthUser): boolean {
    return (authUser.user.role === Role.USER)
}

