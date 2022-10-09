const fs = require('fs').promises;
const path = require('path');

const pathLogin = path.resolve(__dirname, '..', 'src', 'login.json');

const authentication = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const loginList = JSON.parse(await fs.readFile(pathLogin, 'utf8'));

  const validToken = loginList.some((item) => item.token === token);
  
  if (!validToken) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = authentication;