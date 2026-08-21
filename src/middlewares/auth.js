const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const UserModel = require("../models/user");

passport.use(
    "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ||"SECRET",
    },
   async (jwtPayload, cb) => {
    try{
        const email = jwtPayload.email;
        const user = await UserModel.findOne({email: jwtPayload.email, deleted: false });
        if(user){
            return cb(null, user);
        } else{
            return cb(new Error("Usuario no encontrado"));
        }
    } catch (err){
        return cb(err);
    }
    }
  )
);

    module.exports = passport;