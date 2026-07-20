const express = require('express');
const corsMiddleware = require('./config/cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error.middleware');
const helmet = require("helmet");

const authRoutes = require('./routes/auth.routes');
const healthRoutes = require('./routes/health.routes')
const dashboardRoutes = require('./routes/dashboard.routes');
const locationRoutes = require('./routes/location.routes');
const productRoutes = require('./routes/products.routes');
const locationRequestRoutes = require('./routes/locationRequest.routes');
const { apiLimiter } = require('./middlewares/rateLimit.middleware');

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(corsMiddleware);
app.use(apiLimiter);


app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({
  extended: true,
  limit: "1mb",
}));

app.use(cookieParser());

// 🌐 rutas públicas
app.use('/api/auth', authRoutes);
app.use("/health", healthRoutes);
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