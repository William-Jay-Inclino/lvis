import { MEQSApprover, POApprover, RRApprover, RVApprover } from "apps/warehouse/prisma/generated/client"
import { APPROVAL_STATUS, ITEM_TRANSACTION_TYPE } from "./types"


export const isValidApprovalStatus = (status: number): boolean => {

    const approvalStatusArray = [
        APPROVAL_STATUS.APPROVED,
        APPROVAL_STATUS.DISAPPROVED,
        APPROVAL_STATUS.PENDING,
        APPROVAL_STATUS.CANCELLED
    ]

    if (approvalStatusArray.includes(status)) {
        return true
    }

    return false

}

export const isValidItemTransactionType = (type: number): boolean => {

    const transactionTypeArray = [
        ITEM_TRANSACTION_TYPE.STOCK_IN,
        ITEM_TRANSACTION_TYPE.STOCK_OUT,
    ]

    if (transactionTypeArray.includes(type)) {
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

export function getFullname(firstname: string, middlename: string | null, lastname: string) {
    if (middlename) {
        return lastname + ', ' + firstname + ' ' + convertMiddleNameToInitial(middlename)
    }
    return lastname + ', ' + firstname
}

export function convertMiddleNameToInitial(middleName: string) {
    if (middleName && middleName.length > 0) {
        return middleName.charAt(0).toUpperCase() + ".";
    } else {
        return "";
    }
}

export function getDateRange(dateString: string): { startDate: string, endDate: string } {
    const requestedDate = new Date(dateString);
    const startDate = new Date(
        requestedDate.getFullYear(),
        requestedDate.getMonth(),
        requestedDate.getDate(),
        0,
        0,
        0
    );
    const endDate = new Date(
        requestedDate.getFullYear(),
        requestedDate.getMonth(),
        requestedDate.getDate(),
        23,
        59,
        59
    );
    return {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
    };
}