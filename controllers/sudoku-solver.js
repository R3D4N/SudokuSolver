class SudokuSolver {

  validate(puzzleString) {
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let index = {
      'A': [0, 9],
      'B': [9, 18],
      'C': [18, 27],
      'D': [27, 36],
      'E': [36, 45],
      'F': [45, 54],
      'G': [54, 63],
      'H': [63, 72],
      'I': [72, 81]
    }
    let myRow = puzzleString.slice(index[row][0], index[row][1])
    return myRow.includes(value) ? false : true
  }

  checkColPlacement(puzzleString, row, column, value) {
    let myColumn = ''
    for (let index = column; index < puzzleString.length; index+=9) {
      myColumn += puzzleString[index]
    }
    return myColumn.includes(value) ? false : true
  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

