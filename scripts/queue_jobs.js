var sys = require('sys'),
fs = require('fs'),
path = require('path'),
exec = require('child_process').exec,
config = require('../config/initialize'),
Logger = require('../lib/log').Logger,
redis = require('../node_modules/redis'),
client = redis.createClient(),
resque = require('coffee-resque').connect();

var log = new Logger();
var hdbFlatPrice = "hdb_flat";

setInterval(
    function() {
	var currHDBValue = client.get(hdbFlatPrice);
	var increase = 5000;
	resque.enqueue('high', 'addHDBValue', [increase]);
    }, 1000);

