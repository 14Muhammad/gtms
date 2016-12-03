var express = require('express');

/*
 express.Router class to create modular, mountable route handlers.
 A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a �mini-app�.
 The following example creates a router as a module, loads a middleware function in it,
 defines some routes, and mounts the router module on a path in the main app.
 */

var router = express.Router();
/*

 Before we can handle CRUD operations, we will need a mongoose Model.
 These models are constructors that we define.
 They represent documents which can be saved and retrieved from our database.
 The mongoose Schema is what is used to define attributes for our documents.
 Mongoose Methods can also be defined on a mongoose schema.

 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose); //Provides Double support for Mongoose.
var mPromise = require('mpromise'); // not implemented yet
/*
 SchemaTypes handle definition of path defaults, validation, getters, setters,
 field selection defaults for queries and other general characteristics for Strings and Numbers.
 Following are all valid Schema Types.

 String
 Number
 Date
 Buffer
 Boolean
 Mixed
 Objectid
 Array
 */
var SchemaTypes = mongoose.Schema.Types;

/*
 Everything in Mongoose starts with a Schema.
 Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
var Schema = mongoose.Schema;
var todoSchema = new Schema({
  id : { type: Schema.ObjectId },
  date: { type: Date, required: true },
  user:{ type: String, required: false , default: 'admin'},
  text:{ type: String, required: false },
  position:{ type: String, required: false },
  listId:{ type: String, required: false },
  startDate:{ type: String, required: false },
  isDone: {type: String, required:false},
  deletedAt:{ type: Date, required: false, default: null},
  createdAt:{ type: Date, required: false, default: new Date()},
  updatedAt:{ type: Date, required: false, default: new Date()}
});

// the schema is useless so far
// we need to create a model using it

var todoModel = mongoose.model('todos', todoSchema);

// make this available to our users in our Node applications

module.exports = todoModel;

// get all the todos (accessed at GET http://localhost:8081/gtms/todos)
router.get('/todos/:user', function (req, res) {
  /*
   Finding documents is easy with Mongoose, which supports the rich query syntax of MongoDB.
   Documents can be retrieved using each models find, findById, findOne, or where static methods.
   */
  todoModel.find({'user':req.params.user}, function(err, todos) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(":: todos ");
    res.send(todos);
  });
})

// create the new todo (accessed at POST http://localhost:8899/gtms/todo/add)
router.post('/todo/add', function (req, res) {
  todoSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updatedAt = currentDate;
    this.createdAt = currentDate;
    next();
  });
  console.log(":: todo/add ");

  // create a new instance of the todo model
  var newTodo = todoModel(req.body);

  // save the todo and check for errors
  newTodo.save(function(err) {
    if (err) throw err;
    console.log('New Todo created!');
    res.json({ isAdded: true });
  });
})

// update the previous todo with id (accessed at PUT http://localhost:8081/gtms/todo/update)
router.put('/todo/update/:id', function(req, res, next) {
  console.log(":: todo/update ");
  todoModel.findByIdAndUpdate(req.params.id, req.body, function(err, todo) {
    if (err) throw err;
    console.log('Todo updated!');
    res.json({ isUpdated: true });
  });
});

// delete the todo with id (accessed at PUT http://localhost:8081/gtms/todo/delete)
router.delete('/todo/delete/:id', function(req, res) {
  console.log(":: todo/delete ");
  todoModel.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw err;
    console.log('Todo deleted!');
    res.json({ isDeleted: true });
  });
});

module.exports = router;
