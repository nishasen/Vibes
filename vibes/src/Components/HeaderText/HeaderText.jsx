import React from 'react';
import style from './HeaderText.module.css';
import { useTheme } from '../../Contexts';

const HeaderText = (props) => {
    const { themeState } = useTheme();
    const { mode } = themeState;
    const { text } = props;
    const textHeader = mode==="light" ? style.text_light : style.text_dark;
  return (
    <div className={`${style.header_text} ${textHeader}`}>{text}</div>
  )
}

export { HeaderText }