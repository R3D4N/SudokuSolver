class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString) return { error: 'Required field missing' }
    if (puzzleString.length !== 81) return { error: 'Expected puzzle to be 81 characters long' }
    let puzzleRegex = /[^1-9.]/
    if (puzzleRegex.test(puzzleString)) return { error: 'Invalid characters in puzzle' }
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
    return myRow.includes(value)
  }

  checkColPlacement(puzzleString, row, column, value) {
    let myColumn = ''
    for (let index = column; index < puzzleString.length; index += 9) {
      myColumn += puzzleString[index]
    }
    return myColumn.includes(value)
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let myRegion = ''
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
    let rowRange = ['G', 'H', 'I']
    let acsiiValue = row.charCodeAt(0)
    if (acsiiValue >= 65 && acsiiValue <= 67) {
      rowRange = ['A', 'B', 'C']
    } else if (acsiiValue >= 68 && acsiiValue <= 70) {
      rowRange = ['D', 'E', 'F']
    }

    let columnRange = [6, 9]
    if (column >= 0 && column <= 2) {
      columnRange = [0, 3]
    } else if (column >= 3 && column <= 5) {
      columnRange = [3, 6]
    }

    rowRange.forEach(letter => {
      let rowValue = puzzleString.slice(index[letter][0], index[letter][1])
      myRegion += rowValue.slice(columnRange[0], columnRange[1])
    });

    return myRegion.includes(value)
  }

  solvePuzzle(puzzleString){
    let resolved = this.solve([puzzleString])
    if(resolved){
      return {"solution": resolved[0]}
    }
    return {"error": "Puzzle cannot be solved"}
  }

  solve(puzzleString) {
    for (let index = 0; index < puzzleString[0].length; index++) {
      if (puzzleString[0][index] == '.') {
        for (let number = 1; number <= 9; number++) {
          if (this.isValid(puzzleString[0], index, number)) {
            puzzleString[0] = puzzleString[0].slice(0, index) + number + puzzleString[0].slice(index + 1)
            if (this.solve(puzzleString)) {
              return puzzleString
            } else {
              puzzleString[0] = puzzleString[0].slice(0, index) + '.' + puzzleString[0].slice(index + 1)
            }
          }
        }
        return false
      }
    }
    return puzzleString
  }

  isValid(puzzleString, index, number) {
    let row = 'I'
    let column = index % 9
    if (index >= 0 && index < 9) {
      row = 'A'
    } else if (index >= 9 && index < 18) {
      row = 'B'
    } else if (index >= 18 && index < 27) {
      row = 'C'
    } else if (index >= 27 && index < 36) {
      row = 'D'
    } else if (index >= 36 && index < 45) {
      row = 'E'
    } else if (index >= 45 && index < 54) {
      row = 'F'
    } else if (index >= 54 && index < 63) {
      row = 'G'
    } else if (index >= 63 && index < 72) {
      row = 'H'
    }

    if (this.checkRowPlacement(puzzleString, row, 0, number)) return false
    if (this.checkColPlacement(puzzleString, 0, column, number)) return false
    if (this.checkRegionPlacement(puzzleString, row, column, number)) return false

    return true
  }
}

module.exports = SudokuSolver;

