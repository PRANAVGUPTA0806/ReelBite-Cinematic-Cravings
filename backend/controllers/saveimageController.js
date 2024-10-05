const { Readable } = require('stream');
const cloudinary = require('cloudinary').v2;
const path = require('path');


const uploadToCloudinary = (fileBuffer, options) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });

        // Convert buffer to readable stream and pipe it to Cloudinary
        const stream = Readable.from(fileBuffer);
        stream.pipe(uploadStream);
    });
};

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const result = await uploadToCloudinary(req.file.buffer, {
            folder: 'uploads',
            public_id:`${req.file.fieldname}_${Date.now()}${path.extname(req.file.originalname)}`,
            transformation: [
              { width: 500, height: 500, crop: 'limit', quality: 'auto:best', fetch_format: 'auto' }
            ]
        });

        res.status(200).json({ success: 1,image_url: result.secure_url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

module.exports = { uploadImage };
// const asyncHandler = require('express-async-handler');

// const saveimage = asyncHandler(async (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
//   });
// });

// module.exports = {
//   saveimage,
// };
