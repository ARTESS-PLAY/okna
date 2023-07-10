import React, {useState} from 'react';
import Colour from "../Colour/Colour";
import {Colour$} from "../Colour/Colour$";

function Circle(props: {onClick:() => any, colour: Colour$, styles: any, key: string}) {
    // const [styles, setStyles] = useState({});

    return (
        <button
            className="circle"
            style={props.styles}
        >
            <Colour colour={props.colour} />
        </button>
    );
}

export default Circle;