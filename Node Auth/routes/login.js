var express = require('express');
var router = express.Router();
var passport =require('passport');
var LocalStrategy=require('passport-local').Strategy;
var express = require('express')
var User = require('../models/user.js')


router.get('/',function(req,res,next){
  res.render('login',{title:'Log In'});
});

//session management
passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  User.getUserById(id,function(err,user){
    done(err,user);
  });
});
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass'
  },
  function(email,password,done){
    User.getUserByEmail(email,function(err,user){
      if(err) throw err;
      if(!user){
        console.log("Unknown User");
        return done(null,false,{message:'Unknown User'});
      }//if(!user)
      User.comparePassword(password,user.password,function(err,isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null,user);
        }else {
          console.log('Invalid Password')
          return done(null,false,{message:'Invalid Password'});
        }
      })
    })//getUserByEmail
  }//function
));//local Strategy
router.post('/',passport.authenticate('local',{failureRedirect:'/register',failureFlash:"Invalid Username And Password"}),function(req,res){
  console.log("authentication Succesful");
  req.flash('success','You Are Logged In');
  res.redirect('/');
})
module.exports  = router
