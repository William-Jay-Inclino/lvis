

export const userPermissonsDefault = {
    "canViewWarehouse": false,
    "canViewSystem": false,
    "warehouse": {
        "canManageCanvass": {
            "create": false,
            "search": false,
            "viewDetails": false,
        },
        "canManageRV": {
            "create": false,
            "search": false,
            "viewDetails": false,
        },
    },

}


export const test = {
    "canViewWarehouse": false,
    "canViewSystem": false,
    "warehouse": {
        "canManageCanvass": {
            "create": true,
            "search": true,
            "viewDetails": false,
        },
        "canManageRV": {
            "create": false,
            "search": true,
            "viewDetails": true,
        },
    },

}