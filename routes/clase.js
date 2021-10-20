const {Router} = require('express');

const {body,check}= require('express-validator');

const router = new Router();

router.get('/',getclases);

router.post('/',crearclase);

router.put('/',actuclase);




module.exports = router;