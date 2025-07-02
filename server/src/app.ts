import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
const app: Application = express();


// middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(helmet())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// router
import router from './router/apiRouter';
import responseMessage from './constant/responseMessage';
import httpError from './utils/httpError';
import globalErrorHandler from './middleware/globalErrorHandler';
app.use('/api/v1', router);

app.use((req:Request, _: Response, next: NextFunction) =>{
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (error) {
        httpError(next, error, req, 404)
    }
})

app.use(globalErrorHandler)
export default app;