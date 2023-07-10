import React, { useEffect, useRef } from 'react';
import '../Forms.scss';
import { Link } from 'react-router-dom';

const rootUrl = (window as any).rootURL;

function Measurement({ data }: { data?: any }) {
    const styles: { [key: string]: React.CSSProperties } = {
        img: {
            backgroundImage: `url(${data?.formFinish.backgroundDesk})`,
        },
    };
    console.log(rootUrl);

    const imageRef: React.MutableRefObject<any> = useRef(null);

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.style.minHeight = imageRef.current.clientWidth * 0.8 + 'px';
        }
    }, [imageRef]);
    return (
        <div className="form-page measurement">
            <div className="container col-12">
                <div className="image col-8 col-md-12" ref={imageRef} style={styles.img}>
                    <div className="form-container col-12">
                        <div className="form-finish">
                            <div className="form-header">
                                <h4 className="headline">{data?.formFinish?.title}</h4>
                                <p className="description">{data?.formFinish.description}</p>
                            </div>
                            <Link to={`${rootUrl}/`}>
                                <button className="btn btn-filled col-12">
                                    Вернуться на главную
                                </button>
                            </Link>
                        </div>
                        <img
                            className="form-window"
                            src={require('../img/window.png')}
                            alt="window"
                        />
                    </div>
                </div>
                <div className="form-mobile">
                    <div className="section-main-img col-7 col-md-12">
                        <img className="col-12" src={data?.formFinish.mobileBg} alt="main image" />
                        <img className="window" src={require('../img/window.png')} alt="window" />
                    </div>
                    <div className="form-container__mobile">
                        <div className="form-finish">
                            <div className="form-header">
                                <h4 className="headline">{data?.formFinish?.title}</h4>
                                <p className="description">{data?.formFinish.description}</p>
                            </div>
                            <Link to={`${rootUrl}`}>
                                <button className="btn btn-filled col-12">
                                    Вернуться на главную
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Measurement;
