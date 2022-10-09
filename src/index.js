const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
const path = require('path');

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

app.listen(PORT, () => {
  console.log('Online');
});
