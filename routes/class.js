var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var axios = require('axios');
var dotenv = require("dotenv").config;
var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
};

var requireLogin = require('./requiresLogin');

var apps = firebase.initializeApp(config);

var client = new elasticsearch.Client({
    host: 'localhost', port: 8000
});

 function documentManager() {

 }


 	documentManager.prototype.repoCreate = function (title, desc, user){
		var newRepoName = title.split(" ").join("-");
		var createFolder = firebase.database().ref('/folders/'+user).child(newRepoName);
			createFolder.set({
			folderName:title,
			desc:desc
		});
 	}

 	documentManager.prototype.addDoc = function (link,keyword, title, folderName, department,desc, user){
		var newKeyword = keyword.split(", ");
		var newTitle = title.split(" ").join("-");
		var createFolder = firebase.database().ref('/documents/'+user).child(folderName).child(newTitle);
			createFolder.set({
			title:newTitle,
			link:link,
			keywords:newKeyword,
			department:department,
			desc:desc,
			dateCreate:firebase.database.ServerValue.TIMESTAMP
		});
		var addToDepartment = firebase.database().ref('/departments/'+department+'/'+user).child(newTitle);
			addToDepartment.set({
			link:link
		});
		for(var i=0; i<newKeyword.length; i++){
			var addToKeyword = firebase.database().ref('/keywords/'+newKeyword[i]+'/'+user).child(newTitle);
				addToKeyword.set({
					link:link
				});
		}
 	}

 	documentManager.prototype.deleteDocument = function (docName, user, folderName) {
 		var deleteDocumentRef = firebase.database().ref('/documents/'+user+'/'+folderName).child(docName);
 			deleteDocumentRef.remove();
 	}

 	documentManager.prototype.deleteFolder = function (user, folderName) {
 		var deleteFolderRef = firebase.database().ref('/folders/'+user+'/'+folderName);
 			deleteFolderRef.remove();
 	}



module.exports = documentManager;