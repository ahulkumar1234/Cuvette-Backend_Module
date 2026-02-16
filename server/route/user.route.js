const express = require('express');
const { createUser, loginUser, logoutUser, updateUser, registerAdmin, getMe } = require('../controller/user.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();


router.get("/me", auth, getMe);

router.post("/admin/register", registerAdmin);

router.post('/register', createUser);

router.post('/login', loginUser);

router.put('/update/:id', auth, updateUser)

router.post('/logout/:id', auth, logoutUser);




module.exports = router