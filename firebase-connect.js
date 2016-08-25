var firebase = require("firebase");
var dotenv = require("dotenv").config;

 var config = {
    apiKey: "AIzaSyC1GOmZxOIs4Bi7xfwfVh9MymeSLR6tufs",
    authDomain: "document-manager-6df6d.firebaseapp.com",
    databaseURL: "https://document-manager-6df6d.firebaseio.com",
    storageBucket: "document-manager-6df6d.appspot.com",
 };

 var app = firebase.initializeApp(config);


var username = 'redd';



function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            console.log(false);
    }

    console.log(true && JSON.stringify(obj) === JSON.stringify({}));
}


function userExist(username) {
	var checkUser = firebase.database().ref('users').child(username);
	checkUser.on('value', function(snapshot) {
		var snap = snapshot.exists();
		if(!snapshot.exists()) {
			console.log(false);
		}
		return true;
	});
}

console.log(userExist('juice'));

function authenticate(username, password) {
	if(userExist(username)){
		console.log("wrong user");
		return "wrong user";
	}
	var usersRef = firebase.database().ref('users/' + username);
	var check = usersRef;
	usersRef.on('value', function(snapshot) {
		if(password === snapshot.val().password) {
			console.log("Successfully logged");
		}else{
			console.log("Wrong password");
		}
	});
}

function folderCreate(folderName, username) {
	var folderCreateRef = firebase.database().ref('users/' + username+'/folders');
	var keyed = folderCreateRef.push();
	keyed.set({
		title:"This is a sample data",
		link:"http://docs.google.com/sample-link",
		keywords:["sample", "data", "important"],
		department:["success", "Training"]
	});
}

folderCreate("Books on nodejs", 'kolafas');
folderCreate("Books on curl", 'kolafas');

function listFolders(username) {
	var listFolderRef = firebase.database().ref('users/' + username +'/folders');
	listFolderRef.on('value', function(snapshot) {
		return JSON.stringify(snapshot.val());
	});
}

listFolders('kolafas');

function checkDuplicateFolder(folderName, username){
	const check = firebase.database().ref('users/'+ username +'folders').child(folderName);
	check.on('value', function(snapshot) {
		if(!snapshot.exists){
			return true;
		}
		return false;
	});
}