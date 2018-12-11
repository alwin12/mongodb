const mongoose = require('mongoose');
const  validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

  let userSchema = new mongoose.Schema({

     email: {
       type:String,
       require:true,
       trim:true,
       minlength: 1,
       unique:true,
       validate:{
        // (value)=>{
        //return validator.isEmail(value)
       //}
       validator: validator.isEmail // new sintax for the above commented code
       ,

       message: '{value} is not valid',
     }

     },

     password:{
       type:String,
       required:true,
       minlength:6
     },
     tokens: [{
       access:{
         type:String,
         required:true
       },
       token:{
         type:String,
         required:true
       }
     }]



  })

userSchema.methods.generateAuthToken = function(){ // method for instance methods
 let user = this;

  let access = 'auth';
  let token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
  console.log(token);
  user.tokens.push({access,token});
  //user.tokens = user.tokens.concat([{access,token}]);

  return user.save().then(()=>{
    return token;
  })


}

userSchema.methods.removeToken = function(token){

  let user = this

  return user.update({
    $pull:{   // pull helps to delete that token

      tokens:{
        token
      }
    }
  })

}

let userDoc;
userSchema.statics.findByToken = function(token){
  // statics for model methods

console.log('token');


let User = this;
console.log("this is: ",User);
let decoded;

 try{
   decoded = jwt.verify(token,'abc123')

 }catch(e){

// return  new Promise((resolve,reject)=>{
//
//   reject();
//
// })

return Promise.reject();

}


return User.findOne({
   _id: decoded._id,
   'tokens.token': token,
   'tokens.access': 'auth'
})

}

userSchema.static.findByCredentials = function(email,password){

 let User = this;

 return User.findOne({
   email
 }).then((user)=>{

   if(!user){
     return Promise.reject()
   }

return new Promise((resolve,reject)=>{

   bcrypt.compare(password,user.password,(err,res)=>{

 if(res){

    resolve(user);
 }else {
   reject();
 }


   })

})

})



}

userSchema.pre('save',function(next){ // this function runs before document is saved , like componentdidmount in react. It is a life cycle method we use it to hash user passwords

  let user = this;

  if(user.isModified('password')){

    bcrypt.genSalt(10,(err,salt)=>{

  bcrypt.hash(user.password,salt,(err,hash)=>{

    user.password = hash;
    next();
  })

    })

  }else{
    next();
  }
})

      const User = mongoose.model('User', userSchema );

      module.exports = {
      User: User,

      }
