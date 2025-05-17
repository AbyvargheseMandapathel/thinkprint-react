// api/categories-update.js
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'srv1614.hstgr.io',
  user: 'u911622560_thinkprint_adm',
  password: '6L]kRxIpzgc/3A9q8^U=',
  database: 'u911622560_thinkprint',
  waitForConnections: true,
  connectionLimit: 10,
  ssl: { rejectUnauthorized: false }
};

export default async function handler(req, res) {
  const allowedOrigins = ['http://localhost:5173', 'https://thinkprint.shop'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Preflight
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, name, img } = req.body;

  if (!id || !name) {
    return res.status(400).json({
      success: false,
      message: 'Category ID and name are required',
    });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'UPDATE categories SET name = ?, img = ? WHERE id = ?',
      [name, img || null, id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: {
        id,
        name,
        img: img || null,
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
}
