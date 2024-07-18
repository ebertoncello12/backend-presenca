import { UnauthorizedExeception } from "../../../Exception/UnauthorizedExeception";
import jwt from 'jsonwebtoken'

export class AuthHelper {
    public static async getPayload(acessToken: string): Promise<any> {
        const token = await this.getToken(acessToken);
        let result: any = null;
        try {
            result = jwt.verify(token, acessToken);
        } catch(e: any) {
            throw new UnauthorizedExeception();
        }

        if(!result || !result.payload) {
            throw new UnauthorizedExeception();
        }

        const payload = <any>result.payload;
        if(!payload.id) {
            throw new UnauthorizedExeception();
        }

        return Promise.resolve(payload);
    }

    private static async getToken(acessToken: string): Promise<string> {
        const parts = await this.validateBasicInfoToken(acessToken);
        const [tokenType, token] = parts;
        if(!/^Bearer$/i.test(tokenType)) {
          throw new UnauthorizedExeception();
        }

        if(token && token.split('.').length !== 3) {
            throw new UnauthorizedExeception();
        }
        return Promise.resolve(token);
    }

    private static async validateBasicInfoToken(acessToken: string): Promise<string[]> {
      if(!acessToken) {
        throw new UnauthorizedExeception();
      }
      if(acessToken.length <= 0) {
        throw new UnauthorizedExeception();
      }
      const parts = acessToken.split(' ');
      if(parts && parts.length !== 2) {
        throw new UnauthorizedExeception();
      }
      return Promise.resolve(parts);
    }

    public static async validateJwt(token: string): Promise<void>{
        if(!token) {
            throw new UnauthorizedExeception();
        }

        try {
            token = await AuthHelper.getToken(token);
            jwt.verify(token, '26534a9c3e5d-4953849384513aa7df07');

        } catch(e: any) {
            throw new UnauthorizedExeception();
        }
    }



    public static async generateJwtToken(userResponse: any, studentResponse: any, EXPIRES_TOKEN: number, EXPIRES_REFRESH_TOKEN: any): Promise<any>{
        const payload: any = {
            userId: userResponse.id,
            email: userResponse.email,
            userName: userResponse.name,
            group: userResponse.group,
            status: userResponse.status,
            loggetAt: userResponse.logget_at,
            studentId: userResponse.student_id,
            registration: studentResponse.registration,
            studentName: studentResponse.name,
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

        if(EXPIRES_REFRESH_TOKEN) {
            console.log('por enquanto nao vamos adicionar esta funcionalidade de login');
        }

        return response

    }
}