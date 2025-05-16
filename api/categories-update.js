import mysql from 'mysql2/promise';

const dbConfig = {
  host: import.meta.env.VITE_DB_HOST || 'srv1614.hstgr.io',
  user: import.meta.env.VITE_DB_USER || 'u911622560_thinkprint_adm',
  password: import.meta.env.VITE_DB_PASSWORD || '6L]kRxIpzgc/3A9q8^U=',
  database: import.meta.env.VITE_DB_NAME || 'u911622560_thinkprint',
  waitForConnections: true,
  connectionLimit: 10,
  ssl: { rejectUnauthorized: true }
};

export default async function handler(req, res) {
  // Set CORS headers
  const allowedOrigins = ['http://localhost:5173', 'https://thinkprint.shop'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Handle preflight request
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { id, name, img } = req.body;

  if (!id || !name) {
    return res.status(400).json({ success: false, message: 'Category ID and name are required' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'UPDATE categories SET name = ?, img = ? WHERE id = ?',
      [name, img || null, id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Category updated successfully',
      data: {
        id,
        name,
        img
      }
    });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
}