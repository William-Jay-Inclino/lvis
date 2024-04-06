import { Controller, Get, Req, Res } from '@nestjs/common';
import { CanvassService } from './canvass.service';
import { CanvassPdfService } from './canvass.pdf.service';

@Controller('canvass')
export class CanvassController {

    constructor(
        private readonly canvassService: CanvassService,
        private readonly canvassPdfService: CanvassPdfService
    ) { }


    @Get('pdf')
    async generatePdf(@Req() req: Request, @Res() res: Response) {
        const canvass = await this.canvassService.findOne('519db4a1-9e24-4abb-9b05-fcbb421b9387')
        const pdfBuffer = await this.canvassPdfService.generatePdf()

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
