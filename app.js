require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
//const xss = require('xss-clean');
const hpp = require('hpp');
const userRouter = require('./routes/userRoutes');
const eventRouter = require('./routes/eventRoutes');
const groupRouter = require('./routes/groupRoutes');
const threadRouter = require('./routes/threadRoutes');
const albumRouter = require('./routes/albumRoutes');
const pollRouter = require('./routes/pollRoutes');
const ticketRouter = require('./routes/ticketRoutes');

const app = express();

app.use(helmet());

app.use(cors());

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100, 
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
});
app.use('/api', limiter); 

//app.use(xss());
app.use(hpp());


app.use(express.json({ limit: '10kb' }));

app.use('/api/users', userRouter);

app.use('/api/events', eventRouter);

app.use('/api/groups', groupRouter);

app.use('/api/threads', threadRouter);

app.use('/api/albums', albumRouter);

app.use('/api/polls', pollRouter);

app.use('/api/tickets', ticketRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: 'error', 
        message: 'Une erreur interne est survenue.' 
    });
});

module.exports = app;