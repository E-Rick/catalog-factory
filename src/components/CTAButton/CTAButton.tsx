import React, { ReactNode } from 'react'
import { front, pushableButton, shadow, edge } from './styles.css';

type ButtonProps = {
  children: ReactNode
}

/**
 * 3D whimsical magical button that is buttery smooth using css transitions
 * Instead of box-shadow or border. 
 * Reference: https://www.joshwcomeau.com/animation/3d-button/#adding-a-shadow
 * @param children 
 * @returns 
 */
const CTAButton = ({ children }: ButtonProps) => {
  return (
    <button className={pushableButton}>
      <span className={shadow} />
      <span className={edge} />
      <span className={front}>
        {children}
      </span>
    </button>
  )
}

export default CTAButton
