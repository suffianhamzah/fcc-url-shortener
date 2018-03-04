// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// DB initialization
var MongoClient = require('mongodb').MongoClient;

const dbUrl = `mongodb://asamlaksa:${process.env.MLAB_PASS}@ds247587.mlab.com:47587/fcc`;


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

var db
MongoClient.connect(dbUrl, (err, database) => {
  if (err) return console.log(err);
  db = database.db('fcc');
  var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
}) ;

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/new/:validUrl(*)', (request, response) => {
  // Copyright (c) 2010-2013 Diego Perini, MIT licensed
  // https://gist.github.com/dperini/729294
  // see also https://mathiasbynens.be/demo/url-regex
  // modified to allow protocol-relative URLs
  console.log(request.params);
  const urlRegex =  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  let results = {}
  // https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
  const fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl
  if (urlRegex.test(request.params.validUrl)) {
    //Make mongoDB connection and functions, maybe abstract the DB connection based on
    // MongoDB official tutorial
    const urls = db.collection('urls');
    
    const checkForDupe = (unique_id) => {
      urls.findOne({'short_url': unique_id})
        .then((result) => {
          if (result) {
            checkForDupe(Math.floor(Math.random() * Math.floor(10000)));
          } else {
            console.log(unique_id);
            console.log('test');
            insertUrl(unique_id);
          };
        })
        .catch(error => console.log(error.message));
    };
    
    const insertUrl = (unique_id) => {
      urls.insertOne({
        'short_url': unique_id,
        'url' : request.params.validUrl
        })
        .then((result) => {
          results = {
            "original_url": request.params.validUrl,
            "short_url": request.protocol + '://' + request.get('host') + '/' + unique_id
          };
          response.json(results); 
        });
      };
    checkForDupe(Math.floor(Math.random() * Math.floor(10000)));
  } else {
    results = {
      "error":'Wrong url format, make sure you have a valid protocol and real site.'};
    response.json(results); 
  };
}); 
  

app.get("/:url_id", (request, response) => {
  const urls = db.collection('urls');
  urls.findOne({'short_url': parseInt(request.params.url_id)}).then((result) => {
    console.log(result)
    if (result) {
      response.redirect(result.url);
    } else {
      console.log(result);
      response.json({'error': 'This url is not found on the database'});  
    };
  }, (err) => {
    console.log(err);
  });
});
    
