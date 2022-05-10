import React from 'react';
import style from './Background.module.css';
import { useTheme } from '../../Contexts';

const Background = () => {
  const { themeState } = useTheme();
  const { mode } = themeState;
  return (
    <div className={`${style.background} ${mode==="light" ? style.background_light : style.background_dark}`}>
    </div>
  )
}

export { Background };