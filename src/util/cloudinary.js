import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadoncloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null
    //upload file to the cloudinary
    const response =  await  cloudinary.uploader.upload(localfilepath, {
      resource_type: auto,
    });

    console.log("file uploaded on cloudinary successfully",response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath)//remove the locally saved temporaray file as the upload operation got failed 
  }
};

export {uploadoncloudinary}
