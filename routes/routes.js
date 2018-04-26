const request = require('request');

var appRouter = function (app) {
    app.get("/api", function (req, res) {
        let data = {
            response: 'my localcoin api'
        }
        res.status(200).send(data);
    });
    app.get('/api/wallets/:id', function (req, res) {
        let options = {
            method: 'GET',
            uri: `https://local-coin.firebaseio.com/wallets/${req.params.id}/.json`,
            json: true
        }
        request.get(options, function (error, response, body) {
            res.status(200).send(body);
        });
    });
    app.get('/api/transactions', function (req, res) {
        let options = {
            method: 'GET',
            uri: 'https://local-coin.firebaseio.com/transactions.json',
            json: true
        }
        request.get(options, function (error, response, body) {
            res.status(200).send(body);
        });
    });
    app.post('/api/transactions', function (req, res) {
        let options = {
            method: 'GET',
            body: req.body,
            uri: 'https://local-coin.firebaseio.com/transactions.json',
            json: true
        }
        request.post(options, function (error, response, body) {
            console.log(options.body);
            let to = options.body.to;
            let from = options.body.from;
            let amount = options.body.amount;
            console.log(to, from, amount);
            res.status(200).send(body);
        });
    });
}

module.exports = appRouter;