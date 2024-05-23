import mongoose, { Mongoose } from "mongoose";
import { DB_NAME } from "../Constants.js";

const DB_CONNECT = async () => {
  try {
     const connectioninstance=await mongoose.connect(`${process.env.DATABASE_URL}/ ${DB_NAME}`);
     console.log(`\n Mongodb connected  !! DB HOST : ${connectioninstance.connection.host}`);
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};
export default DB_CONNECT;
