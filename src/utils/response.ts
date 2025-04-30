import { Response } from 'express';
import createError from 'http-errors';
import config from './responseMessageConfiguration';

const messagePrefix = "APP_MESSAGES:";

interface ResponseObj {
  responseCode: number;
  errorCode: number;
  message: string;
  statusCode: number;
}

interface ResponseData {
  error?: ResponseObj;
  result?: any;
  responseCode?: number;
  message?: string;
  response?: any;
  status?: boolean;
  statusCode?: number;
  statusMessage?: string;
}

export const build = (key :string, response : any = {}): any  => {
  response = response || {};
  if(response.error && isResponseObject(response.error)) return response.error;
  else if(response.result && !Array.isArray(response.result) && isResponseObject(response.result)) return response.result;

  const error = (response && response.error) || { message: '' };
  const responseObj = config.get(messagePrefix + error.message) || config.get(messagePrefix + key) || config.get(messagePrefix + "ERROR_SERVER_ERROR");
  return {
    status: responseObj.statusCode === 200,
    statusCode: responseObj.errorCode,
    statusMessage: responseObj.message || response.message,
    responseCode: responseObj.statusCode,
    response: response
  };
};

/**
 * Build Error Response using http-errors
 * @param key Response message suffix key
 * @param exceptionClass Exception class name (optional)
 */
export const error = (key: string, exceptionClass: string = 'LogicalException'): Error => {
  const responseObj = config.get(messagePrefix + key);
  return createError(responseObj.statusCode, responseObj.message, { 
    code: responseObj.errorCode, 
    type: exceptionClass 
  });
};

/**
 * Send API Response
 * @param res Express response object
 * @param response The response data to send
 */
export const sendResponse = (res: Response, response: ResponseData): void => {
  res.status(response?.responseCode ?? 500).json(response);
};

// const isResponseObject = (responseObj: ResponseObj): boolean => {
//   return responseObj.statusCode && responseObj.responseCode ? true : false;
// };

function isResponseObject(obj: unknown): obj is ResponseObj {
  return !!obj && typeof obj === 'object' && 'statusCode' in obj && 'responseCode' in obj;
}
