const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
    required: [true, 'Un sondage doit être lié à un événement']
  },
  titre: { type: String, required: true },
  questions: [{
    questionText: { type: String, required: true },
    options: [{
      text: String,
      votes: { type: Number, default: 0 }
    }]
  }],
  createdAt: { type: Date, default: Date.now }
});

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;