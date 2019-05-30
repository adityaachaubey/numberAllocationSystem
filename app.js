const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config= require('./configuration.json');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/numberAllocationSystem', {useNewUrlParser: true });

const authRouter = require('./src/routes/auth');
const allotmentRouter = require('./src/routes/allotment');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/auth', authRouter);
app.use('/allotment', allotmentRouter);

app.listen(config.port);
