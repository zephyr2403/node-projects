var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthentication,function(req, res, next) {
  res.render('index', { title: 'Home' });
});

function ensureAuthentication(req,res,next)
{
  if(req.isAuthenticated())//Passport authenticate API
    return next();
  res.redirect('/login');
}
module.exports = router;
