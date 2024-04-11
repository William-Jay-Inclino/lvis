import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { RvService } from './rv.service';
import { RvPdfService } from './rv.pdf.service';
import { JwtAuthGuard } from '../__auth__/guards/jwt-auth.guard';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';


// @UseGuards(JwtAuthGuard)
@Controller('rv')
export class RvController {

    constructor(
        private readonly rvService: RvService,
        private readonly rvPdfService: RvPdfService
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

        this.rvPdfService.setAuthUser(authUser)

        const rv = await this.rvService.findOne(id)
        // @ts-ignore
        const pdfBuffer = await this.rvPdfService.generatePdf(rv)

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
