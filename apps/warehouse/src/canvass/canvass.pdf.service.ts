// pdf.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate } from '../__common__/helpers';
import { Canvass } from './entities/canvass.entity';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import * as path from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class CanvassPdfService {

    private authUser: AuthUser

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    getImageAsBase64(filename: string): string {
        const imagePath = path.resolve('assets', filename);
        const imageBuffer = readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        return base64Image;
    }

    async generatePdf(canvass: Canvass) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const watermark = this.getImageAsBase64('lvis-watermark-v2.png')
        const logo = this.getImageAsBase64('leyeco-logo.png')

        const requisitioner = await this.getEmployee(canvass.requested_by_id, this.authUser)
        const notedBy = await this.getGM(this.authUser)

        // Set content of the PDF
        const content = `

        <style>
            body {
                margin: 0;
                padding: 0;
            }
            .watermark {
                position: fixed;
                top: 50%;
                left: 60%;
                transform: translate(-50%, -50%);
                width: 70%;
                height: 70%;
                z-index: -1;
                background-image: url('data:image/jpeg;base64,${watermark}');
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
            .content {
                display: flex; flex-direction: column;
                padding-left: 25px; padding-right: 25px; font-size: 10pt; 
            }
        </style>

        
        <div class="watermark"></div>

        <div class="content">

            <div style="flex-grow: 1; min-height: 60vh;">
        
                <div style="text-align: center; margin-top: 35px">
        
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <img src="data:image/jpeg;base64,${logo}" alt="Logo" style="height: 50px; width: 50px; margin-right: 10px;">
                        <h1 style="font-size: 11pt; font-weight: bold; display: inline;">LEYTE V ELECTRIC COOPERATIVE, INC.</h1>
                    </div>
        
                    <div style="font-size: 9pt">
                        <span>Brgy. San Pablo, Ormoc City, Leyte</span>
                        <br />
                        <span>VAT REG. TIN 001-383-331-000</span>
                    </div>
        
                    <br />
                    <br />
        
                    <div style="font-size: 11pt; font-weight: bold;">OFFICIAL CANVASS SHEET</div>

                </div>

                <div style="display: flex; justify-content: space-between;">

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td>Purpose: ${canvass.purpose}</td>
                            </tr>     
                            <tr>
                                <td>Listed below are the list of Item/s needed:</td>
                            </tr>
                        </table>
                    </div>

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td> RC No.: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${canvass.rc_number}
                                </td>
                            </tr>     
                            <tr>
                                <td>Date: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${formatDate(canvass.date_requested)}
                                </td>
                            </tr>
                        </table>
                    </div>
                
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
                    <tbody style="font-size: 10pt; border: 1px solid black;">
                        ${canvass.canvass_items.map((item, index) => `
                        <tr style="border: 1px solid black;">
                            <td align="center">${index + 1}</td>
                            <td>${item.description}</td>
                            <td align="center">${item.unit ? item.unit.name : 'N/A'}</td>
                            <td align="center">${item.quantity}</td>
                        </tr>
                    `).join('')}
                    
                    </tbody>
                </table>
        
            </div>
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 70px; min-height: 32vh;">

                <div style="display: flex; justify-content: space-between;">
                
                    <div>
                        Terms of Payment:
                    </div>

                    <div>
                        <span>
                            None VAT: <input type="checkbox" style="transform: scale(2);"/>
                        </span>
                        <span style="margin-left: 25px;">
                            VAT Inclusive: <input type="checkbox" style="transform: scale(2);"/>
                        </span>
                        <span style="margin-left: 25px;">
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
                                        <b> 
                                            ${
                                                // @ts-ignore
                                                requisitioner.firstname + ' ' + requisitioner.lastname
                                            } 
                                        </b>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="text-align: center">
                                    <div>
                                        ${
                                            // @ts-ignore
                                            requisitioner.position || ''
                                        } 
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
                                    <b> 
                                    ${
                                        // @ts-ignore
                                        notedBy.firstname + ' ' + notedBy.lastname
                                    } 
                                </b>
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

                <br />
                <br />

                <div style="text-align: center;">
                    <table border="0" style="width: 75%; margin: 0 auto;">
                        <tr>
                            <td style="width: 20%; margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; ">
                                    <span>Supplier</span>
                                    <span>:</span>
                                </div>
                            </td>
                            <td style="border-bottom: 1px solid black; margin-bottom: 10px;"></td>
                        </tr>
                        <tr>
                            <td style="margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; ">
                                    <span>TIN No.</span>
                                    <span>:</span>
                                </div>
                            </td>
                            <td style="border-bottom: 1px solid black"></td>
                        </tr>
                        <tr>
                            <td style="margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; ">
                                    <span>Address</span>
                                    <span>:</span>
                                </div>
                            </td>
                            <td style="border-bottom: 1px solid black; margin-bottom: 10px;"></td>
                        </tr>
                        <tr>
                            <td>
                                <div style="display: flex; justify-content: space-between; ">
                                    <span>Telephone</span>
                                    <span>:</span>
                                </div>
                            </td>
                            <td style="border-bottom: 1px solid black"></td>
                        </tr>
                        <tr>
                            <td>
                                <div style="display: flex; justify-content: space-between; ">
                                    <span>Signature Over Printed Name</span>
                                    <span>
                                        <br />
                                        :
                                    </span>
                                </div>
                            </td>
                            <td style="border-bottom: 1px solid black"></td>
                        </tr>
                    </table>
                </div>

            </div>

        
        </div>

        `;

        await page.setContent(content);
        
        const pdfBuffer = await page.pdf({
            printBackground: true,
            format: 'A4',
            displayHeaderFooter: true,
            headerTemplate: ``,
            footerTemplate: `
            <div style="border-top: solid 1px #bbb; width: 100%; font-size: 9px;
                padding: 5px 5px 0; color: #bbb; position: relative;">
                <div style="position: absolute; left: 5px; top: 5px;">
                    Note: This is a system generated report printed by ${this.authUser.user.username} | 
                    Date & Time Generated: <span class="date"></span>
                </div>
                <div style="position: absolute; right: 5px; top: 5px;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>
            </div>
          `,
            // this is needed to prevent content from being placed over the footer
            margin: { bottom: '70px' },
          });

        await browser.close();

        return pdfBuffer;
    }
    
    async findCanvass(id: string) {

        const item = await this.prisma.canvass.findUnique({
            include: {
                canvass_items: {
                    include: {
                        unit: true,
                        brand: true,
                        item: true
                    }
                },
            },
            where: { id }
        })

        if (!item) {
            throw new NotFoundException('Canvass not found')
        }

        return item

    }


    private async getEmployee(employeeId: string, authUser: AuthUser): Promise<Employee | undefined> {


        const query = `
            query {
                employee(id: "${ employeeId }") {
                    id 
                    firstname 
                    middlename 
                    lastname
                    position
                }
            }
        `;

        console.log('query', query)

        try {
            const { data } = await firstValueFrom(
                this.httpService.post(
                    process.env.API_GATEWAY_URL,
                    { query },
                    {
                        headers: {
                            Authorization: authUser.authorization,
                            'Content-Type': 'application/json',
                        },
                    }
                ).pipe(
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );

            console.log('data', data);
            console.log('data.data.employee', data.data.employee)

            if (!data || !data.data) {
                console.log('No data returned');
                return undefined;
            }

            return data.data.employee;

        } catch (error) {
            console.error('Error getting employee:', error.message);
            return undefined;
        }
    }

    private async getGM(authUser: AuthUser): Promise<Employee | undefined> {


        const query = `
            query {
                general_manager {
                    id 
                    firstname 
                    middlename 
                    lastname
                    position
                }
            }
        `;

        console.log('query', query)

        try {
            const { data } = await firstValueFrom(
                this.httpService.post(
                    process.env.API_GATEWAY_URL,
                    { query },
                    {
                        headers: {
                            Authorization: authUser.authorization,
                            'Content-Type': 'application/json',
                        },
                    }
                ).pipe(
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );

            console.log('data', data);
            console.log('data.data.general_manager', data.data.general_manager)

            if (!data || !data.data) {
                console.log('No data returned');
                return undefined;
            }

            return data.data.general_manager;

        } catch (error) {
            console.error('Error getting general_manager:', error.message);
            return undefined;
        }
    }

}
