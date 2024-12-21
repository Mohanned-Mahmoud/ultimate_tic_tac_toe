package com.example.ultimit_x_o;

public class Model {
    private static final int DIMENSIONS = 3;
    protected Boolean[][][][] ultimateBoard;
    private Boolean[][] globalBoard;
    private boolean currPlayer;

    public Model() {
        ultimateBoard = new Boolean[DIMENSIONS][DIMENSIONS][DIMENSIONS][DIMENSIONS];
        globalBoard = new Boolean[DIMENSIONS][DIMENSIONS];
        currPlayer = true;
    }

    public boolean validMove(int boardRow, int boardCol, int spaceRow, int spaceCol) {
        return ultimateBoard[boardRow][boardCol][spaceRow][spaceCol] == null;
    }

    public void makeMove(int boardRow, int boardCol, int spaceRow, int spaceCol) {
        ultimateBoard[boardRow][boardCol][spaceRow][spaceCol] = currPlayer;
    }

    public boolean checkWin(int boardRow, int boardCol) {
        if (checkLocalBoardWin(ultimateBoard[boardRow][boardCol])) {
            globalBoard[boardRow][boardCol] = currPlayer;
            return true;
        }
        return false;
    }

    public boolean checkGlobalWin() {
        return checkLocalBoardWin(globalBoard);
    }

    public void switchPlayer() {
        currPlayer = !currPlayer;
    }

    public boolean getCurrentPlayer() {
        return currPlayer;
    }

    public boolean isBoardAvailable(int boardRow, int boardCol) {
        return globalBoard[boardRow][boardCol] == null;
    }

    private boolean checkLocalBoardWin(Boolean[][] board) {
        for (int i = 0; i < DIMENSIONS; i++) {
            if (board[i][0] != null && board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                return true;
            }
            if (board[0][i] != null && board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                return true;
            }
        }
        return (board[0][0] != null && board[0][0] == board[1][1] && board[0][0] == board[2][2]) ||
                (board[0][2] != null && board[0][2] == board[1][1] && board[0][2] == board[2][0]);
    }

    public boolean isLocalBoardWon(int row, int col) {
        return globalBoard[row][col] != null;
    }

    public boolean isDraw() {
        for (int i = 0; i < DIMENSIONS; i++) {
            for (int j = 0; j < DIMENSIONS; j++) {
                if (globalBoard[i][j] == null) {
                    return false;
                }
            }
        }
        return true;
    }

    public void reset() {
        ultimateBoard = new Boolean[DIMENSIONS][DIMENSIONS][DIMENSIONS][DIMENSIONS];
        globalBoard = new Boolean[DIMENSIONS][DIMENSIONS];
        currPlayer = true;
    }

    public boolean isBoardAvailable(int boardIndex) {
        int boardRow = boardIndex / DIMENSIONS;
        int boardCol = boardIndex % DIMENSIONS;

        if (globalBoard[boardRow][boardCol] != null) {
            // The local board is already won
            return false;
        }
        for (int i = 0; i < DIMENSIONS; i++) {
            for (int j = 0; j < DIMENSIONS; j++) {
                if (ultimateBoard[boardRow][boardCol][i][j] == null) {
                    return true;
                }
            }
        }
        return false;
    }


        public void makeAIMove() {
            int[] bestMove = minimax(2, currPlayer);
            int boardRow = bestMove[0];
            int boardCol = bestMove[1];
            int spaceRow = bestMove[2];
            int spaceCol = bestMove[3];
            ultimateBoard[boardRow][boardCol][spaceRow][spaceCol] = currPlayer;
        }

        private int[] minimax(int depth, boolean isMaximizing) {
            Boolean[][][][] tempBoard = copyBoard(ultimateBoard);
            int[] bestMove = new int[4];
            int bestScore = isMaximizing ? Integer.MIN_VALUE : Integer.MAX_VALUE;

            for (int boardRow = 0; boardRow < DIMENSIONS; boardRow++) {
                for (int boardCol = 0; boardCol < DIMENSIONS; boardCol++) {
                    if (globalBoard[boardRow][boardCol] == null) {
                        for (int spaceRow = 0; spaceRow < DIMENSIONS; spaceRow++) {
                            for (int spaceCol = 0; spaceCol < DIMENSIONS; spaceCol++) {
                                if (ultimateBoard[boardRow][boardCol][spaceRow][spaceCol] == null) {
                                    ultimateBoard[boardRow][boardCol][spaceRow][spaceCol] = isMaximizing;

                                    int score = minimaxScore(depth - 1, !isMaximizing);

                                    ultimateBoard[boardRow][boardCol][spaceRow][spaceCol] = null;

                                    if (isMaximizing && score > bestScore) {
                                        bestScore = score;
                                        bestMove[0] = boardRow;
                                        bestMove[1] = boardCol;
                                        bestMove[2] = spaceRow;
                                        bestMove[3] = spaceCol;
                                    } else if (!isMaximizing && score < bestScore) {
                                        bestScore = score;
                                        bestMove[0] = boardRow;
                                        bestMove[1] = boardCol;
                                        bestMove[2] = spaceRow;
                                        bestMove[3] = spaceCol;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            ultimateBoard = tempBoard;
            return bestMove;
        }

        private int minimaxScore(int depth, boolean isMaximizing) {
            Boolean winner = checkGlobalWin();
            if (winner != null) {
                return winner == currPlayer ? 10 : -10;
            }

            if (depth == 0 || isDraw()) {
                return 0;
            }

            int bestScore = isMaximizing ? Integer.MIN_VALUE : Integer.MAX_VALUE;

            for (int boardRow = 0; boardRow < DIMENSIONS; boardRow++) {
                for (int boardCol = 0; boardCol < DIMENSIONS; boardCol++) {
                    if (globalBoard[boardRow][boardCol] == null) {
                        for (int spaceRow = 0; spaceRow < DIMENSIONS; spaceRow++) {
                            for (int spaceCol = 0; spaceCol < DIMENSIONS; spaceCol++) {
                                if (ultimateBoard[boardRow][boardCol][spaceRow][spaceCol] == null) {
                                    ultimateBoard[boardRow][boardCol][spaceRow][spaceCol] = isMaximizing;

                                    int score = minimaxScore(depth - 1, !isMaximizing);

                                    ultimateBoard[boardRow][boardCol][spaceRow][spaceCol] = null;

                                    if (isMaximizing) {
                                        bestScore = Math.max(score, bestScore);
                                    } else {
                                        bestScore = Math.min(score, bestScore);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return bestScore;
        }

        private Boolean[][][][] copyBoard(Boolean[][][][] board) {
            Boolean[][][][] newBoard = new Boolean[DIMENSIONS][DIMENSIONS][DIMENSIONS][DIMENSIONS];
            for (int i = 0; i < DIMENSIONS; i++) {
                for (int j = 0; j < DIMENSIONS; j++) {
                    for (int k = 0; k < DIMENSIONS; k++) {
                        System.arraycopy(board[i][j][k], 0, newBoard[i][j][k], 0, DIMENSIONS);
                    }
                }
            }
            return newBoard;
        }

    }



