import React from 'react';
import './Building.scss';

function Building(props: { key: string; img: string; headline: string }) {
    return (
        <div className={`building`}>
            <img src={props.img} className="building-img col-12" alt="image of building" />
            <h3 className="headline">{props.headline}</h3>
        </div>
    );
}

export default Building;
