import React from 'react';
import style from './Topnav.module.css';
import { Header, Button, Icon, Toast } from '..';
import { FaSearch, FaUserAlt } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { useAuth } from '../../Contexts';
import { Link } from 'react-router-dom';

const Topnav = () => {
  const { userLogin, logoutHandler } = useAuth();
  return (
      <div className={style.topnav}>
        <Header />
        <div className={style.nav_icons}>
          <Icon><FaSearch /></Icon>
          {userLogin ? <>
                      <Icon><FaUserAlt /></Icon>
                      <Icon><IoMdLogOut onClick={()=>logoutHandler(Toast)}/></Icon>
                    </>  
                    :
                    <Link to="/login"><Button text="Login" /></Link>
          }
        </div> 
      </div>
  )
}

export { Topnav };