import React from 'react';
import { mount } from 'enzyme';
import { GameLayout } from './GameLayout';
import { IGameArgs } from 'gamesShared/definitions/game';
import { GameMode } from 'gamesShared/definitions/mode';
import { LobbyService } from 'infra/common/services/LobbyService';
import ReplayIcon from '@material-ui/icons/Replay';
import { Router } from 'infra/i18n';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ReplayIcon', () => {
  let querySpy: jest.SpyInstance<typeof Router['query']>;

  beforeEach(() => {
    querySpy = jest.spyOn(Router, 'query', 'get');
  });

  beforeAll(() => {
    jest.spyOn(Router, 'push');
  });

  afterEach(() => {
    querySpy.mockClear();
  });

  it('should show ReplayIcon for AI', () => {
    const gameArgs: IGameArgs = {
      gameCode: 'FooGame',
      mode: GameMode.AI,
    };

    const wrapper = mount(<GameLayout gameOver={'Foo Won'} gameArgs={gameArgs} />);
    expect(wrapper.find(ReplayIcon).length).toEqual(1);
  });

  it('should show ReplayIcon for LocalFriend', () => {
    const gameArgs: IGameArgs = {
      gameCode: 'FooGame',
      mode: GameMode.LocalFriend,
    };

    const wrapper = mount(<GameLayout gameOver={'Foo Won'} gameArgs={gameArgs} />);

    expect(wrapper.find(ReplayIcon).length).toEqual(1);
  });

  it('should redirect to room returned by play again endpoint', async () => {
    querySpy.mockReturnValue({ matchId: 'roomFoo' });

    const p = Promise.resolve('fooNextRoom');
    LobbyService.getPlayAgainNextRoom = jest.fn().mockReturnValue(p);

    const gameArgs: IGameArgs = {
      gameCode: 'FooGame',
      mode: GameMode.OnlineFriend,
      players: [],
      matchCode: 'baz',
    };

    const wrapper = mount(<GameLayout gameOver={'Foo Won'} gameArgs={gameArgs} />);

    wrapper.find(ReplayIcon).simulate('click');
    await p;
    expect(Router.push).toHaveBeenCalledWith('/en/room/fooNextRoom');
  });

  it('should call Router.push with window.location.pathname', () => {
    const gameArgs: IGameArgs = {
      gameCode: 'FooGame',
      mode: GameMode.AI,
    };
    const wrapper = mount(<GameLayout gameOver={'Foo Won'} gameArgs={gameArgs} />);
    wrapper.find(ReplayIcon).simulate('click');
    expect(Router.push).toHaveBeenCalledWith(window.location.pathname);
  });
});
