//const MongoClient = require('mongodb').MongoClient;
//or
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect(`mongodb://localhost:27017/TodoApp`,{ useNewUrlParser: true },(err,client)=>{

if (err){

  return console.log('connection failed ');
}

console.log('connected to Mongodb server ');
const db = client.db('TodoApp')

// db.collection('Todos').insertOne({   //db.collection() creates a new collection with Todos is not created before and insertOne() inserts into the database
//
//   text: 'Something to do',
//   completed:false
// },(err,result)=>{
//
// if (err){
//   return console.log('insertion failed ',err)
// }
//
// console.log(JSON.stringify(result.ops,undefined,2))
//
// })

db.collection('Users').insertOne({
  name: 'Alwin',
  age: 20,
  location: '17 millswyn street, craigieburn'

},(err,result)=>{
  if (err){
   return console.log('insertion failed ',err)
 }
  console.log(JSON.stringify(result.ops,undefined,2))

})

client.close();
})
