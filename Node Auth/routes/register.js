var express = require('express')
var router = express.Router()

router.get('/',function(req,res,next){
  res.render('register',{title:'Register'});
});

router.post('/',function(req,res,next){
  //getting form value
  console.log('hey');
  var fname = req.body.fname;
  var lname =req.body.lname;
  var email =req.body.email
  var pass = req.body.pass;
  var repass=req.body.repass;

  //Checking for image field
  if(req.files.profileimage)
  {
    console.log('uploading image .. ');
    //Storing Uploaded Image Details in Variables
    var imageorigname = req.files.profileimage.originalname;
    var imagename= req.files.profileimage.name;
    var imagemime= req.files.profileimage.mimetype;
    var imagepath= req.files.profileimage.path;
    var imageextension= req.files.profileimage.extension;
    var imagesize= req.files.profileimage.size;
  }
  else {
      //If no image is selected a default image will be shown
      var image  = 'noimage.png';
    }

    //Form Validation.
                          //(name , error-to-be-displayed)
    req.checkBody('fname','First Name is Required Field').notEmpty();
    req.checkBody('lname','Last Name is Required Field').notEmpty();
    req.checkBody('email','Email Required Field').notEmpty();
    req.checkBody('email','Invalid Field').isEmail();
    req.checkBody('pass','Password Is Required Field').notEmpty();
    req.checkBody('repass','Two Password Field Donot Match').equals(req.body.pass);

    //Check For Errors

    var  errors = req.validationErrors();

    if(errors){
      res.render('register',{
        errors : errors,
        fname:fname,
        lname:lname,
        email:email
      });
    }
    else { //If No Error
        //Model To Encapsulate User Function
        var newUser = new User({
          fname:fname,
          lname:lname,
          email:email,
          password:pass,
          profileimage: imagename
        });
        //Create User
        //User.createUser(newUser,function(err,user){
          //if(err) throw err;
          //console.log(user);
        //});

        //Success Messsage
        req.flash('success','You Are Now Registered And May Log In');

        res.location('/');
        res.redirect('/');

      }
});
module.exports = router;
