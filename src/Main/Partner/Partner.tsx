import React from 'react';
import { PartnerInterface } from '../../interfaces/PartnerInterface';
import './Partner.scss';

function Partner(props: { key: string; partner: PartnerInterface }) {
    return (
        <div className="partner col-12">
            <div className="partner-logo">
                <img className="partner-logo-img" src={props.partner.logo} alt="logo of partner" />
            </div>
            <p className="partner-text">{props.partner.text}</p>
            <a className="col-8 col-md-12" href={props.partner.link} target="_blank">
                <button className="btn btn-filled col-12">Перейти на сайт партнёра</button>
            </a>
        </div>
    );
}

export default Partner;
