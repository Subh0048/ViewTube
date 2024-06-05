import { ApiError } from "../util/Apierror.js";
import { asynchandler } from "../util/asynchandler.js";
import { User } from "../models/user.model.js";
import { uploadoncloudinary } from "../util/cloudinary.js";
import { ApiResponse } from "../util/APiresponse.js";

const userregister = asynchandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;
  console.log("email", email);

  if (
    [fullname, email, username, password].some((fields) => field?.trim() === "")
  ) {
    throw new ApiError(400, "please fill all field");
  }

  const existingUser = User.findOne({
    $or: [{ email }, { username }],
  });
  if (existinguser) {
    throw ApiError(402, "user already exist");
  }

  const avatarlocalpath = req.files?.avatar[0]?.path;
  const coverImagelocalpath = req.files?.coverImage[0]?.path;

  if (!avatarlocalpath) {
    throw new ApiError(403, "please upload avatar photo");
  }

  const avatar = await uploadoncloudinary(avatarlocalpath);
  const coverImage = await uploadoncloudinary(coverImagelocalpath);

  if (!avatar) {
    throw new ApiError(403, "avatar not upload on cloudinary");
  }
  User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(
      500,
      "something went wrong while register with the user "
    );
  }
  return res
    .status(201)
    .json(ApiResponse(200, createdUser, "user register successfully"));
});

export { userregister };
