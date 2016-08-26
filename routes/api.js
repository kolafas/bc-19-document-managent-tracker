var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var axios = require('axios');
var dotenv = require("dotenv").config;
var passwordHash = require('password-hash');

var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
};

 var app = firebase.initializeApp(config);
/* GET /todos listing. */

userExist = (username) => {
	var checkUser = firebase.database().ref('users').child(username);
	checkUser.on('value', function(snapshot) {
		var snap = snapshot.exists();
		if(!snapshot.exists()) {
			console.log(false);
		}
		return true;
	});
}

router.get('/signup', function(req, res, next) {
	res.render('register',{data:"Welcome"});
});

router.get('/login', (req, res, next) => {
	res.render('login', {data:"welcome"});
});

router.post('/authenicate', (req, res, next) => {
	if(typeof req.body.username !== 'string' || typeof req.body.firstName !== 'string' || typeof req.body.surName !== 'string' || typeof req.body.email !== 'string') {
		/**
		 * Give error when username is not a string
		 */
		res.render("register", {error:"Opps!!, looks like you are filling the wrong data."});
	}
	var checkUserRef = firebase.database().ref('/users/'+req.body.username);
	checkUserRef.on('value', snapshot => {
		if(snapshot.exists()){
			res.redirect('/signup');
		}
	});
	if(req.body.pass !== req.body.retypePass) {
		res.redirect('/signup');
	}else {
		var hashedPass = passwordHash.generate(req.body.pass);
		var userSignupRef = firebase.database().ref('/users/'+req.body.username);
		userSignupRef.set({
			firstName:req.body.firstName,
			surName:req.body.surName,
			regDate:firebase.database.ServerValue.TIMESTAMP,
			email:req.body.email,
			password:hashedPass,
			username:req.body.username
		});
		res.redirect('/login');
	}
});



router.post('/login', function(req, res, next) {
  if(userExist(req.body.username)){
		res.render('register', {error:"Username is taken"});
	}
	var usersRef = firebase.database().ref('users/' + req.body.username);
	var check = usersRef;
	usersRef.on('value', function(snapshot) {
		if(password === snapshot.val().password) {
			console.log("Successfully logged");
		}else{
			console.log("Wrong password");
		}
	});
});

router.get('/:user_id/folders', function(req, res, next) {
  var listFolderRef = firebase.database().ref('/folders/' + req.params.user_id+'/Justice-folder');
	axios.get(listFolderRef.toString() + '.json?orderBy="departments"&equalTo="success"&print=pretty')
		.then(res =>{
			var data = res.data;
			console.log(data);
			res.render('index', {mydata:data});
		});
});

module.exports = router;