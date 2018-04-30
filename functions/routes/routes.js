const request = require('request-promise');

var appRouter = function (app) {
    app.get('/api/wallets/:id', function (req, res) {
        let options = {
            method: 'GET',
            uri: `https://local-coin.firebaseio.com/wallets/${req.params.id}/.json`,
            json: true
        }
        request(options, function (error, response, body) {
            res.status(200).send(body);
        });
    });
    app.get('/api/transactions', function (req, res) {
        let options = {
            method: 'GET',
            uri: 'https://local-coin.firebaseio.com/transactions.json',
            json: true
        }
        request(options, function (error, response, body) {
            res.status(200).send(body);
        });
    });
    app.post('/api/transactions', function (req, res) {

        let options = {
            method: 'POST',
            body: req.body,
            uri: 'https://local-coin.firebaseio.com/transactions.json',
            json: true
        }
        let optionsTo = {
            method: 'GET',
            uri: `https://local-coin.firebaseio.com/wallets/${req.body.to}/.json`,
            json: true
        }
        let optionsFrom = {
            method: 'GET',
            uri: `https://local-coin.firebaseio.com/wallets/${req.body.from}/.json`,
            json: true
        }

        if (options.body.amount < 0) {
            res.sendStatus(422);
        }
        else {
            let amount = options.body.amount;
            request(optionsFrom).then(function (respFrom) {
                let balanceFrom = respFrom.balance;

                let optionsPutFrom = {
                    method: 'PUT',
                    body: {
                        balance: balanceFrom - amount
                    },
                    uri: `https://local-coin.firebaseio.com/wallets/${options.body.from}.json`,
                    json: true
                }

                if (balanceFrom >= amount) {
                    request(optionsPutFrom).then(function (respPutTo) {

                    });
                    request(optionsTo).then(function (respTo) {
                        let balanceTo = respTo.balance;

                        let optionsPutTo = {
                            method: 'PUT',
                            body: {
                                balance: balanceTo + options.body.amount
                            },
                            uri: `https://local-coin.firebaseio.com/wallets/${options.body.to}.json`,
                            json: true
                        }


                        request(optionsPutTo).then(function (respPutTo) {

                        });

                    });
                    request(options).then(function (respPost) {
                    });
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(422);
                }
            });
        }

    });
}

module.exports = appRouter;