import { NextFunction, Request, Response } from "express";
import config from "../config/config";
import { EApplicationEnvironment } from "../constant/application";
import { rateLimiterMongo } from "../config/rate-limiter";
import httpError from "../utils/httpError";
import responseMessage from "../constant/responseMessage";
export default (req:Request, _: Response, next: NextFunction) =>{
    if(config.ENV === EApplicationEnvironment.DEVELOPMENT){
        return next();
    }

    if(rateLimiterMongo){
        rateLimiterMongo.consume(req.ip as string, 1).then(()=>{
            next()
        }).catch((error: Error) =>{
            httpError(next, new Error(responseMessage.TO_MANY_REQUEST || error.message), req, 429)
        })
    }
}