// pdf.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate, formatToPhpCurrency, getImageAsBase64 } from '../__common__/helpers';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';
import { PO } from './entities/po.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { VAT } from '../__common__/constants';
import { Classification } from '../__classification__/entities/classification.entity';
import { VAT_TYPE } from '../__common__/types';
import { UPLOADS_PATH } from '../__common__/config';

@Injectable()
export class PoPdfService {

    private authUser: AuthUser
    private API_FILE_ENDPOINT = process.env.API_URL + '/api/v1/file-upload'


    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async generatePdf(po: PO) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const watermark = getImageAsBase64('lvis-watermark-v2.png')
        const logo = getImageAsBase64('leyeco-logo.png')

        const totalPrice = po.meqs_supplier.meqs_supplier_items.reduce((acc, item) => acc + (item.price * Number(item.canvass_item.quantity)), 0);

        const approvers = await Promise.all(po.po_approvers.map(async (i) => {
            // @ts-ignore
            i.approver = await this.getEmployee(i.approver_id, this.authUser);
            return i;
        }));

        const generalManager = approvers.pop()

        let requisitioner, classification_id, refType, refNumber, refDate, rc_number

        if(po.meqs_supplier.meqs.rv) {
            requisitioner = await this.getEmployee(po.meqs_supplier.meqs.rv.canvass.requested_by_id, this.authUser)
            classification_id = po.meqs_supplier.meqs.rv.classification_id
            refType = 'RV'
            refNumber = po.meqs_supplier.meqs.rv.rv_number
            refDate = po.meqs_supplier.meqs.rv.date_requested
            rc_number = po.meqs_supplier.meqs.rv.canvass.rc_number
        } else if(po.meqs_supplier.meqs.spr) {
            requisitioner = await this.getEmployee(po.meqs_supplier.meqs.spr.canvass.requested_by_id, this.authUser)
            classification_id = po.meqs_supplier.meqs.spr.classification_id
            refType = 'SPR'
            refNumber = po.meqs_supplier.meqs.spr.spr_number
            refDate = po.meqs_supplier.meqs.spr.date_requested
            rc_number = po.meqs_supplier.meqs.spr.canvass.rc_number
        } else {
            requisitioner = await this.getEmployee(po.meqs_supplier.meqs.jo.canvass.requested_by_id, this.authUser)
            classification_id = po.meqs_supplier.meqs.jo.classification_id
            refType = 'JO'
            refNumber = po.meqs_supplier.meqs.jo.jo_number
            refDate = po.meqs_supplier.meqs.jo.date_requested
            rc_number = po.meqs_supplier.meqs.jo.canvass.rc_number
        }

        const classification = await this.getClassification(classification_id, this.authUser)
        const fundSource = await this.getFundSource(po.fund_source_id, this.authUser)

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

            <div style="flex-grow: 1; min-height: 65vh;">
        
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
                        <div style="font-size: 11pt; font-weight: bold;">PURCHASE ORDER</div>
                    </div>
                </div>

                <div style="display: flex; justify-content: end;">
                    <table style="font-size: 10pt;">
                        <tr>
                            <td> PO No.: </td>
                            <td style="border-bottom: 1px solid black;"> ${ po.po_number } </td>
                        </tr>
                        <tr>
                            <td> Date: </td>
                            <td style="border-bottom: 1px solid black;"> ${ formatDate(po.po_date) } </td>
                        </tr>
                    </table>
                </div>

                <table border="1" style="width: 100%; font-size: 10pt; border-collapse: collapse; border-color: black; margin-top: 10px;">
                    <tr>
                        <td rowspan="4" style="width: 50%; vertical-align: top;">
                            <div style="display: flex; justify-content: space-between; padding-left: 10px; padding-right: 10px;">
                                <div> Supplier: </div>
                            </div>

                            <div style="text-align: center;">
                                <div style="font-size: 12pt; font-weight: bold;">
                                    ${ po.meqs_supplier.supplier.name.toUpperCase() }
                                </div>
                                <div>
                                    ${ po.meqs_supplier.supplier.address.toUpperCase() }
                                </div>
                                <div>
                                    TIN: ${ po.meqs_supplier.supplier.tin_no.trim() !== '' ? po.meqs_supplier.supplier.tin_no : 'N/A' }
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="font-size: 10pt; width: 100%;">
                                <tr>
                                    <td style="width: 50%;"> RR No.: </td>
                                    <td> Date: </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="font-size: 10pt; width: 100%;">
                                <tr>
                                    <td style="width: 50%;"> ${refType} No.: ${ refNumber } </td>
                                    <td> Date: ${ formatDate(refDate) } </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="font-size: 10pt; width: 100%;">
                                <tr>
                                    <td rowspan="3" style="width: 40%;">
                                        <div> Terms of Payment: </div>
                                        <div> ${ po.meqs_supplier.payment_terms } </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        VAT INC:
                                    </td>
                                    <td>
                                        <input type="checkbox" style="transform: scale(1.5);"/>
                                    </td>
                                    <td>
                                        Non VAT: 
                                    </td>
                                    <td>
                                        <input type="checkbox" style="transform: scale(1.5);"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        VAT EXC: 
                                    </td>
                                    <td>
                                        <input type="checkbox" style="transform: scale(1.5);"/>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 5px;"> Purpose: This is a temporary purpose </td>
                        <td style="padding: 5px;">
                            Requisitioner: ${ requisitioner.firstname + ' ' + requisitioner.lastname } 
                        </td>
                    </tr>
                </table>

                <br />

                <div>
                    <i>Please furnish the following articles subject to all terms and conditions stated herein and in accordance with your
                    quotation. </i> 
                </div>  

                <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 10pt;">
                    <thead>
                        <th style="border: 1px solid black;"> NO. </th>
                        <th style="border: 1px solid black;"> DESCRIPTION </th>
                        <th style="border: 1px solid black;"> UNIT </th>
                        <th style="border: 1px solid black;"> VAT </th>
                        <th style="border: 1px solid black;"> QTY. </th>
                        <th style="border: 1px solid black;"> UNIT PRICE </th>
                        <th style="border: 1px solid black;"> TOTAL PRICE </th>
                    </thead>
                    <tbody>
                        ${po.meqs_supplier.meqs_supplier_items.map((item, index) => `
                        <tr style="border: 1px solid black;">
                            <td align="center">${index + 1}</td>
                            <td>${item.canvass_item.description}</td>
                            <td align="center">${item.canvass_item.unit ? item.canvass_item.unit.name : 'N/A'}</td>
                            <td align="center">${ VAT[item.vat_type].label }</td>
                            <td align="center">${item.canvass_item.quantity}</td>
                            <td align="center">${formatToPhpCurrency(item.price)}</td>
                            <td align="center">${formatToPhpCurrency(item.price * Number(item.canvass_item.quantity))}</td>
                        </tr>
                    `).join('')}

                        <tr style="border: 1px solid black;">
                            <th colspan="5"></th>
                            <th style="text-align: center;">TOTAL:</th>
                            <td align="center"><b> ${ formatToPhpCurrency(totalPrice) } </b> </td>
                        </tr>

                    </tbody>
                </table>
                
                <div style="text-align: center; padding-top: 10px;">
                    X------------------------NOTHING FOLLOWS------------------------X
                </div>

                <br />

                <table style="font-size: 10pt;">
                    <tr>
                        <td> Classification: </td>
                        <td> <b>${ classification.name }</b> </td>
                    </tr>
                    <tr>
                        <td> Fund Source: </td>
                        <td> <b>${ fundSource.name }</b> </td>
                    </tr>
                </table>

            </div>


            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 70px; min-height: 20vh;">

                <div style="display: flex; justify-content: center;">

                    ${approvers.map((item, index) => `
                        
                        <div style="padding: 10px;">
                            <table border="0" style="width: 220px; font-size: 11pt;">
                                <tr>
                                    <td style="font-size: 10pt;"> ${ item.label }: </td>
                                </tr>
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
                                        ${
                                            // @ts-ignore 
                                            item.approver.position.name
                                        }
                                    </td>
                                </tr>
                                ${
                                    // @ts-ignore
                                    item.approver.is_budget_officer ? `<tr style="font-size: 9pt;"> <td> Classification: ${ classification.name }  </td> </tr>` : '<tr><td></td></tr>'
                                }
                                ${
                                    // @ts-ignore
                                    item.approver.is_finance_manager ? `<tr style="font-size: 9pt;"> <td> Fund Available: ${ fundSource.name }  </td> </tr>` : '<tr><td></td></tr>'
                                }
                            
                            </table>
                        </div>

                    `).join('')}
            
                </div>

                <br />

                <table border="1" style="border-collapse: collapse; border-color: black; width: 100%; font-size: 10pt;">
                    <tr>
                        <td style="padding: 5px;"> <b> DELIVERY DATE:</b> </td>
                        <td style="padding: 5px;"> <b> SHIPPING INSTRUCTION </b> </td>
                    </tr>
                    <tr>
                    <td style="text-align: center; padding: 10px; width: 50%">
                            <div>
                                ORDER ISSUED AND AUTHORIZED:
                            </div>
                            <div style="text-align: right; margin-right: 20px;">
                                ${ formatDate(generalManager.date_approval, true) }
                            </div>
                            <br />
                            <div style="text-align: center; position: relative; font-size: 11pt">
                                <u style="position: relative; z-index: 1; margin-bottom: 10px;"> 
                                    <b>
                                    ${
                                        // @ts-ignore
                                        generalManager.approver.firstname + ' ' + generalManager.approver.lastname
                                    }
                                    </b>
                                </u>
                                <img style="width: 100px; height: 100px; position: absolute; top: -50px; left: 50%; transform: translateX(-50%); z-index: 2;" src="${
                                    // @ts-ignore
                                    this.getUploadsPath(generalManager.approver.signature_src)
                                }" />
                            </div>
                            <div>
                                        ${
                                            // @ts-ignore 
                                            generalManager.approver.position.name
                                        }
                            </div>
                    </td> 
                    <td style="text-align: center; padding: 10px; width: 50%">
                            <div>
                                ORDER ISSUED AND AUTHORIZED:
                            </div>
                            <div style="text-align: center; font-size: 11pt;">
                                <b> ${ po.meqs_supplier.supplier.name } </b>
                            </div>
                            <br />
                            <div style="font-size: 11pt;">
                            By: <b>____________________________________ </b>
                            </div>
                            <div>
                                Manager/Representative
                            </div>
                    </td> 
                    </tr>
                </table>

                <div style="font-size: 8pt; margin-top: 10px;"> 
                    RC No.: ${rc_number} &nbsp;&nbsp;&nbsp;&nbsp; 
                    MEQS No.: ${ po.meqs_supplier.meqs.meqs_number } 
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
                    Note: System generated report | Created by: <b>${ po.created_by }</b> | Printed by: <b>${this.authUser.user.username}</b> | 
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
                    is_budget_officer
                    is_finance_manager
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

    private async getFundSource(fundSourceId: string, authUser: AuthUser) {


        const query = `
            query {
                account(id: "${ fundSourceId }") {
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
            console.log('data.data.account', data.data.account)

            if (!data || !data.data) {
                console.log('No data returned');
                return undefined;
            }

            return data.data.account;

        } catch (error) {
            console.error('Error getting fund source:', error.message);
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

    async findPo(id: string) {
        const item = await this.prisma.pO.findUnique({
            include: {
                meqs_supplier: {
                    include: {
                        meqs: {
                            include: {
                                rv: {
                                    include: {
                                        canvass: true
                                    }
                                },
                                spr: {
                                    include: {
                                        canvass: true
                                    }
                                },
                                jo: {
                                    include: {
                                        canvass: true
                                    }
                                }
                            }
                        },
                        supplier: true,
                        meqs_supplier_items: {
                            include: {
                                canvass_item: {
                                    include: {
                                        unit: true,
                                        brand: true,
                                        item: true
                                    }
                                }
                            }
                        }
                    }
                },
                po_approvers: {
                    where: {
                        deleted_at: null,
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            where: { id }
        })

        if (!item) {
            throw new NotFoundException('PO not found')
        }

        return item
    }

}
