import { BaseErrorExeception } from "./BaseErrorExeception";

export class BadRequestExeception extends BaseErrorExeception {
  constructor(error: any, message?: string) {
    if(message) {
        error.message = message
    }
    super(400, [error])
  }
}