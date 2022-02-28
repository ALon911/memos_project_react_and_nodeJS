const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const appRoutes = require('./app');
require("dotenv").config();
const app = express()

const dbURI = "mongodb://localhost:27017/alondb";
const port = 3000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
  app.listen(port);
  console.log(`server run on port ${port}`);
  })
  .catch(err => console.log(err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/', (req, res,next) => {
    console.log(req.body);
    console.log(req.query);
    next();
  })
app.use('/', appRoutes);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// })