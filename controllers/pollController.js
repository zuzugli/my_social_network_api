const Poll = require('../models/pollModel');
const Event = require('../models/eventModel');

exports.createPoll = async (req, res) => {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ message: "Ã‰vÃ©nement introuvable" });

    const isOrganisateur = event.organisateurs.some(o => o.equals(req.user._id));
    if (!isOrganisateur) {
      return res.status(403).json({ message: "RÃ©servÃ© aux organisateurs." });
    }

    const newPoll = await Poll.create(req.body);
    res.status(201).json({ status: 'success', data: { poll: newPoll } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.status(200).json({ status: 'success', results: polls.length, data: { polls } });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.votePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Sondage introuvable" });

    const event = await Event.findById(poll.eventId);
    const isParticipant = event.participants.some(p => p.equals(req.user._id)) || event.organisateurs.some(o => o.equals(req.user._id));
    
    if (!isParticipant) {
      return res.status(403).json({ message: "Vous devez participer à l'événement pour voter." });
    }

    const question = poll.questions.id(req.body.questionId);
    if (!question) return res.status(404).json({ message: "Question introuvable" });

    const aDejaVote = question.reponses.find(rep => rep.userId.equals(req.user._id));
    if (aDejaVote) {
      return res.status(400).json({ message: "Vous avez déjà répondu à cette question." });
    }

    const option = question.options.id(req.body.optionId);
    if (!option) return res.status(404).json({ message: "Option introuvable" });

    question.reponses.push({
      userId: req.user._id,
      optionId: option._id,
      choix: option.text
    });

    await poll.save();
    res.status(200).json({ status: 'success', message: "Vote enregistré !", data: { poll } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};
