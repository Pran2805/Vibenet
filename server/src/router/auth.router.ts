import { Router } from "express"
import { checkAuth, login, logout, registerUser, verifyEmail } from "../controller/auth.controller"
import { verifyAuth, verifyUser } from "../middleware/auth.middleware"
const router = Router()

router.route("/signup").post(registerUser)
router.route("/verifyEmail/:id").post(verifyAuth,verifyEmail)
router.route("/signin").post(login)
router.route("/logout").post(verifyUser, logout)
router.route("/check-auth").post(verifyUser, checkAuth)


export default router
