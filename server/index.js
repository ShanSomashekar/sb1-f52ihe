import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'u919924273_workspace',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const table = userType === 'admin' ? 'Employees' : 'Members';
    
    const [users] = await pool.execute(
      `SELECT * FROM ${table} WHERE Email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.PasswordHash);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: userType === 'admin' ? user.EmployeeID : user.MemberID, role: userType },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ 
      token, 
      user: { 
        id: userType === 'admin' ? user.EmployeeID : user.MemberID,
        email: user.Email,
        name: userType === 'admin' ? `${user.FirstName} ${user.LastName}` : user.Name,
        role: userType 
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Spaces routes
app.get('/api/spaces', authenticateToken, async (req, res) => {
  try {
    const [spaces] = await pool.execute(`
      SELECT s.*, 
             JSON_ARRAYAGG(
               JSON_OBJECT(
                 'duration', p.Duration,
                 'price', p.Price
               )
             ) as price_plans
      FROM Spaces s
      LEFT JOIN PricePlans p ON s.SpaceID = p.SpaceID
      GROUP BY s.SpaceID
    `);

    // Ensure proper JSON parsing for Amenities and price_plans
    const formattedSpaces = spaces.map(space => ({
      ...space,
      Amenities: space.Amenities ? JSON.parse(space.Amenities) : [],
      price_plans: space.price_plans ? JSON.parse(space.price_plans) : []
    }));

    res.json(formattedSpaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Bookings routes
app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const [bookings] = await pool.execute(`
      SELECT b.*, 
             s.Name as space_name,
             m.Name as member_name,
             m.Email as member_email,
             i.Amount as total_amount,
             i.Status as payment_status
      FROM Bookings b
      JOIN Spaces s ON b.SpaceID = s.SpaceID
      JOIN Members m ON b.MemberID = m.MemberID
      LEFT JOIN Invoices i ON b.BookingID = i.BookingID
      ${req.user.role === 'user' ? 'WHERE b.MemberID = ?' : ''}
      ORDER BY b.StartDate DESC
    `, req.user.role === 'user' ? [req.user.id] : []);
    
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Analytics routes
app.get('/api/analytics', authenticateToken, async (req, res) => {
  try {
    const [revenue] = await pool.execute(`
      SELECT 
        DATE_FORMAT(a.Date, '%Y-%m') as month,
        SUM(a.Revenue) as revenue,
        AVG(a.OccupancyRate) as occupancy_rate,
        COUNT(DISTINCT b.BookingID) as total_bookings
      FROM Analytics a
      LEFT JOIN Bookings b ON DATE_FORMAT(a.Date, '%Y-%m') = DATE_FORMAT(b.StartDate, '%Y-%m')
      GROUP BY DATE_FORMAT(a.Date, '%Y-%m')
      ORDER BY month DESC
      LIMIT 6
    `);
    
    const [spaceUtilization] = await pool.execute(`
      SELECT 
        s.Type,
        COUNT(*) as count,
        AVG(a.OccupancyRate) as avg_occupancy
      FROM Spaces s
      LEFT JOIN Analytics a ON s.SpaceID = a.SpaceID
      GROUP BY s.Type
    `);
    
    res.json({ revenue, spaceUtilization });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Invoices routes
app.get('/api/invoices', authenticateToken, async (req, res) => {
  try {
    const [invoices] = await pool.execute(`
      SELECT i.*,
             b.SpaceID,
             s.Name as space_name,
             m.Name as member_name,
             m.Email as member_email,
             p.Status as payment_status,
             p.PaymentMethod,
             p.TransactionID
      FROM Invoices i
      JOIN Bookings b ON i.BookingID = b.BookingID
      JOIN Spaces s ON b.SpaceID = s.SpaceID
      JOIN Members m ON b.MemberID = m.MemberID
      LEFT JOIN Payments p ON i.InvoiceID = p.InvoiceID
      ${req.user.role === 'user' ? 'WHERE b.MemberID = ?' : ''}
      ORDER BY i.IssueDate DESC
    `, req.user.role === 'user' ? [req.user.id] : []);
    
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});