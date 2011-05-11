var sys = require('sys'),
fs = require('fs'),
path = require('path'),
exec = require('child_process').exec,
config = require('../config/initialize'),
Logger = require('../lib/log').Logger,
redis = require('../node_modules/redis'),
client = redis.createClient(),
resque = require('coffee-resque').connect(),
_ = require('../node_modules/underscore');

var log = new Logger();
var hdbFlatPrice = "hdb_flat";

setInterval(
    function() {
	var increase = 5000;
	resque.enqueue('high', 'addHDBValue', [increase]);

	var decrease = 1000;
	resque.enqueue('high', 'subtractHDBValue', [decrease]);
    }, 1000);


