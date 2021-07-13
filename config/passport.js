const passport = require('passport')
const { users } = require('../models')
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config()

passport.use(new LocalStrategy({

    usernameField: 'email'

}, async (email, password, done) => {

    try {
        let result = await users.findOne({ where: { email } })

        if (result && bcrypt.compareSync(password, result.password)) {
            return done(null, result)
        }
        return done(null, false)

    } catch (e) {
        done(e);
    }

}))


passport.use(new GoogleStrategy({

    clientID: process.env.CLIENTE_ID_GOOGLE,
    clientSecret: process.env.SECRET_GOOGLE,
    callbackURL: process.env.CALL_BACK_URL

}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}));


passport.use(new FacebookStrategy({

    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: process.env.FB_CALLBACK,
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}));




passport.serializeUser((profile, done) => {
    return done(null, profile)
})

passport.deserializeUser(async (profile, done) => {

    try {
        switch (profile.provider) {

            case 'google':
                profile.firstname = profile.name.givenName;
                profile.lastname = profile.name.familyName;
                return done(null, profile)
                break;

            case 'facebook':
                profile.firstname = profile.name.givenName;
                profile.lastname = profile.name.familyName;
                return done(null, profile)
                break;

            default:
                let user = await users.findByPk(profile.id, { plain: true });
                return done(null, user)
                break;
        }

    } catch (e) {
        done(e)
    }
})