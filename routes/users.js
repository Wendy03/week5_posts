var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/users');

/* GET users listing. */
router.get('/', UsersControllers.getUser);
router.post('/', UsersControllers.creatUser);
router.patch('/:id', UsersControllers.editUser);

module.exports = router;
