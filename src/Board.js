import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values
    let initialBoard = Array.from({ length: ncols }, (col, y) =>
      Array.from({ length: nrows }, (io, x) => {
        return {
          isLit: Math.random() < chanceLightStartsOn,
          coord: `${y}-${x}`,
        };
      })
    );
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.reduce((boardLit, col) => {
      return (
        boardLit &&
        col.reduce((colLit, el) => {
          return colLit && el.isLit;
        }, true)
      );
    }, true);
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x].isLit = !boardCopy[y][x].isLit;
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map((col) => col.map((row) => row));

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y, x + 1, newBoard);

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) return <h1>You won</h1>;

  // make table board

  // TODO

  return (
    <table className="Board">
      <tbody>
        {board.map((col) => {
          return (
            <tr>
              {col.map((row) => (
                <Cell
                  isLit={row.isLit}
                  flipCellsAroundMe={() => {
                    flipCellsAround(row.coord);
                  }}
                  key={row.coord}
                />
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Board;
