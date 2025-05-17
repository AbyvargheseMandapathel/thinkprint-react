import { put } from '@vercel/blob';
import formidable from 'formidable';
import fs from 'fs';

// Get token from environment variable
const BLOB_TOKEN = 'vercel_blob_rw_ZQWkdm0dQLlXQofJ_lnELB6BcIPdemqL0Kc2XxKuARuvSyD'


// Allowed MIME types
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://thinkprint.shop',
  'http://localhost:3000',
];

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method Not Allowed' });

  try {
    // Check if BLOB_TOKEN is configured
    if (!BLOB_TOKEN) {
      console.error('BLOB_TOKEN is not configured');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    // Parse form data using formidable
    const form = new formidable.IncomingForm({
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: (part) => {
        return part.name === 'image' && allowedMimeTypes.includes(part.mimetype);
      }
    });

    const [, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Check if image file was uploaded
    const imageFile = files.image?.[0] || files.image;
    if (!imageFile) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    // Check file type
    if (!allowedMimeTypes.includes(imageFile.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.',
      });
    }

    // Generate unique filename
    const fileExtension = imageFile.originalFilename.slice(imageFile.originalFilename.lastIndexOf('.'));
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${fileExtension}`;

    // Read file data
    const fileData = fs.readFileSync(imageFile.filepath);

    // Upload to Vercel Blob
    const blob = await put(`categories/${filename}`, fileData, {
      access: 'public',
      contentType: imageFile.mimetype,
      token: BLOB_TOKEN,
    });

    // Clean up temp file
    fs.unlinkSync(imageFile.filepath);

    return res.status(200).json({
      success: true,
      imageUrl: blob.url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Upload failed' });
  }
}