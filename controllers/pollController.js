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