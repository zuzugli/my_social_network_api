const Group = require('../models/groupModel');

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json({
      status: 'success',
      results: groups.length,
      data: { groups }
    });
  } catch (err) {
    res.status(404).json({ status: 'error', message: err.message });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const newGroup = await Group.create({
      ...req.body,
      administrateurs: [req.user._id],
      membres: [req.user._id]          
    });

    res.status(201).json({
      status: 'success',
      data: { group: newGroup }
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};