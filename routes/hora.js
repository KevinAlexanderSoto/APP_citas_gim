const {Router} = require('express');

const {body,check}= require('express-validator');

const router = new Router();


router.get('/',gethoras);

router.post('/',crearhora);

router.put('/',actuhora);




module.exports = router;