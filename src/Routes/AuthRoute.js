const { userSignup } = require('../Controllers/userController')

const router = require('express').Router()

router.post('/sign-up', userSignup)

module.exports = router

  // , (req, res, next) => { console.log(req.body, "from route") }