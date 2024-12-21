import { UnauthorizedExeception } from "../../../Exception/UnauthorizedExeception";
import jwt, {VerifyOptions} from 'jsonwebtoken'

export class AuthHelper {
  

    public static async getPayloadData(token: string): Promise<any> {
        try {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7); 
            }

            if(!token) {
                throw new UnauthorizedExeception();
            }
            const decoded = jwt.verify(token, '26534a9c3e5d-4953849384513aa7df07', { algorithms: ['HS256'] } as VerifyOptions);
            return decoded;
        } catch (err) {
            throw new UnauthorizedExeception();
        }
    }

  



    public static async generateJwtToken(userResponse: any, studentResponse: any, EXPIRES_TOKEN: number, EXPIRES_REFRESH_TOKEN: any):Promise<any>{
        const payload: any = {
            userId: userResponse.id,
            email: userResponse.email,
            userName: userResponse.name,
            group: userResponse.group,
            status: userResponse.status,
            loggetAt: userResponse.logget_at,
            studentId: userResponse.student_id,
            registration: studentResponse?.registration,
            studentName: studentResponse.name,
            registrationFace: studentResponse.registration_face,
        }



        const response = {
            token: jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) * EXPIRES_TOKEN,
                    payload,
                },
                '26534a9c3e5d-4953849384513aa7df07'
            ),
            tokenType: 'Bearer',
            tokenExpiresIn: EXPIRES_TOKEN,
            refreshToken: null,
        }

       

        return response

    }
}