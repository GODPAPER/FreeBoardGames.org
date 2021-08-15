import * as React from 'react';
import { Ctx } from 'boardgame.io';
import { IG, isAllowedDeck } from '../game';
import { CardComponent } from './CardComponent';

interface IDecksProps {
  G: IG;
  ctx: Ctx;
  playerID: string;
  selectDeck: (index: number) => void;
  disabled?: boolean;
}

export class Decks extends React.Component<IDecksProps, {}> {
  _selectDeck = (i: number) => () => this.props.selectDeck(i);

  render() {
    return (
      <div
        style={{
          opacity: this.props.disabled ? 0.75 : 1,
        }}
      >
        {this.props.G.decks.map((deck, i) => (
          <div
            className="DeckRow"
            key={i}
            onClick={this._selectDeck(i)}
            style={{
              marginBottom: '4px',
              opacity: this.getOpacity(i),
            }}
          >
            {deck.map((card) => (
              <div key={card.number}>
                <CardComponent card={card} />
              </div>
            ))}
            <div style={{ clear: 'both' }} />
          </div>
        ))}
      </div>
    );
  }

  getOpacity(id: number): number {
    if (this.props.ctx.phase === 'CARD_SELECT' || this.props.ctx.currentPlayer !== this.props.playerID) {
      return 1;
    }

    if (isAllowedDeck(this.props.G, id, this.props.playerID)) {
      return 1;
    } else {
      return 0.2;
    }
  }
}
