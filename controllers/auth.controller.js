const { newUser } = require('../services/auth.services')
const path = require("path")
const passport = require('passport')

const renderLogin = (req, res, next) => {
    res.render("pages/login", { title: "Home" })
}

const renderRegister = (req, res, next) => {
    res.render("pages/Register", { title: "Registro" })
}

const register = async (req, res, next) => {
    let { firstname, lastname, email, password } = req.body

    try {
        await newUser({ firstname, lastname, email, password });
        res.redirect("/login")

    } catch (error) {
        next(error)
    }

}



const logout = (req, res) => {
    req.logout()
    return res.redirect("/login")

}

const localAuthStrategy = passport.authenticate("local", {
    successRedirect: '/categoria',
    failureRedirect: '/login',

})

const gAuthStrategy = passport.authenticate("google", {
    session: true,
    scope: ['email', 'profile']
});

const fAuthStrategy = passport.authenticate("facebook", {
    session: true,
    scope: ['email', 'public_profile']
});

const gCallback = passport.authenticate("google",{
    successRedirect: '/categoria',
    failureRedirect: '/login',
  })

  const fCallback = passport.authenticate("facebook",{
    successRedirect: '/categoria',
    failureRedirect: '/login',
  })

module.exports = {
    renderLogin,
    renderRegister,
    register,
    logout,
    localAuthStrategy,
    gAuthStrategy,
    fAuthStrategy,
    gCallback,
    fCallback
}