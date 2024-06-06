import { ApiError } from "../util/Apierror.js";
import { asynchandler } from "../util/asynchandler.js";
import { User } from "../models/user.model.js";
import { uploadoncloudinary } from "../util/cloudinary.js";
import { ApiResponse } from "../util/APiresponse.js";

const userregister = asynchandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;
  // console.log("email", email);

  if (
    [username, email, fullname, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "please fill all field");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new ApiError(402, "user already exist");
  }
  // console.log(req.files);

  const avatarlocalpath = req.files?.avatar?.[0]?.path;
  // const coverImagelocalpath = req.files?.coverImage?.[0]?.path;

  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
}

  if (!avatarlocalpath) {
    throw new ApiError(403, "please upload avatar photo");
  }

  const avatar = await uploadoncloudinary(avatarlocalpath);
  const coverImage = await uploadoncloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(403, "avatar not upload on cloudinary");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "something went wrong while register with the user "
    );
  }

  return res.status(201).json(
    // """success":true,
    // "message":"user registere successfully"
    new ApiResponse(200, createdUser, "user register successfully")
  );
});

export { userregister };
