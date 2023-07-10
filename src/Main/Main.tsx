import React, { useState } from 'react';
import './Main.scss';
import ColourPicker from './ColourPicker/ColourPicker';
import RouletteIcon from '../img/roulette.svg';
import Category from './Category/Category';
import Building from './Building/Building';
import Quality from './Quality/Quality';
import Advantage from './Advantage/Advantage';
import Slider from './Slider/Slider';
import { CategoryInterface } from '../interfaces/CategoryInterface';
import { QualityInterface } from '../interfaces/QualityInterface';
import { BuildingInterface } from '../interfaces/BuildingInterface';
import { AdvantageInterface } from '../interfaces/AdvantageInterface';
import { caseInterface } from '../interfaces/CaseInterface';
import { ReviewInterface } from '../interfaces/ReviewInterface';
import moment from 'moment';
import Review from './Review/Review';
import 'moment/locale/ru';
import { PartnerInterface } from '../interfaces/PartnerInterface';
import Partner from './Partner/Partner';
import Logo from './Logo/Logo';
import { Link } from 'react-router-dom';
import HandleBase from '../img/handle-base.svg';
import Handle from '../img/handle-handle.svg';
import ArrowBack from '../img/arrow-back.svg';
import ArrowNext from '../img/arrow-next.svg';

const rootUrl = (window as any).rootURL;

function Main({ data }: { data?: any }) {
    const categories: CategoryInterface[] = data?.main?.categories;
    const buildings: BuildingInterface[] = data?.main.building.content;
    const qualities: QualityInterface[] = data?.main.qualities.content;
    const advantages: AdvantageInterface[] = data?.main.advantages.content;
    const cases: caseInterface[] = data?.main.slider.content;
    const reviews: ReviewInterface[] = data?.main.reviews?.content;
    const partners: PartnerInterface[] = data?.main.partners?.content;
    const logos: string[] = data?.main.logos?.content;

    const [slide, setSlide] = useState(0);

    const goBack = (): void => {
        if (slide - 1 < 0) {
            setSlide(cases.length - 1);
        } else {
            setSlide(slide - 1);
        }
    };
    const goNext = (): void => {
        if (slide + 1 > cases.length - 1) {
            setSlide(0);
        } else {
            setSlide(slide + 1);
        }
    };

    return (
        <div>
            <section className="section section-main col-12">
                <div className="container col-12">
                    <div className="section-main-info col-4 col-md-12">
                        <h1 className="headline col-md-7 col-sm-11">{data?.main?.main?.title}</h1>
                        <p className="description">{data?.main?.main?.description}</p>
                        <Link to={`${rootUrl}/measurement`}>
                            <button className="btn btn-filled col-9 col-md-12">
                                <img className="icon" src={RouletteIcon} alt="roulette icon" />
                                {data?.main?.main?.buttonText}
                            </button>
                        </Link>
                    </div>
                    <div className="section-main-img col-7 col-md-12">
                        <img
                            className="col-12"
                            src={
                                data?.main?.main?.mainBgSrc
                                    ? data?.main?.main?.mainBgSrc
                                    : require('../img/main.png')
                            }
                            alt="main image"
                        />
                        <img
                            className="window"
                            src={
                                data?.main?.main?.mainWindowSrc
                                    ? data?.main?.main?.mainWindowSrc
                                    : require('../img/window.png')
                            }
                            alt="window"
                        />
                    </div>
                </div>
            </section>
            <section className="section section-categories col-12">
                <table className="container col-12">
                    <tbody className="table col-12">
                        {categories.map((category) => (
                            <Category
                                key={category.headline}
                                widthClass={`col-12 col-md-12`}
                                category={category}
                            />
                        ))}
                    </tbody>
                </table>
            </section>
            <ColourPicker />
            <section className="section section-buildings col-12">
                <div className="container">
                    <h2 className="headline">{data?.main.building.title}</h2>
                    <div className="section-buildings-grid col-12">
                        {buildings.map((building, index) => {
                            return (
                                <Building
                                    key={building.headline}
                                    img={building.img}
                                    headline={building.headline}
                                />
                            );
                        })}
                    </div>
                    <Link to={`${rootUrl}/consultation`}>
                        <button className={`btn btn-empty col-12`}>
                            {data.main.building.buttonText}
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
                    </Link>
                </div>
            </section>
            <section className="section section-qualities col-12">
                <div className="container">
                    <h2 className="headline">{data?.main.qualities.title}</h2>
                    <div className="section section-qualities-grid col-12">
                        {qualities.map((quality) => {
                            return (
                                <Quality
                                    key={quality.headline}
                                    img={quality.img}
                                    headline={quality.headline}
                                    description={quality.description}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="section section-banner col-12">
                <div className="container col-sm-12">
                    <div className="container-coloured col-sm-12">
                        <div className="section-banner-info col-7 col-md-8 col-sm-12">
                            <h2 className="headline col-sm-7">{data?.main.banner.title}</h2>
                            <p className="description col-sm-9">{data?.main.banner.description}</p>
                            <Link to={`${rootUrl}/measurement`}>
                                <button className="btn btn-filled col-5 col-md-12 col-sm-12">
                                    {data?.main.banner.buttonText}
                                </button>
                            </Link>
                        </div>
                        <img
                            className="telephone col-5 col-md-6"
                            src={require('../img/tel.png')}
                            alt="telephone"
                        />
                        <img
                            className="telephone-tablet col-md-6"
                            src={require('../img/tel-tablet.png')}
                            alt="telephone"
                        />
                        <img
                            className="telephone-phone col-md-6 col-sm-6"
                            src={require('../img/tel-phone.png')}
                            alt="telephone"
                        />
                    </div>
                </div>
            </section>
            <section className="section section-advantages col-12">
                <div className="container">
                    <h2 className="headline">{data?.main.advantages.title}</h2>
                    <div className="section section-advantages-grid col-12">
                        {advantages.map((advantage) => {
                            return (
                                <Advantage
                                    key={advantage.img}
                                    img={advantage.img}
                                    description={advantage.description}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
            <section id="slider" className="section section-slider col-12">
                <div className="container">
                    <h2 className="headline">{data.main.slider.title}</h2>
                    {
                        <Slider
                            cases={cases}
                            goNext={goNext}
                            goBack={goBack}
                            slide={slide}
                            setSlide={setSlide}
                            case={cases[slide]}
                        />
                    }
                    <div className="slide-essentials">
                        <div className="slide-imgs col-12">
                            {cases.map((case$, index) => (
                                <img
                                    className={`col-12 ${slide === index ? 'active' : ''}`}
                                    onClick={() => setSlide(index)}
                                    src={case$.imgs}
                                    alt="image of case"
                                    key={index}
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
                </div>
            </section>
            <section id="reviews" className="section section-reviews col-12">
                <div className="container">
                    <h2 className="headline">{data?.main.reviews.title}</h2>
                    <div className="reviews">
                        {reviews?.map((review, i) => (
                            <Review key={i.toString()} review={review} />
                        ))}
                    </div>
                </div>
            </section>
            <section className="section section-banner col-12">
                <div className="container">
                    <div className="container-coloured col-sm-12">
                        <div className="section-banner-info col-8 col-md-9 col-sm-12">
                            <h2 className="headline col-sm-7">{data?.main.bannerCalc.title}</h2>
                            <p className="description col-sm-9">
                                {data?.main.bannerCalc.description}
                            </p>
                            <Link to={`${rootUrl}/estimate`}>
                                <button className="btn btn-filled col-6 col-md-11 col-sm-12">
                                    {data?.main.bannerCalc.buttonText}
                                </button>
                            </Link>
                        </div>
                        <img
                            className="estimate"
                            src={require('../img/estimate.png')}
                            alt="estimate"
                        />
                        <img
                            className="estimate-tablet col-md-4"
                            src={require('../img/estimate-tablet.png')}
                            alt="estimate"
                        />
                        <img
                            className="estimate-phone col-md-6 col-sm-3"
                            src={require('../img/estimate-phone.png')}
                            alt="phone"
                        />
                    </div>
                </div>
            </section>
            <section className="section section-partners col-12">
                <div className="container">
                    <h2 className="headline">{data?.main.partners.title}</h2>
                    <p className="description col-8 col-md-10 col-sm-12"></p>
                    <div className="partners col-12">
                        {partners.map((partner) => (
                            <Partner key={partner.logo} partner={partner} />
                        ))}
                    </div>
                </div>
            </section>
            {/*<section className="section section-map col-12">*/}
            {/*    <div className="container col-12">*/}
            {/*        <h2 className="headline">Адреса офисов продаж</h2>*/}
            {/*        <GoogleMapReact*/}
            {/*            defaultCenter={initialProps.center}*/}
            {/*            defaultZoom={initialProps.zoom}*/}
            {/*        >*/}

            {/*        </GoogleMapReact>*/}
            {/*    </div>*/}
            {/*</section>*/}
            <section className="section section-logos col-12">
                <div className="container">
                    {logos.map((logo, i) => (
                        <Logo img={logo} key={i} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Main;
