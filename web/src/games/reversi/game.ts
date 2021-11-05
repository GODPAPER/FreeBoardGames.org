import { INVALID_MOVE } from 'boardgame.io/core';
import { Game, Ctx } from 'boardgame.io';

export interface IG {
  points: string[];
}

function toPosition(x: number, y: number) {
  return y * 8 + x;
}

function inBounds(x: number, y: number) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

export function getValidMoves(G: IG, playerID: string) {
  let validMoves: Set<number> = new Set();
  G.points
    .map((player, position) => ({ player, position }))
    .filter((point) => point.player === playerID)
    .forEach((point) => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x = point.position % 8;
          // const y = Math.floor(point.position / 8);  // https://github.com/babel/minify/issues/904
          const y = (point.position / 8) << 0;

          let currX = x + i;
          let currY = y + j;
          let k = 1;
          let end: number = null;

          while (inBounds(currX, currY) && G.points[toPosition(currX, currY)] !== playerID) {
            const position = toPosition(currX, currY);
            if (G.points[position] === null) {
              end = position;
              break;
            }

            k++;
            currX = x + i * k;
            currY = y + j * k;
          }

          if (end !== null && k > 1) {
            validMoves.add(end);
          }
        }
      }
    });

  if (validMoves.size > 0) {
    return validMoves;
  }

  G.points
    .map((player, position) => ({ player, position }))
    .filter((point) => point.player === null)
    .forEach((point) => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) {
            continue;
          }

          const x = point.position % 8;
          const y = (point.position / 8) << 0; // https://github.com/babel/minify/issues/904
          if (inBounds(x + i, y + j) && G.points[toPosition(x + i, y + j)] !== null) {
            validMoves.add(point.position);
          }
        }
      }
    });

  return validMoves;
}

export function placePiece(G: IG, ctx: Ctx, x: number, y: number) {
  if (G.points[toPosition(x, y)] !== null) {
    return INVALID_MOVE;
  }

  let changed: number[] = [toPosition(x, y)]; // Changed positions
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      let valid = false;
      let update = [];
      let currX = x + i;
      let currY = y + j;
      for (let k = 2; inBounds(currX, currY) && G.points[toPosition(currX, currY)] !== null; k++) {
        if (G.points[toPosition(currX, currY)] === ctx.currentPlayer) {
          valid = true;
          break;
        }
        update.push(toPosition(currX, currY));

        currX = x + i * k;
        currY = y + j * k;
      }

      if (valid) {
        changed.push(...update);
      }
    }
  }

  if (changed.length === 1) {
    if (getValidMoves(G, ctx.playerID).has(toPosition(x, y))) {
      return {
        ...G,
        points: Object.values({
          ...G.points,
          [toPosition(x, y)]: ctx.playerID,
        }),
      };
    }

    return INVALID_MOVE;
  } else {
    changed.sort((a, b) => b - a);
    return {
      ...G,
      points: G.points.map((point, i) => {
        if (changed.length > 0 && i === changed[changed.length - 1]) {
          changed.pop();
          return ctx.playerID;
        } else {
          return point;
        }
      }),
    };
  }
}

export function getScoreBoard(G: IG, ctx: Ctx) {
  let scoreBoard = new Array(ctx.numPlayers).fill(0);
  G.points
    .filter((point) => point !== null && parseInt(point) < ctx.numPlayers)
    .forEach((point) => scoreBoard[point as any]++);
  return scoreBoard.map((score, i) => ({ playerID: i.toString(), score })).sort((a, b) => b.score - a.score);
}

const GameConfig: Game<IG> = {
  name: 'reversi',
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  endIf: (G: IG, ctx: Ctx) => {
    if (!G.points.includes(null)) {
      return { scoreboard: getScoreBoard(G, ctx) };
    }
  },
  moves: {
    placePiece,
  },
  setup: (ctx): IG => {
    let points = Array(64).fill(null);
    if (ctx.numPlayers === 2) {
      points[toPosition(4, 4)] = '1';
      points[toPosition(4, 3)] = '2';
    } else {
      points[toPosition(4, 3)] = '1';
      points[toPosition(4, 4)] = '2';
    }
    points[toPosition(3, 3)] = '0';
    points[toPosition(3, 4)] = '3';
    return {
      points,
    };
  },
};

export const ReversiGame = GameConfig;
