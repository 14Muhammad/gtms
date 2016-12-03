var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var mPromise = require('mpromise'); // not implemented yet
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var userSchema = new Schema({
    id : { type: Schema.ObjectId },
    email: { type: String, required: false },
    username: { type: String, required: false },
    password: { type: String, required: false },
    createdAt:{ type: Date, required: false, default: new Date()},
    updatedAt:{ type: Date, required: false, default: new Date()}
});
var userModel = mongoose.model('users', userSchema);
module.exports = userModel;

router.get('/users', function (req, res) {
    userModel.find({}, function(err, users) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        console.log(":: users ");
        res.send(users);
    });
})

router.post('/user/add', function (req, res) {
    userSchema.pre('save', function(next) {
        var currentDate = new Date();
        this.updatedAt = currentDate;
        this.createdAt = currentDate;
        next();
    });
    console.log(":: user/add ");
    var newUser = userModel(req.body);
    newUser.save(function(err) {
        if (err) throw err;
        console.log('New User created!');
        res.json({ isSignedUp: true });
    });
})

router.get('/user/:id', function (req, res) {
    userModel.findOne({'username': req.params.id}, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        console.log(":: user " + user);
        res.send(user._doc);
    });
})

router.put('/user/update/:id', function(req, res, next) {
    console.log(":: user/update ");
    userModel.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
        if (err) throw err;
        console.log('User updated!');
    });
});

router.delete('/user/delete/:id', function(req, res) {
    console.log(":: user/delete ");
    userModel.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        console.log('User deleted!');
    });
});

router.post('/user/isExists', function (req, res) {
    userModel.findOne({'email': req.body.email}, function(err, users) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }else {
            console.log(":: isExists " + users);
            if(users === null)
                res.send({ isEmailExists: false });
            else
                res.send({ isEmailExists: true });
        }
    });
})

router.post('/user/isUsernameExists', function (req, res) {
    userModel.findOne({'username': req.body.username}, function(err, users) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }else {
            console.log(":: isUsernameExists " + users);
            if(users === null)
                res.send({ isUsernameExists: false });
            else
                res.send({ isUsernameExists: true });
        }
    });
})

router.post('/user/login', function (req, res) {
    userModel.findOne({'username': req.body.username,'password': req.body.password}, function(err, users) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }else {
            console.log(":: users " + users);
            if(users === null)
                res.send({ isLoggedIn: false });
            else {
                var userData = users._doc;
                res.send({isLoggedIn: true, username : userData.username});
            }
        }
    });
})

router.post('/user/updatePassword', function (req, res) {
    userModel.update({
            'email': req.body.email
        },{
            $set:{
                password: req.body.password
            }
        },
        function(err, response) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }else {
                console.log(":: updatePassword " + response);
                if(response === null)
                    res.send({ isPasswordUpdated: false });
                else
                    res.send({ isPasswordUpdated: true });
            }
        });
})

module.exports = router;
