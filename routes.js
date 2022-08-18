const express = require('express');

const ruserController = require('./registeredUsers/userController');
const eventController = require('./events/eventController');
const registerEventController = require('./registeredEvent/registeredEventController');

const router = express.Router();

router.post('/register', ruserController.createUser);

//user route
router.get('/getRegisteredUsers', ruserController.getAllUsers);
router.post('/oneRegisteredUser', ruserController.getOneUser);
router.post('/login', ruserController.loginUser);
router.post('/registerEvent', ruserController.registerEvent);
router.post('/getRegisteredEvents', ruserController.getRegisteredEvents);
router.post('/deregister', ruserController.deregisterEvent);

//admin route
router.post('/adminlogin', ruserController.loginAdmin);
router.post('/verify', ruserController.verify);

//event route
router.post('/createEvent', eventController.createEvent);
router.get('/getEvents', eventController.getAllEvent);
router.post('/oneEvent', eventController.getOneEvent);
router.post('/updateEvent', eventController.updateEvent);
router.post('/deleteEvent', eventController.deleteEvent);
module.exports = router;

//register for event handlers
