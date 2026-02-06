const Poll = require('../models/pollModel');

exports.createPoll = async (req, res) => {
  try {
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
    
    const question = poll.questions.id(req.body.questionId);
    if (!question) return res.status(404).json({ message: "Question introuvable" });

    const option = question.options.id(req.body.optionId);
    if (!option) return res.status(404).json({ message: "Option introuvable" });

    option.votes += 1;
    await poll.save();

    res.status(200).json({ status: 'success', data: { poll } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};