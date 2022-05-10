import React from 'react';
import { NavLink } from 'react-router-dom';
import './Icon.css';

const Icon = ({props, children}) => {
  return (
    <button className="icon centered" {...props}>{children}</button>
  )
}

export { Icon };