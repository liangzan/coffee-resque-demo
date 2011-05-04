/*
 * initializing the config variables
 */

var fs = require('fs'),
    sys = require('sys'),
    path = require('path');


function loadConfig(filePath) {
    var configData = fs.readFileSync(filePath, 'utf-8');
    return eval('(' + configData + ')');
}

var defaultConfigVar = loadConfig(path.normalize(__dirname + "/config.json"));

Object.keys(defaultConfigVar).forEach(
    function(key) {
	exports[key] = defaultConfigVar[key];
    });