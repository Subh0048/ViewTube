import { asynchandler } from "../util/asynchandler.js";

const userregister = asynchandler(async (req, res) => {
  
  res.status(200).json({
    message: "ok"
  })
})
export { userregister };
