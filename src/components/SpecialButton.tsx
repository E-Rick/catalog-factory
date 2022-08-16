import React, { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="pushable">
      <span className="shadow"></span>
      <span className="edge"></span>
      <span className="front">
        {children}
      </span>
    </button>
  )
}

export default Button
