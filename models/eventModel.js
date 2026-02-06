const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  nom: { type: String, required: [true, 'Un événement doit avoir un nom'] },
  description: String,
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  lieu: String,
  prive: { type: Boolean, default: false },
  organisateurs: [{ type: mongoose.Schema.ObjectId, ref: 'User' }], // Tableau d'organisateurs
  participants: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  groupId: { type: mongoose.Schema.ObjectId, ref: 'Group' },
  
  shoppingList: [{
    objet: { type: String, required: true },
    quantite: { type: Number, default: 1 },
    heureArrivee: String,
    apporteur: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }],

  ticketTypes: [{
    nom: String,     
    prix: Number,   
    quantiteTotale: Number, 
    quantiteVendue: { type: Number, default: 0 } 
  }],

  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
