const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE_URI;

mongoose.connect(DB)
  .then(() => console.log('Connexion à la DB réussie'))
  .catch(err => console.error('Erreur de connexion:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}...`);
});