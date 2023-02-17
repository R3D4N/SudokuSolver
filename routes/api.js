'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const solver = new SudokuSolver()
module.exports = function (app) {  

  app.route('/api/check')
    .post((req, res) => {
      let {puzzle, coordinate, value} = req.body
      if(!puzzle || !coordinate || !value){
        return res.json({ "error": 'Required field(s) missing'})
      }
      let msg = solver.validate(puzzle)
      if (msg == undefined) {
        let coordinateRegex = /^[A-Ia-i]{1}[1-9]{1}$/
        let valueRegex = /^[1-9]{1}$/
        if(!coordinateRegex.test(coordinate)){
          return res.json({ "error": "Invalid coordinate" })
        }
        if(!valueRegex.test(value)){
          return res.json({ "error": "Invalid value" })
        }
        let conflict = []
        let row = coordinate[0].toUpperCase()
        let column = Number(coordinate[1])-1
        if(solver.checkValueCoordinate(puzzle, row, column, value)) return res.json({"valid": true})
        if(solver.checkRowPlacement(puzzle, row, 0, value)) conflict.push("row")
        if(solver.checkColPlacement(puzzle, 0, column, value)) conflict.push("column")
        if(solver.checkRegionPlacement(puzzle, row, column, value)) conflict.push("region")

        if(conflict.length == 0){
          res.json({"valid": true})
        }else{
          res.json({"valid": false, "conflict": conflict})
        }
      }else{
        res.json(msg)
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle
      let msg = solver.validate(puzzleString)
      if (msg == undefined) {
        let isResolved = solver.solvePuzzle(puzzleString)
        res.json(isResolved)
      }else{
        res.json(msg)
      }
    });
};
