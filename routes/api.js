var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var axios = require('axios');
var dotenv = require("dotenv").config;


var requireLogin = require('./requiresLogin');

var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
};

 var apps = firebase.initializeApp(config);


router.get('/', (req, res, next) => {
	res.render('starter', {data:"me"});
});




router.get('/user', requireLogin,function (req, res, next) {
	var data = req.user;
	var nickname = data.nickname.split(" ").join("");
	console.log(data.picture);
	var  storeUser = firebase.database().ref('/users/'+nickname);
	storeUser.on('value', snapshot => {
		//checking if users exist already
		if(!snapshot.exist){
			storeUser.set({
				email:data._json.email,
				nickname:nickname,
				picture:data.picture
			});
			//res.redirect('/home/folders');
		}
	});
	req.session.picture = data.picture;
	req.session.username = nickname;
	res.redirect('/home');
	next();
});

router.get('/home', requireLogin,function(req, res, next) {
	var listFolderRef = firebase.database().ref('/folders/' + req.params.user_id+'/Justice-folder');
	console.log(req.session.username);
	var data = {
		name:req.session.username,
		picture:req.session.picture
	}
	res.render('starter', {datas:data});
	next();
});

router.get('/home/folders', function(req, res, next) {
  var listFolderRef = firebase.database().ref('/folders/' + req.params.user_id+'/Justice-folder');
	axios.get(listFolderRef.toString() + '.json?orderBy="departments"&equalTo="success"&print=pretty')
		.then(check =>{
			var data = check.data;
			console.log(data);
			res.render('starter',{folders:data});
		});
});


router.post('/home/folder/create/', requireLogin, function(req, res, next) {
	var repoName = req.body.repoName;
	var newRepoName = repoName.split(" ").join("-");
	var createFolder = firebase.database().ref('/folders/'+req.session.username).child(newRepoName);
	createFolder.set({
		folderName:req.body.repoName,
		desc:req.body.repoDesc
	});
	res.redirect('/home');
});


router.get('/login', (req, res, next) => {
	res.render('login2', {data:"welcome"});
});

router.post('/login', function(req, res, next) {
  if(userExist(req.body.username)){
		res.render('register', {error:"Username is taken"});
	}
	var usersRef = firebase.database().ref('/users/' + req.body.username);
	var check = usersRef;
	usersRef.on('value', function(snapshot) {
		if(password === snapshot.val().password) {
			console.log("Successfully logged");
		}else{
			console.log("Wrong password");
		}
	});
});


module.exports = router;