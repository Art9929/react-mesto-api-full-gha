const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

// Создаем Токен
const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' }); // токен на 7 дней

module.exports = {
  generateToken,
};
