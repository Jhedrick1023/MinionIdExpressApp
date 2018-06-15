'use strict';
var express = require('express');
var router = express.Router();
var title = 'Minion ID Generator';
var primeString = '';

/* GET home page. */
router.get('/', function (req, res) {
    anon(req, res);
});

router.post('/', function (req, res) {
    //debugger;
    var intId = parseInt(primeString.substring(parseInt(req.body.indexValue) - 1, parseInt(req.body.indexValue) + 4));
    res.render('index', { title: title, minionId: intId});
});

function anon(req, res) {
    function afterPrimeString(err) {
        if (err) {
            console.log(err);
            res.render('index', { title: title, error: err });
        } else {
            renderPage();
        }
    }

    function renderPage() {
        res.render('index', { title: title });
    }
    generatePrime(afterPrimeString);
}

function generatePrime(callback) {
    var whole;

    for (var i = 2; i <= 1993; i++) {
        whole = 0;
        for (var j = 2; j < i; j++) {
            if (i % j === 0) {
                whole++;
            }
        }
        if (whole === 0) {
            primeString = primeString + i;
        }
    }
    if (primeString !== '' && primeString !== null) {
        callback(null);
    } else {
        callback('Prime String has no value');
    }
}
module.exports = router;
