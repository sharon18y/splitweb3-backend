require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');

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

app.use((req, res, next) => {
  console.log(`📡 [RADAR] Request masuk: ${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;

process.on('uncaughtException', (err) => {
  console.error('🚨 ERROR FATAL TERSEMBUNYI:', err);
});

const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
  try {
    // 👉 KITA KUNCI PAKAI INI PERMANEN. Tidak ada lagi alter: true!
    await db.sequelize.sync();
    console.log('✅ Database terhubung dan tabel sinkron!');
  } catch (error) {
    console.error('❌ Gagal sinkronisasi database:', error.message);
  }
});

server.on('error', (error) => {
  console.error('🚨 SERVER GAGAL START:', error);
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');

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

app.use((req, res, next) => {
  console.log(`📡 [RADAR] Request masuk: ${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;

process.on('uncaughtException', (err) => {
  console.error('🚨 ERROR FATAL TERSEMBUNYI:', err);
});

const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
  try {
    // 👉 KITA KUNCI PAKAI INI PERMANEN. Tidak ada lagi alter: true!
    await db.sequelize.sync();
    console.log('✅ Database terhubung dan tabel sinkron!');
  } catch (error) {
    console.error('❌ Gagal sinkronisasi database:', error.message);
  }
});

server.on('error', (error) => {
  console.error('🚨 SERVER GAGAL START:', error);
});
module.exports = app;
