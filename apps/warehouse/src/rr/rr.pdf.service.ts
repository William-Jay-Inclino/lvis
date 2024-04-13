// pdf.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate, formatToPhpCurrency } from '../__common__/helpers';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';
import { RR } from './entities/rr.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { CanvassItem } from '../canvass-item/entities/canvass-item.entity';

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

        // const approvers = await Promise.all(meqs.meqs_approvers.map(async (i) => {
        //     // @ts-ignore
        //     i.approver = await this.getEmployee(i.approver_id, this.authUser);
        //     return i;
        // }));

        // const requisitioner = await this.getEmployee(requested_by_id, this.authUser)

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
                                    <td style="width: 50%;"> PO No.: </td>
                                    <td> Date: </td>
                                </tr>
                            </table>
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
                                    <td style="width: 50%;"> Invoice No.: </td>
                                    <td> Date: </td>
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

        
            </div>
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 50px; min-height: 20vh;">
                

                    
            
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

}
