var fs = require('fs'),
    sys = require('sys'),
    path = require('path'),
    config = require('../config/initialize'),
    Logger = require('../lib/log').Logger,
    ResqueJobs = require('../lib/jobs').ResqueJobs,
    resque = require('../node_modules/coffee-resque').connect(),
    _ = require('../node_modules/underscore');

var log = new Logger();

/*
 * resque takes the entire function out and runs it
 * functions need to be self-contained
 */
var workerJobs = {
    addHDBValue: function(value, callback) {
	var jobs = new ResqueJobs();
	jobs.addHDBValue(value, callback);      
    }
};

try {
    var papMinister = require('coffee-resque')
	.connect({timeout: 500})
	.worker('high', workerJobs);

    papMinister.start();
} catch (err) {
    papMinister.end();
    papMinister.start();
}
