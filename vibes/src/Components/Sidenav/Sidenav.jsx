import React from 'react';
import style from './Sidenav.module.css';
import  { FaSun, FaHome, FaHistory } from 'react-icons/fa';
import  { MdDarkMode, MdExplore } from 'react-icons/md';
import { AiFillLike, AiFillClockCircle } from 'react-icons/ai';
import { RiPlayListFill } from 'react-icons/ri';
import { useTheme, useVideo } from '../../Contexts';
import { NavLink, Link } from 'react-router-dom';
import { getActiveStyle } from '../../Utils';
 
const Sidenav = () => {
    const { themeState, themeDispatch } = useTheme();
    const { mode } = themeState;
    const { videoDispatch } = useVideo();
  return (
    <div className={`${style.sidenav} ${mode==="light"? style.nav_light : style.nav_dark}`}>
        <div className={style.side_icons}>
            {mode==="light" ?
                <div className="icon centered" onClick={()=>themeDispatch({type: "dark"})}><MdDarkMode/></div>
                :
                <div className="icon centered" onClick={()=>themeDispatch({type: "light"})}><FaSun/></div>
            }
            <p className={style.icon_title}>Mode</p>
        </div>
        <div className={style.side_icons}>    
            <NavLink to="/" className="icon centered" style={getActiveStyle}>
                <FaHome />
            </NavLink>    
            <Link className="link" to="/"><p className={style.icon_title}>Home</p></Link>
        </div>
        <div className={style.side_icons} onClick={()=>videoDispatch({type: "CATEGORY_NAME", payload: "All"})}>
            <NavLink to="/explore" className="icon centered" style={getActiveStyle}>
                <MdExplore />
            </NavLink>     
            <Link className="link" to="/explore"><p className={style.icon_title}>Explore</p></Link>
        </div>
        <div className={style.side_icons}>
            <NavLink to="/liked" className="icon centered" style={getActiveStyle}>
                <AiFillLike />
            </NavLink>    
            <Link className="link" to="/liked"><p className={style.icon_title}>Liked</p></Link>
        </div>
        <div className={style.side_icons}>
            <NavLink to="/playlist" className="icon centered" style={getActiveStyle}>    
                <RiPlayListFill />
            </NavLink>    
            <Link className="link" to="/playlist"><p className={style.icon_title}>Playlist</p></Link>
        </div>
        <div className={style.side_icons}>
            <NavLink to="/watchlater" className="icon centered" style={getActiveStyle}>    
                <AiFillClockCircle />
            </NavLink>    
            <Link className="link" to="/watchlater"><p className={style.icon_title}>Watch later</p></Link>
        </div>
        <div className={style.side_icons}>
            <NavLink to="/history" className="icon centered" style={getActiveStyle}>    
                <FaHistory />
            </NavLink>    
            <Link className="link" to="/history"><p className={style.icon_title}>History</p></Link>
        </div>
    </div>
  )
}

export { Sidenav };