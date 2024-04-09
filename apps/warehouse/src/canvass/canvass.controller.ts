import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { CanvassService } from './canvass.service';
import { CanvassPdfService } from './canvass.pdf.service';

@Controller('canvass')
export class CanvassController {

    constructor(
        private readonly canvassService: CanvassService,
        private readonly canvassPdfService: CanvassPdfService
    ) { }


    @Get('pdf/:id')
    async generatePdf(@Param('id') id: string, @Res() res: Response) {
        console.log('id', id)
        const canvass = await this.canvassService.findOne(id)
        const pdfBuffer = await this.canvassPdfService.generatePdf(canvass)

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
