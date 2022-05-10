import React from 'react';
import { Icon } from '..';
import style from './Sidenav.module.css';
import  { FaSun, FaHome, FaHistory } from 'react-icons/fa';
import  { MdDarkMode, MdExplore } from 'react-icons/md';
import { AiFillLike, AiFillClockCircle } from 'react-icons/ai';
import { RiPlayListFill } from 'react-icons/ri';
import { useTheme, useVideo } from '../../Contexts';
import { NavLink } from 'react-router-dom';
import { getActiveStyle } from '../../Utils';
 
const Sidenav = () => {
    const { themeState, themeDispatch } = useTheme();
    const { mode } = themeState;
    const { videoDispatch } = useVideo();
  return (
    <div className={`${style.sidenav} ${mode==="light"? style.nav_light : style.nav_dark}`}>
        <div className={style.side_icons}>
            {mode==="light" ?
                <Icon><MdDarkMode onClick={()=>themeDispatch({type: "dark"})}/></Icon>
                :
                <Icon><FaSun onClick={()=>themeDispatch({type: "light"})}/></Icon>
            }
            <p className={style.icon_title}>Mode</p>
        </div>
        <div className={style.side_icons}>    
            <NavLink to="/" className="icon centered" style={getActiveStyle}>
                <FaHome />
            </NavLink>    
            <p className={style.icon_title}>Home</p>
        </div>
        <div className={style.side_icons} onClick={()=>videoDispatch({type: "CATEGORY_NAME", payload: "All"})}>
            <NavLink to="/explore" className="icon centered" style={getActiveStyle}>
                <MdExplore />
            </NavLink>     
            <p className={style.icon_title}>Explore</p>
        </div>
        <div className={style.side_icons}>
            <NavLink to="/liked" className="icon centered" style={getActiveStyle}>
                <AiFillLike />
            </NavLink>    
            <p className={style.icon_title}>Liked</p>
        </div>
        <div className={style.side_icons}>
            <NavLink to="/playlist" className="icon centered" style={getActiveStyle}>    
                <RiPlayListFill />
            </NavLink>    
            <p className={style.icon_title}>Playlist</p>
        </div>
        <div className={style.side_icons}>
            <NavLink to="/watchlater" className="icon centered" style={getActiveStyle}>    
                <AiFillClockCircle />
            </NavLink>    
            <p className={style.icon_title}>Watch later</p>
        </div>
        <div className={style.side_icons}>
            <NavLink to="/history" className="icon centered" style={getActiveStyle}>    
                <FaHistory />
            </NavLink>    
            <p className={style.icon_title}>History</p>
        </div>
    </div>
  )
}

export { Sidenav };