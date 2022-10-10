const generateToken = (length) => Math.random().toString(20).substring(2, length);

const verifyToken = () => {
  const newToken = generateToken(16);
  if (newToken.length < 16) {
    const value = (16 - newToken.length) + 2;
    const addToken = generateToken(value);
    const token = newToken + addToken;
    return token;
  }
  return newToken;
};

module.exports = verifyToken;

// para 'generateToken' e 'verifyToken' foi consultado:
// o site DEV (https://dev.to/oyetoket/fastest-way-to-generate-random-strings-in-javascript-2k5a),
// as documentações no MDN (https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/toString), (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) e (https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/substring),
// e os sites StackOverflow (https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details)
// e Wikipedia (https://en.m.wikipedia.org/wiki/Radix)