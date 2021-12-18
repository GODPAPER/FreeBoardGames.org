import React from 'react';
import { GameMode } from 'gamesShared/definitions/mode';
import { gameBoardWrapper } from 'infra/game/GameBoardWrapper';
import { render as rendr, screen, waitFor } from '@testing-library/react';
import * as config from 'infra/notification/config';
import { noop } from 'lodash';

class MockBoard extends React.Component<any, any> {
  render() {
    return <div>foo</div>;
  }
}

describe('GameBoardWrapper', () => {
  beforeEach(() => {
    jest.spyOn(config, 'useNotificationsHandler').mockReturnValue({ handleBeginTurn: noop });
  });
  it('should not show warning', async () => {
    render({ isConnected: true });
    await waitFor(() => expect(screen.queryByText('Connection lost')).not.toBeInTheDocument());
  });

  it('should show disconnected warning', () => {
    render({ isConnected: false });
    expect(screen.queryByText('Connection lost')).toBeInTheDocument();
  });
});

function render({ isConnected }) {
  const Board = gameBoardWrapper({
    board: MockBoard,
    gameArgs: { gameCode: 'chess', mode: GameMode.OnlineFriend },
  });
  return rendr(<Board isConnected={isConnected} G={{ pgn: '' }} ctx={{}} />);
}
