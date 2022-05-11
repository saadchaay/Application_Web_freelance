const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const { SECRET_KEY, AUTH_TOKEN_EXPIRY } = require('../config');

//pour verfier token (l'extistance, la validite, l'expration)
function checkAuth(context) {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};

//pour la generation des token
function genrateToken(compte) {
    return jwt.sign(
        {
            ID: compte._id,
            Email: compte.Email,
            Username: compte.Username,
			TypeCompte: compte.TypeCompte
        },
        SECRET_KEY,
        { expiresIn: AUTH_TOKEN_EXPIRY}
    );
}

module.exports = {
    genrateToken,
    checkAuth
};