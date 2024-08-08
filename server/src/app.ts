import express from 'express';
import cors from 'cors';
import { router } from './routes/blogRoutes';
import { statusCodes } from './@Types/statusCodes';
import { CustomError } from './utils/customError';
import { errorHandler } from './Middleware/error-handler';



const app = express();



app.use(cors());
app.use(express.json());

app.use("/api", router);
// Serve static files (like uploaded images)
// app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.use("*", (req:express.Request, resp: express.Response, next: express.NextFunction)=>
{
next(new CustomError("Request route is Invalid", statusCodes.NotFound));
});

app.use(errorHandler);

export default app;