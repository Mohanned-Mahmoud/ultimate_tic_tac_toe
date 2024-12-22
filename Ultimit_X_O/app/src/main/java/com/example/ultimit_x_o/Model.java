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

    public boolean isLocalBoardDrawn(int localBoardIndex) {
        int row = localBoardIndex / DIMENSIONS; // Get the row of the local board
        int col = localBoardIndex % DIMENSIONS; // Get the column of the local board

        // Check if all cells in the local board are occupied
        for (int i = 0; i < DIMENSIONS; i++) {
            for (int j = 0; j < DIMENSIONS; j++) {
                if (ultimateBoard[row][col][i][j] == null) {
                    return false; // If any cell is empty, it's not a draw
                }
            }
        }

        // Ensure there's no winner in this local board
        return !checkLocalBoardWin(ultimateBoard[row][col]);
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
}

