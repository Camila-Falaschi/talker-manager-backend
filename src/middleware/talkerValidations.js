const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    // const error = new Error('O campo "name" é obrigatório');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    // const error = new Error('O "name" deve ter pelo menos 3 caracteres');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    // const error = new Error('O campo "age" é obrigatório');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age.length < 18) {
    // const error = new Error('A pessoa palestrante deve ser maior de idade');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    // const error = new Error('O campo "talk" é obrigatório');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;

  if (!watchedAt) {
    // const error = new Error('O campo "watchedAt" é obrigatório');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!/^([0-2][0-9]|(3)[0-1])(\/)((0)[0-9]|(1)[0-2])(\/)\d{4}$/.test(watchedAt)) {
    // const error = new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

// para o regex do 'validateWatchedAt' foi consultado o site RegEx Testing (https://www.regextester.com/99555)

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (!rate) {
    // const error = new Error('O campo "rate" é obrigatório');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (rate < 1 || rate > 5) {
    // const error = new Error('O campo "rate" deve ser um inteiro de 1 à 5');
    // error.status = 400;
    // throw error;
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};
