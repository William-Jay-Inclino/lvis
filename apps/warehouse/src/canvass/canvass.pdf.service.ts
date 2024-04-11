// pdf.service.ts

import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { formatDate } from '../__common__/helpers';
import { Canvass } from './entities/canvass.entity';
import * as moment from 'moment';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Employee } from '../__employee__/entities/employee.entity';

@Injectable()
export class CanvassPdfService {

    private authUser: AuthUser

    constructor(
        private readonly httpService: HttpService,
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async generatePdf(canvass: Canvass) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const requisitioner = await this.getEmployee(canvass.requested_by_id, this.authUser)

        // temp
        const notedBy = {
            firsname: "Jannie Ann",
            middlename: null,
            lastname: "Dayandayan",
            position: 'General Manager'
        }

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
        
                    <h2 style="font-size: 11pt; font-weight: bold;">OFFICIAL CANVASS SHEET</h1>
        
        
                </div>

                <br />

                <div style="display: flex; justify-content: space-between;">

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td>Listed below are the list of Item/s needed:</td>
                            </tr>
                            <tr>
                                <td>Purpose: ${canvass.purpose.toUpperCase()}</td>
                            </tr>     
                        </table>
                    </div>

                    <div>
                        <table style="font-size: 10pt">
                            <tr>
                                <td>Date: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${formatDate(canvass.date_requested)}
                                </td>
                            </tr>
                            <tr>
                                <td> RC #: </td>
                                <td style="border-bottom: 1px solid black;">
                                    ${canvass.rc_number}
                                </td>
                            </tr>     
                        </table>
                    </div>
                
                </div>

                <br />
        
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="font-size: 10pt;">
                        <th style="border: 1px solid black;"> NO. </th>
                        <th style="border: 1px solid black;"> ITEM DESCRIPTION AND SPECIFICATIONS </th>
                        <th style="border: 1px solid black;"> UNIT </th>
                        <th style="border: 1px solid black;"> QTY. </th>
                        <th style="border: 1px solid black;"> UNIT COST </th>
                    </thead>
                    <tbody style="font-size: 10pt;">
                        ${canvass.canvass_items.map((item, index) => `
                        <tr>
                            <td align="center">${index + 1}</td>
                            <td align="center">${item.description}</td>
                            <td align="center">${item.unit ? item.unit.name : 'N/A'}</td>
                            <td align="center">${item.quantity}</td>
                            <td></td>
                        </tr>
                    `).join('')}
                    </tbody>
                </table>
        
            </div>
        
            <div style="padding-left: 25px; padding-right: 25px; font-size: 10pt; padding-top: 50px; min-height: 32vh;">

                <div style="display: flex; justify-content: space-between;">
                
                    <div>
                        Terms of Payment:
                    </div>

                    <div>
                        <span>
                            VAT Inclusive: <input type="checkbox" style="transform: scale(2);"/>
                        </span>
                        <span style="margin-left: 50px; margin-right: 10px;">
                            VAT Exclusive: <input type="checkbox" style="transform: scale(2);"/>
                        </span>
                    </div>

                </div>

                <hr />

                <br />

                <div style="display: flex; justify-content: space-between;">
                    <div style="flex: 1;">
                        <table style="font-size: 10pt; width: 80%">
                            <tr>
                                <td>Prepared By:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="text-align: center; border-bottom: 1px solid black">
                                    <div style="margin-top: 20px; ">
                                        <b> 
                                            ${
                                                // @ts-ignore
                                                requisitioner.firstname + ' ' + requisitioner.lastname
                                            } 
                                        </b>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="text-align: center">
                                    <div>
                                        ${
                                            // @ts-ignore
                                            requisitioner.position || ''
                                        } 
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style="flex: 1;">
                        <table style="font-size: 10pt; width: 80%">
                            <tr>
                                <td>Noted By:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="text-align: center; border-bottom: 1px solid black">
                                    <div style="margin-top: 20px; ">
                                        <b> ${ notedBy.firsname + ' ' + notedBy.lastname } </b>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="text-align: center">
                                    <div>
                                        General Manager
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <br />
                <br />

                <div style="text-align: center;">
                    <table border="0" style="width: 75%; margin: 0 auto;">
                        <tr>
                            <td style="width: 20%; margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; ">
                                    <span>Supplier</span>
                                    <span>:</span>
                                </div>
                            </td>
                            <td style="border-bottom: 1px solid black; margin-bottom: 10px;"></td>
                        </tr>
                        <tr>
                            <td style="margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; ">
                                    <span>TIN No.</span>
                                    <span>:</span>
                                </div>
                            </td>
                            <td style="border-bottom: 1px solid black"></td>
                        </tr>
                        <tr>
                            <td style="margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; ">
                                    <span>Address</span>
                                    <span>:</span>
                                </div>
                            </td>
                            <td style="border-bottom: 1px solid black; margin-bottom: 10px;"></td>
                        </tr>
                        <tr>
                            <td>
                                <div style="display: flex; justify-content: space-between; ">
                                    <span>Telephone</span>
                                    <span>:</span>
                                </div>
                            </td>
                            <td style="border-bottom: 1px solid black"></td>
                        </tr>
                        <tr>
                            <td>
                                <div style="display: flex; justify-content: space-between; ">
                                    <span>Signature Over Printed Name</span>
                                    <span>
                                        <br />
                                        :
                                    </span>
                                </div>
                            </td>
                            <td style="border-bottom: 1px solid black"></td>
                        </tr>
                    </table>
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
