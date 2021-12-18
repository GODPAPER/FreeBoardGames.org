import * as React from 'react';
import { IPlayerProps } from './shared/interfaces';

import css from './PlayerStacks.module.css';
import { PlayerStack } from './PlayerStack';

export interface IPlayerStacksProps {
  players: IPlayerProps[];
  revealCard?: (playerId: string) => void;
}

export class PlayerStacks extends React.Component<IPlayerStacksProps, {}> {
  render() {
    return <div className={css.playerStacks}>{this.renderStacks()}</div>;
  }

  renderStacks() {
    return this.props.players.map((p, i) => this.renderStack(p, i));
  }

  renderStack(player: IPlayerProps, playerIndex: number) {
    return (
      <PlayerStack
        key={playerIndex}
        playerId={player.id}
        stackSize={player.stack.length}
        revealCard={this.props.revealCard}
        cardStyle={player.cardStyle}
      ></PlayerStack>
    );
  }
}
