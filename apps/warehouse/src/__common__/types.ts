
export interface Unit {
    id: string
    name: string
    created_by: string
}

export interface Vehicle {
    id: string
    name: string
    plate_number: string
    created_by: string
}

export interface Supplier {
    id: string
    name: string
    contact: string
    tin_no: string
    address: string
    vat_type: VAT_TYPE
    is_vat_registered: boolean
    created_by: string
}

// export interface Station {
//     id: string 
//     name: string 
//     address: string 
// }

export interface ItemType {
    id: string
    name: string
    created_by: string
}

export enum APPROVAL_STATUS {
    PENDING = 1,
    APPROVED = 2,
    DISAPPROVED = 3,
    CANCELLED = 4,
}

export enum REQUEST_TYPE {
    JO = 1,
    RV = 2,
    SPR = 3
}

export enum VAT_TYPE {
    NONE = 1,
    INC = 2,
    EXC = 3,
    EXEMPT = 4
}

export enum ITEM_TRANSACTION_TYPE {
    STOCK_IN = 1,
    STOCK_OUT = 2
}

export enum ITEM_CLASS {
    STOCK = 1,
    NON_STOCK = 2
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export enum MODULES {

    // ========= PURCHASING ========= 
    CANVASS = 'CANVASS',
    CANVASS_ITEM = 'CANVASS_ITEM',
    RV = 'RV',
    RV_APPROVER = 'RV_APPROVER',
    SPR = 'SPR',
    SPR_APPROVER = 'SPR_APPROVER',
    JO = 'JO',
    JO_APPROVER = 'JO_APPROVER',
    MEQS = 'MEQS',
    MEQS_APPROVER = 'MEQS_APPROVER',
    MEQS_SUPPLIER = 'MEQS_SUPPLIER',
    MEQS_SUPPLIER_ITEM = 'MEQS_SUPPLIER_ITEM',
    MEQS_SUPPLIER_ATTACHMENT = 'MEQS_SUPPLIER_ATTACHMENT',
    PO = 'PO',
    PO_APPROVER = 'PO_APPROVER',
    RR = 'RR',
    RR_APPROVER = 'RR_APPROVER',
    RR_ITEM = 'RR_ITEM',


    // ========= DATA MANAGEMENT ========= 
    SUPPLIER = 'SUPPLIER',
    UNIT = 'UNIT',
    VEHICLE = 'VEHICLE',


    // ========= STOCK INVENTORY ========= 
    ITEM = 'ITEM',
    ITEM_TYPE = 'ITEM_TYPE',

}


export enum RESOLVERS {

    // ========= CANVASS ========= 
    createCanvass = 'createCanvass',
    canvasses = 'canvasses',
    rc_numbers = 'rc_numbers',
    canvass = 'canvass',
    updateCanvass = 'updateCanvass',
    removeCanvass = 'removeCanvass',
    printCanvass = 'printCanvass',


    // ========= RV ========= 
    createRv = 'createRv',
    rvs = 'rvs',
    rv_numbers = 'rv_numbers',
    rv = 'rv',
    updateRv = 'updateRv',
    cancelRv = 'cancelRv',
    printRv = 'printRv',

    // ========= SPR ========= 
    createSpr = 'createSpr',
    sprs = 'sprs',
    spr_numbers = 'spr_numbers',
    spr = 'spr',
    updateSpr = 'updateSpr',
    cancelSpr = 'cancelSpr',
    printSpr = 'printSpr',


    // ========= JO ========= 
    createJo = 'createJo',
    jos = 'jos',
    jo_numbers = 'jo_numbers',
    jo = 'jo',
    updateJo = 'updateJo',
    cancelJo = 'cancelJo',
    printJo = 'printJo',


    // ========= MEQS ========= 
    createMeqs = 'createMeqs',
    meqs = 'meqs',
    meqs_numbers = 'meqs_numbers',
    meq = 'meq',
    updateMeqs = 'updateMeqs',
    cancelMeqs = 'cancelMeqs',
    printMeqs = 'printMeqs',


    // ========= PO ========= 
    createPo = 'createPo',
    pos = 'pos',
    po_numbers = 'po_numbers',
    po = 'po',
    updatePo = 'updatePo',
    cancelPo = 'cancelPo',
    printPo = 'printPo',


    // ========= RR ========= 
    createRr = 'createRr',
    rrs = 'rrs',
    rr_numbers = 'rr_numbers',
    rr = 'rr',
    updateRr = 'updateRr',
    cancelRr = 'cancelRr',
    printRr = 'printRr',


    // ========= SUPPLIER ========= 
    createSupplier = 'createSupplier',
    suppliers = 'suppliers',
    supplier = 'supplier',
    updateSupplier = 'updateSupplier',
    removeSupplier = 'removeSupplier',


    // ========= UNIT ========= 
    createUnit = 'createUnit',
    units = 'units',
    unit = 'unit',
    updateUnit = 'updateUnit',
    removeUnit = 'removeUnit',


    // ========= VEHICLE ========= 
    createVehicle = 'createVehicle',
    vehicles = 'vehicles',
    vehicle = 'vehicle',
    updateVehicle = 'updateVehicle',
    removeVehicle = 'removeVehicle',


    // ========= ITEM ========= 
    createItem = 'createItem',
    items = 'items',
    item = 'item',
    updateItem = 'updateItem',
    removeItem = 'removeItem',


    // ========= ITEM TYPE ========= 
    createItemType = 'createItemType',
    item_types = 'item_types',
    item_type = 'item_type',
    updateItemType = 'updateItemType',
    removeItemType = 'removeItemType',

}