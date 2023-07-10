import React, { useEffect, useState } from 'react';
import './Advantage.scss';
import sanitize from 'sanitize-html';

function Advantage(props: { key: string; img: string; description: string }) {
    return (
        <div className={`advantage`}>
            {props.img && (
                <img src={props.img} className="advantage-img col-12" alt="icon of advantage" />
            )}
            <p
                className="description"
                dangerouslySetInnerHTML={{ __html: sanitize(props.description) }}></p>
        </div>
    );
}

export default Advantage;
