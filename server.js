//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/movie-rater'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/movie-rater/index.html'));
});

// Start the app by listening on the default Heroku port
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Server running on port ' + port + '.');
})
