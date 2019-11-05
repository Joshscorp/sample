var express = require('express');
var bodyParser = require('body-parser');
var dbConnection = require('./dbConnection');
var queries = require('./queries');
var app = express();
// Sets view engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Root url
app.get('/', function (req, res) {
    getItems(function(items) {
        res.render('index', { items: items});
    });
});

// Add item
app.post('/add', function (req, res) {
    var newItem = req.body.newitem;
    addItem(newItem, function() {
        res.redirect("/");
    });
 });

// Listen on port 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    createTable();
});

function addItem(entity, callback) {
    var con = dbConnection();
    con.query(
        queries.insert_item,
        [entity],
        function (err, result, fields) {
            handleError(err);
            console.log('Insert Successful ' + entity);
            callback();
        }
    );
}

function getItems(callback) {
    var con =  dbConnection();
    con.query(queries.read_item, function(err, result) {
        handleError(err);
        if (result != null) {
            var items = [];
            for(var i = 0; i < result.length; i++) {
                console.log('Get Successful ', result[i]);
                items.push(result[i].text);
            }
            callback(items);
        }
    });
}

function createTable() {
    var con =  dbConnection();
    con.query(queries.create_table, function(err, result) {
        handleError(err);
        console.log('Create table successful');
    });
}

function handleError(err) {
    if (err) {
        console.log(ex);
        throw ex;
    }
}