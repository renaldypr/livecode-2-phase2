const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  showAll: function(req,res) {
    User.find(function(err, users) {
      if (!err) {
        res.status(200).json({
          message: 'show all users success!',
          data: users
        })
      } else {
        res.status(500).json({
          message: err
        })
      }
    })
  },
  create: function(req,res)  {
    User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        res.status(201).json({
          message: 'user created successfully!',
          data: user
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  },
  login: function(req,res) {
    User.find({$or:[{username: req.body.input},{email: req.body.input}]}, function(err, user) {
      if (!err) {
        if (user.length !== 0) {
          if (bcrypt.compareSync(req.body.password, user[0].password)) {
            jwt.sign({ id: user[0]._id, username: user[0].username, name: user[0].name, email: user[0].email }, process.env.JWT_KEY, function(err, token) {
              res.status(200).json({
                message: 'login success!',
                token: token,
                username: user[0].username,
                email: user[0].email,
                id: user[0]._id
              })
            })
          } else {
            res.status(500).json({
              message: 'login failed!'
            })
          }
        } else {
          res.status(404).json({
            message: 'user not found!'
          })
        }
      } else {
        res.status(500).json({
          message: err
        })
      }
    })
  },
  random: function(req,res) {
    User.aggregate([
        { "$match": { "email": { "$ne": req.body.email } } },
        { "$sample": { "size": 3 } }
    ])
    .exec((err, users) => {
      if (!err) {
        res.status(200).json({
          message: 'random users success!',
          data: users
        })
      } else {
        console.log(err)
        res.status(500).json({
          message: err
        })
      }
    })
  },
  showOne: function(req,res) {
    User.find({email:req.params.id})
      .populate('followers')
      .exec((err, user) => {
        if (!err) {
          if (user) {
            res.status(200).json({
              message: 'find user success!',
              data: user
            })
          } else {
            res.status(404).json({
              message: 'user not found'
            })
          }       
        } else {
          res.status(500).json({
            message: err
          })
        }
      })
  },
  follow: function(req,res) {
    User.findByIdAndUpdate(req.params.id, {$push: {"followers": req.decoded.id}}, {safe: true, upsert: true, new : true}, function(err, user) {
      if (!err) {
        res.status(200).json({
          message: 'follow success!',
          data: user
        })
      } else {
        res.status(500).json({
          message: err
        })
      }
    })
  }
}