var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var contact = mongoose.model('contacts');

router.get('/', function(req, res) {
    contact.find(function(err, data){
        console.log(data)
        res.render(
            'index',
            {title : 'Contacts', contacts : data}
        );
    });
});

router.get('/create', function(req, res) {
    res.render(
        'create',
        {title : 'Create'}
    );
});

router.post('/', function(req, res) {
  
    var errors = '';

    if( !errors){
        new contact({
            name : req.body.name.toLowerCase(),
            email : req.body.email,
            DOB : req.body.DOB,
            phone : req.body.phone
        }).save(function(err, data) {
            console.log(data)
            res.redirect('/contacts');
        });

    }
    else{
        res.render(
            'create',
            {
                title : 'Create',
                errors: errors
            }

        );
        console.log(errors);
    }



});

router.get('/:id/edit', function(req, res) {
   // res.send('Just a test');
    var query = {"_id": req.params.id};
    contact.findOne(query, function(err, data){
        console.log(data)
        res.render(
            'edit',
            {title : 'Edit ' + data.name, contact : data}
        );
    });
});

router.put('/:id', function(req, res) {
    var query = {"_id": req.params.id};
    
    var errors =''
    if( !errors) {
        var update = {
            name: req.body.name.toLowerCase(),
            email: req.body.email,
            DOB: req.body.DOB,
            phone: req.body.phone
        };
        var options = {new: true};
        contact.findOneAndUpdate(query, update, options, function (err, data) {
            console.log(data)
            res.redirect('/contacts');
        });
    }
    else{

        var query = {"_id": req.params.id};
        contact.findOne(query, function(err, data){
            console.log(data)
            res.render(
                'edit',
                {
                    title : 'Edit ' + data.name,
                    contact : data,
                    errors: errors,
                }
            );
        });
        console.log(errors);

    }
});

router.get('/:id', function(req, res) {
    var query = {"_id": req.params.id};
    contact.findOneAndRemove(query, function(err, data){
        console.log(data)
        res.redirect('/contacts');
    });

});
router.get('/name/search', function(req, res) {
    console.log(req.query["search"]);
    var query = {"name": new RegExp( req.query["search"].toLowerCase())};
    contact.find(query, function(err, data){
        console.log(data)
        res.render(
            'search',
            {title : 'Search', contacts : data}
        );

    });
});

module.exports = router;

