// pdf.service.ts

import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate } from '../__common__/helpers';
import { Canvass } from './entities/canvass.entity';

@Injectable()
export class CanvassPdfService {

    async generatePdf(canvass: Canvass) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set content of the PDF
        const content = `

        <div style="display: flex; flex-direction: column; min-height: 70vh;">

            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; flex-grow: 1;">
        
                <div style="text-align: center; margin-top: 45px">
        
                    <h1 style="font-size: 11pt; font-weight: bold;">LEYTE V ELECTRIC COOPERATIVE, INC.</h1>
        
                    <div style="font-size: 9pt">
                        <span>Brgy. San Pablo, Ormoc City, Leyte</span>
                        <br />
                        <span>VAT REG. TIN 001-383-331-000</span>
                    </div>
        
                    <br />
                    <br />
        
                    <h2 style="font-size: 11pt; font-weight: bold;">OFFICIAL CANVASS SHEET</h1>
        
                    <br />
        
                </div>
        
        
                <div style="display: flex; justify-content: space-between;">
                    <span>
                        Date: <u>${formatDate(canvass.date_requested)}</u>
                    </span>
                    <span>
                        RC #: <u>${canvass.rc_number}</u>
                    </span>
                </div>
        
                <br />
                <br />
        
                <div>
                    Listed below are the list of Item/s needed:
                </div>
        
                <br />
        
                <div>
                    Purpose: ${canvass.purpose}
                </div>
        
                <br />
        
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="font-size: 10pt;">
                        <th style="border: 1px solid black;"> NO. </th>
                        <th style="border: 1px solid black;"> ITEM DESCRIPTION AND SPECIFICATIONS </th>
                        <th style="border: 1px solid black;"> UNIT </th>
                        <th style="border: 1px solid black;"> QTY. </th>
                        <th style="border: 1px solid black;"> UNIT COST </th>
                    </thead>
                    <tbody style="font-size: 10pt;">
                        ${canvass.canvass_items.map((item, index) => `
                        <tr>
                            <td align="center">${index + 1}</td>
                            <td align="center">${item.description}</td>
                            <td align="center">${item.unit ? item.unit.name : ''}</td>
                            <td align="center">${item.quantity}</td>
                            <td></td>
                        </tr>
                    `).join('')}
                    </tbody>
                </table>
        
            </div>
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 50px">

                <div style="display: flex; justify-content: space-between;">
                
                    <div>
                        Terms of Payment:
                    </div>

                    <div>
                        <span>
                            VAT Inclusive: <input type="checkbox" style="transform: scale(2);"/>
                        </span>
                        <span style="margin-left: 50px">
                            VAT Exclusive: <input type="checkbox" style="transform: scale(2);"/>
                        </span>
                    </div>

                </div>

                <hr />

                <br />

                <div style="display: flex; justify-content: space-between;">
                    <div style="flex: 1;">
                        <table style="font-size: 10pt; width: 80%">
                            <tr>
                                <td>Prepared By:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="text-align: center; border-bottom: 1px solid black">
                                    <div style="margin-top: 20px; ">
                                        <b>temp full name</b>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="text-align: center">
                                    <div>
                                        Junior Computer Technician
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style="flex: 1;">
                        <table style="font-size: 10pt; width: 80%">
                            <tr>
                                <td>Noted By:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="text-align: center; border-bottom: 1px solid black">
                                    <div style="margin-top: 20px; ">
                                        <b>temp full name</b>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="text-align: center">
                                    <div>
                                        General Manager
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>


            

            </div>
        
        </div>
    
            



          
        `;

        await page.setContent(content);

        // Generate PDF
        const pdfBuffer = await page.pdf();

        await browser.close();

        return pdfBuffer;
    }

}
