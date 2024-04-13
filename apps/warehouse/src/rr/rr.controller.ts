import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { RrPdfService } from './rr.pdf.service';
import { JwtAuthGuard } from '../__auth__/guards/jwt-auth.guard';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';


// @UseGuards(JwtAuthGuard)
@Controller('rr')
export class RrController {

    constructor(
        private readonly rrPdfService: RrPdfService
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

        this.rrPdfService.setAuthUser(authUser)

        const rr = await this.rrPdfService.findRr(id)
        // @ts-ignore
        const pdfBuffer = await this.rrPdfService.generatePdf(rr)

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
