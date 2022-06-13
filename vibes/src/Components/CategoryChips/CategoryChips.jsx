import React, { useState } from 'react';
import { Button } from '..';
import { useCategory, useVideo } from '../../Contexts';
import style from './CategoryChips.module.css';

const CategoryChips = () => {
    const {categories} = useCategory();
    const { videoState, videoDispatch } = useVideo();
    const { categoryFilter } = videoState;
  return (
<div className={`dis-flex ${style.categories}`}>
        <Button text="All" 
                contained={categoryFilter==="All"} 
                onClick={()=>videoDispatch({type: "CATEGORY_NAME", payload: "All"})}/>
        {categories.map(({_id, categoryName}) => <Button text={categoryName} 
                                                        contained={categoryName===categoryFilter} 
                                                        onClick={()=>{videoDispatch({type: "CATEGORY_NAME", payload: categoryName})}} 
                                                        key={_id}/>)}
    </div>
  )
}

export { CategoryChips };