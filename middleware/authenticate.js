
var {User} = require('./../models/user'); // this is to make the authentication more reusable
const authenticate = (req,res,next)=>{

let token = req.header('x-auth');




User.FindByToken(token).then((user)=>{

  if(!user){
    return Promise.reject();
  }

  req.user = user;
  req.token = token;
  next();
}).catch(e)=>{
  res.status(401).send();
}


}


module.exports = {
  authenticate
}
