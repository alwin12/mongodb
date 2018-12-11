//const MongoClient = require('mongodb').MongoClient;
//or
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect(`mongodb://localhost:27017/TodoApp`,{ useNewUrlParser: true },(err,client)=>{

if (err){

  return console.log('connection failed ');
}

console.log('connected to Mongodb server ');
const db = client.db('TodoApp')

// db.collection('Todos').find().toArray().then((data)=>{
//   console.log(data);
// })  //to fetch all data

// db.collection('Todos').find({completed:true}).toArray().then((docs)=>{
//   console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
//
//   console.log('error');
// }) // to filter data

db.collection('Todos').find({_id: new ObjectID('5c00d3159ec37f42c5272ace')}).toArray().then((docs)=>{
  console.log('Todos: ',JSON.stringify(docs,undefined,2));
},(err)=>{

  console.log('error');
})  // to query based on id

 db.collection('Todos').find().count().then((count)=>{
  console.log('count: ',count);
},(err)=>{

  console.log('error');
 }) // to count the number of docs

client.close();
})
