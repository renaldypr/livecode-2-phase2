const Status = require('../models/status')

module.exports = {
  showAll: function(req,res) {
    Status.find()
      .populate('userId')
      .sort({createdAt: -1})
      .exec((err, status) => {
        if (!err) {
          res.status(200).json({
            message: 'show all status success',
            data: status
          })
        } else {
          res.status(500).json({
            message: err
          })
        }
      })
  },
  create: function(req,res)  {
    Status.create({
      userId: req.decoded.id,
      status: req.body.status
    })
      .then(status => {
        res.status(201).json({
          message: 'status created successfully!',
          data: status
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  },
  erase: function(req,res) {
    Status.find({ _id: req.body.id }, function(err,status) {
      if(!err) {
        if (status.length !== 0) {
          if (status[0].userId == req.decoded.id) {
            Status.deleteOne({ _id: req.body.id }, function (err) {
              if(!err) {
                res.status(200).json({
                  message: 'status deleted successfully',
                })
              } else {
                res.status(500).json({
                  message: err
                })
              }
            })
          } else {
            res.status(403).json({
              message: 'you are not the owner of this status!'
            })
          }
        } else {
          res.status(404).json({
            message: 'the requested status is not available'
          })
        }    
      } else {
        res.status(500).json({
          message: err
        })
      }
    })
  }
}