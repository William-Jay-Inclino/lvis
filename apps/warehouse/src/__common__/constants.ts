import { VAT_TYPE } from "./types";


export const VAT = {
    [VAT_TYPE.NONE]: {
        value: VAT_TYPE.NONE,
        label: 'Non-VAT'
    },
    [VAT_TYPE.INC]: {
        value: VAT_TYPE.INC,
        label: 'INC'
    },
    [VAT_TYPE.EXC]: {
        value: VAT_TYPE.EXC,
        label: 'EXC'
    },
    [VAT_TYPE.EXEMPT]: {
        value: VAT_TYPE.EXEMPT,
        label: 'EXEMPT'
    },
}


export const enum PURCHASING_TABLE{
    RV = 'request_voucher',
    SPR = 'spare_parts_request',
    JO = 'job_order',
    MEQS = 'material_equipment_quotation_summary',
    PO = 'purchase_order',
    RR = 'receiving_report'
}