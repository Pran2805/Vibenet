import { NextFunction, Request, Response } from "express"
import User from "../model/user.model"
import httpError from "../utils/httpError"
import httpResponse from "../utils/httpResponse"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"
import config from "../config/config"
import { sendVerificationEmail } from "../utils/mailer"
import responseMessage from "../constant/responseMessage"

// Load domain lists as Set for fast lookup
const disposableDomainFilePath = path.join(__dirname, "../constant/disposableDomain.txt")
const disposableDomain = new Set(
    fs
        .readFileSync(disposableDomainFilePath, "utf-8")
        .split("\n")
        .map((d) => d.trim().toLowerCase())
        .filter(Boolean)
)

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body
        console.log(req.body)

        if (!username || !email || !password) {
            throw new Error("All fields are required")
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existingUser) {
            throw new Error("User already exists")
        }

        const domain = email.split("@")[1].toLowerCase()

        if (disposableDomain.has(domain)) {
            throw new Error("Disposable email domains are not allowed")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ userId: user._id }, config.JWT_SECRET as string, {
            expiresIn: "7d"
        })

        res.cookie("auth", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        await sendVerificationEmail(email, user._id as unknown as string)
        httpResponse(req, res, 201, "User created successfully", user)
    } catch (error) {
        httpError(next, error, req, 500)
    }
}

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!id) {
            throw new Error("Token is required")
        }

        const user = await User.findOne({ _id: id }).select("-password")
        if (!user) {
            throw new Error("User not found")
        }
        user.isVerified = true
        await user.save()

        httpResponse(req, res, 200, "Email verified successfully", user)
    } catch (error) {
        httpError(next, error, req, 500)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = await req.body
        if (!email || !password) {
            throw new Error("All fields are required")
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("User not found")
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            throw new Error("Invalid password")
        }
        const token = jwt.sign({ userId: user._id }, config.JWT_SECRET as string, {
            expiresIn: "7d"
        })
         res.cookie("auth", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })
        httpResponse(req, res, 200, "Logged in successfully", {
            username: user.username,
            email: user.email,
            isVerified: user.isVerified
        })
    } catch (error) {
        httpError(next, error, req, 500)
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("auth")
        httpResponse(req, res, 200, responseMessage.SUCCESS, null)
    } catch (error) {
        httpError(next, error, req, 500)
    }
}


export const checkAuth = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const user = req.user;
        httpResponse(req, res, 200, responseMessage.SUCCESS, {user:user})
        
    } catch (error) {
        httpError(next, error, req, 500)
    }
}