//Install express server
const express = require('express');
const path = require('path');
const app = express();

// Start the app by listening on the default Heroku port
const port = 8080;


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/movie-rater'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
});


app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
