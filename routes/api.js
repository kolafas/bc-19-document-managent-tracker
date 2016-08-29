var documentManager = require('./class');
var express = require('express');
var router = express.Router();
var documents = new documentManager();
var requireLogin = require('./requiresLogin');


router.get('/', (req, res, next) => {
	res.render('login', {data:"Welcome"});
});




router.get('/user', requireLogin,function (req, res, next) {
	var data = req.user
	req.session.picture = data.picture;
	req.session.username = data.nickname;
	res.redirect('/home');
	next();
});

router.get('/home', requireLogin,function(req, res, next) {
	var data = {
		name:req.session.username,
		picture:req.session.picture
	}
	res.render('starter', {datas:data});
	next();
});

router.post('/home/folder/create/', requireLogin, function(req, res, next) {
	documents.repoCreate(req.body.repoName, req.body.repoDesc, req.session.username);
	res.redirect('/home');
});


router.get('/home/folders/view/:user_id', requireLogin, function(req, res, next) {
	var data = {
		name:req.session.username,
		picture:req.session.picture,
		folderName:req.params.user_id
	}
	res.render('documents', {datas:data});
	next();
});

router.get('/home/logout', requireLogin, function(req, res, next) {
	res.redirect('https://document-manager.eu.auth0.com/v2/logout?returnTo=http://www.google.com');
});

router.get('/home/search', requireLogin, function(req, res, next) {
	if(req.body.searchBy === 'department'){
		var department 
	}
});

router.post('/home/docs/create/:folder_name', requireLogin, function(req, res, next) {
	documents.addDoc(req.body.link, req.body.keyword, req.body.title, req.params.folder_name, req.body.department, req.body.desc, req.session.username)
	res.redirect("/home/folders/view/"+req.params.folder_name);
});


router.get('/login', (req, res, next) => {
	res.render('register', {data:"welcome"});
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