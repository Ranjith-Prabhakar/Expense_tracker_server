const { userSignup, userLogin, addMember, addTransaction } = require('../Controllers/userController')

const router = require('express').Router()

router.post('/sign-up', userSignup)
router.post('/login', userLogin)
router.post("/add-member",addMember)
router.post("/add-transaction",addTransaction)

module.exports = router

  // , (req, res, next) => { console.log(req.body, "from route") }