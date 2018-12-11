  const express = require('express');
  const bodyParser = require('body-parser')
  const {ObjectId} = require('mongodb');
  const bcrypt = require('bcryptjs');

//  const {authenticate} = require('./middleware/authenticate')
  const _ = require('lodash')

  const {mongoose} = require('./db/mongoose');
  const {Todo} = require('./models/todo');
  const {User} = require('./models/user.js');


  let app = express();
  app.use(bodyParser.json());

process.env.port = 3000;
const PORT = process.env.port;
 app.post('/todos',(req,res)=>{
   let newTodo = new Todo({
       text: req.body.text
   })

 newTodo.save().then((doc)=>{
   console.log(doc)
   res.send(doc);
 },(err)=>{
   console.log(err);

   res.status(400).send(err);
 })


 })

app.get('/todos',(req,res)=>{

  Todo.find().then((todos)=>{

    res.status(200).send({todos});


  },(err)=>{
    res.status(400).send('cannot fetch todos');
  })

})

app.get('/todos/:id',(req,res)=>{
 let id = req.params.id;
if(!ObjectId.isValid(id)){
  res.status(404).send();
}

 Todo.findById(id).then((doc)=>{

   res.status(200).send(doc);

 },(err)=>{
   console.log(err)
 })

})

app.delete('/todos/:id',(req,res)=>{
  let id = req.params.id;
  if(!ObjectId.isValid(id)){
   res.status(404).send();
  }


 Todo.findByIdAndRemove(id).then((todo)=>{

 res.status(200).send(todo);


}
).catch((e)=>{
  res.status(400).send();
})


})

app.patch('/todos/:id',(req,res)=>{

 let id = req.params.id;
 let body = _.pick(req.body,['text','completed']); // thiis method from lodash pulls text and completed values if they exists
 // which is good error handling as we dont want front end to change stuffs we dont want it to be changed
if (_.isBoolean(body.completed)&& body.completed){

  body.completedAt = new Date().getTime();
}
else {

  body.completed = false;
  body.completedAt = null;
}
Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
  if(!todo){
    res.status(404).send();
  }
  res.status(200).send();
}).catch((e)=>{
  res.status(400).send();
})

})

app.post('/users',(req,res)=>{

   let body = _.pick(req.body,['email','password']);

   var user = new User(body);

   user.save().then(()=>{


    return user.generateAuthToken();


   }).then((token)=>{

     console.log(token);
     res.header('x-auth',token).send(user);  // sending token as http header

   })
   .catch((e)=>{res.status(404).send(e)})

})
const authenticate = (req,res,next)=>{
  //   let token = req.header('x-auth');
  // User.findByToken(token).then((user)=>{
  //
  //   if(!user){
  //     return Promise.reject();
  //   }
  //
  //   req.user = user;
  //   req.token = token;
  //   next();
  // }).catch(e)=>{
  //   res.status(401).send();
  // }
  next();
}

app.get('/users/me',(req,res)=>{ //authenticate is a middleware function defined in autheticate/authenticate.js , it modifies the req so that the authentication process is reusable
  let token = req.header('x-auth')


  User.findByToken(token).then((user)=>{

  if(!user){
    return Promise.reject();
  }

  res.status(200).send(req.user);
  }).catch(e)=>{
  res.status(401).send();
  }


})
app.post('/users/login',(req,res)=>{
   let body = _.pick(req.body,["email","password"]);


 User.findByCredentials(body.email,body.password).then((user)=>{

   return user.generateAuthToken().then((token)=>{

     res.header('x-auth',token).send(user);
   })

 }).catch((e)=>{
    res.status(400).send();
 })



})

app.post("users/me/token",(req,res)=>{

  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }).catch((e)=>{
     res.status.send();
  })

})
app.listen(PORT,()=>{
  console.log('listening to port: ',PORT)
})
