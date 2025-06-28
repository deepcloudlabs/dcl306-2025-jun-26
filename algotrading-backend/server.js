var port = 9001;
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// Configure the API domain
let domain = 'localhost';
let applicationUrl = 'http://' + domain + ':' + port;

app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    next();
});

var con = mongoose.connect("mongodb://localhost:27017/algotrading", {
    useNewUrlParser: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    useUnifiedTopology: true
});


var Ticker = new mongoose.Schema({
    "name": {
        type: String,
        enum: ["IT", "Sales", "Finance", "HR"],
        default: "IT"
    }
});

var TickerSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "symbol": {
        type: String,
        required: true,
        minLength: 2
    },
    "price": {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
});

var Ticker = mongoose.model("tickers", TickerSchema);

// GET /tickers
app.get('/tickers', function (req, res) {
    Ticker.find({}, {"_id": false},
        function (err, result) {
            if (!err)
                res.status(200).send(JSON.stringify(result));
            else
                res.status(403).send(JSON.stringify({status: err}));
        });
});

// GET /tickers/1
app.get('/tickers/:symbol', function (req, res) {
    var symbol = req.params.symbol;
    Ticker.findOne({"symbol": symbol},
        {"_id": false},
        function (err, result) {
            if (!err)
                res.status(200).send(JSON.stringify(result));
            else
                res.status(403).send(JSON.stringify({status: err}));
        });
});

// POST /tickers
app.post('/tickers', function (req, res) {
    var data = req.body;
    data._id = mongoose.Types.ObjectId();
    var ticker = new Ticker(data);
    ticker.save(function (err, result) {
        res.set('Content-Type', 'application/json');
        if (!err)
            res.status(200).send(JSON.stringify({status: "OK"}));
        else
            res.status(403).send(JSON.stringify({status: err}));
    });
});

// PUT /tickers
app.put('/tickers', function (req, res) {
    var data = req.body;
    var updatedFields = {};
    var updateAllowableFields = ["price"];
    for (var i in updateAllowableFields) {
        var field = updateAllowableFields[i];
        if (data.hasOwnProperty(field)) updatedFields[field] = data[field];
    }
    Ticker.update(
        {"symbol": data.symbol},
        {$set: updatedFields},
        {upsert: false},
        function (err) {
            res.set('Content-Type', 'application/json');
            if (!err)
                res.status(200).send(JSON.stringify({status: "OK"}));
            else
                res.status(403).send(JSON.stringify({status: err}));
        });
});

// DELETE /tickers/1
app.delete('/tickers/:symbol', function (req, res) {
    var symbol = req.params.symbol;
    Ticker.findOneAndRemove({"symbol": symbol},
        function (err, emp) {
            if (!err)
                res.status(200).send(emp);
            else
                res.status(403).send(JSON.stringify({status: err}));
        }
    );
});


app.listen(port);
console.log(
    "Server is running at port ".concat(port)
);
