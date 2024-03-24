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


// In PURCHASING SERVICE you can only update/cancel if you are the owner or admin
// In DATA MANAGEMENT anyone can CRUD if permitted
// In STOCK INVENTORY anyone can CRUD if permitted


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
        [MODULES.SPR]: {
            [RESOLVERS.createSpr]: warehousePermissions.canManageSPR?.create ?? false,
            [RESOLVERS.sprs]: warehousePermissions.canManageSPR?.search ?? false,
            [RESOLVERS.spr_numbers]: warehousePermissions.canManageSPR?.search ?? false,
            [RESOLVERS.spr]: warehousePermissions.canManageSPR?.viewDetails ?? false,
        },
        [MODULES.JO]: {
            [RESOLVERS.createJo]: warehousePermissions.canManageJO?.create ?? false,
            [RESOLVERS.jos]: warehousePermissions.canManageJO?.search ?? false,
            [RESOLVERS.jo_numbers]: warehousePermissions.canManageJO?.search ?? false,
            [RESOLVERS.jo]: warehousePermissions.canManageJO?.viewDetails ?? false,
        },
        [MODULES.MEQS]: {
            [RESOLVERS.createMeqs]: warehousePermissions.canManageMEQS?.create ?? false,
            [RESOLVERS.meqs]: warehousePermissions.canManageMEQS?.search ?? false,
            [RESOLVERS.meqs_numbers]: warehousePermissions.canManageMEQS?.search ?? false,
            [RESOLVERS.meq]: warehousePermissions.canManageMEQS?.viewDetails ?? false,
        },
        [MODULES.PO]: {
            [RESOLVERS.createPo]: warehousePermissions.canManagePO?.create ?? false,
            [RESOLVERS.pos]: warehousePermissions.canManagePO?.search ?? false,
            [RESOLVERS.po_numbers]: warehousePermissions.canManagePO?.search ?? false,
            [RESOLVERS.po]: warehousePermissions.canManagePO?.viewDetails ?? false,
        },
        [MODULES.RR]: {
            [RESOLVERS.createRr]: warehousePermissions.canManageRR?.create ?? false,
            [RESOLVERS.rrs]: warehousePermissions.canManageRR?.search ?? false,
            [RESOLVERS.rr_numbers]: warehousePermissions.canManageRR?.search ?? false,
            [RESOLVERS.rr]: warehousePermissions.canManageRR?.viewDetails ?? false,
        },
        [MODULES.SUPPLIER]: {
            [RESOLVERS.createSupplier]: warehousePermissions.canManageSupplier?.create ?? false,
            [RESOLVERS.suppliers]: warehousePermissions.canManageSupplier?.search ?? false,
            [RESOLVERS.supplier]: warehousePermissions.canManageSupplier?.viewDetails ?? false,
            [RESOLVERS.updateSupplier]: warehousePermissions.canManageSupplier?.update ?? false,
            [RESOLVERS.removeSupplier]: warehousePermissions.canManageSupplier?.delete ?? false,
        },
        [MODULES.UNIT]: {
            [RESOLVERS.createUnit]: warehousePermissions.canManageUnit?.create ?? false,
            [RESOLVERS.units]: warehousePermissions.canManageUnit?.search ?? false,
            [RESOLVERS.unit]: warehousePermissions.canManageUnit?.viewDetails ?? false,
            [RESOLVERS.updateUnit]: warehousePermissions.canManageUnit?.update ?? false,
            [RESOLVERS.removeUnit]: warehousePermissions.canManageUnit?.delete ?? false,
        },
        [MODULES.VEHICLE]: {
            [RESOLVERS.createVehicle]: warehousePermissions.canManageVehicle?.create ?? false,
            [RESOLVERS.vehicles]: warehousePermissions.canManageVehicle?.search ?? false,
            [RESOLVERS.vehicle]: warehousePermissions.canManageVehicle?.viewDetails ?? false,
            [RESOLVERS.updateVehicle]: warehousePermissions.canManageVehicle?.update ?? false,
            [RESOLVERS.removeVehicle]: warehousePermissions.canManageVehicle?.delete ?? false,
        },
        [MODULES.ITEM]: {
            [RESOLVERS.createItem]: warehousePermissions.canManageItem?.create ?? false,
            [RESOLVERS.items]: warehousePermissions.canManageItem?.search ?? false,
            [RESOLVERS.item]: warehousePermissions.canManageItem?.viewDetails ?? false,
            [RESOLVERS.updateItem]: warehousePermissions.canManageItem?.update ?? false,
            [RESOLVERS.removeItem]: warehousePermissions.canManageItem?.delete ?? false,
        },
        [MODULES.ITEM_TYPE]: {
            [RESOLVERS.createItemType]: warehousePermissions.canManageItemType?.create ?? false,
            [RESOLVERS.item_types]: warehousePermissions.canManageItemType?.search ?? false,
            [RESOLVERS.item_type]: warehousePermissions.canManageItemType?.viewDetails ?? false,
            [RESOLVERS.updateItemType]: warehousePermissions.canManageItemType?.update ?? false,
            [RESOLVERS.removeItemType]: warehousePermissions.canManageItemType?.delete ?? false,
        },
        [MODULES.ITEM_BRAND]: {
            [RESOLVERS.createBrand]: warehousePermissions.canManageItemBrand?.create ?? false,
            [RESOLVERS.brands]: warehousePermissions.canManageItemBrand?.search ?? false,
            [RESOLVERS.brand]: warehousePermissions.canManageItemBrand?.viewDetails ?? false,
            [RESOLVERS.updateBrand]: warehousePermissions.canManageItemBrand?.update ?? false,
            [RESOLVERS.removeBrand]: warehousePermissions.canManageItemBrand?.delete ?? false,
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

