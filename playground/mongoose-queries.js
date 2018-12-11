const {objectID} = require('mongodb');
const mongoose  = require('./../db/mongoose');
const todo = require('./../models/todo')



// they all return null if id doesnr exist

let id = '5c0667c3e0335547a6e6bd20';

if (!objectID.isValid(id)){

  console.log('id not valid ');
}

// find returns all data without argyments
 todo.find({  
 _id: id

 }).then((todos)=>{console.log(todos)})

todo.findOne({ // this is good for a single data as it doesnt return an array of objects
  _id:id
}).then((todos)=>{console.log(todos)})


todo.findbyId(id).then((todos)=>{
 if (!todos){return console.log('id not found ')}


  console.log(todos)})
