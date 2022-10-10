const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
const path = require('path');

const newToken = require('./middleware/generateToken.js');
const { validateEmail, validatePassword } = require('./middleware/loginValidations.js');
const authentication = require('./middleware/authentication.js');
const { validateName, validateAge, validateTalk, validateWatchedAt,
  validateRate } = require('./middleware/talkerValidations.js');

const app = express();
app.use(bodyParser.json());

app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const pathTalkers = path.resolve(__dirname, '..', 'src', 'talker.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const token = newToken();
  res.status(200).json({ token });
});

app.get('/talker', async (req, res) => {
  const talkerList = JSON.parse(await fs.readFile(pathTalkers, 'utf8'));
  res.status(200).json(talkerList);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerList = JSON.parse(await fs.readFile(pathTalkers, 'utf8'));
  const talker = talkerList.find((item) => item.id === Number(id));

  if (talker) {
    return res.status(200).json(talker);
  }

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/talker', authentication, validateName, validateAge, validateTalk,
validateWatchedAt, validateRate, async (req, res) => {
  const newTalker = { ...req.body };
  const talkerList = JSON.parse(await fs.readFile(pathTalkers, 'utf8'));
  const newId = talkerList[talkerList.length - 1].id + 1;
  const currentTalker = { ...newTalker, id: newId };
  const newTalkerList = [...talkerList, currentTalker];
  await fs.writeFile(pathTalkers, JSON.stringify(newTalkerList));
  res.status(201).json(currentTalker);
});

app.put('/talker/:id', authentication, validateName, validateAge, validateTalk,
validateWatchedAt, validateRate, async (req, res) => {
  const { id } = req.params;
  const talkerToUpdate = { ...req.body };
  const currentTalker = { ...talkerToUpdate, id: Number(id) };
  const talkerList = JSON.parse(await fs.readFile(pathTalkers, 'utf8'));
  const otherTalkers = talkerList.filter((element) => element.id !== Number(id));
  const newList = [...otherTalkers, currentTalker];
  await fs.writeFile(pathTalkers, JSON.stringify(newList));
  res.status(200).json(currentTalker);
});

app.delete('/talker/:id', authentication, async (req, res) => {
  const { id } = req.params;
  const talkerList = JSON.parse(await fs.readFile(pathTalkers, 'utf8'));
  const newList = talkerList.filter((item) => item.id !== Number(id));
  await fs.writeFile(pathTalkers, JSON.stringify(newList));
  res.status(204).json();
});

app.listen(PORT, () => {
  console.log('Online');
});
