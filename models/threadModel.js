const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  contenu: { type: String, required: true },
  auteur: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
  contenu: { type: String, required: true },
  auteur: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  reponses: [replySchema] 
});

const threadSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  groupId: { type: mongoose.Schema.ObjectId, ref: 'Group' },
  eventId: { type: mongoose.Schema.ObjectId, ref: 'Event' },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now }
});

threadSchema.pre('save', function(next) {
  if (this.groupId && this.eventId) {
    return next(new Error('Un fil ne peut pas être lié à la fois à un groupe et un événement.'));
  }
  if (!this.groupId && !this.eventId) {
    return next(new Error('Un fil doit être lié à un groupe ou un événement.'));
  }
  next();
});

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;