class Board {
  constructor(size) {
    this.size = size;
    this.board = [];
  }

  buildBoard() {
    let boardSize = this.size;

    for (let row = 0; row <= boardSize - 1; row++) {
      this.board[row] = [];
      for (let column = 0; column <= boardSize - 1; column++) {
        let node = new Node(row, column);
        this.board[row][column] = node;
      }
    }
    // console.log(this.board);
  }

  knightsMoves(startRow, startColumn, targetRow, targetColumn) {
    const knightMoves = [
      [-2, 1],
      [-1, 2],
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
    ];

    let queue = [];
    this.board[startRow][startColumn].visited = true;
    queue.push(this.board[startRow][startColumn]);

    while (queue.length > 0) {
      let node = queue.shift();

      if (node.row === targetRow && node.column === targetColumn) {
        let path = this.tracePath(node);
        console.log("path found: ", path);
        return;
      }

      for (let index = 0; index < knightMoves.length; index++) {
        let move = knightMoves[index];
        let newRow = node.row + move[0];
        let newColumn = node.column + move[1];

        if (
          this.isValid(newRow, newColumn) &&
          !this.board[newRow][newColumn].visited
        ) {
          this.board[newRow][newColumn].visited = true;
          this.board[newRow][newColumn].previous = node;
          queue.push(this.board[newRow][newColumn]);
        }
      }
    }
    console.log("no path found");
  }

  isValid(row, column) {
    return row >= 0 && row < this.size && column >= 0 && column < this.size;
  }

  tracePath(node) {
    let path = [];
    while (node != null) {
      path.unshift({ row: node.row, column: node.column });
      node = node.previous;
    }
    return path;
  }
}

class Node {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.visited = false;
    this.previous = null;
  }
}

const board = new Board(8);

board.buildBoard();

console.log(board.board[3][3]);
board.knightsMoves(3, 3, 1, 6);
