'use strict';

const electron = require('electron');
var app = electron.app
var BrowserWindow = electron.BrowserWindow ;
var Menu = electron.menu;

const cr = require('crashreporter').start();

app.on('window-all-closed', function(){
	if(process.platform != 'darwin')
		app.quit();
});

app.on('ready', function(){
	//add menu to application menu

	Menu.setApplicationMenu(menu);
	openWindow(process.cwd());
});

function openWindow (baseDir){
	var win = new BrowserWindow({width: 800, height: 600});
	win.loadURL('file://' + __dirname + '/index.html?baseDir=' + encodeURIComponent(baseDir));
	win.on('closed', function(){
		win = null;
	});
}

//create menu info
var template = [
	{
		label: 'ReadUs',
		submenu: [
			{label: 'Quit', accelerator: 'Command-Q', click: function(){app.quit();}}
		]
	},{
		label: 'File',
		submenu: [
			{label: 'Open', accelerator: 'Command+O', click: function(){
				//call "File Open" dialog
				require('dialog').showOpenDialg({properties: ['openDirectory']}, function(baseDir){
					if(baseDir && baseDir[0]){
						openWindow(baseDir[0]);
					}
				});
			}}
		]
	},{
		label: 'View',
		submenu: [
			{label: 'Reload', accelerator: 'Command+R', click: function(){BrowserWindow.getFocusedWindow().reload();}},
			{label: 'TOggle DevTools', accelerator: 'Alt+Command+I', click: function(){BrowserWindow.getFocusedWindow().toggleDevTools();}}
		]
	}
];

var menu = Menu.buildFromTemplate(template);