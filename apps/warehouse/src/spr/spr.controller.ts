import { Controller, Get, Param, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { SprPdfService } from './spr.pdf.service';
import { JwtAuthGuard } from '../__auth__/guards/jwt-auth.guard';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { SprService } from './spr.service';
import { APPROVAL_STATUS } from '../__common__/types';


@UseGuards(JwtAuthGuard)
@Controller('spr')
export class SprController {

    constructor(
        private readonly sprPdfService: SprPdfService,
        private readonly sprService: SprService,
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

        this.sprPdfService.setAuthUser(authUser)

        const status = await this.sprService.getStatus(id)

        console.log('status', status);

        if(status !== APPROVAL_STATUS.APPROVED) {
            throw new UnauthorizedException('Cannot generate pdf. Status is not approvedf')
        }

        const spr = await this.sprPdfService.findSpr(id)
        // @ts-ignore
        const pdfBuffer = await this.sprPdfService.generatePdf(spr)

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
