var sys = require('sys'),
path = require('path'),
util = require('util'),
config = require('../config/initialize'),
log4js = require('../node_modules/log4js')();

var Logger = exports.Logger = function() {
    var logDir = path.normalize(__dirname + "/../log/");
    switch(config.environment) {
    case "development":
	log4js.addAppender(log4js.fileAppender(logDir + 'development.log'), 'development');
	this.logger = log4js.getLogger('development');
	this.logger.setLevel("ALL");
	break;
    case "test":
	log4js.addAppender(log4js.fileAppender(logDir + 'test.log'), 'test');
	this.logger = log4js.getLogger('test');
	this.logger.setLevel("ALL");
	break;
    case "production":
	log4js.addAppender(log4js.fileAppender(logDir + 'production.log'), 'production');
	this.logger = log4js.getLogger('production');
	this.logger.setLevel("ERROR");
	break;
    }
};

Logger.prototype.trace = function(msg) {
    this.logger.trace(msg);  
};

Logger.prototype.debug = function(msg) {
    this.logger.debug(msg);  
};

Logger.prototype.info = function(msg) {
    this.logger.info(msg);  
};

Logger.prototype.warn = function(msg) {
    this.logger.warn(msg);  
};

Logger.prototype.error = function(msg) {
    this.logger.error(msg);
};

Logger.prototype.fatal = function(msg) {
    this.logger.fatal(msg);  
};

Logger.prototype.method_info = function(method, parameters) {
    var methodName = "[Processing] " + method;
    var methodParams = "[Parameters]";
    if (parameters != undefined) {
	Object.keys(parameters).forEach(
	    function(key) {
		methodParams += " " + key + "=" + util.inspect(parameters[key]);
	    });
    }
    this.logger.info(methodName + " " + methodParams);
};
