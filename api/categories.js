import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'srv1614.hstgr.io',
  user: 'u911622560_thinkprint_adm',
  password: '6L]kRxIpzgc/3A9q8^U=',
  database: 'u911622560_thinkprint',
});

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    res.status(200).json({ success: true, data: results });
  });
}
