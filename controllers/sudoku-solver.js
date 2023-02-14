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
    if(acsiiValue >=65 && acsiiValue <=67){
      rowRange = ['A', 'B', 'C']
    }else if(acsiiValue>=68 && acsiiValue<=70){
      rowRange = ['D', 'E', 'F']
    }

    let columnRange = [6, 9]
    if(column>=1 && column<=3){
      columnRange = [0, 3]
    }else if(column>=4 && column <=6){
      columnRange = [3, 6]
    }

    rowRange.forEach(letter => {
      rowValue = puzzleString.slice(index[letter][0], index[letter][1])
      myregion += rowValue.slice(columnRange[0], columnRange[1])
    });

    console.log(myRegion);
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

