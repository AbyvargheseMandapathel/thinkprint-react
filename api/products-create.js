// api/products-create.js
import pool from '../api/config/db.js';

export default async function handler(req, res) {
  // Set CORS headers
  const allowedOrigins = ['http://localhost:5173', 'https://thinkprint.shop'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, description, price, category_id, image_url, stock_quantity } = req.body;

  // Validate required fields
  if (!name || !price || !category_id) {
    return res.status(400).json({
      success: false,
      message: 'Required fields missing: name, price, and category_id are required'
    });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    
    // Insert the new product
    const [result] = await connection.query(
      'INSERT INTO products (name, description, price, category_id, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description || null, price, category_id, image_url || null, stock_quantity || 0]
    );

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        id: result.insertId,
        name,
        description,
        price,
        category_id,
        image_url,
        stock_quantity
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  } finally {
    if (connection) connection.release();
  }
}