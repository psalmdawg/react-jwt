const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

const router = require('./router')

mongoose.connect('mongodb://localhost:auth/auth')
//app setup
//middleware
//morgan is a loggin framework. logs incoming requests
app.use(morgan('combined'));

//body parser parsers incoming requests as JSON
app.use(bodyParser.json({type:'*/*'}));
router(app)


const PORT = process.env.PORT || 3001;
const server = http.createServer(app)


server.listen(PORT, () => {
  console.log(`App live on ${PORT}`)
})
