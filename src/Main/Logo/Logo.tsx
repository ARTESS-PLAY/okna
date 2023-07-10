import React, { useEffect, useState } from 'react';
import './Logo.scss';

function Logo(props: { img: string }) {
    return <div>{props.img && <img className="logo" src={props.img} alt="icon of partner" />}</div>;
}

export default Logo;
