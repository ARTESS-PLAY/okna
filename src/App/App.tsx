import React, { useState } from 'react';
import './App.scss';
import Main from '../Main/Main';
import Header from '../shared/layout/Header/Header';
import Footer from '../shared/layout/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Measurement from '../Measurement/Measurement';
import Estimate from '../Estimate/Estimate';
import Consultation from '../Consultation/Consultation';
import { getContetDefault } from '../helpers';
import FormFinish from '../FormFinish/FormFinish';

const datatmp = (window as any).data;

const data = getContetDefault(datatmp);

const rootUrl = (window as any).rootURL;

function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setIsOpen(!isOpen);
    };

    const scrollToBlock = (id: string): void => {
        if (isOpen) {
            toggleMenu();
            setTimeout(() => {
                if (id === 'footer') {
                    document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                } else {
                    document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="App">
            <Header
                isOpen={isOpen}
                toggleMenu={toggleMenu}
                scrollToBlock={scrollToBlock}
                data={data}
            />
            {isOpen && (
                <section className="menu col-12">
                    <div className="container col-12">
                        <ul className="menu-list">
                            <li onClick={() => scrollToBlock('slider')} className="nav-list-item">
                                Наши работы
                            </li>
                            <li onClick={() => scrollToBlock('footer')} className="nav-list-item">
                                Контакты
                            </li>
                            <li onClick={() => scrollToBlock('reviews')} className="nav-list-item">
                                Отзывы
                            </li>
                            <li className="nav-phone">
                                <a href={`tel:${data?.header.phone}`}>{data?.header.phone}</a>
                            </li>
                        </ul>
                    </div>
                </section>
            )}
            {!isOpen && (
                <Routes>
                    <Route path={`${rootUrl}/`} element={<Main data={data} />} />
                    <Route path={`${rootUrl}/measurement`} element={<Measurement data={data} />} />
                    <Route path={`${rootUrl}/estimate`} element={<Estimate data={data} />} />
                    <Route
                        path={`${rootUrl}/consultation`}
                        element={<Consultation data={data} />}
                    />
                    <Route path={`${rootUrl}/spasibo`} element={<FormFinish data={data} />} />
                </Routes>
            )}
            {!isOpen && <Footer data={data} />}
        </div>
    );
}

export default App;
