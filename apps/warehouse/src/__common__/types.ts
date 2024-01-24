
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

export enum APPROVAL_STATUS {
    PENDING = 1,
    APPROVED = 2,
    DISAPPROVED = 3,
    CANCELLED = 4,
}

export const enum REQUEST_TYPE {
    JO = 1,
    RV = 2,
    SPR = 3
}