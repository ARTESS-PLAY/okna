import React, { useEffect, useRef, useState } from 'react';
import HandleBase from '../../img/handle-base.svg';
import Handle from '../../img/handle-handle.svg';
import './Category.scss';
import { CategoryInterface } from '../../interfaces/CategoryInterface';
import sanitize from 'sanitize-html';
import { Link } from 'react-router-dom';

const rootUrl = (window as any).rootURL;

function Category(props: { key: string; widthClass: string; category: CategoryInterface }) {
    const imgRef: React.MutableRefObject<any> = useRef(null);
    const [smallClass, setSmallClass] = useState<boolean>(false);

    useEffect(() => {
        if (imgRef) {
            if (
                imgRef.current.clientWidth <
                document.querySelector('.category')!.clientWidth - 10
            ) {
                setSmallClass(true);
            } else {
                setSmallClass(false);
            }
            if (
                document.documentElement.clientWidth < 995 &&
                document.documentElement.clientWidth > 576
            ) {
                imgRef.current.style.height = imgRef.current.clientWidth * 0.43 + 'px';
            } else if (document.documentElement.clientWidth < 577) {
                imgRef.current.style.height = imgRef.current.clientWidth * 0.615 + 'px';
            } else {
                imgRef.current.style.height = 'auto';
            }
        }
        window.addEventListener('resize', () => {
            if (imgRef) {
                if (
                    imgRef.current.clientWidth <
                    document.querySelector('.category')!.clientWidth - 10
                ) {
                    setSmallClass(true);
                } else {
                    setSmallClass(false);
                }
                if (
                    document.documentElement.clientWidth < 995 &&
                    document.documentElement.clientWidth > 576
                ) {
                    imgRef.current.style.height = imgRef.current.clientWidth * 0.43 + 'px';
                } else if (document.documentElement.clientWidth < 577) {
                    imgRef.current.style.height = imgRef.current.clientWidth * 0.615 + 'px';
                } else {
                    imgRef.current.style.height = 'auto';
                }
            }
        });
    }, [imgRef]);

    return (
        <div className={`category ${props.widthClass}`}>
            <img
                ref={imgRef}
                src={props.category.img}
                className="category-img col-12"
                alt="image of category"
            />
            <h3 className="headline">{props.category.headline}</h3>
            <div className="col-12">
                <p
                    className="description"
                    dangerouslySetInnerHTML={{ __html: sanitize(props.category.description) }}></p>

                <Link to={`${rootUrl}/consultation`}>
                    <a className="col-12" href={props.category.link} target="_blank">
                        <button className={`btn btn-empty col-12 ${smallClass ? 'btn-small' : ''}`}>
                            Оставить заявку
                            <div className="icon icon-handle">
                                <img
                                    className="icon-handle-base"
                                    src={HandleBase}
                                    alt="window handle base"
                                />
                                <img
                                    className="icon-handle-handle"
                                    src={Handle}
                                    alt="window handle"
                                />
                            </div>
                        </button>
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default Category;
