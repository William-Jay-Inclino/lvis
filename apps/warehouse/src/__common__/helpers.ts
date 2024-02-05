import { RVApprover } from "apps/warehouse/prisma/generated/client"
import { APPROVAL_STATUS } from "./types"


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


export const getLastApprover = (approvers: RVApprover[]): RVApprover => {

    return approvers.reduce((max, current) => (current.order > max.order ? current : max), approvers[0]);

}