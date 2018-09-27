const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var statusSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  status: {
    type: String
  }
}, {
  timestamps: true
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;