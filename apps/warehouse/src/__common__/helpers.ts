import { MEQSApprover, POApprover, RRApprover, RVApprover } from "apps/warehouse/prisma/generated/client"
import { APPROVAL_STATUS, ITEM_TRANSACTION_TYPE } from "./types"


export const isValidApprovalStatus = (status: number): boolean => {

    const approvalStatusArray = [
        APPROVAL_STATUS.APPROVED,
        APPROVAL_STATUS.DISAPPROVED,
        APPROVAL_STATUS.PENDING,
        APPROVAL_STATUS.CANCELLED
    ]

    if(approvalStatusArray.includes(status)){
        return true 
    }

    return false

}

export const isValidItemTransactionType = (type: number): boolean => {

    const transactionTypeArray = [
        ITEM_TRANSACTION_TYPE.STOCK_IN,
        ITEM_TRANSACTION_TYPE.STOCK_OUT,
    ]

    if(transactionTypeArray.includes(type)) {
        return true 
    }

    return false

}


export const getLastApprover = (
    approvers: 
    RVApprover[] | 
    MEQSApprover[] | 
    POApprover[] |
    RRApprover[] 
): 
    RVApprover | 
    MEQSApprover | 
    POApprover | 
    RRApprover => {
    return approvers.reduce((max, current) => (current.order > max.order ? current : max), approvers[0]);

}