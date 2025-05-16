import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { promisify } from 'util';

// Get the directory name using ES module approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the uploads directory
const uploadsDir = path.join(__dirname, '../public/uploads/categories');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.'), false);
    }
    cb(null, true);
  }
}).single('image');

// Promisify the multer middleware
const uploadPromise = promisify(upload);

export default async function handler(req, res) {
  // Set CORS headers
  const allowedOrigins = ['http://localhost:5173', 'https://thinkprint.shop', 'http://localhost:3000'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Handle preflight request
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // Process the file upload
    await uploadPromise(req, res);
    
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    // Determine the public URL for the image
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://thinkprint.shop' 
      : 'http://localhost:3000';
    
    const imageUrl = `${baseUrl}/uploads/categories/${req.file.filename}`;

    // Return success response with the image URL
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to upload image' });
  }
}