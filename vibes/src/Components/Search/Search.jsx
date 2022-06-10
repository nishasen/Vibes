import React, { useState, useEffect } from 'react';
import style from './Search.module.css';
import { Button } from '..';
import { useVideo } from '../../Contexts';
import { useNavigate } from 'react-router-dom';

const Search = ({setShowSearch}) => {
  const { videoDispatch } = useVideo();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const updateDebounceText = debounce((text)=>{
    videoDispatch({type: 'SEARCH_FILTER', payload: text})
  }, 1000)

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    updateDebounceText(value);
    navigate('/explore', {replace: true});
  }

  function debounce(cb, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(()=> cb(...args), delay);
    }
  }

  return (
    <div className={style.search_outer_modal}>
      <div className={style.search_modal}>
        <input 
          className={style.search_input} 
          type="search" 
          placeholder="Search" 
          value={searchText}
          onChange={(e)=>handleChange(e)} />
        <Button text="Close" type="button" onClick={()=>{
          setShowSearch(false)
        }}/>
      </div>
    </div>
  )
}

export { Search };
