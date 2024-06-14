// pdf.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate, formatToPhpCurrency, getImageAsBase64, getVatAmount } from '../__common__/helpers';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';
import { RR } from './entities/rr.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { VAT_TYPE } from '../__common__/types';
import { RrItem } from '../rr-item/entities/rr-item.entity';
import { UPLOADS_PATH } from '../__common__/config';

@Injectable()
export class RrPdfService {

    private authUser: AuthUser
    private API_FILE_ENDPOINT = process.env.API_URL + '/api/v1/file-upload'

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async generatePdf(rr: RR) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const watermark = getImageAsBase64('lvis-watermark-v2.png')
        const logo = getImageAsBase64('leyeco-logo.png')

        const totalCost = rr.rr_items.reduce((acc, item) => acc + (item.meqs_supplier_item.price * item.quantity_accepted), 0);
        const totalUnitCost = rr.rr_items.reduce((acc, item) => acc + (item.meqs_supplier_item.price), 0);
        const totalVat = rr.rr_items.reduce((acc, item) => acc + (getVatAmount(item.meqs_supplier_item.price, item.meqs_supplier_item.vat_type)), 0);
        const { totalVatInc, totalVatExc } = this.getTotalVat(rr.rr_items)

        let requested_by_id, purpose, classification_id

        if(rr.po.meqs_supplier.meqs.rv) {
            requested_by_id = rr.po.meqs_supplier.meqs.rv.canvass.requested_by_id
            purpose = rr.po.meqs_supplier.meqs.rv.canvass.purpose
            classification_id = rr.po.meqs_supplier.meqs.rv.classification_id
        } else if(rr.po.meqs_supplier.meqs.spr) {
            requested_by_id = rr.po.meqs_supplier.meqs.spr.canvass.requested_by_id
            purpose = rr.po.meqs_supplier.meqs.spr.canvass.purpose
            classification_id = rr.po.meqs_supplier.meqs.spr.classification_id
        } else {
            classification_id = rr.po.meqs_supplier.meqs.jo.classification_id
            requested_by_id = rr.po.meqs_supplier.meqs.jo.canvass.requested_by_id
            purpose = rr.po.meqs_supplier.meqs.jo.canvass.purpose
        }

        const requisitioner = await this.getEmployee(requested_by_id, this.authUser)

        const poApprovers = await Promise.all(rr.po.po_approvers.map(async (i) => {
            // @ts-ignore
            i.approver = await this.getEmployee(i.approver_id, this.authUser);
            return i;
        }));

        const rrApprovers = await Promise.all(rr.rr_approvers.map(async (i) => {
            // @ts-ignore
            i.approver = await this.getEmployee(i.approver_id, this.authUser);
            return i;
        }));

        let refType, refNumber, refDate, rc_number

        if(rr.po.meqs_supplier.meqs.rv) {
            refType = 'RV'
            refNumber = rr.po.meqs_supplier.meqs.rv.rv_number
            refDate = rr.po.meqs_supplier.meqs.rv.date_requested
            rc_number = rr.po.meqs_supplier.meqs.rv.canvass.rc_number
        } else if(rr.po.meqs_supplier.meqs.spr) {
            refType = 'SPR'
            refNumber = rr.po.meqs_supplier.meqs.spr.spr_number
            refDate = rr.po.meqs_supplier.meqs.spr.date_requested
            rc_number = rr.po.meqs_supplier.meqs.spr.canvass.rc_number
        } else {
            refType = 'JO'
            refNumber = rr.po.meqs_supplier.meqs.jo.jo_number
            refDate = rr.po.meqs_supplier.meqs.jo.date_requested
            rc_number = rr.po.meqs_supplier.meqs.jo.canvass.rc_number
        }

        const classification = await this.getClassification(classification_id, this.authUser)
        const fundSource = await this.getFundSource(rr.po.fund_source_id, this.authUser)

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

            <div style="flex-grow: 1; min-height: 58vh;">
        
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
                        <div style="font-size: 11pt; font-weight: bold;">RECEIVING REPORT</div>
                    </div>
                </div>

                <div style="display: flex; justify-content: end;">
                    <table style="font-size: 10pt;">
                        <tr>
                            <td> RR No.: </td>
                            <td style="border-bottom: 1px solid black;"> ${ rr.rr_number } </td>
                        </tr>
                        <tr>
                            <td> Date: </td>
                            <td style="border-bottom: 1px solid black;"> ${ formatDate(rr.rr_date) } </td>
                        </tr>
                    </table>
                </div>

                <table border="1" style="width: 100%; font-size: 10pt; border-collapse: collapse; border-color: black; margin-top: 10px;">
                    <tr>
                        <td rowspan="5" style="width: 50%; vertical-align: top;">
                            <div style="display: flex; justify-content: space-between; padding-left: 10px; padding-right: 10px;">
                                <div> Supplier: </div>
                            </div>

                            <div style="text-align: center;">
                                <div style="font-size: 12pt; font-weight: bold;">
                                    ${ rr.po.meqs_supplier.supplier.name.toUpperCase() }
                                </div>
                                <div>
                                    ${ rr.po.meqs_supplier.supplier.address.toUpperCase() }
                                </div>
                                <div>
                                    TIN: ${ rr.po.meqs_supplier.supplier.tin_no.trim() !== '' ? rr.po.meqs_supplier.supplier.tin_no : 'N/A' }
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td> Purpose: ${ purpose }</td>
                    </tr>
                    <tr>
                        <td> Requisitioner: ${ requisitioner.firstname + ' ' + requisitioner.lastname }</td>
                    </tr>
                    <tr>
                        <td> Invoice No.: ${ rr.invoice_number }</td>
                    </tr>
                    <tr>
                        <td> Delivery Report: ${ rr.notes } </td>
                    </tr>
                </table>

                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead style="font-size: 10pt;">
                        <tr>
                            <th style="border: 1px solid black;"> Code </th>
                            <th style="border: 1px solid black;"> Description </th>
                            <th style="border: 1px solid black;"> Unit </th>
                            <th colspan="2" style="border: 1px solid black;"> Qty </th>
                            <th style="border: 1px solid black;"> Unit Cost </th>
                            <th colspan="4" style="border: 1px solid black; text-align: center;"> Gross Amount </th>
                            <th style="border: 1px solid black;"> Total Cost </th>
                        </tr>
                        <tr style="border: 1px solid black;">
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Request</th>
                            <th>Accept</th>
                            <th></th>
                            <th>None VAT</th>
                            <th>VAT Inc</th>
                            <th>VAT Exc</th>
                            <th>12% VAT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody style="font-size: 9pt;">

                        ${rr.rr_items.map((item, index) => `
                        <tr style="border: 1px solid black;">
                            <td align="center">${ item.meqs_supplier_item.canvass_item.item ? item.meqs_supplier_item.canvass_item.item.code : 'N/A' }</td>
                            <td>${item.meqs_supplier_item.canvass_item.description}</td>
                            <td align="center">${item.meqs_supplier_item.canvass_item.unit ? item.meqs_supplier_item.canvass_item.unit.name : 'N/A'}</td>
                            <td align="center">${ item.meqs_supplier_item.canvass_item.quantity }</td>
                            <td align="center">${ item.quantity_accepted }</td>
                            <td align="center">${formatToPhpCurrency(item.meqs_supplier_item.price)}</td>
                            <td align="center"> 
                                ${ item.meqs_supplier_item.vat_type === VAT_TYPE.NONE || item.meqs_supplier_item.vat_type === VAT_TYPE.EXEMPT ? 
                                    formatToPhpCurrency(item.meqs_supplier_item.price) 
                                    : '0.00'
                                } 
                            </td>
                            <td align="center"> 
                                ${ item.meqs_supplier_item.vat_type === VAT_TYPE.INC ? 
                                    formatToPhpCurrency(item.meqs_supplier_item.price - getVatAmount(item.meqs_supplier_item.price, item.meqs_supplier_item.vat_type)) 
                                    : '0.00'
                                } 
                            </td>
                            <td align="center"> 
                                ${ item.meqs_supplier_item.vat_type === VAT_TYPE.EXC ? 
                                    formatToPhpCurrency(item.meqs_supplier_item.price + getVatAmount(item.meqs_supplier_item.price, item.meqs_supplier_item.vat_type)) 
                                    : '0.00'
                                } 
                            </td>
                            <td align="center">
                                ${ formatToPhpCurrency(getVatAmount(item.meqs_supplier_item.price, item.meqs_supplier_item.vat_type)) }
                            </td>
                            <td align="center">
                                ${ formatToPhpCurrency(item.meqs_supplier_item.price * item.quantity_accepted) }
                            </td>
                        </tr>
                    `).join('')}

                        <tr style="border: none;">
                            <td style="text-align: right;" colspan="5"><b>TOTAL:</b></td>
                            <td align="center"><b> ${ formatToPhpCurrency(totalUnitCost) } </b> </td>
                            <td align="center"><b> ${ formatToPhpCurrency(0) } </b> </td>
                            <td align="center"><b> ${ formatToPhpCurrency(totalVatInc) } </b> </td>
                            <td align="center"><b> ${ formatToPhpCurrency(totalVatExc) } </b> </td>
                            <td align="center"><b> ${ formatToPhpCurrency(totalVat) } </b> </td>
                            <td align="center"><b> ${ formatToPhpCurrency(totalCost) } </b> </td>
                        </tr>

                        <tr style="border: none;">
                            <td colspan="10" style="text-align: right"><b>Delivery Charge</b></td>
                            <td align="center"><b> ${ formatToPhpCurrency(rr.delivery_charge) } </b></td>
                        </tr>

                        <tr style="border: none;">
                            <td colspan="10" style="text-align: right;"><b>Total</b></td>
                            <td align="center"><b> ${ formatToPhpCurrency(totalCost - rr.delivery_charge) } </b></td>
                        </tr>

                    </tbody>
                    
                </table>

        
            </div>
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 50px; min-height: 35vh;">
                
                <div style="display: flex; justify-content: center;">
                        
                        ${poApprovers.map((item, index) => `

                            ${  
                                // @ts-ignore 
                                item.approver.is_budget_officer || item.approver.is_finance_manager ? `
                                    <div style="padding: 10px;">
                                        <table border="0" style="font-size: 11pt; width: 400px;">
                                            <tr>
                                                <td style="font-size: 10pt; text-align: left; white-space: nowrap;"> ${ item.label }: </td>
                                                ${ 
                                                    // @ts-ignore 
                                                    item.approver.is_budget_officer ? `<td> Classification: ${ classification.name } </td>` : '<td></td>'
                                                }
                                                ${ 
                                                    // @ts-ignore 
                                                    item.approver.is_finance_manager ? `<td> Fund Available: ${ fundSource.name } </td>` : '<td></td>'
                                                }
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="font-size: 10pt; text-align: left; white-space: nowrap;"> 
                                                    ${ item.date_approval ? formatDate(item.date_approval, true) : '&nbsp;' } 
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style="text-align: center; position: relative; white-space: nowrap;">
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
                                                <th></th>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center;  white-space: nowrap;">
                                                    ${
                                                        // @ts-ignore 
                                                        item.approver.position.name
                                                    }
                                                </td>
                                                <td></td>
                                            </tr>
                                        
                                        </table>
                                    </div>
                                `
                                : ''
                            }


                    `).join('')}

                </div>

                <div style="display: flex; justify-content: center;">
                    
                     ${rrApprovers.map((item, index) => `
                    
                     <div style="padding: 10px;">
                        <table border="0" style="font-size: 11pt; width: 210px;">
                            <tr>
                                <td style="font-size: 10pt; text-align: left;"> ${ item.label }: </td>
                            </tr>
                            <tr>
                                <td style="font-size: 10pt; text-align: left;"> 
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
                        
                        </table>
                    </div>
    
                    `).join('')}

                </div>

                <div style="font-size: 8pt; margin-top: 10px;"> 
                    <div> PO No.: ${ rr.po.po_number } &nbsp;&nbsp;&nbsp;&nbsp; MEQS No.: ${ rr.po.meqs_supplier.meqs.meqs_number }  </div>
                    <div> ${ refType } No.: ${ refNumber } &nbsp;&nbsp;&nbsp;&nbsp; RC No.: ${ rc_number }  </div>
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
                    Note: System generated report | Created by: <b>${ rr.created_by }</b> | Printed by: <b>${this.authUser.user.username}</b> | 
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

    async findRr(id: string) {
        const item = await this.prisma.rR.findUnique({
            include: {
                po: {
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
                                attachments: true,
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
                            orderBy: {
                                order: 'asc'
                            }
                        }
                    }
                },
                rr_items: {
                    include: {
                        meqs_supplier_item: {
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
                rr_approvers: {
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            where: { id }
        })

        if (!item) {
            throw new NotFoundException('RR not found')
        }

        return item
    }

    private getTotalVat(rrItems: RrItem[]): { totalVatInc: number, totalVatExc: number } {

        let totalVatInc = 0 
        let totalVatExc = 0 

        for(let item of rrItems) {

            const vatAmount = getVatAmount(item.meqs_supplier_item.price, item.meqs_supplier_item.vat_type)
            const amount = item.meqs_supplier_item.price - vatAmount

            if(item.meqs_supplier_item.vat_type === VAT_TYPE.INC) {
                totalVatInc -= amount
                continue
            }

            if(item.meqs_supplier_item.vat_type === VAT_TYPE.EXC) {
                totalVatExc += amount
                continue
            }

        }

        return {
            totalVatInc,
            totalVatExc
        }

    }

    private getUploadsPath(src: string) {

        if(!src || src.trim() === '') return 

        const path = src.replace(UPLOADS_PATH, '')
        console.log('PATH', path)
    
        const uploadsPath = this.API_FILE_ENDPOINT + path
        return uploadsPath
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


}




// use for displaying budget officer and finance manager from po. For confirmation if needed to display

// <div style="display: flex; justify-content: center;">
// ${poApprovers.map((item, index) => `

// ${
//     // @ts-ignore
//     !!item.approver.is_budget_officer ? `
//     <div style="padding: 10px; margin-right: 30px;">
//         <table font-size: 11pt;">
//             <tr>
//                 <td style="font-size: 10pt;"> ${ item.label }: </td>
//             </tr>
//             <tr>
//                 <td style="font-size: 10pt;"> 
//                     ${ item.date_approval ? formatDate(item.date_approval) : '&nbsp;' } 
//                 </td>
//             </tr>
//             <tr>
//                 <th style="text-align: center; padding-top: 20px;">
//                     <u>
//                     ${
//                         // @ts-ignore
//                         (item.approver.firstname + ' ' + item.approver.lastname)
//                     }
//                     </u>
//                 </th>
//             </tr>
//             <tr>
//                 <td style="text-align: center">
//                     ${
//                         // @ts-ignore 
//                         item.approver.position
//                     }
//                 </td>
//             </tr>
        
//         </table>
//     </div>
// ` : ''}


// ${
//     // @ts-ignore
//     !!item.approver.is_finance_manager ? `
//     <div style="padding: 10px; margin-right: 30px;">
//         <table font-size: 11pt;">
//             <tr>
//                 <td style="font-size: 10pt;"> ${ item.label }: </td>
//             </tr>
//             <tr>
//                 <td style="font-size: 10pt;"> 
//                     ${ item.date_approval ? formatDate(item.date_approval) : '&nbsp;' } 
//                 </td>
//             </tr>
//             <tr>
//                 <th style="text-align: center; padding-top: 20px;">
//                     <u>
//                     ${
//                         // @ts-ignore
//                         (item.approver.firstname + ' ' + item.approver.lastname)
//                     }
//                     </u>
//                 </th>
//             </tr>
//             <tr>
//                 <td style="text-align: center">
//                     ${
//                         // @ts-ignore 
//                         item.approver.position
//                     }
//                 </td>
//             </tr>
        
//         </table>
//     </div>
// ` : ''}
            

// `).join('')}
// </div>