import * as React from 'react';

import { ECardState, ICardInfo } from './definations';
import { CARD_CONTENT, PLAYER_COLORS } from './constants';

const fbgIcon = require('./media/fbg_icon.png');

interface IOneCardProps {
  gridSize: number;
  card: ICardInfo;
  onCardClick: (number) => void;
}
function OneCard(props: IOneCardProps) {
  const isHidden = props.card.state === ECardState.HIDDEN;

  const xPos = Math.floor(props.card.id / props.gridSize);
  const yPos = props.card.id % props.gridSize;
  const strokeWidth = 0.125 / props.gridSize;
  const margin = strokeWidth;
  const cornerAdjustment = 1 + 1 / props.gridSize;
  const imageScale = isHidden ? 8 : 1;

  const animationStyle = {
    transition: '0.6s',
    transform: `rotateY(${props.card.state === ECardState.HIDDEN ? -180 : 0}deg)`,
    transformOrigin: `${((xPos + 0.5) / props.gridSize) * 100}% 50%`,
  };

  return (
    <g
      key={`mm_card_group_${props.card.id}`}
      data-testid={`mm-card-group-${props.card.id}`}
      onClick={() => {
        if (props.card.state === ECardState.HIDDEN) {
          props.onCardClick(props.card.id);
        }
      }}
    >
      <image
        key={`mm_card_image_${props.card.id}`}
        x={xPos + margin * cornerAdjustment * imageScale}
        y={yPos + margin * cornerAdjustment * imageScale}
        width={1 - 2 * margin * cornerAdjustment * imageScale}
        height={1 - 2 * margin * cornerAdjustment * imageScale}
        href={props.card.state === ECardState.HIDDEN ? fbgIcon : CARD_CONTENT[props.card.name]}
        style={{ ...animationStyle }}
      />
      <rect
        id={`mm_card_rect_id_${props.card.id}`}
        key={`mm_card_rect_${props.card.id}`}
        x={xPos + margin}
        y={yPos + margin}
        width={1 - 2 * margin}
        height={1 - 2 * margin}
        rx={strokeWidth * cornerAdjustment}
        style={{
          stroke: PLAYER_COLORS[props.card.openedBy] || 'white',
          strokeWidth,
          fillOpacity: 0,
        }}
      />
    </g>
  );
}

interface ICardGridProps {
  gridSize: number;
  cards: ICardInfo[];
  onCardClick: (number) => void;
}

export default function CardGrid(props: ICardGridProps) {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${props.gridSize} ${props.gridSize}`}>
      {props.cards.map((c, idx) => (
        <OneCard key={`mm_card_${idx}`} gridSize={props.gridSize} card={c} onCardClick={props.onCardClick} />
      ))}
    </svg>
  );
}
