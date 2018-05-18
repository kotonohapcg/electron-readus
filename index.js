'use strict';

var electron = require('electron');
var remote = electron.remote;
//BrowserProcessとRendererProcessは何が違うのか
var fileUtil = remote.require('./lib/fileUtil');
var baseDir = process.cwd();

var matched = location.search.match(/baseDir=([^&]*)/);
var baseDir = matched && decodeURIComponent(matched[1]);

var ngModule = angular.module('readUs', []);

ngModule.controller('MainController', function($scope){
	var main = this;

	//get README.md
	main.getFile = function(file){
		main.fileText = fileUtil.getAsText(file.filepath);
	};

	fileUtil.fetchReadmeList(baseDir, function (err, fileList) {
		if(err) console.error(err);
		$scope.$apply(function(){
			main.fileList = fileList;
		});
	});
});

ngModule.directive('mdPreview', function(){
	return function($scope, $elem, $attrs){
		$scope.$watch($attrs.mdPreview, function(source){
			$elem.html(marked(source));
		});
	};
});
