'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var researchers = require("./researchers.js");

var port = (process.env.PORT || 15000);
var baseAPI = "/api/v1";

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get(baseAPI + "/researchers", (req, res) => {
	console.log("GET /researchers");
	researchers.allResearchers((err, researchers) => {
		res.send(researchers);
	});
});

app.post(baseAPI + "/researchers", (req, res) => {
	console.log("POST /researchers");
	var researcher = req.body;
	researchers.add(researcher);
	res.sendStatus(201);
});

app.put(baseAPI + "/researchers", (req, res) => {
	console.log("PUT /researchers");
	res.sendStatus(405);
});

app.delete(baseAPI + "/researchers", (req, res) => {
	console.log("DELETE /researchers");
	researchers.removeAll((err, numRemoved) => {
		console.log("researchers removed:" + numRemoved);
		res.sendStatus(200);
	});
});

app.get(baseAPI + "/researchers/:orcid", (req, res) => {
	console.log("GET /researchers/" + req.params.orcid);
	var orcid = req.params.orcid;
	researchers.get(orcid, (err, researchers) => {
		if (researchers.length === 0) {
			res.sendStatus(404);
		}
		else {
			res.send(researchers[0]);
		}
	});
});

app.post(baseAPI + "/researchers/:orcid", (req, res) => {
	console.log("POST /researchers/" + req.params.orcid);
	res.sendStatus(405);
});


// TODO: check if attempting to change ORCID and prevent it
// TODO: in the DB, change only the fields passed in the request
app.put(baseAPI + "/researchers/:orcid", (req, res) => {
	console.log("PUT /researchers/" + req.params.orcid);
	var orcid = req.params.orcid;
	var updatedResearcher = req.body;
	researchers.update(orcid, updatedResearcher, (err, numUpdates) => {
		console.log("researchers updated:" + numUpdates);
		if (numUpdates === 0) {
			res.sendStatus(404);
		}
		else {
			res.sendStatus(200);
		}
	});
});

app.delete(baseAPI + "/researchers/:orcid", (req, res) => {
	console.log("DELETE /researchers/" + req.params.orcid);
	var orcid = req.params.orcid;
	researchers.remove(orcid, (err, numRemoved) => {
		console.log("researchers removed:" + numRemoved);
		res.sendStatus(200);
	});
});


app.listen(port, () => {
	console.log("Server with GUI up and running!!");
});
