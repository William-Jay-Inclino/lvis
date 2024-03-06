import { Injectable } from "@nestjs/common";
import { APPROVAL_STATUS } from "../__common__/types";
import { PENDING_APPROVAL_TYPE, PendingApproval } from "./entities/pending-approval.entity";
import { MEQSApprover, POApprover, RRApprover, RVApprover } from "apps/warehouse/prisma/generated/client";


@Injectable()
export class EmployeeService {

    // combine all pending approvals into one and sort by the oldest record

    getAllPendingApprovals(payload: {
        rvApprovals: RVApprover[],
        meqsApprovals: MEQSApprover[],
        poApprovals: POApprover[],
        rrApprovals: RRApprover[]
    }) {


        const { rvApprovals, meqsApprovals, poApprovals, rrApprovals } = payload

        // get all pendings
        const rvPendings = this.getFilteredRvPendings(rvApprovals)
        const meqsPendings = this.getFilteredMeqsPendings(meqsApprovals)
        const poPendings = this.getFilteredPoPendings(poApprovals)
        const rrPendings = this.getFilteredRrPendings(rrApprovals)

        // merge all
        const mergeAllPendings = [...rvPendings, ...meqsPendings, ...poPendings, ...rrPendings]

        // sort by the oldest record
        const sortPendingsByOldest = mergeAllPendings.sort((a, b) => new Date(a.transaction_date).getTime() - new Date(b.transaction_date).getTime())

        return sortPendingsByOldest

    }


    // only add pendings if the leadApprover's status is approved
    // ex: if this approver order is 2 then the lead approver which the order value is 1 needs to be approve first

    getFilteredRvPendings(rvApprovals: RVApprover[]): PendingApproval[] {

        console.log('getFilteredRvPendings', rvApprovals)

        const pendings: PendingApproval[] = []

        for (let approval of rvApprovals) {

            // @ts-ignore
            const thisApproverIndx = approval.rv.rv_approvers.findIndex((i: RVApprover) => i.approver_id === approval.approver_id)

            if (!thisApproverIndx) {
                console.error('thisApproverIndx not found', thisApproverIndx)
            }

            // ang ge sundan nga approver
            // @ts-ignore 
            const leadApprover = approval.rv.rv_approvers[thisApproverIndx - 1]

            // if walay nag una nga approver OR naka approve na ang nag una 
            if (!leadApprover || leadApprover.status === APPROVAL_STATUS.APPROVED) {
                pendings.push({
                    type: PENDING_APPROVAL_TYPE.RV,
                    // @ts-ignore
                    description: `RV no. ${approval.rv.rv_number}`,
                    // @ts-ignore
                    reference_id: approval.rv.id,
                    // @ts-ignore
                    transaction_date: approval.rv.created_at
                })
            }

        }

        return pendings

    }

    getFilteredMeqsPendings(meqsApprovals: MEQSApprover[]): PendingApproval[] {

        console.log('getFilteredMeqsPendings', meqsApprovals)

        const pendings: PendingApproval[] = []

        for (let approval of meqsApprovals) {

            // @ts-ignore
            const thisApproverIndx = approval.meqs.meqs_approvers.findIndex((i: MEQSApprover) => i.approver_id === approval.approver_id)

            if (!thisApproverIndx) {
                console.error('thisApproverIndx not found', thisApproverIndx)
            }

            // ang ge sundan nga approver
            // @ts-ignore 
            const leadApprover = approval.meqs.meqs_approvers[thisApproverIndx - 1]

            // if walay nag una nga approver OR naka approve na ang nag una 
            if (!leadApprover || leadApprover.status === APPROVAL_STATUS.APPROVED) {
                pendings.push({
                    type: PENDING_APPROVAL_TYPE.MEQS,
                    // @ts-ignore
                    description: `MEQS no. ${approval.meqs.meqs_number}`,
                    // @ts-ignore
                    reference_id: approval.meqs.id,
                    // @ts-ignore
                    transaction_date: approval.meqs.created_at
                })
            }

        }

        return pendings

    }

    getFilteredPoPendings(poApprovals: POApprover[]): PendingApproval[] {

        console.log('getFilteredPoPendings', poApprovals)

        const pendings: PendingApproval[] = []

        for (let approval of poApprovals) {

            // @ts-ignore
            const thisApproverIndx = approval.po.po_approvers.findIndex((i: POApprover) => i.approver_id === approval.approver_id)

            if (!thisApproverIndx) {
                console.error('thisApproverIndx not found', thisApproverIndx)
            }

            // ang ge sundan nga approver
            // @ts-ignore 
            const leadApprover = approval.po.po_approvers[thisApproverIndx - 1]

            // if walay nag una nga approver OR naka approve na ang nag una 
            if (!leadApprover || leadApprover.status === APPROVAL_STATUS.APPROVED) {
                pendings.push({
                    type: PENDING_APPROVAL_TYPE.PO,
                    // @ts-ignore
                    description: `PO no. ${approval.po.po_number}`,
                    // @ts-ignore
                    reference_id: approval.po.id,
                    // @ts-ignore
                    transaction_date: approval.po.created_at
                })
            }

        }

        return pendings

    }

    getFilteredRrPendings(rrApprovals: RRApprover[]): PendingApproval[] {

        console.log('getFilteredRrPendings', rrApprovals)

        const pendings: PendingApproval[] = []

        for (let approval of rrApprovals) {

            // @ts-ignore
            const thisApproverIndx = approval.rr.rr_approvers.findIndex((i: RRApprover) => i.approver_id === approval.approver_id)

            if (!thisApproverIndx) {
                console.error('thisApproverIndx not found', thisApproverIndx)
            }

            // ang ge sundan nga approver
            // @ts-ignore 
            const leadApprover = approval.rr.rr_approvers[thisApproverIndx - 1]

            // if walay nag una nga approver OR naka approve na ang nag una 
            if (!leadApprover || leadApprover.status === APPROVAL_STATUS.APPROVED) {
                pendings.push({
                    type: PENDING_APPROVAL_TYPE.RR,
                    // @ts-ignore
                    description: `RR no. ${approval.rr.rr_number}`,
                    // @ts-ignore
                    reference_id: approval.rr.id,
                    // @ts-ignore
                    transaction_date: approval.rr.created_at
                })
            }

        }

        return pendings

    }

}