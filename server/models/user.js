const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your name!']
  },
  username: {
    type: String,
    required: [true, 'Please input your username!']
  },
  password: {
    type: String, 
    required: [true, 'Password is required!'], 
    validate: {
      validator: function(p) {
          if(p.length <= 5) return false
      }
    }
  },
  email: {
    type: String,
    unique : true,
    required: [true, 'Please input your email!'],
  },
  followers: [{
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  }]
}, {
  timestamps: true
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;