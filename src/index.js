import dotenv from "dotenv"
import app from "./App.js";

import DB_CONNECT from "./db/index.js";

dotenv.config({
  path: "./env",
});

DB_CONNECT()
.then(()=>{
 
  
app.listen(process.env.PORT,()=>{
  console.log(`server is running on port no ${process.env.PORT}`);
})
  
})
.catch((err)=>{
  console.log("monodb connection failed ",err);
})
