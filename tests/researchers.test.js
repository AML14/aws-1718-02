'use strict';

var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var researchers = require('../researchers.js');

describe('Researchers', function() {
    beforeEach(function(done) {
        researchers.removeAll(function(err) {
            if (err) {
                return done(err);
            }

            researchers.add([{
                    "name": "Manuel Resinas",
                    "phone": "954556234",
                    "mail": "mresinas@us.es",
                    "ORCID": "0000-0003-1575-406X",
                    "researcherID": " B-3063-2008",
                    "website": "https://www.mresinas.us.es",
                    "researchGroup": {
                        "name": "ISA",
                        "website": "http://www.isa.us.es"
                    },
                    "department": "LSI",
                    "university": "US"
                },
                {
                    "name": "Rafael Corchuelo",
                    "phone": "95 455 27 70",
                    "mail": "corchu@us.es",
                    "ORCID": "0000-0003-1563-6979",
                    "researcherID": " G-3149-2016",
                    "website": "https://www.corchu.us.es",
                    "researchGroup": {
                        "name": "ISA",
                        "website": "http://www.isa.us.es"
                    },
                    "department": "LSI",
                    "university": "US"
                }
            ], done);
        });
    });

    describe('#allResearchers()', function() {
        it('should return all contacts', function(done) {
            researchers.allResearchers((err, res) => {
                if (err) {
                    return done(err);
                }

                expect(res).to.have.lengthOf(2);
                expect(res).to.contain.an.item.with.property('ORCID', '0000-0003-1575-406X');
                expect(res).to.contain.an.item.with.property('ORCID', '0000-0003-1563-6979');
                done();
            });
        });
    });

    describe('#remove()', function() {
        it('should remove the element', function(done) {
            researchers.remove('0000-0003-1575-406X', (err) => {
                if (err) {
                    return done(err);
                }

                researchers.allResearchers((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res).to.have.lengthOf(1);
                    expect(res).not.to.contain.an.item.with.property('ORCID', '0000-0003-1575-406X');
                    done();
                });
            });
        });
    });

    describe('#add()', function() {
        it('should add the element', function(done) {
            researchers.add({
                "name": "Alejandro Fernández",
                "phone": "951235644",
                "mail": "afernandez@us.es",
                "ORCID": "0000-0002-2998-4950",
                "researcherID": "  E-6988-2010",
                "website": "https://www.researchgate.net/profile/Alejandro_Fernandez-Montes",
                "researchGroup": {
                    "name": "ISA",
                    "website": "http://www.isa.us.es"
                },
                "department": "LSI",
                "university": "US"
            }, (err) => {
                if (err) {
                    return done(err);
                }

                researchers.allResearchers((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res).to.have.lengthOf(3);
                    expect(res).to.contain.an.item.with.property('ORCID', '0000-0002-2998-4950');
                    done();
                });
            });
        });
    });
    describe('#removeAll()', function() {
        it('should remove all the elements', function(done) {
            researchers.removeAll((err) => {
                if (err) {
                    return done(err);
                }

                researchers.allResearchers((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res).to.have.lengthOf(0);
                    done();
                });
            });
        });
    });
    describe('#get', function() {
        it('should get the element with the ORCID given', function(done) {
            researchers.get("0000-0003-1575-406X", (err, res) => {
                if (err) {
                    return done(err);
                }

                expect(res).to.contain.an.item.with.property('name', 'Manuel Resinas');
                done();
            });
        });

    });
    describe('#update', function() {
        it('should update the element that has the ORCID given with the new information', function(done) {
            researchers.update("0000-0003-1575-406X", {
                "name": "Manuel Resinas",
                "phone": "954556234",
                "mail": "manuelResinas@us.es",
                "researcherID": " B-3063-2008",
                "website": "https://www.mresinas.us.es",
                "researchGroup": {
                    "name": "ISA",
                    "website": "http://www.isa.us.es"
                },
                "department": "LSI",
                "university": "US"
            }, (err) => {
                if (err) {
                    return done(err);
                }

                researchers.allResearchers((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res).to.have.lengthOf(2);
                    expect(res).to.contain.an.item.with.property('mail', 'manuelResinas@us.es');
                    done();
                });
            });
        });
    });
});
