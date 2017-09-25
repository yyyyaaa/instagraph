import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

export const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    { 
     user: _.pick(user, ['id', 'isAdmin']) 
    },
    secret,
    {
      expiresIn: '1m'
    }
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, ['id'])
    },
    secret2,
    {
      expiresIn: '7d'
    }
  );

  return Promise.all([createToken, createRefreshToken]);
}

export const refreshTokens = async (token, refreshToken, models, secret, secret2) => {
  let userId = -1;
  try {
    // try if decodeable
    const { user: { id }} = jwt.decode(refreshToken);
    userId = id;
  } catch(e) {
    return {};
  }

  if(!userId) {
    return {};
  }

  // try query user
  const user = await models.User.findOne({where: { id: userId }, raw: true});
  if(!user) {
    return {};
  }

  const refreshSecret = secret2 + user.password;
  try {
    // check if refreshSecret is same .ie password is right
    // cuz refreshSecret depends on password
    // so fake password gets rejected
    jwt.verify(refreshToken, refreshSecret);
  } catch(e) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, secret, secret2);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
}

export const tryLogin = async (email, password, models, secret, secret2) => {
  const user = await models.User.findOne({ where: { email } , raw: true});
  if(!user) {
    // user with provided email not found
    throw new Error('Invalid login: no user with such email');
  }

  const valid = await bcrypt.compare(password, user.password);
  if(!valid) {
    // bad password
    throw new Error('Invalid login: wrong password');
  }

  const [token, refreshToken] = await createTokens(user, secret, secret2 + user.password);
  return {
    token,
    refreshToken,
  };
}