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
    var items =  getItems();
    res.render('index', { items: items});
});

// Add item
app.post('/add', function (req, res) {
    var newItem = req.body.newitem;
     addItem(newItem);
    res.redirect("/");
 });

// Listen on port 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    createTable();
});

function addItem(entity) {
    let con = dbConnection();
    try {
        con.query("START TRANSACTION");
        let savedItem =  con.query(
            queries.insert_item,
            [entity]
        );
        con.query("COMMIT");
        entity.id = savedItem.insertId;
        return entity;
    } catch (ex) {
        con.query("ROLLBACK");
        console.log(ex);
        throw ex;
    }
}

function getItems() {
    var con =  dbConnection();
    try {
        con.query("START TRANSACTION");
        let items =  con.query(queries.read_item);
        con.query("COMMIT");
        items = JSON.parse(JSON.stringify(items));
        return items;
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}

function createTable() {
    var con =  dbConnection();
    try {
         con.query("START TRANSACTION");
         con.query(queries.create_table);
         con.query("COMMIT");
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}