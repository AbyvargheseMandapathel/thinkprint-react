// --- upload-category-image.js ---
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import ftp from 'basic-ftp';

// Multer config: store image in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.'), false);
    }
    cb(null, true);
  }
}).single('image');

export const config = {
  api: {
    bodyParser: false, // Required for multer to work with Vercel
  },
};

export default async function handler(req, res) {
  const allowedOrigins = ['http://localhost:5173', 'https://thinkprint.shop', 'http://localhost:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method Not Allowed' });

  try {
    await new Promise((resolve, reject) => {
      upload(req, res, err => (err ? reject(err) : resolve()));
    });

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    const client = new ftp.Client();
    client.ftp.verbose = false;

    await client.access({
      host: '156.67.73.28',
      port: 21,
      user: 'u911622560.thinkprint.shop',
      password: 'YFd>dU1+nWhSr~J9',
      secure: false,
    });

    const filename = `${uuidv4()}${req.file.originalname.slice(req.file.originalname.lastIndexOf('.'))}`;
    const remotePath = `/public_html/uploads/categories/${filename}`;
    await client.ensureDir('/public_html/uploads/categories');
    await client.uploadFrom(Buffer.from(req.file.buffer), remotePath);
    await client.close();

    const imageUrl = `https://thinkprint.shop/uploads/categories/${filename}`;
    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Upload failed' });
  }
}