var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/nodeauth')
var db = mongoose.connection;

//User Schema
var UserSchema = mongoose.Schema({
  fname :{
    type:String,
    index:true
  },
  lname:{
    type:String
  },
  password:{
    type:String
  },
  email:{
    type:String
  },
  profileimage:{
    type:String
  }
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser,callback) {
  newUser.save(callback);

}
