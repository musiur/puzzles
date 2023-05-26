import { useState } from "react";

const SudokuGenerator = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [viewSolution, setViewSolution] = useState(false);

  const generateSudoku = (level) => {
    const puzzle = [];
    const solution = [];

    // Initialize puzzle and solution with empty cells
    for (let i = 0; i < 9; i++) {
      puzzle[i] = [];
      solution[i] = [];
      for (let j = 0; j < 9; j++) {
        puzzle[i][j] = 0;
        solution[i][j] = 0;
      }
    }

    // Fill solution array with a solved Sudoku grid
    solveSudoku(solution);

    // Copy solution to puzzle and remove cells based on the difficulty level
    const emptyCells = getEmptyCellsCount(level);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        puzzle[i][j] = solution[i][j];
      }
    }

    // Remove random cells from the puzzle
    for (let count = 0; count < emptyCells; count++) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      puzzle[row][col] = 0;
    }

    setPuzzle(puzzle);
    setSolution(solution);
  };

  const solveSudoku = (grid) => {
    const emptyCell = findEmptyCell(grid);

    // If no empty cell is found, the puzzle is solved
    if (!emptyCell) {
      return true;
    }

    const [row, col] = emptyCell;

    // Create a random array of numbers from 1 to 9
    const numbers = getRandomNumbers();

    for (let num of numbers) {
      if (isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (solveSudoku(grid)) {
          return true;
        }

        grid[row][col] = 0; // Undo the current cell if no solution is found
      }
    }

    return false; // Triggers backtracking
  };

  const getRandomNumbers = () => {
    // Create an array of numbers from 1 to 9
    const numbers = Array.from({ length: 9 }, (_, index) => index + 1);

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers;
  };

  const findEmptyCell = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null; // Returns null if no empty cell is found
  };

  const isSafe = (grid, row, col, num) => {
    // Check if the number is already present in the same row or column
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) {
        return false;
      }
    }

    // Check if the number is already present in the same 3x3 sub-grid
    const subGridRowStart = Math.floor(row / 3) * 3;
    const subGridColStart = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[subGridRowStart + i][subGridColStart + j] === num) {
          return false;
        }
      }
    }

    return true; // Number is safe to place in the current cell
  };

  const getEmptyCellsCount = (level) => {
    // Determine the number of empty cells based on the difficulty level
    switch (level) {
      case "easy":
        return 40;
      case "medium":
        return 50;
      case "hard":
        return 60;
      default:
        return 40; // Default to easy level
    }
  };

  return (
    <div className="w-full border p-10 rounded-lg">
      <h1 className="text-3xl my-5 font-bold text-center">Sudoku Generator</h1>
      <div className="grid grid-cols-3 gap-3">
        {["easy", "medium", "hard"].map((item) => {
          return (
            <button
              key={item}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase"
              onClick={() => generateSudoku(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
      {puzzle && solution && (
        <div className="mt-8">
          <h2>Puzzle</h2>
          <div className="grid grid-cols-9 gap-1">
            {puzzle.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="bg-gray-200 text-center p-2"
                >
                  {cell !== 0 ? cell : ""}
                </div>
              ))
            )}
          </div>
          <button onClick={() => setViewSolution(!viewSolution)} className="my-10 bg-blue-600 text-white px-4 py-1 rounded-lg">{viewSolution ? "Hide":"Reveal"} solution</button>
          {viewSolution ? (
            <div>
              <h2 className="mt-8">Solution</h2>
              <div className="grid grid-cols-9 gap-1">
                {solution.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="bg-gray-200 text-center p-2"
                    >
                      {cell}
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SudokuGenerator;
