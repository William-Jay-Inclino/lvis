import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { SprPdfService } from './spr.pdf.service';
import { JwtAuthGuard } from '../__auth__/guards/jwt-auth.guard';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';


@UseGuards(JwtAuthGuard)
@Controller('spr')
export class SprController {

    constructor(
        private readonly sprPdfService: SprPdfService
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
