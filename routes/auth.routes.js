const {Router} = require('express');
const authCtrl = require('../controllers/auth.controller');

const authRouter = Router();



// Authentication Flow
authRouter.get('/login', authCtrl.renderLogin)
authRouter.post('/login',authCtrl.localAuthStrategy)
authRouter.get('/registro', authCtrl.renderRegister)
authRouter.post('/registro', authCtrl.register)
authRouter.get("/logout", authCtrl.logout)

// Authentication external sources
authRouter.get("/auth/google", authCtrl.gAuthStrategy)
authRouter.get("/auth/facebook", authCtrl.fAuthStrategy)
authRouter.get("/auth/google/callback",authCtrl.gCallback)
authRouter.get("/auth/facebook/callback",authCtrl.fCallback)



module.exports = authRouter;