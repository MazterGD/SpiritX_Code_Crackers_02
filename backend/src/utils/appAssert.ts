import {HttpStatusCode} from "../constants/http";
import AppErrorCodes from "../constants/errorCodes";
import assert from "node:assert";
import ApplicationError from "./appError";

/**
 * Asserts a condition and throws an error if the condition is falsy
 */
const appAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCodes
) => assert(condition, new ApplicationError(httpStatusCode, message, appErrorCode));

export default appAssert;