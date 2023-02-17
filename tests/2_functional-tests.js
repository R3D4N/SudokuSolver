const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    // #1
    test('solve puzzle with valid puzzle string', function(done){
        chai.request(server)
            .post('/api/solve')
            .send({
                "puzzle": '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            })
            .end(function(err, res){
                assert.property(res.body, 'solution')
                done()
            })
    });
    // #2
    test('solve puzzle with missing puzzle string', function(done){
        chai.request(server)
            .post('/api/solve')
            .send({})
            .end(function(err, res){
                assert.propertyVal(res.body, 'error', 'Required field missing')
                done()
            })
    });
    // #3
    test('solve puzzle with invalid character', function(done){
        chai.request(server)
            .post('/api/solve')
            .send({
                "puzzle": '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37a'
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'error', 'Invalid characters in puzzle')
                done()
            })
    })
    // #4
    test('solve puzzle with incorrect length', function(done){
        chai.request(server)
            .post('/api/solve')
            .send({
                "puzzle": '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37..'
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'error', 'Expected puzzle to be 81 characters long')
                done()
            })
    })
    // #5
    test('solve puzzle that cannot be solved', function(done){
        chai.request(server)
            .post('/api/solve')
            .send({
                "puzzle": '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.376'
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'error', 'Puzzle cannot be solved')
                done()
            })
    })
    // #6
    test('check a puzzle placement with all fields', function(done){
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                "coordinate": 'A1',
                "value": 7
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'valid', true)
                done()
            })
    })
    // #7
    test('check a puzzle placement with single placement conflict', function(done){
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                "coordinate": 'A1',
                "value": 6
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'valid', false)
                assert.include(res.body.conflict, "column")
                done()
            })
    })
    // #8
    test('check a puzzle placement with multiple placement conflict', function(done){
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                "coordinate": 'A1',
                "value": 4
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'valid', false)
                assert.include(res.body.conflict, 'column')
                assert.include(res.body.conflict, 'region')
                done()
            })
    })
    // #9
    test('check a puzzle placement with all placement conflicts', function(done){
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                "coordinate": 'A1',
                "value": 5
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'valid', false)
                assert.include(res.body.conflict, 'row')
                assert.include(res.body.conflict, 'column')
                assert.include(res.body.conflict, 'region')
                done()
            })
    })
    // #10
    test('check a puzzle placement with missing required fields', function(done){
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                "value": 4
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'error', 'Required field(s) missing')
                done()
            })
    })
    // #11
    test('check a puzzel placement with incorrect characters', function(done){
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.a',
                "coordinate": 'A1',
                "value": 7
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'error', 'Invalid characters in puzzle')
                done()
            })
    })
    // #12
    test('check a puzzel placement with incorrect length', function(done){
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6',
                "coordinate": 'A1',
                "value": 7
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'error', 'Expected puzzle to be 81 characters long')
                done()
            })
    })
    // #13
    test('check a puzzel placement with invalid placement coordinate', function(done){
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                "coordinate": 'Z1',
                "value": 7
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'error', 'Invalid coordinate')
                done()
            })
    })
    // #14
    test('check a puzzel placement with invalid placement value', function(done){
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                "coordinate": 'A1',
                "value": 10
            })
            .end(function(err, res){
                assert.propertyVal(res.body, 'error', 'Invalid value')
                done()
            })
    })
});

