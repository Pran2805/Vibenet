import { Router } from 'express';
import globalErrorHandler from '../middleware/globalErrorHandler';
import apiController from '../controller/apiController';
import authRouter from './auth.router'
import rateLimit from '../middleware/rateLimit';

const router = Router()
router.use(rateLimit)
router.route('/').get(apiController.self)
router.route('/health').get(apiController.health)
router.use('/auth', authRouter)

router.use(globalErrorHandler)
export default router;