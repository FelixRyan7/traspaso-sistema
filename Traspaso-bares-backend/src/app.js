const express = require('express');
const corsMiddleware = require('./config/cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const locationRoutes = require('./routes/location.routes');
const productRoutes = require('./routes/products.routes');
const locationRequestRoutes = require('./routes/locationRequest.routes');

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🌐 rutas públicas
app.use('/api/auth', authRoutes);
// Rutas privadas
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/locationRequests', locationRequestRoutes)
app.use('/api/admin/products', productRoutes)


app.get('/', (req, res) => {
  res.json({ message: 'API funcionando 🚀' });
});

app.use(errorMiddleware);

module.exports = app;