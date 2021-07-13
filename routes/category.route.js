const {Router} = require('express');
const catCtrl = require('../controllers/category.controller');
const protectedRoutes = require('../middlewares/protect-routes')
const router = Router();

router.get('/categoria', protectedRoutes ,catCtrl.renderCategory)


module.exports = router