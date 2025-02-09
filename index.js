const express = require("express")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const { ErrorHandler } = require('./src/middleware/ErrorHandler')
const mongoose = require('mongoose')
const AuthRoute = require("./src/Routes/AuthRoute")
const cors = require("cors")
const app = express()

app.use(cors({
  origin: "*",
  // credentials:true
}))
app.use(cookieParser())
app.use(express.json({ limit: "50mb" }))

app.use('/auth', AuthRoute)

app.use(ErrorHandler)
app.listen(5000, async () => {
  console.log('servers started on 5000')
  mongoose.connect(process.env.DB_URL)
    .then((data) => { console.log(data.connection.host) })
    .catch((error) => {
      console.log(error.message)

    })
})
