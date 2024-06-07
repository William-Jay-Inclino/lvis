// pdf.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate, getImageAsBase64 } from '../__common__/helpers';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';
import { SPR } from './entities/spr.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { UPLOADS_PATH } from '../__common__/config';

@Injectable()
export class SprPdfService {

    private authUser: AuthUser
    private API_FILE_ENDPOINT = process.env.API_URL + '/api/v1/file-upload'


    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async generatePdf(spr: SPR) {

        console.log('spr', spr);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const watermark = getImageAsBase64('lvis-watermark-v2.png')
        const logo = getImageAsBase64('leyeco-logo.png')

        const approvers = await Promise.all(spr.spr_approvers.map(async (i) => {
            i.approver = await this.getEmployee(i.approver_id, this.authUser);
            return i;
        }));

        const requisitioner = await this.getEmployee(spr.canvass.requested_by_id, this.authUser)
        const classification = await this.getClassification(spr.classification_id, this.authUser)


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

                    <div style="font-size: 11pt; font-weight: bold;"> SPARE PARTS REQUEST </div>

                </div>

                <br />

                <div style="display: flex; justify-content: space-between;">

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td>Purpose: ${spr.canvass.purpose}</td>
                            </tr>     
                            <tr>
                                <td>Listed below are the list of Item/s needed:</td>
                            </tr>
                        </table>
                    </div>

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td> SPR No.: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${spr.spr_number}
                                </td>
                            </tr>   
                            <tr>
                                <td>Date: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${formatDate(spr.date_requested)}
                                </td>
                            </tr>
                        </table>
                    </div>
                
                </div>

                <br />

                <table style="width: 100%; border-collapse: collapse; font-size: 10pt;">
                    <thead>
                        <th style="border: 1px solid black;"> NO. </th>
                        <th style="border: 1px solid black;"> DESCRIPTION AND SPECIFICATIONS </th>
                        <th style="border: 1px solid black;"> UNIT </th>
                        <th style="border: 1px solid black;"> QTY. </th>
                    </thead>
                    <tbody>
                        ${spr.canvass.canvass_items.map((item, index) => `
                        <tr style="border: 1px solid black;">
                            <td align="center">${index + 1}</td>
                            <td>${item.description}</td>
                            <td align="center">${item.unit ? item.unit.name : 'N/A'}</td>
                            <td align="center">${item.quantity}</td>
                        </tr>
                    `).join('')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" style="text-align: center; padding: 10px;">
                                X------------------------NOTHING FOLLOWS------------------------X
                            </td>
                        </tr>
                    </tfoot>
                </table>

                <br />

                <table style="font-size: 10pt;">
                    <tr>
                        <td> Vehicle: </td>
                        <td> <b>${ spr.vehicle.name }</b> </td>
                    </tr>
                </table>
        
            </div>
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 70px; min-height: 32vh; display: flex; justify-content: center;">

                <div style="display: flex; flex-wrap: wrap;">

                    <div style="padding: 10px; width: 40%">
                        <table border="0" style="width: 100%; font-size: 10pt;">
                            <tr>
                                <td> Requested By: </td>
                            </tr>
                            <tr>
                                <td> ${formatDate(spr.date_requested, true)} </td>
                            </tr>
                            <tr>
                                <th style="text-align: center; position: relative; font-size: 12pt;">
                                    <u style="position: relative; z-index: 1; margin-bottom: 10px;">${ requisitioner.firstname + ' ' + requisitioner.lastname }</u>
                                    <img style="width: 100px; height: 100px; position: absolute; top: -50px; left: 50%; transform: translateX(-50%); z-index: 2;" src="${ this.getUploadsPath(requisitioner.signature_src) }" />
                                </th>
                            </tr>
                            <tr>
                                <td style="text-align: center">
                                ${
                                    // @ts-ignore
                                    requisitioner.position.name
                                } 
                                </td>
                            </tr>
                        </table>
                    </div>

                    ${approvers.map((item, index) => `
                    
                        <div style="padding: 10px; width: 40%">
                            <table border="0" style="width: 100%; font-size: 10pt;">
                                <tr>
                                    <td> ${ item.label } </td>
                                </tr>
                                <tr>
                                    <td> ${formatDate(item.date_approval, true)} </td>
                                </tr>
                                <tr>
                                    <th style="text-align: center; position: relative; font-size: 12pt;">
                                        <u style="position: relative; z-index: 1; margin-bottom: 10px;">
                                            ${
                                                // @ts-ignore
                                                item.approver.firstname + ' ' + item.approver.lastname
                                            }
                                        </u>
                                        <img style="width: 100px; height: 100px; position: absolute; top: -60px; left: 50%; transform: translateX(-50%); z-index: 2;" src="${ 
                                            // @ts-ignore
                                            this.getUploadsPath(item.approver.signature_src)
                                        }" />
                                    </th>
                                </tr>
                                <tr>
                                    <td style="text-align: center">
                                        ${
                                            // @ts-ignore
                                            item.approver.position.name
                                        }
                                    </td>
                                </tr>
                                ${
                                    // @ts-ignore 
                                    item.approver.is_budget_officer ? `<tr> <td> Classification: ${ classification.name } </td> </tr>` : '<tr> <td></td> </tr>'
                                }
                            </table>
                        </div>

                    `).join('')}
            
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
                    Note: System generated report | Created by: <b>${ spr.created_by }</b> | Printed by: <b>${this.authUser.user.username}</b> | 
                    Date & Time: <b><span class="date"></span></b>
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
    
    private async getEmployee(employeeId: string, authUser: AuthUser) {


        const query = `
            query {
                employee(id: "${ employeeId }") {
                    id 
                    firstname 
                    middlename 
                    lastname
                    position {
                        id 
                        name
                    }
                    signature_src
                    is_budget_officer
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

    private async getClassification(classificationId: string, authUser: AuthUser) {


        const query = `
            query {
                classification(id: "${ classificationId }") {
                    id 
                    name
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
            console.log('data.data.classification', data.data.classification)

            if (!data || !data.data) {
                console.log('No data returned');
                return undefined;
            }

            return data.data.classification;

        } catch (error) {
            console.error('Error getting classification:', error.message);
            return undefined;
        }
    }

    private getUploadsPath(src: string) {

        if(!src || src.trim() === '') return 

        const path = src.replace(UPLOADS_PATH, '')
        console.log('PATH', path)
    
        const uploadsPath = this.API_FILE_ENDPOINT + path
        return uploadsPath
    }

    async findSpr(id: string) {
        const item = await this.prisma.sPR.findUnique({
            include: {
                vehicle: true,
                canvass: {
                    include: {
                        canvass_items: {
                            include: {
                                unit: true,
                                brand: true
                            }
                        }
                    }
                },
                spr_approvers: {
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            where: { id }
        })

        if (!item) {
            throw new NotFoundException('SPR not found')
        }

        return item
    }

}
