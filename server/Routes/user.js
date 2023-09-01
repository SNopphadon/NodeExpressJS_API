/* const express = require('express')
const router = express.Router()
const {read,list,updated,deleted, create,login,authen} = require('../Controllers/user')

//middleware
//const {auth} =require('../Middleware/auth')
//http://localhost:5005/api/user
router.get('/user',list)
router.get('/user/:id',read)
router.post('/create',create)
router.post('/login',login)
router.post('/authen',authen)
router.put('/user/:id',updated)
router.delete('/user/:id',deleted)

module.exports = router */
const express = require('express')
const router = express.Router()
const {read,list,updated,deleted,register,login} = require('../Controllers/user')
const auth = require('../Middleware/auth')
//http://localhost:5005/api/user
router.post('/register',register)
router.post('/login',login)
// Protected routes (authentication required)
router.use(auth);

// Get the authenticated user's own information
router.get('/read', (req, res) => {
    // Access the authenticated user's information from req.user
    const user = req.user;

    // Your logic to respond with user information
    res.json(user);
});

// Other routes requiring authentication
router.get('/read/:id', read);
router.put('/user/:id', updated);
router.delete('/user/:id', deleted);
router.get('/list',list)

module.exports = router