import React from 'react';
import ErrorPage from '../../Assets/ErrorPage.svg';
import '../Styles.css';

const Error = () => {
  return (
    <div className="error-page">
        <img src={ErrorPage} alt="Page not found" className="not-found"/>
    </div>
  )
}

export { Error };
