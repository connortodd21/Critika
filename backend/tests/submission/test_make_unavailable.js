var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../model/user');
var Category = require('../../model/category')
var Submission = require('../../model/submission')

chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('Test make submission unavailable', function () {

    describe('Test without submissionID', function () {
        it('Should return 400', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    submissionID: sub['_id']
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/submission/make-unavailable')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send()
                        .end((err, res) => {
                            res.should.have.status(400);
                            done()
                        })
                });
            })
        })
    })

    describe('Test with bad auth', function () {
        it('Should return 401', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    submissionID: sub['_id']
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/submission/make-unavailable')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', 'bad token')
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(401);
                            done()
                        })
                });
            })
        })
    })

    describe('Test with correct info', function () {
        it('Should return 200', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    submissionID: sub['_id']
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/submission/make-unavailable')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(400);
                            done()
                        })
                });
            })
        })
    })

})