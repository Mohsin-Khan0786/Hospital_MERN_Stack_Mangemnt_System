import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Ensure the name matches the one in your .env file
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
