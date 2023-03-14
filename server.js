const express = require('express');
const app = express();
const port = 3000;
const passport = require('passport');
const LocalStrategy = require('passport-local');
const controller = require('./controllers/userController');
const createError = require('http-errors');

// Passport config

passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser((user, done) => {
   done(null, user);
});


passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try{
        const user = await controller.getUserByEmail(email);
        if(!user){
          throw createError(401, 'Incorrect email or password');
        }
        if (user.password !== password){
          throw createError(401, 'Incorrect username or password');
        }
        return done(null, user);
    } catch (error) {
        done(error);
    }
  }));

app.use(passport.initialize());

// Server config

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const userRouter = require('./routes/users')

app.use('/users', userRouter);

const authRouter = require('./routes/auth-routes')

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})