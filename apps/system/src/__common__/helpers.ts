import { Role } from "apps/system/prisma/generated/client"
import { MODULES, RESOLVERS, User } from "./types"
import { UserPermissions } from "./types"


export function canAccess(user: User, module: MODULES, resolver: RESOLVERS): boolean {

    console.log('canAccess()', user)
    console.log('module', module)
    console.log('resolver', resolver)

    if (user.role === Role.ADMIN) {
        console.log('user is admin: allow access')
        return true
    }

    console.log('user is normal user: validate access')

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

    if (!permissions.system) {
        console.log('no permissions.system')
        return false
    }

    const systemPermissions = permissions.system;

    const accessMap = {
        [MODULES.ACCOUNT]: {
            [RESOLVERS.createAccount]: systemPermissions.canManageAccount?.create ?? false,
            // [RESOLVERS.accounts]: systemPermissions.canManageAccount?.read ?? false,
            // [RESOLVERS.account]: systemPermissions.canManageAccount?.read ?? false,
            [RESOLVERS.updateAccount]: systemPermissions.canManageAccount?.update ?? false,
            [RESOLVERS.removeAccount]: systemPermissions.canManageAccount?.delete ?? false,
        },
        [MODULES.CLASSIFICATION]: {
            [RESOLVERS.createClassification]: systemPermissions.canManageClassification?.create ?? false,
            // [RESOLVERS.classifications]: systemPermissions.canManageClassification?.read ?? false,
            // [RESOLVERS.classification]: systemPermissions.canManageClassification?.read ?? false,
            [RESOLVERS.updateClassification]: systemPermissions.canManageClassification?.update ?? false,
            [RESOLVERS.removeClassification]: systemPermissions.canManageClassification?.delete ?? false,
        },
        [MODULES.DEPARTMENT]: {
            [RESOLVERS.createDepartment]: systemPermissions.canManageDepartment?.create ?? false,
            // [RESOLVERS.departments]: systemPermissions.canManageDepartment?.read ?? false,
            // [RESOLVERS.department]: systemPermissions.canManageDepartment?.read ?? false,
            [RESOLVERS.updateDepartment]: systemPermissions.canManageDepartment?.update ?? false,
            [RESOLVERS.removeDepartment]: systemPermissions.canManageDepartment?.delete ?? false,
        },
        [MODULES.EMPLOYEE]: {
            [RESOLVERS.createEmployee]: systemPermissions.canManageEmployee?.create ?? false,
            // [RESOLVERS.employees]: systemPermissions.canManageEmployee?.read ?? false,
            // [RESOLVERS.employee]: systemPermissions.canManageEmployee?.read ?? false,
            [RESOLVERS.updateEmployee]: systemPermissions.canManageEmployee?.update ?? false,
            [RESOLVERS.removeEmployee]: systemPermissions.canManageEmployee?.delete ?? false,
        },
    };

    return accessMap[module]?.[resolver] ?? false;
}