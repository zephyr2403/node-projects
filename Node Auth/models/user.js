var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
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
    type:String,required:true,bcrypt:true
  },
  email:{
    type:String
  },
  profileimage:{
    type:String
  }
});

var User = module.exports = mongoose.model('User',UserSchema);
module.exports.getUserByEmail = function(email,callback){
  var query = {email : email};
  User.findOne(query,callback);
}

module.exports.getUserById = function(id,callback){
  User.findById(id,callback);
}
module.exports.comparePassword = function(candidate,hash,callback){
  bcrypt.compare(candidate,hash,function(err,isMatch){
    if(err) return callback(error);
    callback(null,isMatch);
  })
}
//Var User = mongoose.model('User',UserSchema)
//module.exports = User
module.exports.createUser = function(newUser,callback) {
  bcrypt.hash(newUser.password,10,function(err,hash){
    if(err) throw err;
    //Create Hashed password
    newUser.password = hash;
    //Create User
    newUser.save(callback);
  });


}
