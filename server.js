//Install express server
const express = require('express');
const path = require('path');
const app = express();

// Start the app by listening on the default Heroku port
const port = 8080;


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/movie-rater'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname +
    '/dist/movie-rater/index.html'));
});

// Serve app on eng specified prot or Angular default
app.listen(process.env.PORT || 8080);
