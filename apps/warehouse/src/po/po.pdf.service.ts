// pdf.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate, formatToPhpCurrency } from '../__common__/helpers';
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

@Injectable()
export class PoPdfService {

    private authUser: AuthUser

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

        const totalPrice = po.meqs_supplier.meqs_supplier_items.reduce((acc, item) => acc + (item.price * Number(item.canvass_item.quantity)), 0);

        const approvers = await Promise.all(po.po_approvers.map(async (i) => {
            // @ts-ignore
            i.approver = await this.getEmployee(i.approver_id, this.authUser);
            return i;
        }));

        const generalManager = approvers.pop()

        let requisitioner, classification_id, refType, refNumber, refDate

        if(po.meqs_supplier.meqs.rv) {
            requisitioner = await this.getEmployee(po.meqs_supplier.meqs.rv.canvass.requested_by_id, this.authUser)
            classification_id = po.meqs_supplier.meqs.rv.classification_id
            refType = 'RV'
            refNumber = po.meqs_supplier.meqs.rv.rv_number
            refDate = po.meqs_supplier.meqs.rv.date_requested
        } else if(po.meqs_supplier.meqs.spr) {
            requisitioner = await this.getEmployee(po.meqs_supplier.meqs.spr.canvass.requested_by_id, this.authUser)
            classification_id = po.meqs_supplier.meqs.spr.classification_id
            refType = 'SPR'
            refNumber = po.meqs_supplier.meqs.spr.spr_number
            refDate = po.meqs_supplier.meqs.spr.date_requested
        } else {
            requisitioner = await this.getEmployee(po.meqs_supplier.meqs.jo.canvass.requested_by_id, this.authUser)
            classification_id = po.meqs_supplier.meqs.jo.classification_id
            refType = 'JO'
            refNumber = po.meqs_supplier.meqs.jo.jo_number
            refDate = po.meqs_supplier.meqs.jo.date_requested
        }

        const classification = await this.getClassification(classification_id, this.authUser)
        const fundSource = await this.getFundSource(po.fund_source_id, this.authUser)

        // Set content of the PDF
        const content = `

        <div style="display: flex; flex-direction: column;">

            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; flex-grow: 1; min-height: 60vh;">
        
                <div style="text-align: center; margin-top: 35px">
        
                    <div style="font-size: 11pt; font-weight: bold;">LEYTE V ELECTRIC COOPERATIVE, INC.</div>
        
                    <div style="font-size: 9pt">
                        <span>Brgy. San Pablo, Ormoc City, Leyte</span>
                        <br />
                        <span>VAT REG. TIN 001-383-331-000</span>
                    </div>

                    <br />

                    <div style="font-size: 14pt; font-weight: bold;"> PURCHASE ORDER </div>

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

                </div>


                <table border="1" style="width: 100%; font-size: 10pt; border-collapse: collapse; border-color: black; margin-top: 10px;">
                    <tr>
                        <td rowspan="4" style="width: 50%; vertical-align: top;">
                            <div style="display: flex; justify-content: space-between; padding-left: 10px; padding-right: 10px;">
                                <div> Supplier: </div>
                                <div>
                                    Tin #: 209-609-185-00054
                                </div>
                            </div>

                            <br />

                            <div style="text-align: center;">
                                <div style="font-size: 11pt; font-weight: bold;">
                                    ${ po.meqs_supplier.supplier.name.toUpperCase() }
                                </div>
                                <div>
                                    REAL ST., ORMOC CITY
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
                                        <input type="checkbox" ${ po.meqs_supplier.supplier.vat_type === VAT_TYPE.INC ? 'checked' : '' } style="transform: scale(1.5);"/>
                                    </td>
                                    <td>
                                        Non VAT: 
                                    </td>
                                    <td>
                                        <input type="checkbox" ${ po.meqs_supplier.supplier.vat_type === VAT_TYPE.NONE ? 'checked' : '' } style="transform: scale(1.5);"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        VAT EXC: 
                                    </td>
                                    <td>
                                        <input type="checkbox" ${ po.meqs_supplier.supplier.vat_type === VAT_TYPE.EXC ? 'checked' : '' } style="transform: scale(1.5);"/>
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

                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;" border="1">
                    <thead style="font-size: 10pt;">
                        <th style="border: 1px solid black;"> NO. </th>
                        <th style="border: 1px solid black;"> DESCRIPTION </th>
                        <th style="border: 1px solid black;"> UNIT </th>
                        <th style="border: 1px solid black;"> VAT </th>
                        <th style="border: 1px solid black;"> QTY. </th>
                        <th style="border: 1px solid black;"> UNIT PRICE </th>
                        <th style="border: 1px solid black;"> TOTAL PRICE </th>
                    </thead>
                    <tbody style="font-size: 10pt;">
                        ${po.meqs_supplier.meqs_supplier_items.map((item, index) => `
                        <tr>
                            <td align="center">${index + 1}</td>
                            <td>${item.canvass_item.description}</td>
                            <td align="center">${item.canvass_item.unit ? item.canvass_item.unit.name : 'N/A'}</td>
                            <td align="center">${ VAT[item.vat_type].label }</td>
                            <td align="center">${item.canvass_item.quantity}</td>
                            <td align="center">${formatToPhpCurrency(item.price)}</td>
                            <td align="center">${formatToPhpCurrency(item.price * Number(item.canvass_item.quantity))}</td>
                        </tr>
                    `).join('')}

                        <tr>
                            <th colspan="5"></th>
                            <th style="text-align: center;">TOTAL:</th>
                            <td align="center"><b> ${ formatToPhpCurrency(totalPrice) } </b> </td>
                        </tr>

                    </tbody>
                </table>

            </div>


            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 50px; min-height: 32vh;">

                <div style="display: flex; justify-content: center;">

                    ${approvers.map((item, index) => `
                        
                        <div style="padding: 10px; margin-right: 30px;">
                            <table border="0" style="width: 100%; font-size: 11pt;">
                                <tr>
                                    <td style="font-size: 10pt;"> ${ item.label }: </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td style="font-size: 10pt;"> 
                                        ${ item.date_approval ? formatDate(item.date_approval) : '&nbsp;' } 
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th style="text-align: center">
                                        <u>
                                        ${
                                            // @ts-ignore
                                            (item.approver.firstname + ' ' + item.approver.lastname)
                                        }
                                        </u>
                                    </th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td style="text-align: center">
                                        ${
                                            // @ts-ignore 
                                            item.approver.position
                                        }
                                    </td>
                                </tr>

                                ${
                                    // @ts-ignore
                                    !!item.approver.is_budget_officer ? `
                                <tr>
                                    <td colspan="2" style="font-size: 10pt;">
                                        Classification: ${classification.name}
                                    </td>
                                </tr>
                            ` : ''}

                                ${
                                    // @ts-ignore
                                    !!item.approver.is_finance_manager ? `
                                <tr>
                                    <td colspan="2" style="font-size: 10pt;">
                                        Fund Source: ${fundSource.name}
                                    </td>
                                </tr>
                            ` : ''}
                            
                            </table>
                        </div>

                    `).join('')}
            
                </div>

                <br />
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
                            ${ formatDate(generalManager.date_approval) }
                        </div>
                        <br />
                        <div style="font-size: 11pt;">
                            By: <b><u>  
                                    ${
                                        // @ts-ignore 
                                        (generalManager.approver.firstname + ' ' + generalManager.approver.lastname)
                                    } 
                                </u></b>
                        </div>
                        <div>
                                    ${
                                        // @ts-ignore 
                                        generalManager.approver.position
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
                
            </div>
        
        
        

            <div style="display: flex; justify-content: space-between; font-size: 9pt">
                <div>
                    Note: This is a system generated report printed by ${ this.authUser.user.username }
                </div>
                <div>
                    Date & Time Generated: ${ moment(new Date()).format('MMMM D, YYYY - dddd h:mm:ss a') }
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
    
    private async getEmployee(employeeId: string, authUser: AuthUser): Promise<Employee | undefined> {


        const query = `
            query {
                employee(id: "${ employeeId }") {
                    id 
                    firstname 
                    middlename 
                    lastname
                    position
                    is_budget_officer
                    is_finance_manager
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
