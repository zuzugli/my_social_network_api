const Album = require('../models/albumModel');

exports.createAlbum = async (req, res) => {
  try {
    const newAlbum = await Album.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { album: newAlbum }
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.addPhoto = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({ message: 'Album introuvable' });
    }

    const newPhoto = {
      url: req.body.url, 
      auteur: req.user._id
    };

    album.photos.push(newPhoto);
    await album.save();

    res.status(200).json({
      status: 'success',
      data: { album }
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};