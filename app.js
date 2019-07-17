const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');
const userRoutes= require('./routes/user');
const radarRoutes=require('./routes/radar');
const sendingRequestRoutes=require('./routes/sendingRequest');
const notificationRoutes=require('./routes/notification');
const searchRoutes=require('./routes/search');
const friendRoutes=require('./routes/friends');
const recentRoutes=require('./routes/recent');
const constantRoutes=require('./routes/constant');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/feed',feedRoutes);
app.use('/recent',recentRoutes);
app.use('/user',userRoutes);
app.use('/radar',radarRoutes);
app.use('/notification',notificationRoutes);
app.use('/sendingRequest',sendingRequestRoutes);
app.use('/search',searchRoutes);
app.use('/friend',friendRoutes);
app.use('/constant',constantRoutes);


mongoose
  .connect(
    'mongodb+srv://Waaazzi:Wasif123@cluster0-kkxru.mongodb.net/nodeApi?retryWrites=true'
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
