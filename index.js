'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var favicon = require('serve-favicon');
var researchers = require("./researchers.js");

var config = require('./config');

var port = (process.env.PORT || 15000);
var baseAPI = "/api/v1";

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(bodyParser.json());

// Postman documentation
app.get(baseAPI + "/help", (req, res) => {
	console.log("GET Postman documentation");
	res.redirect('https://documenter.getpostman.com/view/3947164/aws-1718-02/RVtvqYmp');
});

// Authentication middleware
app.use(`${baseAPI}\*`,(req, res, next) => {
	const apikey = req.query.apikey || req.headers.apikey;
	if (!apikey) {
		res.status(401).send('Apikey required');
	} else if (apikey != config.apikey) {
		res.status(403).send('Invalid apikey');
	} else {
		next();
	}
});

// API routes
app.get(baseAPI + "/researchers", (req, res) => {
	console.log("GET /researchers");
	researchers.allResearchers((err, resResearchers) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.send(resResearchers.map(researcher => {
			delete researcher._id;
			return researcher;
		}));
	});
});

app.post(baseAPI + "/researchers", (req, res) => {
	console.log("POST /researchers");
	var researcher = req.body;
	researchers.get(researcher.ORCID, (err, resResearchers) => {
		if (err) {
			return res.sendStatus(500);
		}
		if (resResearchers.length === 0) {
			researchers.add(researcher);
			res.sendStatus(201);
		}
		else {
			res.status(409).send('Resource already exists');
		}
	});
});

app.put(baseAPI + "/researchers", (req, res) => {
	console.log("PUT /researchers");
	res.sendStatus(405);
});

app.delete(baseAPI + "/researchers", (req, res) => {
	console.log("DELETE /researchers");
	researchers.removeAll((err, numRemoved) => {
		if (err) {
			return res.sendStatus(500);
		}
		console.log("researchers removed:" + numRemoved);
		res.sendStatus(200);
	});
});

app.get(baseAPI + "/researchers/:orcid", (req, res) => {
	console.log("GET /researchers/" + req.params.orcid);
	var orcid = req.params.orcid;
	researchers.get(orcid, (err, researchers) => {
		if (err) {
			return res.sendStatus(500);
		}
		if (researchers.length === 0) {
			res.status(404).send('There\'s no researcher with that ORCID');
		}
		else {
			delete researchers[0]._id;
			res.send(researchers[0]);
		}
	});
});

app.post(baseAPI + "/researchers/:orcid", (req, res) => {
	console.log("POST /researchers/" + req.params.orcid);
	res.sendStatus(405);
});

app.put(baseAPI + "/researchers/:orcid", (req, res) => {
	console.log("PUT /researchers/" + req.params.orcid);
	var updatedResearcher = req.body;
	if (updatedResearcher.ORCID) {
		res.status(400).send('ORCID field cannot be updated');
	}
	else {
		var orcid = req.params.orcid;
		updatedResearcher.ORCID = orcid;
		researchers.update(orcid, updatedResearcher, (err, numUpdates) => {
			if (err) {
				return res.sendStatus(500);
			}
			console.log("researchers updated:" + numUpdates);
			if (numUpdates === 0) {
				res.sendStatus(404);
			}
			else {
				res.sendStatus(200);
			}
		});
	}
});

app.delete(baseAPI + "/researchers/:orcid", (req, res) => {
	console.log("DELETE /researchers/" + req.params.orcid);
	var orcid = req.params.orcid;
	researchers.remove(orcid, (err, numRemoved) => {
		if (err) {
			return res.sendStatus(500);
		}
		console.log("researchers removed:" + numRemoved);
		if (numRemoved != 0) {
			res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	});
});

researchers.connectDb((err) => {
	if (err) {
		console.log("Could not connect with MongoDB");
		process.exit(1);
	}

	app.listen(port, () => {
		console.log("Server with GUI up and running!!");
	});
});
