import React from 'react';
import Typography from '@material-ui/core/Typography';
import FbgLogo from 'infra/common/components/base/media/fbg_logo_white_48.png';
import Button from '@material-ui/core/Button';
import MoreVert from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IGameArgs } from 'gamesShared/definitions/game';
import { GameMode } from 'gamesShared/definitions/mode';
import { Chat } from 'infra/chat/Chat';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NextRouter, Link, withRouter } from 'infra/i18n';
import { compose } from 'recompose';
import { IOptionsItems } from 'gamesShared/definitions/options';
import { home } from 'infra/navigation';
import { getGameDefinition } from 'infra/game';

export * from '../../definitions/options';

interface IGameDarkSublayoutInnerProps {
  dispatch: Dispatch;
  router: NextRouter;
}

interface IGameDarkSublayoutOutterProps {
  children: React.ReactNode;
  optionsMenuItems?: () => IOptionsItems[];
  maxWidth?: string;
  gameArgs: IGameArgs;
  avoidOverscrollReload?: boolean;
}

interface IGameDarkSublayoutProps extends IGameDarkSublayoutInnerProps, IGameDarkSublayoutOutterProps {}

interface IGameDarkSublayoutState {
  menuAnchorEl: any;
  prevBgColor: string;
}

const isJest = process.env.JEST_WORKER_ID !== undefined;

export class GameDarkSublayoutInternal extends React.Component<IGameDarkSublayoutProps, IGameDarkSublayoutState> {
  state = { menuAnchorEl: null, prevBgColor: document.body.style.backgroundColor };

  componentDidMount() {
    document.body.style.backgroundColor = 'black';
    if (this.props.avoidOverscrollReload) {
      document.body.style.overscrollBehavior = 'none';
    }
  }

  componentWillUnmount() {
    if (this.props.avoidOverscrollReload) {
      document.body.style.overscrollBehavior = 'auto';
    }
    document.body.style.backgroundColor = this.state.prevBgColor;
  }

  render() {
    const isProdChannel = process.env.NODE_ENV === 'production';
    const gameName = getGameDefinition(this.props.gameArgs.gameCode).name;
    let fbgTopLeftText;
    if (isProdChannel) {
      if (gameName) {
        fbgTopLeftText = (
          <Typography variant="h6" gutterBottom={true} style={{ float: 'left', paddingTop: '9px', color: 'white' }}>
            {gameName}
          </Typography>
        );
      }
    } else {
      fbgTopLeftText = (
        <Typography
          variant="h6"
          gutterBottom={true}
          style={{
            float: 'left',
            marginTop: '10px',
            backgroundColor: 'red',
            color: 'white',
            whiteSpace: 'nowrap',
          }}
        >
          &nbsp;{gameName}&nbsp;
        </Typography>
      );
    }

    return (
      <>
        <div
          style={{
            display: 'flex',
            maxWidth: this.props.maxWidth || '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Link href={() => home()}>
            <a style={{ textDecoration: 'none', display: 'flex' }}>
              <img src={FbgLogo} alt="FreeBoardGames.org" style={{ paddingRight: '16px' }} />
              {fbgTopLeftText}
            </a>
          </Link>
          <div style={{ flexGrow: 1 }}></div>
          {this.renderChatButton()}
          {this.getOptionsMenuButton()}
          {this.getOptionsMenuItems()}
        </div>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'calc(100vh - 49px)',
            textAlign: 'center',
            lineHeight: 'calc(100vh - 49px)',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: this.props.maxWidth || '500px',
              color: 'white',
              display: 'inline-block',
              verticalAlign: 'middle',
              lineHeight: 'normal',
            }}
          >
            {this.props.children}
          </div>
        </div>
      </>
    );
  }

  private renderChatButton() {
    if (typeof window === 'undefined' || isJest) {
      return null;
    }
    const gameArgs = this.props.gameArgs;
    if (gameArgs.mode !== GameMode.OnlineFriend) {
      return null;
    }
    const matchId = this.props.router.query.matchId as string;
    return (
      <div style={{ float: 'right' }}>
        <Chat channelType="match" channelId={matchId} dispatch={this.props.dispatch} />
      </div>
    );
  }

  private getOptionsMenuButton() {
    if (this.props.optionsMenuItems) {
      return (
        <Button onClick={this._openOptionsMenu} aria-label="Open options" variant="outlined">
          <MoreVert style={{ color: 'white' }} />
        </Button>
      );
    }
  }

  _openOptionsMenu = (event: any) => {
    this.setState({ menuAnchorEl: event.currentTarget });
  };

  _closeOptionsMenu = () => {
    this.setState({ menuAnchorEl: null });
  };

  _wrapOnClick = (onClickFunc: () => void) => () => {
    // close menu, call onClickFunc
    this._closeOptionsMenu();
    onClickFunc();
  };

  private getOptionsMenuItems() {
    if (!this.props.optionsMenuItems) {
      return;
    }
    const { menuAnchorEl } = this.state;
    const menuItems = this.props.optionsMenuItems().map((option: IOptionsItems, index) => {
      return (
        <MenuItem key={`option-${index}`} onClick={this._wrapOnClick(option.onClick)}>
          {option.text}
        </MenuItem>
      );
    });
    return (
      <Menu id="simple-menu" anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={this._closeOptionsMenu}>
        {menuItems}
      </Menu>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = function (state) {
  return {
    user: { ...state.user },
  };
};

const enhance = compose<IGameDarkSublayoutInnerProps, IGameDarkSublayoutOutterProps>(
  withRouter,
  connect(mapStateToProps),
);

export const GameDarkSublayout = enhance(GameDarkSublayoutInternal);
