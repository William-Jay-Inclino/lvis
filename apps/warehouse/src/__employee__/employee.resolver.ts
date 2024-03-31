import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Canvass } from '../canvass/entities/canvass.entity';
import { Employee } from './entities/employee.entity';
import { CanvassService } from '../canvass/canvass.service';
import { RvApproverService } from '../rv-approver/rv-approver.service';
import { RVApprover } from '../rv-approver/entities/rv-approver.entity';
import { MEQSApprover } from '../meqs-approver/entities/meqs-approver.entity';
import { MeqsApproverService } from '../meqs-approver/meqs-approver.service';
import { POApprover } from '../po-approver/entities/po-approver.entity';
import { RrApprover } from '../rr-approver/entities/rr-approver.entity';
import { PoApproverService } from '../po-approver/po-approver.service';
import { RrApproverService } from '../rr-approver/rr-approver.service';
import { EmployeeService } from './employee.service';
import { PendingApproval } from './entities/pending-approval.entity';
import { SPRApprover } from '../spr-approver/entities/spr-approver.entity';
import { SprApproverService } from '../spr-approver/spr-approver.service';
import { JoApproverService } from '../jo-approver/jo-approver.service';

@Resolver(() => Employee)
export class EmployeeResolver {
    constructor(
        private readonly employeeService: EmployeeService,
        private readonly canvassService: CanvassService,
        private readonly rvApproverService: RvApproverService,
        private readonly sprApproverService: SprApproverService,
        private readonly joApproverService: JoApproverService,
        private readonly meqsApproverService: MeqsApproverService,
        private readonly poApproverService: PoApproverService,
        private readonly rrApproverService: RrApproverService,
    ) { }

    @ResolveField(() => [Canvass])
    canvasses(@Parent() employee: Employee) {
        return this.canvassService.forEmployee(employee.id)
    }

    @ResolveField(() => [RVApprover])
    rv_pending_approvals(@Parent() employee: Employee) {
        return this.rvApproverService.forEmployeePendingApprovals(employee.id)
    }

    @ResolveField(() => [SPRApprover])
    spr_pending_approvals(@Parent() employee: Employee) {
        return this.sprApproverService.forEmployeePendingApprovals(employee.id)
    }

    @ResolveField(() => [RVApprover])
    jo_pending_approvals(@Parent() employee: Employee) {
        return this.joApproverService.forEmployeePendingApprovals(employee.id)
    }

    // @ResolveField(() => [MEQS])
    // meqs_cancelled(@Parent() employee: Employee) {
    //     return this.meqsService.forEmployeeCanceller(employee.id)
    // }

    @ResolveField(() => [MEQSApprover])
    meqs_pending_approvals(@Parent() employee: Employee) {
        return this.meqsApproverService.forEmployeePendingApprovals(employee.id)
    }

    @ResolveField(() => [POApprover])
    po_pending_approvals(@Parent() employee: Employee) {
        return this.poApproverService.forEmployeePendingApprovals(employee.id)
    }

    @ResolveField(() => [RrApprover])
    rr_pending_approvals(@Parent() employee: Employee) {
        return this.rrApproverService.forEmployeePendingApprovals(employee.id)
    }

    @ResolveField(() => [PendingApproval])
    async pending_approvals(@Parent() employee: Employee) {

        console.log('pending_approvals()')

        const [
            rvPendingApprovals,
            sprPendingApprovals,
            joPendingApprovals,
            meqsPendingApprovals,
            poPendingApprovals,
            rrPendingApprovals
        ] = await Promise.all([
            this.rvApproverService.forEmployeePendingApprovals(employee.id),
            this.sprApproverService.forEmployeePendingApprovals(employee.id),
            this.joApproverService.forEmployeePendingApprovals(employee.id),
            this.meqsApproverService.forEmployeePendingApprovals(employee.id),
            this.poApproverService.forEmployeePendingApprovals(employee.id),
            this.rrApproverService.forEmployeePendingApprovals(employee.id)
        ]);

        console.log('rvPendingApprovals', rvPendingApprovals)

        return this.employeeService.getAllPendingApprovals({
            rvApprovals: rvPendingApprovals,
            sprApprovals: sprPendingApprovals,
            joApprovals: joPendingApprovals,
            meqsApprovals: meqsPendingApprovals,
            poApprovals: poPendingApprovals,
            rrApprovals: rrPendingApprovals
        })
    }

    @ResolveField(() => Int)
    async total_pending_approvals(@Parent() employee: Employee) {

        console.log('total_pending_approvals()')

        const [
            rvPendingApprovals,
            sprPendingApprovals,
            joPendingApprovals,
            meqsPendingApprovals,
            poPendingApprovals,
            rrPendingApprovals
        ] = await Promise.all([
            this.rvApproverService.forEmployeePendingApprovals(employee.id),
            this.sprApproverService.forEmployeePendingApprovals(employee.id),
            this.joApproverService.forEmployeePendingApprovals(employee.id),
            this.meqsApproverService.forEmployeePendingApprovals(employee.id),
            this.poApproverService.forEmployeePendingApprovals(employee.id),
            this.rrApproverService.forEmployeePendingApprovals(employee.id)
        ]);

        console.log('rvPendingApprovals', rvPendingApprovals)

        const pendingApprovals = this.employeeService.getAllPendingApprovals({
            rvApprovals: rvPendingApprovals,
            sprApprovals: sprPendingApprovals,
            joApprovals: joPendingApprovals,
            meqsApprovals: meqsPendingApprovals,
            poApprovals: poPendingApprovals,
            rrApprovals: rrPendingApprovals
        })

        return pendingApprovals.length

    }

}
