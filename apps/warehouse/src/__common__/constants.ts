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

export enum DB_ENTITY {
    RV = 'request_voucher',
    SPR = 'spare_parts_request',
    JO = 'job_order',
    MEQS = 'material_equipment_quotation_summary',
    PO = 'purchase_order',
    RR = 'receiving_report',
}

export const MODULE_MAPPER = {
    [DB_ENTITY.RV]: {
        model: 'rV',
        rcNumber: 'rv_number',
        id: 'rv_id',
        approverModel: 'rVApprover',
        approvers: 'rv_approvers',
    },
    [DB_ENTITY.SPR]: {
        model: 'sPR',
        rcNumber: 'spr_number',
        id: 'spr_id',
        approverModel: 'sPRApprover',
        approvers: 'spr_approvers',
    },
    [DB_ENTITY.JO]: {
        model: 'jO',
        rcNumber: 'jo_number',
        id: 'jo_id',
        approverModel: 'jOApprover',
        approvers: 'jo_approvers',
    },
    [DB_ENTITY.MEQS]: {
        model: 'mEQS',
        rcNumber: 'meqs_number',
        id: 'meqs_id',
        approverModel: 'mEQSApprover',
        approvers: 'meqs_approvers',
    },
    [DB_ENTITY.PO]: {
        model: 'pO',
        rcNumber: 'po_number',
        id: 'po_id',
        approverModel: 'pOApprover',
        approvers: 'po_approvers',
    },
    [DB_ENTITY.RR]: {
        model: 'rR',
        rcNumber: 'rr_number',
        id: 'rr_id',
        approverModel: 'rRApprover',
        approvers: 'rr_approvers',
    },
}