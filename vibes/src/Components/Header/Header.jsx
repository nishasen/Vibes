import React from 'react';
import { Link } from 'react-router-dom';
import Vibes from '../../Assets/Vibes.png';
import { useTheme } from '../../Contexts';
import style from './Header.module.css';

const Header = () => {
    const { themeState } = useTheme();
    const { mode } = themeState;
  return (
    <>
      <Link to="/"><img src={Vibes} alt="header" className={style.header}/></Link>
    </>
  )
}

export { Header };
