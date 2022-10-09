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
