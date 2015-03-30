﻿var madgex = require('../index.js'),
    assert = require('assert'),
    config = require('./service-config.json')

describe('Madgex module', function () {
    var client = madgex.createClient(config.serviceName, config.credentials).restApi;
    it("should provide the REST API facede", function () {
        assert.ok(client, "restApi not found");
    });
    describe("REST API facade", function () {
        
        it("should have a jobInfo API part", function () {
            assert.ok(client.jobinfo, "jobInfo api branch not found");
        });
        describe("jobinfo API function", function () {
            it("shoud be invokable", function () {
                assert.equal(typeof client.jobinfo, "function", "jobinfo is not a function");
            })
            it("should return info on a job", function (done) {
                client.jobinfo({ jobid: 1257 }, function (err, data) {
                    assert.equal(null, err, "error is not null");
                    assert.equal(data.id, 1257, "jobid id does not match");
                    done();
                });
            })
            it("should have a search function", function () {
                assert.ok(client.jobinfo, "jobInfo api branch not found");
            });
            describe("jobinfo.search API function ", function () {
                it("should return 30 items without params", function (done) {
                    client.jobinfo.search({}, function(err, data) {
                        assert.ok(data.jobs, "search yielded not jobs");
                        assert.equal(data.jobs.length, 30, "search resulted incorred number of items");
                        done(); 
                    });
                });
                it("should also return a promise the resolves to 30 jobs", function (done) {
                    var jobs = client.jobinfo.search({});
                    assert.ok(jobs.then, "result is not a promise");
                    jobs.then(function (data) {
                        assert.equal(data.jobs.length, 30, "item count mismatch");
                        done();
                    });
                })
                it("should have a full subfunction", function () {
                    assert.ok(client)
                });
                it("should have a facets subfunction", function () {
                    assert.ok(client)
                });
                
                describe("jobinfo.search.full API function", function () {
                    it("should return 30 items without params", function (done) {
                        client.jobinfo.search.full({}, function (err, data) {
                            assert.equal(data.jobs.length, 30, "jobs item count mismatch")
                            done();
                        });
                    });

                });
                
                describe("jobinfo.search.facets API function", function () {
                    it("should return jobType facet with 20 items without params", function (done) {
                        client.jobinfo.search.facets({}, function (err, data) {
                            assert.equal(data.jobType.length, 20, "jobs item count mismatch")
                            //done();
                            //console.log(data.jobType.length);
                            done();
                        });
                    });
                });
            });
        });

        it("should have an employer API part", function () {
            assert.ok(client.employer, "employer api branch not found");
        });

        describe("employer API function", function () {
            it("should be invokable", function () {

            });
            it("should have a search function", function () {
                assert.equal(typeof client.employer,"function", "employer must be a function");
            });

            describe("employer.search", function () {
                it("should find employers without params", function (done) {
                    client.employer.search({}, function (err, data) {
                        assert.equal(data.employers.length, 30, "employers count mismatch");
                        done();
                    });
                });

            })
        });

    })
})

//describe('Madgex client', function () {
//    describe("SOAP API facade", function () {
//        var client = madgex.createClient("foobar", { key: "key", secret: "secret" });
//        it("should be present", function () {
//            assert.ok(client.restApi, "restApi not found");
//        });


//    })
//})

