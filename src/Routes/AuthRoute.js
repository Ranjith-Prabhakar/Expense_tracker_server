const { userSignup, userLogin, isUserLogin } = require('../Controllers/userController')

const router = require('express').Router()

router.post('/sign-up', userSignup)
router.post('/login', userLogin)

module.exports = router

  // , (req, res, next) => { console.log(req.body, "from route") }