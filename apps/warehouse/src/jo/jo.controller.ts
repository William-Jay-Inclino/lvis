import { Controller, Get, Param, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JoPdfService } from './jo.pdf.service';
import { JwtAuthGuard } from '../__auth__/guards/jwt-auth.guard';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { JoService } from './jo.service';
import { APPROVAL_STATUS } from '../__common__/types';


@UseGuards(JwtAuthGuard)
@Controller('jo')
export class JoController {

    constructor(
        private readonly joPdfService: JoPdfService,
        private readonly joService: JoService,
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

        this.joPdfService.setAuthUser(authUser)

        const status = await this.joService.getStatus(id)

        console.log('status', status);

        if(status !== APPROVAL_STATUS.APPROVED) {
            throw new UnauthorizedException('Cannot generate pdf. Status is not approvedf')
        }

        const jo = await this.joPdfService.findJo(id)
        // @ts-ignore
        const pdfBuffer = await this.joPdfService.generatePdf(jo)

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
