import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class EmployeeService {

    private readonly logger = new Logger(EmployeeService.name);

    constructor(
        private readonly httpService: HttpService
    ) {}

    // check if employee exist
    async isEmployeeExist(employee_id: string, authUser: AuthUser): Promise<boolean> {
    
        this.logger.log('isEmployeeExist', employee_id)

        // console.log('this.authUser', this.authUser)

        const query = `
            query{
                employee(id: "${employee_id}") {
                    id
                }
            }
        `;

        const { data } = await firstValueFrom(
            this.httpService.post(process.env.API_GATEWAY_URL, 
            { query },
            {
                headers: {
                    Authorization: authUser.authorization,
                    'Content-Type': 'application/json'
                }
            }  
            ).pipe(
                catchError((error) => {
                    throw error
                }),
            ),
        );

        console.log('data', data)

        if(!data || !data.data || !data.data.employee){
            console.log('employee not found')
            return false 
        }
        const employee = data.data.employee 
        console.log('employee', employee)
        return true 

    }

}
