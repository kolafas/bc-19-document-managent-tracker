var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var dotenv = require("dotenv").config;

 var config = {
    apiKey: "AIzaSyC1GOmZxOIs4Bi7xfwfVh9MymeSLR6tufs",
    authDomain: "document-manager-6df6d.firebaseapp.com",
    databaseURL: "https://document-manager-6df6d.firebaseio.com",
    storageBucket: "document-manager-6df6d.appspot.com",
 };

 var app = firebase.initializeApp(config);
/* GET /todos listing. */
router.get('/folders/:user_id', function(req, res, next) {
  var listFolderRef = firebase.database().ref('users/' + req.params.user_id +'/folders');
	listFolderRef.on('value', function(snapshot) {
		var data = snapshot.val();
		res.json(data);
	});
});

module.exports = router;