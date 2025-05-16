// api/products.js
import pool from '../api/config/db.js';

export default async function handler(req, res) {
  // Set CORS headers
  const allowedOrigins = ['http://localhost:5173', 'https://thinkprint.shop'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get query parameters
  const categoryId = req.query.category_id;
  const productId = req.query.id;
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  let connection;
  try {
    connection = await pool.getConnection();
    
    let query = 'SELECT * FROM products';
    let countQuery = 'SELECT COUNT(*) as total FROM products';
    let queryParams = [];
    
    // Add filters if provided
    if (productId) {
      query = 'SELECT * FROM products WHERE id = ?';
      countQuery = 'SELECT COUNT(*) as total FROM products WHERE id = ?';
      queryParams = [productId];
    } else if (categoryId) {
      query = 'SELECT * FROM products WHERE category_id = ?';
      countQuery = 'SELECT COUNT(*) as total FROM products WHERE category_id = ?';
      queryParams = [categoryId];
    }
    
    // Add pagination if not fetching a specific product
    if (!productId) {
      query += ' LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
    }
    
    // Get total count for pagination
    const [countResult] = await connection.query(countQuery, productId || categoryId ? [productId || categoryId] : []);
    const totalCount = countResult[0].total;
    
    // Get products
    const [rows] = await connection.query(query, queryParams);

    return res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit)
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