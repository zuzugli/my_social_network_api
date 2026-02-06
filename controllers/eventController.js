const Event = require('../models/eventModel');
const Group = require('../models/groupModel');

exports.createEvent = async (req, res) => {
  try {
    let participants = [req.user._id];

    const groupId = req.body.groupId || req.body.groupe;
    if (groupId) {
      const group = await Group.findById(groupId);
      if (group) {
        const membresIds = group.membres.map(m => m.toString());
        participants = [...new Set([...participants, ...membresIds])];
      }
    }

    const newEvent = await Event.create({
      ...req.body,
      groupId: groupId || req.body.groupId,
      organisateurs: [req.user._id],
      participants: participants
    });

    res.status(201).json({ status: 'success', data: { event: newEvent } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.getAllEvents = async (req, res) => {
  const events = await Event.find();
  res.status(200).json({ status: 'success', results: events.length, data: { events } });
};

exports.addToShoppingList = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: '??v??nement introuvable' });

  if (!req.body.objet) {
    return res.status(400).json({ message: 'Objet requis' });
  }

  const existe = event.shoppingList.some(i => i.objet.toLowerCase() === req.body.objet.toLowerCase());
  if (existe) return res.status(400).json({ message: 'Objet d??j?? pris !' });

  event.shoppingList.push({
    objet: req.body.objet,
    quantite: req.body.quantite || 1,
    heureArrivee: req.body.heureArrivee,
    apporteur: req.user._id
  });
  await event.save();
  res.status(200).json({ status: 'success', data: event });
};
