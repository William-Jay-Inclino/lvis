// pdf.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate, formatToPhpCurrency } from '../__common__/helpers';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';
import { MEQS } from './entities/meq.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { CanvassItem } from '../canvass-item/entities/canvass-item.entity';

@Injectable()
export class MeqsPdfService {

    private authUser: AuthUser

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

        let purpose, refNumber, refType, requested_by_id, canvassItems: CanvassItem[]

        if(meqs.rv) {
            purpose = meqs.rv.canvass.purpose
            requested_by_id = meqs.rv.canvass.requested_by_id
            refNumber = meqs.rv.rv_number
            refType = 'RV'
            canvassItems = meqs.rv.canvass.canvass_items
        } else if(meqs.spr) {
            purpose = meqs.spr.canvass.purpose
            requested_by_id = meqs.spr.canvass.requested_by_id
            refNumber = meqs.spr.spr_number
            refType = 'SPR'
            canvassItems = meqs.spr.canvass.canvass_items
        } else {
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

        <div style="display: flex; flex-direction: column;">

            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; flex-grow: 1; min-height: 70vh;">
        
                <div style="text-align: center; margin-top: 35px">
        
                    <h1 style="font-size: 11pt; font-weight: bold;">LEYTE V ELECTRIC COOPERATIVE, INC.</h1>
        
                    <div style="font-size: 9pt">
                        <span>Brgy. San Pablo, Ormoc City, Leyte</span>
                        <br />
                        <span>VAT REG. TIN 001-383-331-000</span>
                    </div>
        
                    <br />
                    <br />
        
                    <h2 style="font-size: 11pt; font-weight: bold;">MATERIALS / EQUIPMENT QUOTATION SUMMARY</h1>
        
        
                </div>

                <br />

                <div style="display: flex; justify-content: space-between;">

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td>Requisitioner: </td>
                                <td>
                                    ${
                                        // @ts-ignore
                                        requisitioner.firstname + ' ' + requisitioner.lastname
                                    } 
                                </td>
                            </tr>
                            <tr>
                                <td>Purpose:</td>
                                <td> ${ purpose } </td>
                            </tr>
                            <tr>
                                <td>Remarks:</td>
                                <td> ${ meqs.notes } </td>
                            </tr>    
                        </table>
                    </div>

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td>Date Prepared: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${formatDate(meqs.meqs_date)}
                                </td>
                            </tr>
                            <tr>
                                <td> MEQS No.: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${meqs.meqs_number}
                                </td>
                            </tr>   
                            <tr>
                                <td> ${ refType + ' No.:' } </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${ refNumber }
                                </td>
                            </tr>  
                        </table>
                    </div>
                
                </div>

                <br />

                <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">
                    <caption style="text-align: left;"> Note: The underlined price in the 'Supplier' column indicates the awarded supplier </caption>
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
                                            return `<td align="center" style="border-bottom: 1px dashed black"><b>${formatToPhpCurrency(supplierItem.price)}</b></td>`;
                                        }else {
                                            return `<td align="center">${formatToPhpCurrency(supplierItem.price)}</td>`;
                                        }

                                    }
                                }
                                return `<td align="center"></td>`; // Default empty <td> if no match found
                            }).join('');
                    
                            return `
                            <tr>
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
        
            </div>
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 50px; min-height: 20vh;">
                
                <div style="text-align: center;"> COOP PROCUREMENT COMMITTEE: </div>

                <br />

                <div style="display: flex; justify-content: center;">
                
                    ${approvers.map((item, index) => `
                        
                        <div style="padding: 10px; margin-right: 30px;">
                            <table border="0" style="width: 100%">
                                <tr>
                                    <td style="text-align: center; font-size: 10pt;"> 
                                        ${ item.date_approval ? formatDate(item.date_approval) : '&nbsp;' } 
                                    </td>
                                </tr>
                                <tr>
                                    <th style="text-align: center">
                                        <u>
                                        ${
                                            // @ts-ignore
                                            item.approver.firstname + ' ' + item.approver.lastname
                                        }
                                        </u>
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
        
        
        

            <div style="display: flex; justify-content: space-between; font-size: 9pt">
                <div>
                    Note: This is a system generated report
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

    async findMeqs(id: string) {
        const item = await this.prisma.mEQS.findUnique({
            include: {
                rv: {
                    include: {
                        canvass: {
                            include: {
                                canvass_items: {
                                    include: {
                                        brand: true,
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
                                        brand: true,
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
                                        brand: true,
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
                                        brand: true,
                                        unit: true
                                    }
                                }
                            }
                        }
                    }
                },
                meqs_approvers: {
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            where: { id }
        })

        if (!item) {
            throw new NotFoundException('MEQS not found')
        }

        return item
    }

}
