const express = require('express')
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');
const knex = require('knex');


const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image')


const db = knex({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      user : 'apple',
      password : 'viguniah',
      database : 'smartBrain'
    }
  });
  db.select('*').from('users').then(data => {
    console.log(data)
  })


const app = express();
//should after app defined
app.use(express.json());
app.use(cors())

app.get ('/',(req,res) => {
    res.send(database.user);
})

app.post('/signin', (req,res) => { 
    signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => { 
    register.handleRegister(req, res, db, bcrypt) 
})

app.get('/profile/:id', (req,res) => {
    profile.handleProfile(req, res, db)
})

app.put('/image', (req,res) => {
    image.handleImage(req, res, db)
})

app.post('/image', (req,res) => {
    image.handleApi(req, res)
})


app.listen(3004,() => {
    console.log('app is running on portal 3004')
})


/* API design
1. / -->root route
2./signin route  --> post  - we request for user info / responds either success/ fail
3./register -->  POST = return new user object
4./profile/:userid --> GET = user
5./image --> PUT --> user
*/