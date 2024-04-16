import { Controller, Get, Param, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MeqsPdfService } from './meqs.pdf.service';
import { JwtAuthGuard } from '../__auth__/guards/jwt-auth.guard';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { MeqsService } from './meqs.service';
import { APPROVAL_STATUS } from '../__common__/types';


@UseGuards(JwtAuthGuard)
@Controller('meqs')
export class MeqsController {

    constructor(
        private readonly meqsPdfService: MeqsPdfService,
        private readonly meqsService: MeqsService,
    ) { }


    @Get('pdf/:id')
    async generatePdf(
        @Param('id') id: string, 
        @Res() res: Response,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        console.log('id', id)
        // @ts-ignore
        console.log('authUser', authUser);

        this.meqsPdfService.setAuthUser(authUser)

        const status = await this.meqsService.getStatus(id)

        console.log('status', status);

        if(status !== APPROVAL_STATUS.APPROVED) {
            throw new UnauthorizedException('Cannot generate pdf. Status is not approvedf')
        }

        const meqs = await this.meqsPdfService.findMeqs(id)
        // @ts-ignore
        const pdfBuffer = await this.meqsPdfService.generatePdf(meqs)

        // Set response headers
        // @ts-ignore
        res.setHeader('Content-Type', 'application/pdf');
        // @ts-ignore
        res.setHeader('Content-Disposition', 'inline; filename="example.pdf"');

        // Send PDF buffer to client
        // @ts-ignore
        res.send(pdfBuffer);

    }

}
