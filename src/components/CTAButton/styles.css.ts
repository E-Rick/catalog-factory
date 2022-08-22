import { style } from '@vanilla-extract/css';

export const pushableButton = style({
  position: 'relative',
  borderRadius: 12,
  border: 'none',
  background: 'hsl(340deg 100% 32%)',
  padding: 0,
  cursor: 'pointer',
  outlineOffset: 4,
  transition: 'filter 250ms',
  ':hover': {
    filter: 'brightness(110%)'
  },
})

export const front = style({
  display: 'block',
  position: 'relative',
  padding: '12px 42px',
  borderRadius: 12,
  fontSize: '1.25rem',
  color: 'white',
  background: 'hsl(345deg 74% 62%)',
  willChange: 'transform',
  transform: 'translateY(-4px)',
  transition: 'transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1)',
  ':hover': {
    transform: 'translateY(-6px)',
    transition: 'transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5)'
  },
  ':active': {
    transform: 'translateY(-2px)',
    transition: 'transform 34ms'
  },
  selectors: {
    '&:focus:not(:focus-visible)': {
      outline: 'none'
    }
  }
})

export const shadow = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: 12,
  background: 'hsl(0deg 0% 0% / 0.25)',
  willChange: 'transform',
  transform: 'translateY(2px)',
  transition: 'transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1)',
  selectors: {
    [`${pushableButton}:hover &`]: {
      transform: 'translateY(4px)',
      transition: 'transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5)'
    },
    [`${pushableButton}:active &`]: {
      transform: 'translateY(1px)',
      transition: 'transform 34ms'
    },
  }
})

export const edge = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: 12,
  background: `linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
	)`
})


