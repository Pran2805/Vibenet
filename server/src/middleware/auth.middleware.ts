import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import config from "../config/config"
import User, {UserDoc} from "../model/user.model"
import httpError from "../utils/httpError"


declare global {
  namespace Express {
    interface Request {
      user?: UserDoc; 
    }
  }
}
export const verifyAuth = async (req: Request, _: Response, next: NextFunction) => {
    try {
        const {auth} = req.cookies
        if (!auth) {
            throw new Error("User is not authenticated")
        }

        const decodedToken = jwt.verify(auth, config.JWT_SECRET as string) as { userId: string }

        const user = await User.findById(decodedToken.userId)
        // console.log(user)
        if (!user) {
            throw new Error("User is not found")
        }
    
        req.user = user
        next()
    } catch (error) {
        httpError(next, error, req, 401)
    }
}

export const verifyUser = async (req: Request, _: Response, next: NextFunction) => {
    try {
         const {auth} = req.cookies
        if (!auth) {
            throw new Error("User is not authenticated")
        }

        const decodedToken = jwt.verify(auth, config.JWT_SECRET as string) as { userId: string }

        const user = await User.findById(decodedToken.userId)
        
        if (!user) {
            throw new Error("User is not found")
        }

        if (!user) {
            throw new Error("User is not authenticated")
        }
        if (!user.isVerified) {
            throw new Error("User is not Verified")
        }

        req.user = user
        next()
    } catch (error) {
        httpError(next, error, req, 401)
    }
}

