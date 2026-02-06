const Ticket = require('../models/ticketModel');
const Event = require('../models/eventModel');

exports.createTicketType = async (req, res) => {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ message: '??v??nement introuvable' });

    const isOrganisateur = event.organisateurs.some(id => id.equals(req.user._id));
    if (!isOrganisateur) {
      return res.status(403).json({ message: 'R??serv?? aux organisateurs.' });
    }

    if (event.prive === true) {
      return res.status(400).json({ message: 'Impossible de cr??er une billetterie pour un ??v??nement priv??.' });
    }

    event.ticketTypes.push({
      nom: req.body.nom,
      prix: req.body.prix,
      quantiteTotale: req.body.quantite,
      quantiteVendue: 0
    });

    await event.save();
    res.status(201).json({ status: 'success', data: { event } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.buyTicket = async (req, res) => {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ message: '??v??nement introuvable' });

    if (event.prive === true) {
      return res.status(400).json({ message: 'Cet ??v??nement est priv??, pas de billetterie.' });
    }

    const ticketType = event.ticketTypes.find(t => t.nom === req.body.typeNom);
    if (!ticketType) return res.status(404).json({ message: 'Type de billet introuvable' });
    if (ticketType.quantiteVendue >= ticketType.quantiteTotale) {
      return res.status(400).json({ message: 'Sold out !' });
    }

    const existingTicket = await Ticket.findOne({
      eventId: req.body.eventId,
      'acheteur.nom': req.body.nom,
      'acheteur.prenom': req.body.prenom,
      'acheteur.adresse': req.body.adresse
    });

    if (existingTicket) {
      return res.status(400).json({ message: 'Vous avez d??j?? achet?? un billet pour cet ??v??nement (limite: 1 par personne).' });
    }

    const newTicket = await Ticket.create({
      eventId: req.body.eventId,
      typeBilletNom: ticketType.nom,
      prixPaye: ticketType.prix,
      acheteur: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse
      }
    });

    ticketType.quantiteVendue += 1;
    await event.save();

    res.status(201).json({ status: 'success', data: newTicket });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};
