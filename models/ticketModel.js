const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
    required: true
  },
  typeBillet: {
    nom: { type: String, required: true },
    prix: Number
  },
  acheteur: {
    nom: String,
    prenom: String,
    adresse: String,
    dateAchat: { type: Date, default: Date.now }
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;