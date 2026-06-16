import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveLocationImageToCloudinary(buffer, locationId) {
  const options = {
    folder: "RelaxMap/locations",
    public_id: `location_${locationId}`,
    resource_type: "image",
    overwrite: true,
    unique_filename: false,
    transformation: [{ fetch_format: "auto", quality: "auto" }],
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
}

export async function saveUserAvatarToCloudinary(buffer, userId) {
  const options = {
    folder: "RelaxMap/users",
    public_id: `avatar_${userId}`,
    resource_type: "image",
    overwrite: true,
    unique_filename: false,
    transformation: [
      { width: 512, height: 512, crop: "fill", gravity: "auto" },
      { fetch_format: "auto", quality: "auto" },
    ],
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
}
