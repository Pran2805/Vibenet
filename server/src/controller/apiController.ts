import {  NextFunction, Request, Response } from 'express'
import httpResponse from '../utils/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../utils/httpError'
import quicker from '../utils/quicker'

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    health : (req: Request, res: Response, next: NextFunction) =>{
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timestamp: Date.now()
            }
            httpResponse(req, res, 201, responseMessage.SUCCESS,healthData)
        } catch (error) {
            httpError(next, error, req, 500)
        }
    }
  
}