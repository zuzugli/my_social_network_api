const Thread = require('../models/threadModel');

exports.createThread = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.groupe && !payload.groupId) payload.groupId = payload.groupe;
    if (payload.evenement && !payload.eventId) payload.eventId = payload.evenement;

    const newThread = await Thread.create(payload);
    res.status(201).json({ status: 'success', data: newThread });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.getThread = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id)
      .populate('messages.auteur', 'nom prenom')
      .populate('messages.reponses.auteur', 'nom prenom');
    if (!thread) return res.status(404).json({ message: 'Fil introuvable' });
    res.status(200).json({ status: 'success', data: thread });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.postMessage = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: 'Fil introuvable' });

    thread.messages.push({
      contenu: req.body.contenu,
      auteur: req.user._id
    });

    await thread.save();
    res.status(201).json({ status: 'success', data: thread });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.replyToMessage = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.threadId);
    if (!thread) return res.status(404).json({ message: 'Fil introuvable' });

    const message = thread.messages.id(req.params.messageId);
    if (!message) return res.status(404).json({ message: 'Message introuvable' });

    message.reponses.push({
      contenu: req.body.contenu,
      auteur: req.user._id
    });

    await thread.save();
    res.status(201).json({ status: 'success', data: thread });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};
