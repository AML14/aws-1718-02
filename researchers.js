'use strict';

var path = require('path');
var DataStore = require('nedb');
var dbFileName = path.join(__dirname, 'researchers.json');

var db = new DataStore({
	filename : dbFileName,
	autoload : true
});


var Researchers = function () {};

Researchers.prototype.allResearchers = function(callback) {
	return db.find({}, callback);
};

Researchers.prototype.add = function(Researcher, callback) {
	return db.insert(Researcher, callback);
};

Researchers.prototype.removeAll = function(callback) {
	return db.remove({},{ multi: true}, callback);
};

Researchers.prototype.get = function(orcid, callback) {
	return db.find({orcid:orcid}, callback);
};

Researchers.prototype.remove = function(orcid, callback) {
	return db.remove({orcid:orcid}, {multi: true}, callback);
};

Researchers.prototype.update = function(orcid, updatedResearcher, callback) {
	return db.update({orcid:orcid}, updatedResearcher, {}, callback);
};

module.exports = new Researchers();