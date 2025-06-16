import formidable from 'formidable';
import fs from 'fs';
import ftp from 'basic-ftp';  
const { FTPClient } = ftp;

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const allowedOrigins = [
  'http://localhost:5173',
  'https://thinkprint.shop',
  'http://localhost:3000',
];

// Your FTP details
const FTP_HOST = "156.67.73.28";
const FTP_USER = "u911622560.thinkprint.shop";
const FTP_PASSWORD = ":2kt^LP5Hlbwc@8D";
const FTP_PORT = 21;
const FTP_UPLOAD_DIR = "/public_html/cdn/media";  // Directory inside your subdomain folder
const CDN_DOMAIN = "https://cdn.thinkprint.shop/media"; // Public access URL base

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
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: (part) => {
        return part.name === 'image' && allowedMimeTypes.includes(part.mimetype);
      },
    });

    const [, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const imageFile = files.image?.[0] || files.image;
    if (!imageFile) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    if (!allowedMimeTypes.includes(imageFile.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.',
      });
    }

    const fileExtension = imageFile.originalFilename.slice(imageFile.originalFilename.lastIndexOf('.'));
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${fileExtension}`;
    const localPath = imageFile.filepath;

    // Upload to FTP
    const client = new FTPClient();
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD,
      port: FTP_PORT,
      secure: false,
    });

    await client.ensureDir(FTP_UPLOAD_DIR);
    await client.uploadFrom(localPath, `${FTP_UPLOAD_DIR}/${filename}`);
    await client.close();

    fs.unlinkSync(localPath); // Remove temp file

    const publicUrl = `${CDN_DOMAIN}/${filename}`;

    return res.status(200).json({
      success: true,
      imageUrl: publicUrl,
    });
  } catch (error) {
    console.error('FTP Upload error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Upload failed' });
  }
}
