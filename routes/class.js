var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var axios = require('axios');
var dotenv = require("dotenv").config;
var elasticsearch = require('elasticsearch');
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
		var createFolder = firebase.database().ref('/documents/'+user).child(folderName).push();
			createFolder.set({
			title:newTitle,
			link:link,
			keywords:newKeyword,
			department:department,
			desc:desc,
			dateCreate:firebase.database.ServerValue.TIMESTAMP
		});
		var addToDepartment = firebase.database().ref('/departments/'+department+'/'+folderName).child(newTitle);
			addToDepartment.set({
			test:1
		});
		for(var i=0; i<newKeyword.length; i++){
			var addToKeyword = firebase.database().ref('/keywords/'+newKeyword[i]+'/'+folderName).child(newTitle);
				addToKeyword.set({
					data:1
				});
		}
 	}

 	documentManager.prototype.deleteDocument = function (docName, user, folderName) {
 		
 	}

 	documentManager.prototype.searchByKeyword  = function (keyword, folderName, query) {
 		var searchByKeyword = firebase.database().ref('/keywords/'+keyword+'/'+folderName);
 		var keywordRef = firebase.database.ref('/keywords');
		keywordRef.on('child_added', upsert);
		keywordRef.on('child_changed', upsert);
		keywordRef.on('child_removed', remove);

		function upsert(snapshot){
	    		client.index({
	        	index: 'firebase',
	        	type: 'users',
	        	id: snapshot.key(),
	        	body: snapshot.val()
    		}, function(err, response){
        		if(err){
            		console.log("Error indexing user : " + error);
        		}
    		});
		}

		function remove(snapshot){
	    		client.delete({
	        	index: 'firebase',
	        	type: 'users',
	        	id: snapshot.key()
    		}, function(error, response){
       	 			if(error){
            			console.log("Error deleting user : " + error);
        			}
    			});
		}
 	}


module.exports = documentManager;