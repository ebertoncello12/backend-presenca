import { BaseErrorExeception } from "./BaseErrorExeception";
import { CODE_ERROR_UNAUTHORIZED } from "./CodeErrors/CodeErrors";

export class UnauthorizedExeception extends BaseErrorExeception {
    constructor() {
        super(401, [CODE_ERROR_UNAUTHORIZED])
    }
}