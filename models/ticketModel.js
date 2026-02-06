const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
    required: true
  },
  typeBilletNom: { type: String, required: true },
  prixPaye: Number,
  
  acheteur: {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    adresse: { type: String, required: true },
    dateAchat: { type: Date, default: Date.now }
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;