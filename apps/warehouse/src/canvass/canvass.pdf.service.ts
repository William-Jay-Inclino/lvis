// pdf.service.ts

import { Injectable } from '@nestjs/common';
import { Canvass } from 'apps/warehouse/prisma/generated/client';
import puppeteer from 'puppeteer';

@Injectable()
export class CanvassPdfService {

    async generatePdf(canvass: Canvass) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set content of the PDF
        const content = `
          <div style="text-align: center;">

                <h1 style="font-size: 10pt; font-weight: bold;">LEYTE V ELECTRIC COOPERATIVE, INC.</h1>

                <div style="font-size: 8pt">
                    <span>Brgy. San Pablo, Ormoc City, Leyte</span>
                    <br />
                    <span>VAT REG. TIN 001-383-331-000</span>
                </div>

                <br />
                <br />

                <h2 style="font-size: 10pt; font-weight: bold;">OFFICIAL CANVASS SHEET</h1>

          </div>
        `;

        await page.setContent(content);

        // Generate PDF
        const pdfBuffer = await page.pdf();

        await browser.close();

        return pdfBuffer;
    }

}
