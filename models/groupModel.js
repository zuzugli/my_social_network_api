const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Un groupe doit avoir un nom'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  icone: {
    type: String, 
    default: 'default-group-icon.png'
  },
  photoCouverture: {
    type: String,
    default: 'default-cover.jpg'
  },
  type: {
    type: String,
    enum: ['public', 'privé', 'secret'],
    default: 'public'
  },
  autoriserPublicationMembres: {
    type: Boolean,
    default: true
  },
  autoriserCreationEventMembres: {
    type: Boolean,
    default: false
  },
  administrateurs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  membres: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;