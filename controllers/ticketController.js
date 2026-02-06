const Ticket = require('../models/ticketModel');

exports.buyTicket = async (req, res) => {
  try {
    const newTicket = await Ticket.create({
      eventId: req.body.eventId,
      typeBillet: {
        nom: req.body.typeNom,
        prix: req.body.prix
      },
      acheteur: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse
      }
    });

    res.status(201).json({ status: 'success', message: 'Billet acheté !', data: newTicket });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};