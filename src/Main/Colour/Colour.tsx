import React from 'react';
import './Colour.scss'
import {Colour$} from "./Colour$";

function Colour(props: {colour: Colour$}) {
    return (
        <div className={`circle-shape circle-${props.colour.value}`} data-name={props.colour.name} data-value={props.colour.value}>

        </div>
    );
}

export default Colour;
