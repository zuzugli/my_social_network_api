const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  contenu: {
    type: String,
    required: [true, 'Le message ne peut pas être vide']
  },
  auteur: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const threadSchema = new mongoose.Schema({
  groupe: {
    type: mongoose.Schema.ObjectId,
    ref: 'Group'
  },
  evenement: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event'
  },
  messages: [messageSchema], 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

threadSchema.pre('validate', function(next) {
  if ((this.groupe && this.evenement) || (!this.groupe && !this.evenement)) {
    next(new Error('Un fil de discussion doit être lié à un seul groupe ou un seul événement.'));
  } else {
    next();
  }
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;