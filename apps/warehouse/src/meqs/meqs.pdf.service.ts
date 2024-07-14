// pdf.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate, formatToPhpCurrency, getImageAsBase64 } from '../__common__/helpers';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';
import { MEQS } from './entities/meq.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { CanvassItem } from '../canvass-item/entities/canvass-item.entity';
import { UPLOADS_PATH } from '../__common__/config';

@Injectable()
export class MeqsPdfService {

    private authUser: AuthUser
    private API_FILE_ENDPOINT = process.env.API_URL + '/api/v1/file-upload'

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async generatePdf(meqs: MEQS) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const watermark = getImageAsBase64('lvis-watermark-v2.png')
        const logo = getImageAsBase64('leyeco-logo.png')

        let purpose, refNumber, refType, requisitioner_notes, requested_by_id, canvassItems: CanvassItem[]

        if(meqs.rv) {
            purpose = meqs.rv.canvass.purpose
            requisitioner_notes = meqs.rv.canvass.notes
            requested_by_id = meqs.rv.canvass.requested_by_id
            refNumber = meqs.rv.rv_number
            refType = 'RV'
            canvassItems = meqs.rv.canvass.canvass_items
        } else if(meqs.spr) {
            requisitioner_notes = meqs.spr.canvass.notes
            purpose = meqs.spr.canvass.purpose
            requested_by_id = meqs.spr.canvass.requested_by_id
            refNumber = meqs.spr.spr_number
            refType = 'SPR'
            canvassItems = meqs.spr.canvass.canvass_items
        } else {
            requisitioner_notes = meqs.jo.canvass.notes
            purpose = meqs.jo.canvass.purpose
            requested_by_id = meqs.jo.canvass.requested_by_id
            refNumber = meqs.jo.jo_number
            refType = 'JO'
            canvassItems = meqs.jo.canvass.canvass_items
        }

        const approvers = await Promise.all(meqs.meqs_approvers.map(async (i) => {
            // @ts-ignore
            i.approver = await this.getEmployee(i.approver_id, this.authUser);
            return i;
        }));

        const requisitioner = await this.getEmployee(requested_by_id, this.authUser)

        // Set content of the PDF
        const content = `

        <style>
            body {
                margin: 0;
                padding: 0;
            }
            .watermark {
                position: fixed;
                top: 63%;
                left: 58%;
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

            <div style="flex-grow: 1; min-height: 72vh;">
        
                <div style="text-align: center; margin-top: 35px;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="display: flex; align-items: center;">
                            <img src="data:image/jpeg;base64,${logo}" alt="Logo" style="height: 50px; width: 50px; margin-right: 10px;">
                            <div style="text-align: center;">
                                <span style="font-size: 11pt; font-weight: bold;">LEYTE V ELECTRIC COOPERATIVE, INC.</span>
                                <div style="font-size: 9pt;">
                                    <span>Brgy. San Pablo, Ormoc City, Leyte</span>
                                    <br />
                                    <span>VAT REG. TIN 001-383-331-000</span>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div style="font-size: 11pt; font-weight: bold;">MATERIALS / EQUIPMENT QUOTATION SUMMARY</div>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between;">

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td>Purpose:</td>
                                <td> ${ purpose } </td>
                            </tr>  
                            <tr>
                                <td>Requisitioner Notes: </td>
                                <td> ${ requisitioner_notes } </td>
                            </tr> 
                        </table>
                    </div>

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td> MEQS No.: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${meqs.meqs_number}
                                </td>
                            </tr>   
                            <tr>
                                <td>Date Prepared: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${formatDate(meqs.meqs_date)}
                                </td>
                            </tr>
                        </table>
                    </div>
                
                </div>

                <br />

                <table style="width: 100%; border-collapse: collapse; font-size: 10pt;">
                    <caption style="text-align: left;"> <i>Note: The price with star in the 'Supplier' column indicates the awarded supplier </i></caption>
                    <thead>
                        <th style="border: 1px solid black;"> MATERIALS / EQUIPMENT DESCRIPTION </th>
                        <th style="border: 1px solid black;"> UNIT </th>
                        <th style="border: 1px solid black;"> QTY. </th>

                        ${meqs.meqs_suppliers.map((item, index) => `
                        <th align="center" style="border: 1px solid black; width: 10%;">
                            ${ item.supplier.name.toUpperCase() }
                        </th>
                        `).join('')}

                    </thead>

                    <tbody>
                        ${canvassItems.map((canvassItem, index) => {

                            const tdElements = meqs.meqs_suppliers.map(supplier => {
                                for (let supplierItem of supplier.meqs_supplier_items) {
                                    if (supplierItem.canvass_item_id === canvassItem.id) {

                                        if(supplierItem.is_awarded) {
                                            return `<td align="center"><b>${(supplierItem.price !== -1) ? formatToPhpCurrency(supplierItem.price) : 'N/A'} &#9733;</b></td>`;
                                        }else {
                                            return `<td align="center">${(supplierItem.price !== -1) ? formatToPhpCurrency(supplierItem.price) : 'N/A'}</td>`;
                                        }

                                    }
                                }
                                return `<td align="center"></td>`; // Default empty <td> if no match found
                            }).join('');
                    
                            return `
                            <tr style="border: 1px solid black;">
                                <td>
                                    ${index + 1}. ${canvassItem.description}
                                </td>
                                <td align="center">${canvassItem.unit ? canvassItem.unit.name : 'N/A'}</td>
                                <td align="center">${canvassItem.quantity}</td>
                                ${tdElements}
                            </tr>`;
                        }).join('')}

                    </tbody>
                
                </table>

                <div style="text-align: center; padding-top: 10px;">
                    X------------------------NOTHING FOLLOWS------------------------X
                </div>

                <br />

                <table style="font-size: 10pt;">
                    <tr>
                        <td>${ meqs.notes }</td>
                    </tr>
                    <tr>
                        <td>
                            Requisitioner: 
                            <b>
                            ${
                                // @ts-ignore
                                requisitioner.firstname + ' ' + requisitioner.lastname
                            } 
                            </b> 
                        </td>
                    </tr>
                </table>
        
            </div>
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 50px; min-height: 18vh;">
                
                <div style="text-align: center; margin-bottom: 10px;"> <b>COOP PROCUREMENT COMMITTEE: </b></div>

                <br />

                <div style="display: flex; justify-content: center;">
                
                    ${approvers.map((item, index) => `
                        
                        <div style="padding: 10px; margin-right: 30px;">
                            <table border="0" style="width: 100%">
                                <tr>
                                    <td style="font-size: 10pt;"> 
                                        ${ item.date_approval ? formatDate(item.date_approval, true) : '&nbsp;' } 
                                    </td>
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
                
                <div style="font-size: 8pt; margin-top: 10px;"> 
                    ${ refType } No.: ${ refNumber } 
                </div>
            
            </div>
        
        </div>
          
        `;

        await page.setContent(content);

        const pdfBuffer = await page.pdf({
            landscape: true,
            printBackground: true,
            format: 'A4',
            displayHeaderFooter: true,
            headerTemplate: ``,
            footerTemplate: `
            <div style="border-top: solid 1px #bbb; width: 100%; font-size: 9px;
                padding: 5px 5px 0; color: #bbb; position: relative;">
                <div style="position: absolute; left: 5px; top: 5px;">
                    Note: System generated report | Created by: <b>${ meqs.created_by }</b> | Printed by: <b>${this.authUser.user.username}</b> | 
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

    private getUploadsPath(src: string) {

        if(!src || src.trim() === '') return 

        const path = src.replace(UPLOADS_PATH, '')
        console.log('PATH', path)
    
        const uploadsPath = this.API_FILE_ENDPOINT + path
        return uploadsPath
    }

    async findMeqs(id: string) {
        const item = await this.prisma.mEQS.findUnique({
            include: {
                rv: {
                    include: {
                        canvass: {
                            include: {
                                canvass_items: {
                                    include: {
                                        unit: true
                                    }
                                }
                            }
                        }
                    }
                },
                spr: {
                    include: {
                        canvass: {
                            include: {
                                canvass_items: {
                                    include: {
                                        unit: true
                                    }
                                }
                            }
                        }
                    }
                },
                jo: {
                    include: {
                        canvass: {
                            include: {
                                canvass_items: {
                                    include: {
                                        unit: true
                                    }
                                }
                            }
                        }
                    }
                },
                meqs_suppliers: {
                    include: {
                        supplier: true,
                        meqs_supplier_items: {
                            include: {
                                canvass_item: {
                                    include: {
                                        unit: true
                                    }
                                }
                            }
                        }
                    }
                },
                meqs_approvers: {
                    where: {
                        deleted_at: null
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            where: { 
                id,
            }
        })

        if (!item) {
            throw new NotFoundException('MEQS not found')
        }

        return item
    }

}
