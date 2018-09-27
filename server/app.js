require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const indexRoute = require('./routes/indexRoute');
const userRoute = require('./routes/userRoute');
const statusRoute = require('./routes/statusRoute');
// const commentRoute = require('./routes/commentRoute');

app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/status', statusRoute);
// app.use('/comments', commentRoute);

const mlabUsername = process.env.MLAB_USERNAME;
const mlabPassword = process.env.MLAB_PASSWORD;

mongoose.connect(`mongodb://${mlabUsername}:${mlabPassword}@ds115193.mlab.com:15193/livecode-2-phase2`, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected livecode-2 db!`);
});

app.listen(process.env.PORT, () => {
  console.log('listening on port 3000!')
})

module.exports = app;