var express = require('express');
var bodyParser = require("body-parser");

var app = express();
// Sets view engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var items = ["item 1", "item 2"];

// Root url
app.get('/', function (req, res) {
    res.render('index', { items: items});
});

// Add item
app.post('/add', function (req, res) {
    var newItem = req.body.newitem;

    items.push(newItem);

    res.redirect("/");
 });

// Listen on port 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});