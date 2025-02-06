// Model 6098 - final_project_FE
const mongoose = require('mongoose');

const schema6098 = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  status: {
    type: String,
    enum: ['active', 'inactive', 'deleted'],
    default: 'active'
  },
  
  metadata: {
    type: Map,
    of: String
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

schema6098.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Model6098', schema6098);
