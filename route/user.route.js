const express = require('express');
const { createUser, loginUser, logoutUser, updateUser } = require('../controller/user.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();




router.post('/register', createUser);

router.post('/login', loginUser);

router.put('/update/:id', auth, updateUser)

router.post('/logout/:id', auth, logoutUser);




module.exports = router