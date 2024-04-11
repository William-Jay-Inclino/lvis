// pdf.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate } from '../__common__/helpers';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { JO } from './entities/jo.entity';

@Injectable()
export class JoPdfService {

    private authUser: AuthUser

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async generatePdf(jo: JO) {
        console.log('generatePdf()');
        console.log('jo', jo);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const approvers = await Promise.all(jo.jo_approvers.map(async (i) => {
            i.approver = await this.getEmployee(i.approver_id, this.authUser);
            return i;
        }));

        const department = await this.getDepartment(jo.department_id, this.authUser)
        const requisitioner = await this.getEmployee(jo.canvass.requested_by_id, this.authUser)

        // Set content of the PDF
        const content = `

        <div style="display: flex; flex-direction: column;">

            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; flex-grow: 1; min-height: 55vh;">
        
                <div style="text-align: center; margin-top: 35px">
        
                    <h1 style="font-size: 11pt; font-weight: bold;">LEYTE V ELECTRIC COOPERATIVE, INC.</h1>
        
                    <div style="font-size: 9pt">
                        <span>Brgy. San Pablo, Ormoc City, Leyte</span>
                        <br />
                        <span>VAT REG. TIN 001-383-331-000</span>
                    </div>
        
                    <br />
                    <br />
        
                    <h2 style="font-size: 11pt; font-weight: bold;">JOB ORDER REQUEST</h1>
        
        
                </div>

                <br />

                <div style="display: flex; justify-content: space-between;">

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td>Department: ${department.name}</td>
                            </tr>  
                            <tr>
                                <td>Equipment: ${jo.equipment}</td>
                            </tr>  
                            <tr>
                                <td>Purpose: ${jo.canvass.purpose.toUpperCase()}</td>
                            </tr>     
                            <tr>
                                <td>Listed below are the list of Item/s needed:</td>
                            </tr>
                        </table>
                    </div>

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td>Date: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${formatDate(jo.date_requested)}
                                </td>
                            </tr>
                            <tr>
                                <td> JO No.: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${jo.jo_number}
                                </td>
                            </tr>    
                            <tr>
                                <td> RC No.: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${jo.canvass.rc_number}
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
                        <tr>
                            <td align="center">${index + 1}</td>
                            <td align="center">${item.description}</td>
                            <td align="center">${item.unit ? item.unit.name : 'N/A'}</td>
                            <td align="center">${item.quantity}</td>
                        </tr>
                    `).join('')}
                    </tbody>
                </table>
        
            </div>
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 50px; min-height: 37vh; display: flex; justify-content: center;">

                <div style="display: flex; flex-wrap: wrap;">

                    <div style="padding: 10px; width: 40%">
                        <table border="0" style="width: 100%">
                            <tr>
                                <td style="text-align: center; font-size: 10pt;"> ${formatDate(jo.date_requested)} </td>
                            </tr>
                            <tr>
                                <th style="text-align: center;">
                                    <u>
                                    ${
                                        // @ts-ignore
                                        requisitioner.firstname + ' ' + requisitioner.lastname
                                    } 
                                    </u>
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
