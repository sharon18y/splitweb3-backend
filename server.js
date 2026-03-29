require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const billRoutes = require('./routes/billRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware Radar Logs
app.use((req, res, next) => {
  console.log(`📡 [RADAR] Request masuk: ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/notifications', notificationRoutes);

// Root Route (Biar nggak muncul "Cannot GET /" saat dicek)
app.get('/', (req, res) => {
  res.send('🚀 SplitWeb3 API is Running Online!');
});

const PORT = process.env.PORT || 5000;

// Sinkronisasi Database
db.sequelize.sync()
  .then(() => {
    console.log('✅ Database Aiven Terkoneksi!');
  })
  .catch((err) => {
    console.error('❌ Database Gagal Konek:', err.message);
  });

// PENTING UNTUK VERCEL: Jangan pakai app.listen permanen di serverless
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Lokal: http://localhost:${PORT}`);
  });
}

module.exports = app;
