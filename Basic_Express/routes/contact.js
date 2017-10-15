var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
  res.render('contact',{title:'Contact' });
});

router.post('/send',function(req,res,next){
  var transportor = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ashutosh.extrimis.2403@gmail.com', // email that we use to send email
      pass: 'ashutosh2403'
    }
  });

  var mailoptions ={
    from: 'dante <ashutosh.dragonbreath@gmail.com>',
    to: 'payome@nypato.com',
    subject: 'NodeMailer Test',
    text: 'Sending Details .. Name'+req.body.name+'email '+req.body.email,
    html: '<p>You Have New Submission</p>'
  };

  transportor.sendMail(mailoptions,function(error,info){
    if(error)
    {
      console.log(error);
      res.redirect('/about');
    }else {
      console.log('Message sent : ');
      res.redirect('/');
      }
    });
});

module.exports = router;
