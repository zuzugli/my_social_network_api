const Event = require('../models/eventModel');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      status: 'success',
      results: events.length,
      data: { events }
    });
  } catch (err) {
    res.status(404).json({ status: 'error', message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body, 
      organisateurs: [req.user._id] 
    });

    res.status(201).json({
      status: 'success',
      data: { event: newEvent }
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.addToShoppingList = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ status: 'error', message: 'Evènement introuvable' });
    }

    event.shoppingList.push({
      objet: req.body.objet,
      quantite: req.body.quantite || 1,
      responsable: req.user._id 
    });

    await event.save();

    res.status(200).json({
      status: 'success',
      data: { shoppingList: event.shoppingList }
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};