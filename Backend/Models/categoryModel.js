const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  value: {
    type: String,
    default: ""
  },
  checked: {
    type: Boolean,
    default: false
  }
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  platform: {
    type: String,
    required: true,
    enum: ['Amazon', 'Flipkart', 'Meesho', 'Ajio']
  },
    CreatedBy: {
    type: String,
    required: true
  },
  CreatorEmail: {
    type: String,
    required: true
  },
  CreatorRole: {
    type: String,
    required: true
  },
  features: [featureSchema],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

categorySchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Category', categorySchema);