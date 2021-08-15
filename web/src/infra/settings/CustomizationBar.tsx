import React from 'react';
import {
  GameCustomization,
  FullGameCustomizationState,
  CustomizationType,
  GameCustomizationState,
} from 'gamesShared/definitions/customization';
import { IGameModeInfo } from 'gamesShared/definitions/mode';
import AlertLayer from '../common/components/alert/AlertLayer';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Card from '@material-ui/core/Card';
import css from './CustomizationBar.module.css';
import Typography from '@material-ui/core/Typography';
import { withSettingsService, SettingsService } from 'infra/settings/SettingsService';
import { IGameDef } from 'gamesShared/definitions/game';
import { compose } from 'recompose';
import { withTranslation, WithTranslation } from 'infra/i18n';

interface CustomizationBarInnerProps extends WithTranslation {
  settingsService: SettingsService;
}

interface CustomizationBarOutterProps {
  gameDef: IGameDef;
  info: IGameModeInfo;
}

interface CustomizationBarState {
  customization: GameCustomization | null;
  customizationState: FullGameCustomizationState;
  showCustomizationDialog: boolean;
}

export class CustomizationBarInternal extends React.Component<
  CustomizationBarInnerProps & CustomizationBarOutterProps,
  CustomizationBarState
> {
  state: CustomizationBarState = {
    showCustomizationDialog: false,
    customization: null,
    customizationState: {} as FullGameCustomizationState,
  };

  componentDidMount() {
    if (!this.props.gameDef.customization) {
      return;
    }
    this.props.gameDef.customization().then((customizationModule) => {
      this.setState({ customization: customizationModule.default });
    });
    const customizationState =
      this.props.settingsService.getGameSetting('customization', this.props.gameDef.code) || {};
    this.setState({ customizationState });
  }

  render() {
    return (
      <div className={css.BarWrapper}>
        {this.renderCustomizationDialog()}
        {this.renderQuickCustomization()}
        {this.renderFullCustomizationButton()}
      </div>
    );
  }

  private renderQuickCustomization() {
    const custom = this.state.customization;

    if (!custom?.QuickCustomization) {
      return null;
    }

    const { QuickCustomization } = custom;
    const mode = this.props.info.mode;

    const props = {
      mode,
      currentValue: (this.state.customizationState || {})[mode]?.quick,
      onChange: this._changeCustomValue(CustomizationType.QUICK),
    };

    return <QuickCustomization {...props} />;
  }

  private hasFullCustomization() {
    const custom = this.state.customization;
    return custom?.FullCustomization;
  }

  private renderFullCustomizationButton() {
    if (!this.hasFullCustomization()) {
      return null;
    }
    const mode = this.props.info.mode;
    return (
      <IconButton
        aria-label="Customize game"
        onClick={this.toggleFullCustomizationDialog}
        style={{ height: '36px', width: '36px', marginLeft: 'auto' }}
      >
        <SettingsIcon style={{ color: this.state.customizationState[mode]?.full ? '#3f51b5' : undefined }} />
      </IconButton>
    );
  }

  private renderCustomizationDialog() {
    if (!this.state.showCustomizationDialog) {
      return null;
    }
    return (
      <AlertLayer onClickaway={this.toggleFullCustomizationDialog}>
        <Card className={css.CustomizationCard}>
          {this.renderCustomizationDialogHeader()}
          <div className={css.DialogContentWrapper}>{this.renderCustomizationDialogContent()}</div>
        </Card>
      </AlertLayer>
    );
  }

  private renderCustomizationDialogContent() {
    const custom = this.state.customization;
    const { FullCustomization } = custom;
    const mode = this.props.info.mode;
    const props = {
      mode: this.props.info.mode,
      currentValue: this.state.customizationState[mode]?.full,
      onChange: this._changeCustomValue(CustomizationType.FULL),
    };
    return FullCustomization ? <FullCustomization {...props} /> : null;
  }

  private renderCustomizationDialogHeader() {
    return (
      <div className={css.DialogTitleWrapper}>
        <IconButton aria-label="close" onClick={this.toggleFullCustomizationDialog} className={css.DialogClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="span" className={css.DialogTitle}>
          {this.props.t('customization')}
        </Typography>
      </div>
    );
  }

  toggleFullCustomizationDialog = () => {
    this.setState((prevState) => ({ showCustomizationDialog: !prevState.showCustomizationDialog }));
  };

  _changeCustomValue = (customizationType: CustomizationType) => (value?: unknown) => {
    const mode = this.props.info.mode;
    const customizationState: GameCustomizationState = this.state.customizationState[mode] || {};
    if (customizationType == CustomizationType.QUICK) {
      customizationState.quick = value;
    } else if (customizationType == CustomizationType.FULL) {
      customizationState.full = value;
    }
    const fullCustomizationState: FullGameCustomizationState = {
      ...this.state.customizationState,
      [mode]: customizationState,
    };
    this.props.settingsService.setGameSetting('customization', this.props.gameDef.code, fullCustomizationState);
    this.setState({ customizationState: fullCustomizationState });
  };
}

const enhance = compose<CustomizationBarInnerProps, CustomizationBarOutterProps>(
  withSettingsService,
  withTranslation('CustomizationBar'),
);

export const CustomizationBar = enhance(CustomizationBarInternal);
