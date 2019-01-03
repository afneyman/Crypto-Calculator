// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var crypto = req.body.crypto;
    var currency = req.body.currency;
    var amount = req.body.amount;

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: currency,
            amount: amount
        }
    };


    request(options, function(error, response, body) {
            var data = JSON.parse(body);
            var price = data.price;
            console.log(price);
            var currentDate = data.time;
            res.write("<p>The current date is " + currentDate + "</p>");
            res.write("<h1>The price of " + amount + " " + crypto + " is " + price + " " + currency + "</h1>");
            res.send();

        });
});

https: //apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2


    app.listen(3000, function() {
        console.log("server is running on port 3000");
    });
