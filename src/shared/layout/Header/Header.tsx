import React, { useState } from 'react';
import './Header.scss';
import Logo from '../../../img/logo.svg';
import Burger from '../../../img/burger.svg';
import Cross from '../../../img/cross.svg';
import { Link } from 'react-router-dom';

const rootUrl = (window as any).rootURL;

function Header(props: {
    scrollToBlock: (id: string) => void;
    toggleMenu: () => void;
    isOpen: boolean;
    data?: any;
}) {
    const toggleMenu = (): void => {
        props.toggleMenu();
    };

    return (
        <header className="header col-12">
            <div className="container">
                <nav className="nav">
                    <Link to={`${rootUrl}/`}>
                        <img
                            src={props.data.header.logoSrc ? props.data.header.logoSrc : Logo}
                            alt="logo"
                            className="header-logo"
                        />
                    </Link>
                    <ul className="nav-list">
                        <li onClick={() => props.scrollToBlock('slider')} className="nav-list-item">
                            Наши работы
                        </li>
                        <li onClick={() => props.scrollToBlock('footer')} className="nav-list-item">
                            Контакты
                        </li>
                        <li
                            onClick={() => props.scrollToBlock('reviews')}
                            className="nav-list-item">
                            Отзывы
                        </li>
                    </ul>
                </nav>
                <p className="nav-phone">
                    <a href={`tel:${props?.data.header.phone}`}>{props?.data.header.phone}</a>
                </p>
                {!props.isOpen ? (
                    <button onClick={toggleMenu} className="nav-burger">
                        <img src={Burger}></img>
                    </button>
                ) : (
                    <button onClick={toggleMenu} className="nav-cross">
                        <img src={Cross}></img>
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
