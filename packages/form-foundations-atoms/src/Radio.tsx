import MUIRadio, { RadioProps as MUIRadioProps } from '@material-ui/core/Radio';
import * as React from 'react';
import styled from 'styled-components';
import { RadioProps } from './types';

export const Radio = styled<RadioProps>(MUIRadio).attrs<{}, MUIRadioProps>({
  classes: {
    root: 'Radio-root',
    checked: 'Radio-checked',
    colorPrimary: 'Radio-colorPrimary',
    colorSecondary: 'Radio-colorSecondary',
    disabled: 'Radio-disabled'
  }
})`
  && {
    svg {
      font-size: 20px;
    }
    &.Radio-root {
      padding: 10px;
      color: ${({ error }) => (error ? '#ec0000' : 'rgba(0, 0, 0, 0.55)')};
      &:hover:not(.Radio-checked) {
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.05490196078431373);
      }
    }

    &.Radio-checked {
    }
    &.Radio-colorPrimary {
    }
    &.Radio-colorSecondary {
    }
    &.Radio-colorSecondary.Radio-checked {
      color: #ffb432;
    }
    &.Radio-colorSecondary.Radio-disabled {
      color: ${({ error }) =>
        error ? 'rgba(236, 0, 0, 0.16)' : 'rgba(0, 0, 0, 0.11)'};
    }
    &.Radio-disabled {
    }
  }
` as React.ComponentType<RadioProps>;

Radio.defaultProps = {
  'data-id': 'radio'
};
