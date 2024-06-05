import { Router } from "express";
import { userregister } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { ApiError } from "../util/Apierror.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),

  userregister
);

export default router;
