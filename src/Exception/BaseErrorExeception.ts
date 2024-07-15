export abstract class BaseErrorExeception extends Error {
    protected constructor(statusCode: number, errors: any[]) {
        super(errors ? String(errors): 'SERVER_INTERNAL_ERRO, Erro nao controlado');
        this.statusCode = statusCode;
        this.errors = errors;
    }

    public statusCode: number;
    public errors: any;
}