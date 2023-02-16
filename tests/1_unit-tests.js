const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;

suite('Unit Tests', () => {
    // #1
    test('valid puzzle whit 81 characters', function(){
        assert.isUndefined(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'))
    })
    // #2
    test('invalid characters', function(){
        assert.propertyVal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37r'), 'error', 'Invalid characters in puzzle')
    })
    // #3
    test('not have 81 characters', function(){
        assert.propertyVal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37'), 'error', 'Expected puzzle to be 81 characters long')
    })
    // #4
    test('valid row placement', function(){
        assert.isFalse(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 'A',0 , 3))
    })
    // #5
    test('invalid row placement', function(){
        assert.isTrue(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 'A', 0, 2))
    })
    // #6
    test('valid column placement', function(){
        assert.isFalse(solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 0, 0, 5))
    })
    // #7
    test('invalid column placement', function(){
        assert.isTrue(solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 0, 0, 8))
    })
    // #8
    test('valid region placement', function(){
        assert.isFalse(solver.checkRegionPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 'A', 0, 4))
    })
    // #9
    test('invalid region placement', function(){
        assert.isTrue(solver.checkRegionPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 'A', 0, 5))
    })
    // #10
    test('valid puzzle strings pass the solver', function(){
        assert.notProperty(solver.solvePuzzel('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), 'error')
    })
    // #11
    test('invalid puzzle strings fail the solver', function(){
        assert.property(solver.solvePuzzel('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..8..'), 'error')
    })
    // #12
    test('returns expected solution for an incomplete puzzle', function(){
        assert.notProperty(solver.solvePuzzel('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3..'), 'error')
    })

});
