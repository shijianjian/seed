var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Item = require('../models/item');

router.get('/', function (req, res, next) {
    Item.find({})
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});

router.get('/items/:firstname', function (req, res, next) {
    if(req.params.firstname) {
        Item.find({ firstname: req.params.firstname }, function(err, docs) {
            res.json(docs);
        })
    }
});

router.get('/items/:lastname', function (req, res, next) {
    if(req.params.lastname) {
        Item.find({ lastname: req.params.lastname }, function(err, docs) {
            res.json(docs);
        })
    }
});

router.get('/items/:email', function (req, res, next) {
    if(req.params.email) {
        Item.find({ email: req.params.email }, function(err, docs) {
            res.json(docs);
        })
    }
});


module.exports = router;