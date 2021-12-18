import { IGameConfig } from 'gamesShared/definitions/game';
import { BombsAndBunniesGame } from './game';
import { BgioBoard } from './board';

const config: IGameConfig = {
  bgioGame: BombsAndBunniesGame,
  bgioBoard: BgioBoard,
  debug: false,
};

export default config;
