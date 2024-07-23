import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from './router/messageRouter.js';
import userRouter from './router/userRouter.js'
import appointmentRouter from './router/appointmentRouter.js'

import { errorMiddleware } from "./middlewares/errormiddlewares.js";

const app = express();
config({path:"./config/config.env"})

const allowedOrigins = [process.env.FRONTEND_URL, process.env.DASHBOARD_URL];

app.use(cors({
  origin: function (origin, callback) {
    // Check if the incoming origin is in the allowedOrigins array
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
        useTempFiles: true,
        tempFileDir: "./temp/"

        
    })
    


)
app.use('/api/v1/message',messageRouter)

app.use('/api/v1/user',userRouter)

app.use('/api/v1/appointment',appointmentRouter)
dbConnection();
app.use(errorMiddleware)

export default app;



