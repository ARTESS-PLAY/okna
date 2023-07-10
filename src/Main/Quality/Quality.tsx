import React, { useEffect, useState } from 'react';
import './Quality.scss';
import sanitize from 'sanitize-html';

function Quality(props: { key: string; img: string; headline: string; description: string }) {
    return (
        <div className={`quality`}>
            {props.img && (
                <img src={props.img} className="quality-img col-12" alt="icon of quality" />
            )}
            <h4 className="headline">{props.headline}</h4>
            <p
                className="description"
                dangerouslySetInnerHTML={{ __html: sanitize(props.description) }}></p>
        </div>
    );
}

export default Quality;
