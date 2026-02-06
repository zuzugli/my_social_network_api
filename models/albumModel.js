const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  texte: { type: String, required: true },
  auteur: { type: mongoose.Schema.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const photoSchema = new mongoose.Schema({
  url: { type: String, required: true }, 
  auteur: { type: mongoose.Schema.ObjectId, ref: 'User' },
  commentaires: [commentSchema], 
  createdAt: { type: Date, default: Date.now }
});

const albumSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Un album doit avoir un titre']
  },
  evenement: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
    required: [true, 'Un album doit être lié à un événement'] 
  },
  photos: [photoSchema], 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;