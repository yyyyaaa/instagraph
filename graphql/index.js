import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import models from './models';
import schema from './schema';
import { refreshTokens } from './auth';

const willForceSync = process.env.NODE_ENV === 'development';
console.log("SYNC " + willForceSync);

const SECRET = 'opqxt|l_q?L{(&b+sgEiy8RnY[';
const SECRET_2 = 'kzE)D`bp_eKt)32Ha~u4a1@SbG{)=*';
var app = express();

const addUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }

  try {
    const { user } = await jwt.verify(token, SECRET);
    req.user = user;
  } catch(e) {
    const refreshToken = req.cookies['refresh-token'];

    if (!refreshToken) {
      return next();
    }

    const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET_2);
    if(newTokens.token && newTokens.refreshToken) {
      res.cookie('token', newTokens.token, { maxAge: 60 * 60 * 24 * 7, httpOnly: false });
      res.cookie('refresh-token', newTokens.refreshToken, 
        { maxAge: 60 * 60 * 24 * 7, httpOnly: false }
      );
    }
    req.user = newTokens.user;
  }
  return next();
}

// Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(addUser);
app.use(morgan('dev'));
app.use('/graphql', bodyParser.json(), graphqlExpress((req, res) => ({ 
  schema,
  context: { 
    models,
    SECRET,
    SECRET_2,
    user: req.user,
    res
  },
}))
);
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

models.sequelize.sync({ force: willForceSync }).then( () => {
  app.listen(process.env.PORT || 4000);
  console.log("Server is listening on port: 4000");
});
