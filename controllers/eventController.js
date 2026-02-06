const Event = require('../models/eventModel');
const Group = require('../models/groupModel');

exports.createEvent = async (req, res) => {
  try {
    let participantsInitiaux = [req.user._id];

    if (req.body.groupId) {
      const group = await Group.findById(req.body.groupId);
      if (group) {
        participantsInitiaux = [...new Set([...participantsInitiaux, ...group.membres])];
      }
    }

    const newEvent = await Event.create({
      ...req.body,
      organisateurs: [req.user._id], 
      participants: participantsInitiaux
    });

    res.status(201).json({ status: 'success', data: { event: newEvent } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ status: 'success', results: events.length, data: { events } });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.addToShoppingList = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    const existeDeja = event.shoppingList.some(
      item => item.objet.toLowerCase() === req.body.objet.toLowerCase()
    );

    if (existeDeja) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'Cet objet est déjà dans la liste ! Chaque objet doit être unique.' 
      });
    }

    event.shoppingList.push({
      objet: req.body.objet,
      quantite: req.body.quantite,
      heureArrivee: req.body.heureArrivee,
      apporteur: req.user._id
    });

    await event.save();
    res.status(200).json({ status: 'success', data: { event } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};