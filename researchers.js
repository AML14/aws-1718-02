'use strict';

var db;
var col;
var dbName = 'aws1718-02-staging';
var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';

var MongoClient = require('mongodb').MongoClient;

var Researchers = function () {};

Researchers.prototype.connectDb = function(callback) {
	MongoClient.connect(mongoUrl, function(err, database) {
		if(err) {
			callback(err);
		}
		db = database.db(dbName);
		col = db.collection(dbName);
		callback(err, database);
	});
};

Researchers.prototype.allResearchers = function(callback) {
	return col.find().toArray(callback);
};

Researchers.prototype.add = function(Researcher, callback) {
	return col.insert(Researcher, callback);
};

Researchers.prototype.removeAll = function(callback) {
	return col.remove({},{ multi: true}, callback);
};

Researchers.prototype.get = function(orcid, callback) {
	return col.find({ORCID:orcid}).toArray(callback);
};

Researchers.prototype.remove = function(orcid, callback) {
	return col.remove({ORCID:orcid}, {multi: true}, callback);
};

Researchers.prototype.update = function(orcid, updatedResearcher, callback) {
	return col.update({ORCID:orcid}, updatedResearcher, {}, callback);
};

module.exports = new Researchers();