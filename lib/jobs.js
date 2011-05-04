var fs = require('fs'),
    sys = require('sys'),
    path = require('path'),
    exec  = require('child_process').exec,
    config = require('../config/initialize'),
    Logger = require('./log').Logger,
    redis = require('../node_modules/redis'),
    client = redis.createClient(),
    _ = require('../node_modules/underscore');

var ResqueJobs = exports.ResqueJobs = function() {
    this.log = new Logger();
    this.hdbFlatPrice = "hdb_flat";
};

/*
 * Jobs should match coffee-resuqe jobs
 * A callback must be the last argument
 * Return nothing for success
 * Return error for failure
 */
ResqueJobs.prototype.addHDBValue = function(value, callback) {
    this.log.method_info("ResqueJobs.addHDBValue", {value: value});
    client.incrby(this.hdbFlatPrice, value, redis.print);
    callback(null);
};

