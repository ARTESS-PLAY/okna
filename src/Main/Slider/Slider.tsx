import React, { useEffect, useRef, useState } from 'react';
import { caseInterface } from '../../interfaces/CaseInterface';
import './Slider.scss';
import ArrowBack from '../../img/arrow-back.svg';
import ArrowNext from '../../img/arrow-next.svg';

function Slider(props: {
    case: caseInterface;
    cases: caseInterface[];
    slide: number;
    setSlide: (index: number) => void;
    goBack: () => void;
    goNext: () => void;
}) {
    const imgRef: React.MutableRefObject<any> = useRef(null);
    const imgContainer = useRef<any>();
    const [initialIndex, setInitialIndex] = useState<number>(0);

    useEffect(() => {
        imgContainer.current.style.height = imgContainer.current.clientWidth * (9 / 16) + 'px';
    }, [imgContainer]);

    useEffect(() => {
        if (imgRef) {
            if (
                document.documentElement.clientWidth < 995 &&
                document.documentElement.clientWidth > 576
            ) {
                imgRef.current.style.height =
                    imgRef.current.querySelector('img').clientWidth * 0.58 + 'px';
            } else if (document.documentElement.clientWidth < 577) {
                imgRef.current.style.height =
                    imgRef.current.querySelector('img').clientWidth * 0.65 + 'px';
            } else {
                imgRef.current.style.height = 'auto';
            }
        }
        window.addEventListener('resize', () => {
            if (imgRef) {
                if (
                    document.documentElement.clientWidth < 995 &&
                    document.documentElement.clientWidth > 576
                ) {
                    imgRef.current.style.height =
                        imgRef.current.querySelector('img').clientWidth * 0.58 + 'px';
                } else if (document.documentElement.clientWidth < 577) {
                    imgRef.current.style.height =
                        imgRef.current.querySelector('img').clientWidth * 0.65 + 'px';
                } else {
                    imgRef.current.style.height = 'auto';
                }
            }
        });
    }, [imgRef]);

    const goBack = (): void => {
        props.goBack();
        if (props.slide % 3 === 0 && props.slide > 2) {
            setInitialIndex(props.slide - 3);
        }
        if (props.slide === 0) {
            setInitialIndex(props.cases.length - 3);
        }
    };

    const goNext = (): void => {
        props.goNext();
        if ((props.slide + 1) % 3 === 0 && props.slide + 1 > 2) {
            setInitialIndex(props.slide + 1);
        }
        if (props.slide + 1 === props.cases.length) {
            setInitialIndex(0);
        }
    };

    return (
        <div className="slide col-12">
            <div className="slide-upper">
                <div className="slide-info col-5 col-md-12">
                    <h5 className="headline">{props.case.name}</h5>
                    <p className="description">{props.case.description}</p>
                    <div className="slide-favours">
                        <h6 className="headline">Работы</h6>
                        <ul className="slide-favours-list">
                            {props.case.favours.map((favour, i) => (
                                <li key={i} className="slide-favours-list-item">
                                    {favour}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="slide-other">
                        <div className="terms">
                            <p>Сроки:</p>
                            <p>{props.case.days} дней</p>
                        </div>
                        <div className="price">
                            <p>Стоимость:</p>
                            <p>{props.case.price} ₽</p>
                        </div>
                    </div>
                </div>
                {/*Mobile only*/}
                <div className="slide-essentials-responsive">
                    <div className="slide-imgs col-12" ref={imgRef}>
                        {props.cases.slice(initialIndex, initialIndex + 3).map((case$, index) => (
                            <img
                                key={index}
                                className={`col-12 ${
                                    props.slide === props.cases.indexOf(case$) ? 'active' : ''
                                }`}
                                onClick={() => props.setSlide(index)}
                                src={case$.imgs}
                                alt="image of case"
                            />
                        ))}
                    </div>
                    <div className="section-slider-btns col-12">
                        <button onClick={goBack} className="section-slider-btn">
                            <img src={ArrowBack} alt="arrow back icon" />
                        </button>
                        <button onClick={goNext} className="section-slider-btn">
                            <img src={ArrowNext} alt="arrow next icon" />
                        </button>
                    </div>
                </div>
                <div ref={imgContainer} className="slide-img col-6 col-md-12">
                    <img className="col-12" src={props.case.imgs} alt="current image of case" />
                </div>
            </div>
        </div>
    );
}

export default Slider;
