import { Router } from 'express';
import globalErrorHandler from '../middleware/globalErrorHandler';
import apiController from '../controller/apiController';
import rateLimit from '../middleware/rateLimit';

const router = Router()
router.use(rateLimit)
router.route('/').get(apiController.self)
router.route('/health').get(apiController.health)

router.use(globalErrorHandler)
export default router;