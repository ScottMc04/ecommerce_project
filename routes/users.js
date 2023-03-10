const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')


router.get('/', controller.getUsers);

router.get('/:userId', controller.getUserById)  

router.post('/register', controller.addUser)

router.put('/:userId', controller.updateUser)

module.exports = router; 