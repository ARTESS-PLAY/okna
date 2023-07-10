import React, { useEffect, useRef, useState } from 'react';
import './ColourPicker.scss';
import { Colour$ } from '../Colour/Colour$';
import Colour from '../Colour/Colour';

function ColourPicker({ data }: { data?: any }) {
    const circleRef: React.MutableRefObject<any> = useRef({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(true);

    const colours: Colour$[] = [
        { value: 'chestnut', name: 'Каштановый' },
        { value: 'cyan', name: 'Циановый' },
        { value: 'sandy', name: 'Песочный' },
        { value: 'ashy', name: 'Пепельный' },
        { value: 'brown', name: 'Коричневый' },
        { value: 'grey', name: 'Серый' },
        { value: 'black', name: 'Чёрный' },
        { value: 'golden', name: 'Дуб золотой' },
        { value: 'mahogany', name: 'Махагон' },
        { value: 'nut', name: 'Орех' },
        { value: 'moraine', name: 'Дуб моренный' },
        { value: 'light', name: 'Дуб светлый' },
    ];
    let angle: number = 270;
    const dangle: number = 360 / colours.length;

    let timerInterval: NodeJS.Timer = {} as NodeJS.Timer;

    useEffect(() => {
        circleRef.current.style.height = circleRef.current.clientWidth + 'px';
    }, [circleRef]);

    useEffect(() => {
        timerInterval = setInterval(() => {
            if (currentIndex + 1 === colours.length) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }, 3000);

        return () => {
            clearInterval(timerInterval);
        };
    }, [currentIndex, colours.length, isTimerActive]);
    const changeColour = (colour: Colour$, index$: number): any => {
        if (index$ === currentIndex) {
            setIsTimerActive(!isTimerActive);
        } else {
            if (Math.abs(index$ - currentIndex) < colours.length / 2) {
            } else {
            }
            // setRotation(rotation - angle * (index$ - currentIndex));
            setCurrentIndex(index$);
            clearInterval(timerInterval);
        }
    };

    const onScroll = ($event: any): void => {
        console.log($event);
    };

    const generatePicker = (): JSX.Element[] => {
        const circles: JSX.Element[] = [];

        for (let i = 0; i < colours.length; ++i) {
            const circle: any = (
                <button
                    style={{
                        transform: `rotate(${angle}deg) translate(${
                            (circleRef.current.clientWidth / 2) * 0.8
                        }px) rotate(-${angle}deg)`,
                    }}
                    className={`circle ${i === currentIndex ? 'active' : ''}`}
                    onClick={() => changeColour(colours[i], i)}
                    key={colours[i].value}>
                    <Colour colour={colours[i]} />
                </button>
            );
            angle += dangle;
            circles.push(circle);
        }

        return [...circles];
    };

    return (
        <section className="section section-picker">
            <div className="container col-12 col-md-12">
                <h2 className="headline">{data?.color.title}</h2>
                <div className="container-content col-md-12">
                    <div className="colour-picker col-4 col-md-12">
                        <div
                            className="colour-picker-circle col-12 col-md-10 col-sm-12"
                            onScroll={() => onScroll}
                            ref={circleRef}>
                            {generatePicker()}
                            <div className="windowframe-container">
                                <img
                                    className="windowframe"
                                    src={require('../../img/frame.png')}
                                    alt="window frame"
                                />
                                <img
                                    className="colour-presenter-substrate"
                                    src={require(`../../img/${colours[currentIndex].value}.png`)}
                                    alt="texture"
                                />
                            </div>
                        </div>
                        <p className="colour-picker-current">{colours[currentIndex].name}</p>
                    </div>
                    <div className="colour-presenter col-7 col-md-12">
                        <img src={require('../../img/presenter.png')} alt="colour presenter" />
                        <img
                            className="colour-presenter-substrate"
                            src={require(`../../img/${colours[currentIndex].value}.png`)}
                            alt="texture"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ColourPicker;
