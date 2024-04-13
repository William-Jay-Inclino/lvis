import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { PoPdfService } from './po.pdf.service';
import { JwtAuthGuard } from '../__auth__/guards/jwt-auth.guard';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';


@UseGuards(JwtAuthGuard)
@Controller('po')
export class PoController {

    constructor(
        private readonly poPdfService: PoPdfService
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

        this.poPdfService.setAuthUser(authUser)

        const po = await this.poPdfService.findPo(id)
        // @ts-ignore
        const pdfBuffer = await this.poPdfService.generatePdf(po)

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
