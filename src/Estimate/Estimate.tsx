import React, { useEffect, useRef, useState } from 'react';
import '../Forms.scss';
import CalculatorIcon from '../img/calculator.svg';
import DocIcon from '../img/doc.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const rootUrl = (window as any).rootURL;
const urlHref = (window as any).urlHref;
const params = (window as any).params;
const privacy_link = (window as any).privacy_link;

function Measurement({ data }: { data?: any }) {
    const fileInput: React.MutableRefObject<any> = useRef(null);
    const imageRef: React.MutableRefObject<any> = useRef(null);
    const navigate = useNavigate();

    const [phone, setPhone] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [file, setFile] = useState<File>(new File([], ''));
    const [phoneErrors, setPhoneErrors] = useState<null | { [key: string]: boolean }>(null);
    const [nameErrors, setNameErrors] = useState<null | { [key: string]: boolean }>(null);
    const [fileErrors, setFileErrors] = useState<null | { [key: string]: boolean }>(null);
    const [isFinished, setStatus] = useState<boolean>(false);

    useEffect(() => {
        imageRef.current.style.minHeight = imageRef.current.clientWidth * 0.9 + 'px';
    }, [imageRef]);

    useEffect(() => {
        setPhoneErrors(null);
    }, [phone]);

    useEffect(() => {
        setNameErrors(null);
    }, [name]);

    useEffect(() => {
        setFileErrors(null);
    }, [file]);

    useEffect(() => {
        if (isFinished) {
            imageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isFinished]);

    const validatePhone = (): null | { [key: string]: boolean } => {
        if (phone.trim().length === 0) {
            return null;
        }
        if (phone) {
            const refinePhoneNumber = (phoneNumber: string) => {
                return phoneNumber
                    .replace(/\D/g, '')
                    .replace(/[a-zA-Z]/g, '')
                    .replaceAll(' ', '');
            };

            const refinedPhone = refinePhoneNumber(phone);
            const regExp = /^(?:\+7|7|8)?(?:\d{10})$/;

            if (regExp.test(refinedPhone)) {
                return null;
            } else {
                return { format: true };
            }
        }

        return { format: true };
    };
    const refinePhoneNumber = (phoneNumber: string): string => {
        return phoneNumber
            .replace(/\D/g, '')
            .replace(/[a-zA-Z]/g, '')
            .replaceAll(' ', '');
    };
    const setPhoneNumber = (formattedPhone: string): void => {
        setPhone(formattedPhone);
    };
    const removeCountryCode = (phone: string): string => {
        if (phone[0] === '7' || phone[0] === '8') {
            return phone.substring(1, phone.length);
        } else {
            return phone;
        }
    };
    const normalizePhone = (phoneNumber$: any): void => {
        const phoneNumber: string = phoneNumber$.target.value;
        const numericPhoneNumber = refinePhoneNumber(phoneNumber);
        const noCodePhone = removeCountryCode(numericPhoneNumber);

        if (numericPhoneNumber.length > 10) {
            setPhoneNumber(
                `+7 (${noCodePhone.substring(0, 3)}) ${noCodePhone.substring(
                    3,
                    6,
                )}-${noCodePhone.substring(6, 8)}-${noCodePhone.substring(8, 10)}`,
            );
            return;
        }

        if (numericPhoneNumber.length > 0) {
            switch (noCodePhone.length) {
                case 10: {
                    setPhoneNumber(
                        `+7 (${noCodePhone.substring(0, 3)}) ${noCodePhone.substring(
                            3,
                            6,
                        )}-${noCodePhone.substring(6, 8)}-${noCodePhone.substring(8, 10)}`,
                    );
                    break;
                }
                case 9: {
                    setPhoneNumber(
                        `+7 (${noCodePhone.substring(0, 3)}) ${noCodePhone.substring(
                            3,
                            6,
                        )}-${noCodePhone.substring(6, 8)}-${noCodePhone.substring(8, 9)}`,
                    );
                    break;
                }
                case 8: {
                    setPhoneNumber(
                        `+7 (${noCodePhone.substring(0, 3)}) ${noCodePhone.substring(
                            3,
                            6,
                        )}-${noCodePhone.substring(6, 8)}`,
                    );
                    break;
                }
                case 7: {
                    setPhoneNumber(
                        `+7 (${noCodePhone.substring(0, 3)}) ${noCodePhone.substring(
                            3,
                            6,
                        )}-${noCodePhone.substring(6, 7)}`,
                    );
                    break;
                }
                case 6: {
                    setPhoneNumber(
                        `+7 (${noCodePhone.substring(0, 3)}) ${noCodePhone.substring(3, 6)}`,
                    );
                    break;
                }
                case 5: {
                    setPhoneNumber(
                        `+7 (${noCodePhone.substring(0, 3)}) ${noCodePhone.substring(3, 5)}`,
                    );
                    break;
                }
                case 4: {
                    setPhoneNumber(
                        `+7 (${noCodePhone.substring(0, 3)}) ${noCodePhone.substring(3, 4)}`,
                    );
                    break;
                }
                case 3: {
                    setPhoneNumber(`+7 (${noCodePhone.substring(0, 3)}`);
                    break;
                }
                case 2: {
                    setPhoneNumber(`+7 (${noCodePhone.substring(0, 2)}`);
                    break;
                }
                case 1: {
                    setPhoneNumber(`+7 (${noCodePhone.substring(0, 1)}`);
                    break;
                }
                case 0: {
                    setPhoneNumber(`+7`);
                    break;
                }
                default: {
                    setPhoneNumber(`+${noCodePhone}`);
                    break;
                }
            }
        } else {
            setPhoneNumber('');
        }
    };
    const handleSubmit = (): void => {
        if (
            name.trim().length > 0 &&
            phone.trim().length > 0 &&
            !validatePhone() &&
            file.name.trim().length > 0
        ) {
            const data: { name: string; phone: string; file: File } = {
                name,
                phone,
                file,
            };

            const data_urlHref = urlHref ? urlHref : 'Отсутствует';
            const utm_source = params['utm_source'] ? params['utm_source'] : 'Отсутствует';
            const utm_medium = params['utm_medium'] ? params['utm_medium'] : 'Отсутствует';
            const utm_campaign = params['utm_campaign'] ? params['utm_campaign'] : 'Отсутствует';
            const utm_content = params['utm_content'] ? params['utm_content'] : 'Отсутствует';
            const utm_term = params['utm_term'] ? params['utm_term'] : 'Отсутствует';
            const cm_id = params['cm_id'] ? params['cm_id'] : 'Отсутствует';
            const yclid = params['yclid'] ? params['yclid'] : 'Отсутствует';

            const form_data = new FormData();
            form_data.append('name', name);
            form_data.append('phone', phone);
            form_data.append('action', 'email_modal');
            form_data.append('modal', 'smeta');
            form_data.append('file', file);
            form_data.append('data_urlHref', data_urlHref);
            form_data.append('utm_source', utm_source);
            form_data.append('utm_medium', utm_medium);
            form_data.append('utm_campaign', utm_campaign);
            form_data.append('utm_content', utm_content);
            form_data.append('utm_term', utm_term);
            form_data.append('cm_id', cm_id);
            form_data.append('yclid', yclid);

            const url = (window as any).ajaxURL;
            axios
                .post(url, form_data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            navigate(`${rootUrl}/spasibo`);
        } else {
            setPhoneErrors(validatePhone());

            if (name.trim().length === 0) {
                setNameErrors({ required: true });
            }
            if (phone.trim().length === 0) {
                setPhoneErrors({ required: true });
            }
            if (file.name.trim().length === 0) {
                setFileErrors({ required: true });
            }
            if (file.size > 10 * 1024) {
                setFileErrors({ overweight: true });
            }
        }
    };

    const styles: { [key: string]: React.CSSProperties } = {
        img: {
            backgroundImage: `url(${data?.estimate.backgroundDesk})`,
        },
    };

    return (
        <div className="form-page measurement">
            <div className="container col-12">
                <div className="image col-8 col-md-12" ref={imageRef} style={styles.img}>
                    <div className="form-container col-12">
                        <div className="form-layer">
                            <div className="form-header">
                                <h4 className="headline">{data?.estimate?.title}</h4>
                                <p className="description">{data?.estimate.description}</p>
                            </div>
                            <form className="form col-12">
                                <div className="form-group col-12">
                                    <label className="form-label" htmlFor="name">
                                        Имя
                                    </label>
                                    <input
                                        required
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        placeholder="Ваше имя"
                                        className={`form-input col-12 ${nameErrors ? 'error' : ''}`}
                                        type="text"
                                        id="name"
                                    />
                                    {nameErrors && nameErrors['required'] && (
                                        <label htmlFor="name" className="form-label-error">
                                            Введите имя
                                        </label>
                                    )}
                                </div>
                                <div className="form-group col-12">
                                    <label className="form-label" htmlFor="phone">
                                        Телефон
                                    </label>
                                    <input
                                        required
                                        onChange={normalizePhone}
                                        value={phone}
                                        placeholder="Номер телефона"
                                        className={`form-input col-12 ${
                                            phoneErrors ? 'error' : ''
                                        }`}
                                        type="tel"
                                        id="phone"
                                    />
                                    {phoneErrors && phoneErrors['required'] && (
                                        <label htmlFor="phone" className="form-label-error">
                                            Введите номер телефона
                                        </label>
                                    )}
                                    {phoneErrors && phoneErrors['format'] && (
                                        <label htmlFor="phone" className="form-label-error">
                                            Некорректно введён номер. Проверьте данные
                                        </label>
                                    )}
                                </div>
                            </form>
                            {!file.name ? (
                                <button
                                    onClick={() => fileInput.current.click()}
                                    className={`btn btn-file col-12 ${fileErrors ? 'error' : ''}`}>
                                    <img className="icon" src={DocIcon} alt="doc icon" /> Прикрепить
                                    файл
                                </button>
                            ) : (
                                <button
                                    onClick={() => fileInput.current.click()}
                                    className={`btn btn-file col-12 ${fileErrors ? 'error' : ''}`}>
                                    <img className="icon" src={DocIcon} alt="doc icon" /> Заменить
                                    файл
                                </button>
                            )}
                            <input
                                id="file"
                                onChange={(event) =>
                                    setFile(
                                        event.target.files
                                            ? event.target.files[0]
                                            : new File([], ''),
                                    )
                                }
                                type="file"
                                hidden
                                ref={fileInput}
                            />
                            <a className="col-12" onClick={() => handleSubmit()}>
                                <button className="btn btn-filled col-12">
                                    <img
                                        className="icon"
                                        src={CalculatorIcon}
                                        alt="calculator icon"
                                    />{' '}
                                    {data?.estimate.buttonText}
                                </button>
                            </a>
                            <p className="form_privacy_text">
                                Отправляя контактные данные, вы даёте согласие на обработку
                                персональных данных в соответствии с{' '}
                                <a href={`${privacy_link}`} target="_blank">
                                    «Правилами»
                                </a>
                            </p>
                            <Link to={`${rootUrl}/`} className="btn-back-container col-12">
                                <button className="btn-back">Назад</button>
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
                        <img className="col-12" src={data?.estimate.mobileBg} alt="main image" />
                        <img className="window" src={require('../img/window.png')} alt="window" />
                    </div>
                    <div className="form-mobile__container">
                        <div className="form-layer">
                            <div className="form-header">
                                <h4 className="headline">{data?.estimate?.title}</h4>
                                <p className="description">{data?.estimate.description}</p>
                            </div>
                            <form className="form col-12">
                                <div className="form-group col-12">
                                    <label className="form-label" htmlFor="name">
                                        Имя
                                    </label>
                                    <input
                                        required
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        placeholder="Ваше имя"
                                        className={`form-input col-12 ${nameErrors ? 'error' : ''}`}
                                        type="text"
                                        id="name"
                                    />
                                    {nameErrors && nameErrors['required'] && (
                                        <label htmlFor="name" className="form-label-error">
                                            Введите имя
                                        </label>
                                    )}
                                </div>
                                <div className="form-group col-12">
                                    <label className="form-label" htmlFor="phone">
                                        Телефон
                                    </label>
                                    <input
                                        required
                                        onChange={normalizePhone}
                                        value={phone}
                                        placeholder="Номер телефона"
                                        className={`form-input col-12 ${
                                            phoneErrors ? 'error' : ''
                                        }`}
                                        type="tel"
                                        id="phone"
                                    />
                                    {phoneErrors && phoneErrors['required'] && (
                                        <label htmlFor="phone" className="form-label-error">
                                            Введите номер телефона
                                        </label>
                                    )}
                                    {phoneErrors && phoneErrors['format'] && (
                                        <label htmlFor="phone" className="form-label-error">
                                            Некорректно введён номер. Проверьте данные
                                        </label>
                                    )}
                                </div>
                            </form>
                            {!file.name ? (
                                <button
                                    onClick={() => fileInput.current.click()}
                                    className={`btn btn-file col-12 ${fileErrors ? 'error' : ''}`}>
                                    <img className="icon" src={DocIcon} alt="doc icon" /> Прикрепить
                                    файл
                                </button>
                            ) : (
                                <button
                                    onClick={() => fileInput.current.click()}
                                    className={`btn btn-file col-12 ${fileErrors ? 'error' : ''}`}>
                                    <img className="icon" src={DocIcon} alt="doc icon" /> Заменить
                                    файл
                                </button>
                            )}
                            <input
                                id="file"
                                onChange={(event) =>
                                    setFile(
                                        event.target.files
                                            ? event.target.files[0]
                                            : new File([], ''),
                                    )
                                }
                                type="file"
                                hidden
                                ref={fileInput}
                            />
                            <a className="col-12" onClick={() => handleSubmit()}>
                                <button className="btn btn-filled col-12">
                                    <img
                                        className="icon"
                                        src={CalculatorIcon}
                                        alt="calculator icon"
                                    />{' '}
                                    {data?.estimate.buttonText}
                                </button>
                            </a>
                            <p className="form_privacy_text">
                                Отправляя контактные данные, вы даёте согласие на обработку
                                персональных данных в соответствии с{' '}
                                <a href={`${privacy_link}`} target="_blank">
                                    «Правилами»
                                </a>
                            </p>
                            <Link to={`${rootUrl}/`} className="btn-back-container col-12">
                                <button className="btn-back">Назад</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Measurement;
