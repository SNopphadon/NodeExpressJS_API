const express = require('express')
const router = express.Router()
const {read,list,updated,deleted,register,login} = require('../Controllers/user')
const auth = require('../Middleware/auth')
//http://localhost:5005/api/user
router.post('/register',register)
router.post('/login',login)
// Protected routes (authentication required)
router.get('/read/:id',auth, read);
router.put('/user/:id',auth, updated);
router.delete('/user/:id',auth, deleted);
router.get('/list',auth,list)

module.exports = router