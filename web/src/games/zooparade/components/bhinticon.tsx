import React from 'react';
import { IHintIcon } from '../interfaces';
import css from './bhinticon.module.css';

interface InnerWrapper {
  hintIcon: IHintIcon;

  keyPropagation: string;
}

// https://dribbble.com/shots/2012608-Material-Design-Colors
const colors = ['#8bc34a', '#9e9e9e', '#795548', '#ffeb3b', '#5677fc', '#607d8b'];

export class BHintIcon extends React.Component<InnerWrapper, {}> {
  render() {
    return (
      <div
        className={css.hint}
        style={{
          backgroundColor: this.props.hintIcon.color !== -1 ? colors[this.props.hintIcon.color] : 'black',
        }}
        key={this.props.keyPropagation}
      >
        {this.props.hintIcon.value !== -1 && this.props.hintIcon.value !== null ? this.props.hintIcon.value + 1 : ' '}
      </div>
    );
  }
}
