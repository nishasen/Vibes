import React from 'react';
import { Link } from 'react-router-dom';
import VibesDark from '../../Assets/VibesDark.png';
import VibesLight from '../../Assets/VibesLight.png';
import { useTheme } from '../../Contexts';
import style from './Header.module.css';

const Header = () => {
    const { themeState } = useTheme();
    const { mode } = themeState;
  return (
    <>
       {mode==="light" ? 
            <Link to="/"><img src={VibesLight} alt="header" className={style.header}/></Link>
            :
            <Link to="/"><img src={VibesDark} alt="header" className={style.header}/></Link>}
    </>
  )
}

export { Header };
