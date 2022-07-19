import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Searchbar from '../Searchbar/Searchbar';
import style from './Header.module.css';

const Header = () => {
  return (
    <div className={style.container}>
      <Link to='/'>
        <img className={style.image} src={logo} alt='logo-henry' />
      </Link>
      <Searchbar />
    </div>
  );
};

export default Header;
