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
  const allowedOrigins = ['http://localhost:5173', 'https://thinkprint.shop', 'http://localhost:3000'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method Not Allowed' });

  const { name, category_id, image } = req.body;
  
  // Validate required fields
  if (!name) return res.status(400).json({ success: false, message: 'Subcategory name is required' });
  if (!category_id) return res.status(400).json({ success: false, message: 'Category ID is required' });

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // First check if the category exists
    const [categoryCheck] = await connection.execute(
      'SELECT id FROM categories WHERE id = ?',
      [category_id]
    );
    
    if (categoryCheck.length === 0) {
      await connection.end();
      return res.status(404).json({ success: false, message: 'Parent category not found' });
    }
    
    // Insert the subcategory with image support
    const [result] = await connection.execute(
      'INSERT INTO subcategories (name, category_id, image) VALUES (?, ?, ?)',
      [name, category_id, image || null]
    );
    
    await connection.end();

    res.status(201).json({ 
      success: true, 
      message: 'Subcategory added successfully',
      data: {
        id: result.insertId,
        name,
        category_id,
        image
      }
    });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
}