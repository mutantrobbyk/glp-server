require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env
const authCtrl = require('./controllers/authController')
const pointCtrl = require('./controllers/pointController')
app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 }
}))
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DB Connected')
  
    app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT} yo!`))
})

//Authentication
app.post('/api/users/registration', authCtrl.registerUser )
app.post('/api/users/login', authCtrl.loginUser)
app.delete('/api/users/logout', authCtrl.logoutUser)

//Adding Points
app.put('/api/users/points/:phone_number/:business_id', pointCtrl.changePoints) //Important that the phone number is passed in first and then the business id on the params
app.get('/api/users/points')

