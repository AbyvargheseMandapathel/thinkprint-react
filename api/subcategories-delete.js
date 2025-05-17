import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'srv1614.hstgr.io',
  user: 'u911622560_thinkprint_adm',
  password: '6L]kRxIpzgc/3A9q8^U=',
  database: 'u911622560_thinkprint',
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

  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Handle preflight request
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ success: false, message: 'Subcategory ID is required' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'DELETE FROM subcategories WHERE id = ?',
      [id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Subcategory not found' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Subcategory deleted successfully'
    });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
}