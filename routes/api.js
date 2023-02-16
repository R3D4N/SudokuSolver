'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const solver = new SudokuSolver()
module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let {puzzel, coordinate, value} = req.body
      if(!puzzel || !coordinate || !value){
        return res.json({ "error": 'Invalid coordinate'})
      }
      let msg = solver.validate(puzzel)
      if (msg == undefined) {
        let coordinateRegex = /^[A-Ia-i]{1}[1-9]{1}$/
        let valueRegex = /\d{1}/
        if(!coordinateRegex.test(coordinate)){
          return res.json({ "error": "Invalid coordinate" })
        }
        if(!valueRegex.test(value)){
          return res.json({ "error": "Invalid value" })
        }
        let conflict = []
        if(solver.checkRowPlacement(puzzel, coordinate[0], coordinate[1], value)) conflict.push("row")
        if(solver.checkColPlacement(puzzel, coordinate[0], coordinate[1], value)) conflict.push("column")
        if(solver.checkRegionPlacement(puzzel, coordinate[0], coordinate[1], value)) conflict.push("region")

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
      let puzzleString = req.body
      let msg = solver.validate(puzzleString)
      if (msg == undefined) {
        let isResolved = solver.solvePuzzel(puzzleString)
        res.json(isResolved)
      }else{
        res.json(msg)
      }
    });
};
