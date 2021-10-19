const {Router} =  require('express');
const {check}= require('express-validator');
const { login } = require('../controllers/logincontroller');

const router = new Router();


router.post('/',login);



module.exports= router;