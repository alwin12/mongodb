const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password ='123abc!';

bcrypt.genSalt(10,(err,salt)=>{

  bcrypt.hash(password,salt,(err,hash)=>{

console.log(hash);

  })
})

let hashPassword = '';
bcrypt.compare(password,hashPassword,(err,result)=>{

if (result){
  console.log('logged in')
}


})

// let data = {
//   id: 10
// }
//  let token = jwt.sign(data,'123abc');
//  console.log(token);
//
//  let decoded = jwt.verify(token,'123abc');


// let message = "I am user number 3";
// let hash = SHA256(message).toString();
//
// console.log(hash);
//
//
//
// let data ={
//   id: 4
// };
//
// let token = {
//
// data,
// hash: SHA256(JSON.stringify(data)+'somesecret').toString   //somesecret could be a salt
//
// }
//
// let resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();
//
//
// if(resultHash === token.hash){
//   console.log('data was not changed')
// }
// else {
//   console.log('data was changed');
//
// }
