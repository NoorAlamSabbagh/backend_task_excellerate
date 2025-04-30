import { Request, Response, NextFunction } from 'express';
import {sendResponse, build } from '@util/response';
const API_KEY = process.env.APIKEY;

const checkAPIKey = async (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers.key as string | undefined;
    if(key === API_KEY){
        next();
    }else{
        return sendResponse(res, build("ERROR_TOKEN_REQUIRED", { error: 'Unauthorized Request' }) );
    }
};

export {
    checkAPIKey
  };