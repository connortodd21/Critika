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

describe('Test add comment', function () {

    this.afterAll( () => {
        Category.findOneAndDelete({categoryName: 'categoryName'})
    })

    describe('Test without category name', function () {
        it('Should return 400', function (done) {
            var info = {
                categoryDescription: 'category description'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/category/create-category')
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

    describe('Test without category description', function () {
        it('Should return 400', function (done) {
            var info = {
                categoryName: 'category name',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/category/create-category')
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

    describe('Test with bad auth', function () {
        it('Should return 401', function (done) {
            var info = {
                categoryName: 'category name',
                categoryDescription: 'category description'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/category/create-category')
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

    describe('Test with correct info', function () {
        it('Should return 200', function (done) {
            var info = {
                categoryName: 'category name',
                categoryDescription: 'category description'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/category/create-category')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done()
                    })
            });
        })
    })

})