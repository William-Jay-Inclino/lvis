import { VAT_TYPE } from "./types";


export const VAT = {
    [VAT_TYPE.NONE]: {
        value: VAT_TYPE.NONE,
        label: 'None'
    },
    [VAT_TYPE.INC]: {
        value: VAT_TYPE.INC,
        label: 'INC'
    },
    [VAT_TYPE.EXC]: {
        value: VAT_TYPE.EXC,
        label: 'EXC'
    }
}