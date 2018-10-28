var express = require('express');
var app = express();
var albumRoutes = express.Router();

// Require Item model in our routes module
var Album = require('../models/Album');

// Defined store route
albumRoutes.route('/add').post(function(req, res) {
  var album = new Album(req.body);
  album.save()
    .then(item => {
      res.status(200).json({
        'album': 'Album added successfully'
      });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
albumRoutes.route('/').get(function(req, res) {
  Album.find(function(err, albums) {
    if (err) {
      console.log(err);
    } else {
      res.json(albums);
    }
  });
});

// Defined edit route
albumRoutes.route('/edit/:id').get(function(req, res) {
  var id = req.params.id;
  Album.findById(id, function(err, album) {
    res.json(album);
  });
});

//  Defined update route
albumRoutes.route('/update/:id').post(function(req, res) {
  Album.findById(req.params.id, function(err, album) {
    if (!album)
      return next(new Error('Could not load Document'));
    else {
      album.id = req.body.id;
      album.title = req.body.title;
      album.artist_alphabetical = req.body.artist_alphabetical;
      album.genre = req.body.genre;
      album.decade = req.body.decade;
      album.year = req.body.year;
      album.description = req.body.description;
      album.created = req.body.created;
      album.updated = req.body.updated;

      album.save().then(album => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
albumRoutes.route('/delete/:id').get(function(req, res) {
  Album.findByIdAndRemove({
    _id: req.params.id
  }, function(err, album) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = albumRoutes;
