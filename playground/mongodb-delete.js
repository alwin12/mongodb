//const MongoClient = require('mongodb').MongoClient;
//or
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect(`mongodb://localhost:27017/TodoApp`,{ useNewUrlParser: true },(err,client)=>{

if (err){

  return console.log('connection failed ');
}

console.log('connected to Mongodb server ');
const db = client.db('TodoApp')

// to delete all documents with text: die
//db.collection('Todos').deleteMany({text:'die'}).then((result)=>{console.log(result)},(err)=>{console.log(err)})

// to delete only one document
db.collection('Todos').deleteOne({text:'drink water'}).then((result)=>{console.log(result)},(err)=>{console.log(err)})

// findOneAndDelete returns the deleted docs as well could be used for undo purposed
db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{console.log(result)},(err)=>{console.log(err)})
client.close();
})
