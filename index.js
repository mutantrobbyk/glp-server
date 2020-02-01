require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const {CONNECTION_STRING, SERVER_PORT} = process.env
const authCtrl = require('./controllers/authController')
app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DB Connected')
  
    app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT} yo!`))
})

