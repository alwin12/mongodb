//const MongoClient = require('mongodb').MongoClient;
//or
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect(`mongodb://localhost:27017/TodoApp`,{ useNewUrlParser: true },(err,client)=>{

if (err){

  return console.log('connection failed ');
}

console.log('connected to Mongodb server ');
const db = client.db('TodoApp')

db.collection('Todos').findOneAndUpdate({
  _id: new ObjectID('5c00d3159ec37f42c5272ace')
},{
  $set: {
    completed:true,
    text: 'updated text'
  }
},{
returnOriginal:false

  }



).then((result)=>{console.log(result)},(err)=>{
  console.log('error');
})
client.close();
})
