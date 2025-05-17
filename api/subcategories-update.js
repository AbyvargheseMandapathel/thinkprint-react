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

  const { id, name, category_id, image } = req.body;

  if (!id || !name || !category_id) {
    return res.status(400).json({
      success: false,
      message: 'Subcategory ID, name, and category ID are required',
    });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    // First check if the category exists
    const [categoryCheck] = await connection.execute(
      'SELECT id FROM categories WHERE id = ?',
      [category_id]
    );
    
    if (categoryCheck.length === 0) {
      await connection.end();
      return res.status(404).json({ success: false, message: 'Parent category not found' });
    }
    
    const [result] = await connection.execute(
      'UPDATE subcategories SET name = ?, category_id = ?, image = ? WHERE id = ?',
      [name, category_id, image || null, id]
    );
    
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Subcategory updated successfully',
      data: {
        id,
        name,
        category_id,
        image
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