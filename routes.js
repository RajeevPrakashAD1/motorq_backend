const express = require('express');

const ruserController = require('./registeredUsers/userController');

const router = express.Router();

router.post('/register', ruserController.createUser);

router.get('/getRegisteredUsers', ruserController.getAllUsers);
router.get('/oneRegisteredUser', ruserController.getOneUser);
router.post('/login', ruserController.loginUser);
router.post('/adminlogin', ruserController.loginAdmin);
module.exports = router;
