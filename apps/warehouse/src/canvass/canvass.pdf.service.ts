// pdf.service.ts

import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class CanvassPdfService {

    async generatePdf(): Promise<Buffer> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Generate PDF content
        await page.setContent('<h1>Hello, World!</h1>');

        // Generate PDF buffer
        const pdfBuffer = await page.pdf({ format: 'A4' });

        await browser.close();

        return pdfBuffer;

    }

}
