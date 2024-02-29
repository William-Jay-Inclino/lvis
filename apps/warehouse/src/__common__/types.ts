
export interface Brand {
    id: string 
    name: string 
}

export interface Unit {
    id: string 
    name: string 
}

export interface Vehicle {
    id: string 
    name: string 
    plate_number: string
}

export interface Supplier {
    id: string 
    name: string 
    contact: string 
}

export interface Station {
    id: string 
    name: string 
    address: string 
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
    EXC = 3
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