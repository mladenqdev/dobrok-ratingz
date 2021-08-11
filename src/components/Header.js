import React from 'react';
import classes from './Header.module.css';

const Header = ({ handleToggleDarkMode }) => {
    return ( 
        <div className={classes.header}>
            <h1>dobrokRatingz</h1>
            <button onClick={() => handleToggleDarkMode((darkModeState) => !darkModeState)} className={'btn'}>Toggle Theme</button>
        </div>
     );
}
 
export default Header;