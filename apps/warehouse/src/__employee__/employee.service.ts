import { Injectable } from "@nestjs/common";
import { APPROVAL_STATUS } from "../__common__/types";
import { PENDING_APPROVAL_TYPE, PendingApproval } from "./entities/pending-approval.entity";
import { JOApprover, MEQSApprover, POApprover, RRApprover, RVApprover, SPRApprover } from "apps/warehouse/prisma/generated/client";


@Injectable()
export class EmployeeService {

    // combine all pending approvals into one and sort by the oldest record

    getAllPendingApprovals(payload: {
        rvApprovals: RVApprover[],
        sprApprovals: SPRApprover[],
        joApprovals: JOApprover[],
        meqsApprovals: MEQSApprover[],
        poApprovals: POApprover[],
        rrApprovals: RRApprover[]
    }) {


        const { rvApprovals, sprApprovals, joApprovals, meqsApprovals, poApprovals, rrApprovals } = payload

        // get all pendings
        const rvPendings = this.getFilteredRvPendings(rvApprovals)
        const sprPendings = this.getFilteredSprPendings(sprApprovals)
        const joPendings = this.getFilteredJoPendings(joApprovals)
        const meqsPendings = this.getFilteredMeqsPendings(meqsApprovals)
        const poPendings = this.getFilteredPoPendings(poApprovals)
        const rrPendings = this.getFilteredRrPendings(rrApprovals)

        // merge all
        const mergeAllPendings = [...rvPendings, ...sprPendings, ...joPendings, ...meqsPendings, ...poPendings, ...rrPendings]

        // sort by the oldest record
        const sortPendingsByOldest = mergeAllPendings.sort((a, b) => new Date(a.transaction_date).getTime() - new Date(b.transaction_date).getTime())

        return sortPendingsByOldest

    }

    // only add pendings if ang mga nag una nga approvers are approved
    getFilteredRvPendings(rvApprovals: RVApprover[]): PendingApproval[] {

        console.log('getFilteredRvPendings', rvApprovals)

        const pendings: PendingApproval[] = []

        for (let approval of rvApprovals) {

            // get the index of the current approver
            // @ts-ignore
            const thisApproverIndx = approval.rv.rv_approvers.findIndex((i: RVApprover) => i.approver_id === approval.approver_id && i.order === approval.order);

            console.log('thisApproverIndx', thisApproverIndx);

            if(thisApproverIndx === -1) {
                console.error('thisApproverIndx not found / approver not found in rv_approvers')
                continue
            }

            // get all nag una nga approvers
            // @ts-ignore
            const preRequisiteApprovers: RVApprover[] = approval.rv.rv_approvers.slice(0, thisApproverIndx)

            console.log('preRequisiteApprovers', preRequisiteApprovers);

            // check if all prerequisite approvers are approved
            const areAllApproved = !preRequisiteApprovers.find(i => i.status !== APPROVAL_STATUS.APPROVED)

            console.log('areAllApproved', areAllApproved);

            if(areAllApproved) {

                pendings.push({
                    id: approval.id,
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

    getFilteredSprPendings(sprApprovals: SPRApprover[]): PendingApproval[] {

        console.log('getFilteredSprPendings', sprApprovals)

        const pendings: PendingApproval[] = []

        for (let approval of sprApprovals) {

            // get the index of the current approver
            // @ts-ignore
            const thisApproverIndx = approval.spr.spr_approvers.findIndex((i: SPRApprover) => i.approver_id === approval.approver_id && i.order === approval.order);

            console.log('thisApproverIndx', thisApproverIndx);

            if(thisApproverIndx === -1) {
                console.error('thisApproverIndx not found / approver not found in spr_approvers')
                continue
            }

            // get all nag una nga approvers
            // @ts-ignore
            const preRequisiteApprovers: SPRApprover[] = approval.spr.spr_approvers.slice(0, thisApproverIndx)

            console.log('preRequisiteApprovers', preRequisiteApprovers);

            // check if all prerequisite approvers are approved
            const areAllApproved = !preRequisiteApprovers.find(i => i.status !== APPROVAL_STATUS.APPROVED)

            console.log('areAllApproved', areAllApproved);

            if(areAllApproved) {

                pendings.push({
                    id: approval.id,
                    type: PENDING_APPROVAL_TYPE.SPR,
                    // @ts-ignore
                    description: `SPR no. ${approval.spr.spr_number}`,
                    // @ts-ignore
                    reference_id: approval.spr.id,
                    // @ts-ignore
                    transaction_date: approval.spr.created_at
                })

            }

        }

        return pendings

    }

    getFilteredJoPendings(joApprovals: JOApprover[]): PendingApproval[] {

        console.log('getFilteredJoPendings', joApprovals)

        const pendings: PendingApproval[] = []

        for (let approval of joApprovals) {

            // get the index of the current approver
            // @ts-ignore
            const thisApproverIndx = approval.jo.jo_approvers.findIndex((i: JOApprover) => i.approver_id === approval.approver_id && i.order === approval.order);

            console.log('thisApproverIndx', thisApproverIndx);

            if(thisApproverIndx === -1) {
                console.error('thisApproverIndx not found / approver not found in jo_approvers')
                continue
            }

            // get all nag una nga approvers
            // @ts-ignore
            const preRequisiteApprovers: JOApprover[] = approval.jo.jo_approvers.slice(0, thisApproverIndx)

            console.log('preRequisiteApprovers', preRequisiteApprovers);

            // check if all prerequisite approvers are approved
            const areAllApproved = !preRequisiteApprovers.find(i => i.status !== APPROVAL_STATUS.APPROVED)

            console.log('areAllApproved', areAllApproved);

            if(areAllApproved) {

                pendings.push({
                    id: approval.id,
                    type: PENDING_APPROVAL_TYPE.JO,
                    // @ts-ignore
                    description: `JO no. ${approval.jo.jo_number}`,
                    // @ts-ignore
                    reference_id: approval.jo.id,
                    // @ts-ignore
                    transaction_date: approval.jo.created_at
                })

            }

        }

        return pendings

    }

    getFilteredMeqsPendings(meqsApprovals: MEQSApprover[]): PendingApproval[] {

        console.log('getFilteredMeqsPendings', meqsApprovals)

        const pendings: PendingApproval[] = []

        for (let approval of meqsApprovals) {

            // get the index of the current approver
            // @ts-ignore
            const thisApproverIndx = approval.meqs.meqs_approvers.findIndex((i: MEQSApprover) => i.approver_id === approval.approver_id && i.order === approval.order);

            console.log('thisApproverIndx', thisApproverIndx);

            if(thisApproverIndx === -1) {
                console.error('thisApproverIndx not found / approver not found in meqs_approvers')
                continue
            }

            // get all nag una nga approvers
            // @ts-ignore
            const preRequisiteApprovers: MEQSApprover[] = approval.meqs.meqs_approvers.slice(0, thisApproverIndx)

            console.log('preRequisiteApprovers', preRequisiteApprovers);

            // check if all prerequisite approvers are approved
            const areAllApproved = !preRequisiteApprovers.find(i => i.status !== APPROVAL_STATUS.APPROVED)

            console.log('areAllApproved', areAllApproved);

            if(areAllApproved) {

                pendings.push({
                    id: approval.id,
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

            // get the index of the current approver
            // @ts-ignore
            const thisApproverIndx = approval.po.po_approvers.findIndex((i: POApprover) => i.approver_id === approval.approver_id && i.order === approval.order);

            console.log('thisApproverIndx', thisApproverIndx);

            if(thisApproverIndx === -1) {
                console.error('thisApproverIndx not found / approver not found in po_approvers')
                continue
            }

            // get all nag una nga approvers
            // @ts-ignore
            const preRequisiteApprovers: POApprover[] = approval.po.po_approvers.slice(0, thisApproverIndx)

            console.log('preRequisiteApprovers', preRequisiteApprovers);

            // check if all prerequisite approvers are approved
            const areAllApproved = !preRequisiteApprovers.find(i => i.status !== APPROVAL_STATUS.APPROVED)

            console.log('areAllApproved', areAllApproved);

            if(areAllApproved) {

                pendings.push({
                    id: approval.id,
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

            // get the index of the current approver
            // @ts-ignore
            const thisApproverIndx = approval.rr.rr_approvers.findIndex((i: RRApprover) => i.approver_id === approval.approver_id && i.order === approval.order);

            console.log('thisApproverIndx', thisApproverIndx);

            if(thisApproverIndx === -1) {
                console.error('thisApproverIndx not found / approver not found in rr_approvers')
                continue
            }

            // get all nag una nga approvers
            // @ts-ignore
            const preRequisiteApprovers: RRApprover[] = approval.rr.rr_approvers.slice(0, thisApproverIndx)

            console.log('preRequisiteApprovers', preRequisiteApprovers);

            // check if all prerequisite approvers are approved
            const areAllApproved = !preRequisiteApprovers.find(i => i.status !== APPROVAL_STATUS.APPROVED)

            console.log('areAllApproved', areAllApproved);

            if(areAllApproved) {

                pendings.push({
                    id: approval.id,
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