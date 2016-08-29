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
	var newFolderName = folderName.split(" ").join("-");
	var folderCreateRef = firebase.database().ref('/folders/' + username +'/'+ newFolderName);
	folderCreateRef.push({
		title:"This is a sample data",
		link:"http://docs.google.com/sample-link",
		keywords:["sample", "data", "important"],
		department:["first time"]
	});
}

folderCreate('justice me zip', 'kolafas');

function addTofolder(folderName, username,titles,links,keyword,departments) {
	var splitTitle = titles.split(" ").join('-');
	var newTitle = splitTitle;
	var folderCreateRef = firebase.database().ref('/folders/' + username +'/'+ folderName).push();
	folderCreateRef.set({
		title:newTitle,
		link:links,
		keywords:keyword,
		department:departments
	});
	for(var i=0; i < departments.length; i++){
		var addToDepartments = firebase.database().ref('/departments/'+departments[i]+'/'+folderName).child(newTitle);
		addToDepartments.set({
			test:1
		});
	}
	for(var i=0; i < keyword.length; i++){
		var addToDepartments = firebase.database().ref('/keywords/'+keyword[i]+'/'+folderName).child(newTitle);
		addToDepartments.set({
			test:1
		});
	}
}

function findByKeywords(keywordName, folderName){

}

var words = 'Nodejs,church,first';
var keyword =  words.split(",");
addTofolder('Justice-folder', 'kolafas','Contract why it cools','http://docs.google.com/',keyword,['sucess','true','soup']);

function listFolders(username) {
	var listFolderRef = firebase.database().ref('users/' + username +'/folders');
	listFolderRef.on('value', function(snapshot) {
		return JSON.stringify(snapshot.val());
	});
}


function checkDuplicateFolder(folderName, username){
	const check = firebase.database().ref('users/'+ username +'folders').child(folderName);
	check.on('value', function(snapshot) {
		if(!snapshot.exists){
			return true;
		}
		return false;
	});
}