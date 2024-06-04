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