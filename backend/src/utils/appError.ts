import {HttpStatusCode} from "../constants/http";
import AppErrorCodes from "../constants/errorCodes";

export default class ApplicationError extends Error {
    constructor(
        public statusCode: HttpStatusCode,
        public message: string,
        public errorCode?: AppErrorCodes
    ) {
        super(message);
    }
}