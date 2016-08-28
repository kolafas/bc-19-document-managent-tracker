var app = angular.module('doc-man', []);

app.controller('foldersList', function($scope, $http) {
	$http.get('https://document-manager-6df6d.firebaseio.com/folders/kolafas.json?shallow=true')
		.success(function(response) {
			var data = {
				folders: response
			}

			$scope.folders = object.keys(data.folders);
		})

});