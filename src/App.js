import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import userRouter from './route/user.routers.js'


//routes declarations
app.use("/api/v1/users",userRouter)

// http://localhost:8000/api/v1/users/register 
// the complete router look like this ."api/v1/users" this is prefix and "register " is main roure




export default app;