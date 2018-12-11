const {objectID} = require('mongodb');
const mongoose  = require('./../db/mongoose');
const todo = require('./../models/todo')



// they all return null if id doesnr exist

let id = '5c0667c3e0335547a6e6bd20';

if (!objectID.isValid(id)){

  console.log('id not valid ');
}

//todo.findOneAndRemove
todo.findOneAndRemove({_id:id}).then((todo)=>{
  console.log(todo)
}
)
//todo.findIdAndRemove

todo.findByIdAndRemove(id).then((todo)=>{
  console.log(todo)
}
)
