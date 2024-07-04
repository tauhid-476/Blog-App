import React from 'react'
//making in general button
function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  //if more props are passsed the take it
  ...props

}) {
  return (
    //your desires className then default 

    <button className={`px-4 py-2 rounded-lg ${ bgColor} ${ textColor} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button