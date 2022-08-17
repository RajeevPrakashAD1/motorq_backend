const express = require('express');

const ruserController = require('./registeredUsers/userController');
const eventController = require('./events/eventController');

const router = express.Router();

router.post('/register', ruserController.createUser);

//user route
router.get('/getRegisteredUsers', ruserController.getAllUsers);
router.get('/oneRegisteredUser', ruserController.getOneUser);
router.post('/login', ruserController.loginUser);

//admin route
router.post('/adminlogin', ruserController.loginAdmin);

//event route
router.post('/createEvent', eventController.createEvent);
router.get('/getEvents', eventController.getAllEvent);
module.exports = router;
