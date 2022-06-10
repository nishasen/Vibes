import React, { useState } from 'react';
import style from './Topnav.module.css';
import { Header, Button, Toast, Search } from '..';
import { FaSearch, FaUserAlt } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { useAuth, useTheme } from '../../Contexts';
import { Link, useNavigate } from 'react-router-dom';

const Topnav = () => {
  const { userLogin, logoutHandler, response } = useAuth();
  const { themeState } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { mode } = themeState;
  const topnav_background = mode==="light" ? style.topnav_light : style.topnav_dark;
  return (
      <div className={`${style.topnav} ${topnav_background} `}>
        <Header />
        <div className={style.nav_icons}>
          <div className="icon centered" onClick={()=>setShowSearch(true)}><FaSearch /></div>
          {showSearch && <Search setShowSearch={setShowSearch}/>}
          {userLogin ? <>
                      <div className="icon centered" onClick={()=> setShowProfile(!showProfile)}><FaUserAlt /></div>
                        {showProfile && 
                          <div className={style.user_profile}>
                            <h3>Hey {response.firstName ? response.firstName + "👋" : "👋"}</h3>
                            <h4><span>Welcome to</span> Vibes</h4>
                          </div>
                        }
                      <div className="icon centered" onClick={()=>logoutHandler(Toast)}><IoMdLogOut /></div>
                    </>  
                    :
                    <Link to="/login"><Button text="Login" /></Link>
          }
        </div> 
      </div>
  )
}

export { Topnav };