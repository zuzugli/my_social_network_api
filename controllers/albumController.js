const Album = require('../models/albumModel');
const Event = require('../models/eventModel');

exports.createAlbum = async (req, res) => {
  const eventId = req.body.eventId || req.body.evenement;
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: '??v??nement introuvable' });

  const isAuth = event.participants.some(id => id.equals(req.user._id)) || 
                 event.organisateurs.some(id => id.equals(req.user._id));
  if (!isAuth) return res.status(403).json({ message: 'R??serv?? aux participants.' });

  const payload = { ...req.body };
  if (eventId && !payload.evenement) payload.evenement = eventId;
  const newAlbum = await Album.create(payload);
  res.status(201).json({ status: 'success', data: newAlbum });
};

exports.addPhoto = async (req, res) => {
  const album = await Album.findById(req.params.id);
  if (!album) return res.status(404).json({ message: 'Album introuvable' });

  const event = await Event.findById(album.evenement);
  if (!event) return res.status(404).json({ message: '??v??nement introuvable' });

  const isAuth = event.participants.some(id => id.equals(req.user._id)) || 
                 event.organisateurs.some(id => id.equals(req.user._id));
  if (!isAuth) return res.status(403).json({ message: 'R??serv?? aux participants.' });

  album.photos.push({ url: req.body.url, auteur: req.user._id });
  await album.save();
  res.status(200).json({ status: 'success', data: album });
};
