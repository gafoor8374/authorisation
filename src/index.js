const express = require('express');

const connect = require('./configs/db');
const userController = require('./controllers/user.controller');
const productController = require("./controllers/product.controller")

const {register,login,Token}= require('./controllers/auth.controller')

// const user= require('./models/user.model')
const app = express();

const passport=require("./configs/google-oauth");

app.use(express.json());

app.use("/users",userController);

app.post("/register",register);

app.post("/login",login);
app.use("/products", productController)

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile',"email"] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.listen(5000, async (req, res) => {
    try{
      await connect();
      console.log('listening on port 5000')
    }catch(err){
        console.log(err.message);
    }
})