import React from 'react';
import './Footer.scss';
import FooterLogo from '../../../img/footer-logo.svg';
import PhoneIcon from '../../../img/phone.svg';
import EnvelopeIcon from '../../../img/envelope.svg';

function Footer({ data }: { data?: any }) {
    return (
        <footer id="footer" className="footer">
            <div className="footer-upper">
                <div className="container">
                    <div className="footer-group">
                        <a href="/">
                            <div className="footer-logo col-md-6 col-sm-6">
                                <img className="col-12" src={data?.footer.footerLogo} alt="logo" />
                            </div>
                        </a>
                    </div>
                    <div className="footer-group">
                        <div className="footer-group">
                            <h4 className="headline">Более 70 офисов по Москве и МО</h4>
                            <a href={data?.footer.oficesLink}>
                                <div className="footer-group-icon-line">
                                    <p>Офисы продаж</p>
                                </div>
                            </a>
                        </div>
                        <div className="footer-group">
                            <h4 className="headline">Режим работы</h4>
                            <div className="footer-group-icon-line">
                                <p>{data?.footer.time}</p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-group list">
                        <h4 className="headline">Контакты</h4>
                        <a href={`tel:${data?.footer.tel}`}>
                            <div className="footer-group-icon-line">
                                <img src={PhoneIcon} alt="phone icon" />
                                <p>{data?.footer.tel}</p>
                            </div>
                        </a>
                        <a href={`mailto:${data?.footer.mail}`}>
                            <div className="footer-group-icon-line">
                                <img src={EnvelopeIcon} alt="mail icon" />
                                <p>{data?.footer.mail}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-lower">
                <div className="container">
                    <div className="footer-lower-text">
                        <p> {data?.footer.info1}</p>
                        <div className="extra-info">
                            <p>{data?.footer.info2}</p>
                            <a href={data?.footer.plink} className="privacy">
                                Политика конфиденциальности
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
