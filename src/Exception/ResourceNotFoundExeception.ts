import { BaseErrorExeception } from "./BaseErrorExeception"
import { CODE_ERROR_NOT_FOUND } from "./CodeErrors/CodeErrors"
export class ResourceNotFoundExeception extends BaseErrorExeception {
constructor(message?: string) {
    super(404, [
        {
            code: CODE_ERROR_NOT_FOUND.code,
            message: message || CODE_ERROR_NOT_FOUND.message,
        }
    ])
}
}