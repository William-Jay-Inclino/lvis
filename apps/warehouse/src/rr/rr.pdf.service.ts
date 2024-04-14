// pdf.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate, formatToPhpCurrency, getVatAmount } from '../__common__/helpers';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';
import { RR } from './entities/rr.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { CanvassItem } from '../canvass-item/entities/canvass-item.entity';
import { VAT_TYPE } from '../__common__/types';
import { RrItem } from '../rr-item/entities/rr-item.entity';

@Injectable()
export class RrPdfService {

    private authUser: AuthUser

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

        const totalCost = rr.rr_items.reduce((acc, item) => acc + (item.meqs_supplier_item.price * item.quantity_accepted), 0);
        const totalUnitCost = rr.rr_items.reduce((acc, item) => acc + (item.meqs_supplier_item.price), 0);
        const totalVat = rr.rr_items.reduce((acc, item) => acc + (getVatAmount(item.meqs_supplier_item.price, item.meqs_supplier_item.vat_type)), 0);
        const { totalVatInc, totalVatExc } = this.getTotalVat(rr.rr_items)

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

        let refType, refNumber, refDate

        if(rr.po.meqs_supplier.meqs.rv) {
            refType = 'RV'
            refNumber = rr.po.meqs_supplier.meqs.rv.rv_number
            refDate = rr.po.meqs_supplier.meqs.rv.date_requested
        } else if(rr.po.meqs_supplier.meqs.spr) {
            refType = 'SPR'
            refNumber = rr.po.meqs_supplier.meqs.spr.spr_number
            refDate = rr.po.meqs_supplier.meqs.spr.date_requested
        } else {
            refType = 'JO'
            refNumber = rr.po.meqs_supplier.meqs.jo.jo_number
            refDate = rr.po.meqs_supplier.meqs.jo.date_requested
        }

        // Set content of the PDF
        const content = `

        <div style="display: flex; flex-direction: column;">

            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; flex-grow: 1; min-height: 70vh;">
        
                <div style="text-align: center; margin-top: 35px">
        
                    <div style="font-size: 11pt; font-weight: bold;">LEYTE V ELECTRIC COOPERATIVE, INC.</div>
        
                    <div style="font-size: 9pt">
                        <span>Brgy. San Pablo, Ormoc City, Leyte</span>
                        <br />
                        <span>VAT REG. TIN 001-383-331-000</span>
                    </div>
        
                    <br />
        
                    <div style="font-size: 14pt; font-weight: bold;"> RECEIVING REPORT </div>

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

                            <div style="text-align: center;">
                                <div style="font-size: 11pt; font-weight: bold;">
                                    ${ rr.po.meqs_supplier.supplier.name.toUpperCase() }
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
                                    <td style="width: 50%;"> PO No.: ${ rr.po.po_number } </td>
                                    <td> Date: ${ formatDate(rr.po.po_date) } </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="font-size: 10pt; width: 100%;">
                                <tr>
                                    <td style="width: 50%;"> ${refType} No.: ${ refNumber } </td>
                                    <td> Date: ${ formatDate(refDate) }</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="font-size: 10pt; width: 100%;">
                                <tr>
                                    <td style="width: 50%;"> Invoice No.: ${ rr.invoice_number }</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding: 5px;">
                            Delivery Report: ${ rr.notes }
                        </td>
                    </tr>
                </table>

                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;" border="1">
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
                        <tr>
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
                        <tr>
                            <td align="center">${ item.meqs_supplier_item.canvass_item.item ? item.meqs_supplier_item.canvass_item.item.code : 'N/A' }</td>
                            <td>${item.meqs_supplier_item.canvass_item.description}</td>
                            <td align="center">${item.meqs_supplier_item.canvass_item.unit ? item.meqs_supplier_item.canvass_item.unit.name : 'N/A'}</td>
                            <td align="center">${ item.meqs_supplier_item.canvass_item.quantity }</td>
                            <td align="center">${ item.quantity_accepted }</td>
                            <td align="center">${formatToPhpCurrency(item.meqs_supplier_item.price)}</td>
                            <td align="center"> 
                                ${ item.meqs_supplier_item.vat_type === VAT_TYPE.NONE ? 
                                    formatToPhpCurrency(item.meqs_supplier_item.price - getVatAmount(item.meqs_supplier_item.price, item.meqs_supplier_item.vat_type)) 
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
                                    formatToPhpCurrency(item.meqs_supplier_item.price - getVatAmount(item.meqs_supplier_item.price, item.meqs_supplier_item.vat_type)) 
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
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 50px; min-height: 20vh;">
                
                <div style="display: flex; justify-content: center;">
                    
                     ${rrApprovers.map((item, index) => `
                    
                     <div style="padding: 10px; margin-right: 70px;">
                        <table font-size: 11pt;">
                            <tr>
                                <td style="font-size: 10pt; text-align: left;"> ${ item.label }: </td>
                            </tr>
                            <tr>
                                <td style="font-size: 10pt; text-align: left;"> 
                                    ${ item.date_approval ? formatDate(item.date_approval) : '&nbsp;' } 
                                </td>
                            </tr>
                            <tr>
                                <th style="text-align: center; padding-top: 20px; border-bottom: 1px solid black">
                                    ${
                                        // @ts-ignore
                                        (item.approver.firstname + ' ' + item.approver.lastname)
                                    }
                                </th>
                            </tr>
                            <tr>
                                <td style="text-align: center">
                                    ${
                                        // @ts-ignore 
                                        item.approver.position || ''
                                    }
                                </td>
                            </tr>
                        
                        </table>
                    </div>
    
                    `).join('')}

                </div>
                    
            
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
        const pdfBuffer = await page.pdf({
            format: 'A4',
            landscape: true
        });

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
                totalVatInc += amount
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