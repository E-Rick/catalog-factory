import { style, createVar, keyframes } from '@vanilla-extract/css';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(180deg)' }
});

const comeInOut = keyframes({
  '0%': { transform: 'scale(0)' },
  '50%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0)' }
})

export const sparkleAnimation = style({
  animation: `${spin} 600ms forwards`,

})

export const sparkleSvg = style({
  display: 'block',
  animation: `${spin} 1000ms linear`
});

export const sparkleWrapper = style({
  position: 'absolute',
  display: 'block',
  animation: `${comeInOut} 700ms forwards`
})