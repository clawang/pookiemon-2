const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// This serves static files from the specified directory
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.post("/subscription", (req, res, next) => {
  subscriptionObject = req.body;
  res.send('Subscription object received');
});

app.get("/subobject", (req, res, next) => {
  res.json(subscriptionObject);
});

const server = app.listen(8081, () => {

  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
