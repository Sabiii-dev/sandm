import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Cloudinary configurationnnn
cloudinary.config({
    cloud_name: "dic1img0v",
    api_key: "724648671984992",
    api_secret: "aJCZ1EbN-Acamno5CkKU2BrSIZI",
});

// Set up the Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'food-images', // Folder where images will be stored on Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

export { cloudinary, storage };
