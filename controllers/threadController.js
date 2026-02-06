const Thread = require('../models/threadModel');

exports.createThread = async (req, res) => {
  try {
    const newThread = await Thread.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { thread: newThread }
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);

    if (!thread) {
      return res.status(404).json({ status: 'error', message: 'Fil introuvable' });
    }

    const newMessage = {
      contenu: req.body.contenu,
      auteur: req.user._id 
    };

    thread.messages.push(newMessage);
    
    await thread.save();

    res.status(200).json({
      status: 'success',
      data: { thread }
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.getThread = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id)
      .populate('messages.auteur', 'nom prenom'); 

    res.status(200).json({
      status: 'success',
      data: { thread }
    });
  } catch (err) {
    res.status(404).json({ status: 'error', message: err.message });
  }
};