import React from 'react';

import { Radar } from './Radar';
import { ISeabattleState, IShip, ISalvo, ICell } from './game';
import { playSeabattleSound } from './sound';
import Typography from '@material-ui/core/Typography';

import { withCurrentGameTranslation, WithCurrentGameTranslation } from 'infra/i18n';
import { compose } from 'recompose';

interface IBattleInnerProps extends WithCurrentGameTranslation {}

interface IBattleOutterProps {
  G: ISeabattleState;
  ctx: any;
  moves: any;
  playerID: string;
  currentPlayer: string;
  isAIGame?: boolean;
  getSoundPref: () => boolean;
}

interface IBattleState {
  G: ISeabattleState;
  playerID: string;
  currentPlayer: string;
  showSalvo: boolean;
  prevPlayer?: string;
  startTime?: number;
  salvo?: ISalvo;
  aiPlaying?: boolean;
}

export class BattleInternal extends React.Component<IBattleInnerProps & IBattleOutterProps, IBattleState> {
  constructor(props: IBattleInnerProps & IBattleOutterProps) {
    super(props);
    this.state = {
      G: props.G,
      playerID: props.playerID,
      currentPlayer: props.currentPlayer,
      showSalvo: false,
      aiPlaying: false,
    };
  }
  _onClick = (cell: ICell) => {
    const uniqueMove =
      this.state.G.salvos.filter(
        (salvo) =>
          salvo.player === parseInt(this.state.currentPlayer, 10) && salvo.cell.x === cell.x && salvo.cell.y === cell.y,
      ).length === 0;
    if (uniqueMove) {
      this.props.moves.salvo(cell.x, cell.y);
      if (this.props.isAIGame && !this.state.aiPlaying) {
        this.setState((oldState) => {
          return { ...oldState, aiPlaying: true };
        });
        setTimeout(() => {
          this.setState((oldState) => {
            return { ...oldState, aiPlaying: false };
          });
        }, 2500);
      }
    }
  };

  componentDidUpdate(prevProps: IBattleInnerProps & IBattleOutterProps) {
    if (prevProps.currentPlayer !== this.props.currentPlayer) {
      this.setState({
        G: this.props.G,
        playerID: this.props.playerID,
        currentPlayer: this.props.currentPlayer,
        showSalvo: true,
        prevPlayer: prevProps.currentPlayer,
        startTime: Date.now(),
        salvo: this.props.G.salvos[this.props.G.salvos.length - 1],
      });
      requestAnimationFrame(this._animate(Date.now()));
    }
  }

  render() {
    const player = parseInt(this.state.showSalvo ? this.state.prevPlayer : this.state.currentPlayer, 10);
    const ships: IShip[] = this.state.G.ships.filter((ship) => ship.player !== player);
    const salvos: ISalvo[] = this.state.G.salvos.filter((salvo: ISalvo) => salvo.player === player);
    const message = this._getMessage();
    if (this.props.getSoundPref()) {
      playSeabattleSound(message);
    }
    return (
      <div>
        <Typography
          data-testid="message"
          variant="h5"
          style={{ textAlign: 'center', color: 'white', marginBottom: '16px' }}
        >
          {message}
        </Typography>
        <Radar
          player={player}
          ships={ships}
          salvos={salvos}
          editable={false}
          blinkSalvo={this.state.showSalvo}
          onClick={this._onClick}
        />
      </div>
    );
  }

  _getMessage() {
    if (this.state.showSalvo) {
      return this.state.salvo.hit ? this.props.translate('hit') : this.props.translate('miss');
    } else if (this.state.playerID === this.state.currentPlayer) {
      return this.props.translate('click_to_shoot');
    } else {
      return this.props.translate('waiting_for_opponent');
    }
  }

  _animate(now: number) {
    return (() => {
      const elapsed = now - this.state.startTime;
      if (elapsed < 2e3) {
        requestAnimationFrame(this._animate(Date.now()));
      } else {
        this.setState({
          ...this.state,
          showSalvo: false,
        });
      }
    }).bind(this);
  }
}

const enhance = compose<IBattleInnerProps, IBattleOutterProps>(withCurrentGameTranslation);
export const Battle = enhance(BattleInternal);
