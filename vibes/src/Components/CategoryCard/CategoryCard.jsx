import React from 'react';
import style from './CategoryCard.module.css';
import { useCategory, useTheme, useVideo } from '../../Contexts';
import { HeaderText } from '..';
import { Link } from 'react-router-dom';

const CategoryCard = () => {
  const { themeState } = useTheme();
  const { mode } = themeState;
  const { categories } = useCategory();
  const { videoDispatch } = useVideo();
  const textCategory = mode==="light" ? style.category_light : style.category_dark;
  return (
    <div className={style.category_gutter}>
      <HeaderText text="Browse Categories"/>
      <div className={style.category_container}>
      {categories.map(({id, categoryName, categoryImage, description}) => 
      <Link to='/explore' className="btn-link">
        <div className={style.category_card} key={id} onClick={()=>videoDispatch({type: "CATEGORY_NAME", payload: categoryName})}>
          <img src={categoryImage} alt="categories" className={style.category_image}/>
          <div className={`${style.category_name} ${textCategory}`}>{categoryName}</div>
          <div className={`${style.category_desc}`}>{description}</div>
        </div>
      </Link>)}
      </div>
    </div>
  )
}

export { CategoryCard };