const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  nom: { type: String, required: [true, 'Nom requis'], trim: true },
  description: { type: String, trim: true },
  dateDebut: { type: Date, required: [true, 'Date début requise'] },
  dateFin: { type: Date, required: [true, 'Date fin requise'] },
  lieu: { type: String, required: [true, 'Lieu requis'] },
  photoCouverture: { type: String, default: 'default.jpg' },
  prive: { type: Boolean, default: false },
  organisateurs: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  participants: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  shoppingList: [
    {
      objet: { type: String, required: true },
      quantite: { type: Number, default: 1 }, 
      responsable: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
      }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

eventSchema.pre('validate', function(next) {
  if (this.dateFin < this.dateDebut) {
    next(new Error('La date de fin doit être après le début'));
  } else {
    next();
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;