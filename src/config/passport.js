const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; //Se puede tambien via twitter,fb,google...

const mongoose = require("mongoose");
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Not User found." });
      } else {
        // Match Password's User
        const match = await user.matchPassword(password);
        if (match) {
        //  if(user.email==="admin@gmail.com"){
              //meter admin
        //      return done(null,admin);
       //   }else{
          return done(null, user);//}


        } else {
          return done(null, false, { message: "Incorrect Password." });
        }
      }
    }
  )
);
//Evitar logeo constante, almacenando en sesion el id del usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//Proceso inverso
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
