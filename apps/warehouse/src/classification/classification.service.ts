import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ClassificationService {

    private readonly logger = new Logger(ClassificationService.name);

    constructor(
        private readonly httpService: HttpService
    ) {}

    async isClassificationExist(classification_id: string, authUser: AuthUser): Promise<boolean> {
    
        this.logger.log('isClassificationExist', classification_id)

        // console.log('this.authUser', this.authUser)

        const query = `
            query{
                classification(id: "${classification_id}") {
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

        if(!data || !data.data || !data.data.classification){
            console.log('classification not found')
            return false 
        }
        const classification = data.data.classification 
        console.log('classification', classification)
        return true 

    }

}
