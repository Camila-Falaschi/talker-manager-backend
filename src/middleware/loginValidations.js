const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    // const error = new Error('O campo "email" é obrigatório');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  
  if (!/\S+@\S+\.\S+/.test(email)) {
    // const error = new Error('O "email" deve ter o formato "email@email.com"');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    // const error = new Error('O campo "password" é obrigatório');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    // const error = new Error('O "password" deve ter pelo menos 6 caracteres');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
};