import React from 'react';
import style from './Hero.module.css';
import './Hero.css';
import { Fade } from 'react-slideshow-image';

const Hero1 = 'https://ik.imagekit.io/ecomdiagonalley/Categories/Hero1_zn_qiPukH.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1652164877260';
const Hero2 = 'https://ik.imagekit.io/ecomdiagonalley/Categories/Hero2_rED0-Gjxi.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1652164877427';
const Hero3 = 'https://ik.imagekit.io/ecomdiagonalley/Categories/Hero3_0u8ifdnfm.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1652164876580';
const Hero4 = 'https://ik.imagekit.io/ecomdiagonalley/Categories/Hero4_6gSR65yYRo.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1652164877363';
const Hero5 = 'https://ik.imagekit.io/ecomdiagonalley/Categories/Hero5_psCYGNqoz.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1652164877774';
const Hero6 = 'https://ik.imagekit.io/ecomdiagonalley/Categories/Hero6_ZXJpBfH6g.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1652164877852';
const properties = {
  duration: 5000,
  autoplay: true,
  transitionDuration: 1500,
  easing: "ease",
};

const fadeImages = [
  {
    url: Hero1,
  },
  {
    url: Hero2,
  },
  {
    url: Hero3,
  },
  {
    url: Hero4,
  },
  {
    url: Hero5,
  },
  {
    url: Hero6,
  }
];

const Hero = () => {
  return (
    <Fade className={style.hero_container} {...properties}>
        {fadeImages.map((fadeImage, index) => (
          <div className={style.hero_container} key={index}>
            <img src={fadeImage.url} className={style.hero}/>
          </div>    
        ))}
    </Fade>
  )
}

export { Hero }