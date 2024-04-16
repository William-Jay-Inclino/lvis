// pdf.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate, getImageAsBase64 } from '../__common__/helpers';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { JO } from './entities/jo.entity';
import { UPLOADS_PATH } from '../__common__/config';

@Injectable()
export class JoPdfService {

    private authUser: AuthUser
    private API_FILE_ENDPOINT = process.env.API_URL + '/api/v1/file-upload'


    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async generatePdf(jo: JO) {
        console.log('jo', jo);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const watermark = getImageAsBase64('lvis-watermark-v2.png')
        const logo = getImageAsBase64('leyeco-logo.png')

        const approvers = await Promise.all(jo.jo_approvers.map(async (i) => {
            i.approver = await this.getEmployee(i.approver_id, this.authUser);
            return i;
        }));

        const classification = await this.getClassification(jo.classification_id, this.authUser)
        const department = await this.getDepartment(jo.department_id, this.authUser)
        const requisitioner = await this.getEmployee(jo.canvass.requested_by_id, this.authUser)

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

                    <div style="font-size: 11pt; font-weight: bold;"> JOB ORDER REQUEST </div>

                </div>

                <br />

                <div style="display: flex; justify-content: space-between;">

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td>Purpose: ${jo.canvass.purpose}</td>
                            </tr>     
                            <tr>
                                <td>Listed below are the list of Item/s needed:</td>
                            </tr>
                        </table>
                    </div>

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td> JO No.: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${jo.jo_number}
                                </td>
                            </tr>    
                            <tr>
                                <td>Date: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${formatDate(jo.date_requested)}
                                </td>
                            </tr>
                        </table>
                    </div>
                
                </div>

                <br />

                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="font-size: 10pt;">
                        <th style="border: 1px solid black;"> NO. </th>
                        <th style="border: 1px solid black;"> DESCRIPTION AND SPECIFICATIONS </th>
                        <th style="border: 1px solid black;"> UNIT </th>
                        <th style="border: 1px solid black;"> QTY. </th>
                    </thead>
                    <tbody style="font-size: 10pt;">
                        ${jo.canvass.canvass_items.map((item, index) => `
                        <tr style="border: 1px solid black;">
                            <td align="center">${index + 1}</td>
                            <td>${item.description}</td>
                            <td align="center">${item.unit ? item.unit.name : 'N/A'}</td>
                            <td align="center">${item.quantity}</td>
                        </tr>
                    `).join('')}
                    </tbody>
                </table>

                <br />

                <table style="font-size: 10pt;">
                    <tr>
                        <td> Department: </td>
                        <td> <b>${ department.name }</b> </td>
                    </tr>
                    <tr>
                        <td> Division: </td>
                        <td> <b>${ department.name } </b> </td>
                    </tr>
                    <tr>
                        <td> Classification: </td>
                        <td> <b>${ classification.name }</b> </td>
                    </tr>
                </table>
        
            </div>
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 70px; min-height: 32vh; display: flex; justify-content: center;">

                <div style="display: flex; flex-wrap: wrap;">

                    <div style="padding: 10px; width: 40%">
                        <table border="0" style="width: 100%">
                            <tr>
                                <td style="font-size: 10pt;"> ${formatDate(jo.date_requested)} </td>
                            </tr>
                            <tr>
                                <th style="text-align: center; position: relative;">
                                    <u style="position: relative; z-index: 1; margin-bottom: 10px;">${ requisitioner.firstname + ' ' + requisitioner.lastname }</u>

                                    <img style="width: 100px; height: 100px; position: absolute; top: -50px; left: 50%; transform: translateX(-50%); z-index: 2;" src="${ this.getUploadsPath(requisitioner.signature_src) }" />
                                </th>
                            </tr>
                            <tr>
                                <td style="text-align: center">
                                ${
                                    // @ts-ignore
                                    requisitioner.position || ''
                                } 
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 10pt; text-align: center;"> Requisitioner </td>
                            </tr>
                        </table>
                    </div>

                    ${approvers.map((item, index) => `
                    
                        <div style="padding: 10px; width: 40%">
                            <table border="0" style="width: 100%">
                                <tr>
                                    <td style="font-size: 10pt;"> ${formatDate(item.date_approval, true)} </td>
                                </tr>
                                <tr>
                                    <th style="text-align: center; position: relative;">
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
                                        ${ item.label }
                                    </td>
                                </tr>
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
    
    private async getEmployee(employeeId: string, authUser: AuthUser) {


        const query = `
            query {
                employee(id: "${ employeeId }") {
                    id 
                    firstname 
                    middlename 
                    lastname
                    position
                    signature_src
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

    private async getDepartment(departmentId: string, authUser: AuthUser) {

        const query = `
            query {
                department(id: "${ departmentId }") {
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
            console.log('data.data.department', data.data.department)

            if (!data || !data.data) {
                console.log('No data returned');
                return undefined;
            }

            return data.data.department;

        } catch (error) {
            console.error('Error getting department:', error.message);
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

    async findJo(id: string) {
        const item = await this.prisma.jO.findUnique({
            include: {
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
                jo_approvers: {
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
