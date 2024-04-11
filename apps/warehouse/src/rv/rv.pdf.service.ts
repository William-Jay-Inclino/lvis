// pdf.service.ts

import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate } from '../__common__/helpers';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';
import { RV } from './entities/rv.entity';

@Injectable()
export class RvPdfService {

    private authUser: AuthUser

    constructor(
        private readonly httpService: HttpService,
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async generatePdf(rv: RV) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // const requisitioner = await this.getEmployee(rv.canvass.requested_by_id, this.authUser)

        // Set content of the PDF
        const content = `

        <div style="display: flex; flex-direction: column;">

            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; flex-grow: 1; min-height: 60vh;">
        
                <div style="text-align: center; margin-top: 35px">
        
                    <h1 style="font-size: 11pt; font-weight: bold;">LEYTE V ELECTRIC COOPERATIVE, INC.</h1>
        
                    <div style="font-size: 9pt">
                        <span>Brgy. San Pablo, Ormoc City, Leyte</span>
                        <br />
                        <span>VAT REG. TIN 001-383-331-000</span>
                    </div>
        
                    <br />
                    <br />
        
                    <h2 style="font-size: 11pt; font-weight: bold;">REQUISITION VOUCHER</h1>
        
        
                </div>

                <br />

                <div style="display: flex; justify-content: space-between;">

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td>Purpose: ${rv.canvass.purpose.toUpperCase()}</td>
                            </tr>     
                            <tr>
                                <td>Notes: ${rv.notes} </td>
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
                                    ${formatDate(rv.date_requested)}
                                </td>
                            </tr>
                            <tr>
                                <td> RV No.: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${rv.rv_number}
                                </td>
                            </tr>     
                            <tr>
                                <td> Requisitioner: </td>
                                <td style="border-bottom: 1px solid black;">
                                    Joshua Tayag
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
                        ${rv.canvass.canvass_items.map((item, index) => `
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
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 50px; min-height: 32vh; display: flex; justify-content: center;">

                <div style="display: flex; flex-wrap: wrap;">
            
                    <div style="padding: 10px;">
                        <table border="1">
                            <tr>
                                <th> RICAFLOR SUAN </th>
                            </tr>
                            <tr>
                                <td> Rate Analyst </td>
                            </tr>
                            <tr>
                                <td> ${formatDate(rv.date_requested)} </td>
                            </tr>
                        </table>
                    </div>

                    <div style="padding: 10px;">
                        <table border="1">
                            <tr>
                                <th> RICAFLOR SUAN </th>
                            </tr>
                            <tr>
                                <td> Rate Analyst </td>
                            </tr>
                            <tr>
                                <td> ${formatDate(rv.date_requested)} </td>
                            </tr>
                        </table>
                    </div>
                    
            
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


}
