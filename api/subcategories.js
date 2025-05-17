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
  const allowedOrigins = ['http://localhost:5173', 'https://thinkprint.shop', 'http://localhost:3000'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Handle preflight request
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Get category_id from query params if provided
  const categoryId = req.query.category_id;
  const subcategoryId = req.query.id;

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    let query = 'SELECT s.*, c.name as category_name FROM subcategories s JOIN categories c ON s.category_id = c.id';
    let params = [];
    
    // Filter by category_id if provided
    if (categoryId) {
      query += ' WHERE s.category_id = ?';
      params.push(categoryId);
    } 
    // Filter by subcategory id if provided
    else if (subcategoryId) {
      query += ' WHERE s.id = ?';
      params.push(subcategoryId);
    }
    
    query += ' ORDER BY s.name';
    
    const [rows] = await connection.execute(query, params);
    await connection.end();

    res.status(200).json({ 
      success: true, 
      message: 'Subcategories retrieved successfully',
      data: rows
    });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
}