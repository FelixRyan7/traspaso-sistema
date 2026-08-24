const cors = require('cors');
require('dotenv').config();

console.log('🌐 FRONTEND_URL:', process.env.FRONTEND_URL);

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};

module.exports = cors(corsOptions);
