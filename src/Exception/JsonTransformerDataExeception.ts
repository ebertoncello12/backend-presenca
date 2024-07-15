import { BaseErrorExeception } from "./BaseErrorExeception";
import { CODE_ERROR_JSON_TRANSFORMER } from "./CodeErrors/CodeErrors";
export class JsonTransformerDataExeception extends BaseErrorExeception{
    constructor() {
        super(400, [CODE_ERROR_JSON_TRANSFORMER])
    }
}