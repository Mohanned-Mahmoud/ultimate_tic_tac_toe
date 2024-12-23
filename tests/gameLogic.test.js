const { expect } = require('chai');
const { makeMove, checkWin, checkDraw } = require('../gameLogic');

describe('Game Logic Unit Tests', () => {
  
  // Test for winning in a small board
  it('should detect a win on the small board', () => {
    const smallBoard = [
      ['X', 'X', 'X'],
      [null, 'O', null],
      ['O', null, null],
    ];
    const result = checkWin(smallBoard);
    expect(result).to.equal('X');
  });

  // Test for winning in the big board
  it('should detect a win on the big board', () => {
    const bigBoard = [
      ['X', 'X', 'X'],
      [null, null, null],
      ['O', 'O', null],
    ];
    const result = checkWin(bigBoard);
    expect(result).to.equal('X');
  });

  // Test for draw scenario
  it('should detect a draw', () => {
    const drawBoard = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O'],
    ];
    const result = checkDraw(drawBoard);
    expect(result).to.be.true;
  });

  // Test for valid move
  it('should allow a valid move', () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const move = { row: 1, col: 1, player: 'X' };
    const result = makeMove(board, move);
    expect(result).to.be.true;
    expect(board[1][1]).to.equal('X');
  });

  // Test for invalid move
  it('should prevent an invalid move', () => {
    const board = [
      [null, null, null],
      [null, 'X', null],
      [null, null, null],
    ];
    const move = { row: 1, col: 1, player: 'O' }; // Already occupied
    const result = makeMove(board, move);
    expect(result).to.be.false;
  });
});
