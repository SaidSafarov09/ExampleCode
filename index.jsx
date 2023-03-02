import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Helmet} from 'react-helmet';
import {QRCodeSVG} from 'qrcode.react';
import {StaticImage} from "gatsby-plugin-image";
import {
    BRANDS,
    browser,
    defineCountryTextCode,
    defineIsDirRTL,
    defineIsLangCyrillic,
    defineSupportCommunicationMeans,
    getAppIosUrl,
    getAppIosUrlSecret,
    // getSecretAppIosUrl,
    getAppIosUrlSecret,
    getAppAndroidUrl,
    getLang,
    htmlLangAttributes,
    IS_SERVER,
    RequireCSS
} from '../../../common';
import '../../../assets/fonts/Rubik/stylesheet.css';
import '../../../assets/fonts/Futura/stylesheet.css';
import '../../../assets/fonts/Montserrat/stylesheet.css';
import '../../../assets/fonts/Roboto/stylesheet.css';
import Header from '../../templateElements/header';
import Footer from '../../templateElements/footer';
import Modal from '../../templateElements/modal';
import SocialLinks from '../../templateElements/socialLinks';
import tutorialsText from "./-tutorialsText";
import {brandContext} from "../../../store/brandContext";
import {getCookie, throwParamsToSite, setCookie} from "../../../helpers";
import {useLogForClicktutorials} from "../../../helpers/customHooks";
import DropDownLangList from "../../templateElements/dropListLang";
import IosIcon from "../applications/img/ios-icon.svg";
import AndroidIcon from "../applications/img/android-icon.svg";
import ModalApps from "../../templateElements/modalApps";
import ModalAppsAndroid from "../../templateElements/modalAppsAndroid";

const secretForApp = inject('appStore', 'kafkaStore')(observer(({
      appStore,
      kafkaStore: {
          imprintHash
      },
      location,
      landingName,
      lang,
      secret,
      hasDropDownLangList,
      links
    }) => {
    const brandName = useContext(brandContext);
    const langAttr = htmlLangAttributes[lang];
    const [countryData, setCountryData] = useState(null);
    const [countryDataLangId, setCountryDataLangId] = useState(0);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [socialLinks, setSocialLinks] = useState([]);
    const [isDirRTL, setIsDirRTL] = useState(false);
    const [isLangCyrillic, setIsLangCyrillic] = useState(false);
    const [supportCommunicationMeans, setSupportCommunicationMeans] = useState('');
    const [tutorialsClick, settutorialsClick] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [size, setSize] = useState([0, 0]);
    //Здесь
    const [lights, setLights] = useState([]);// [1,2,3]
    const qrcode = require(`./img/${isLangCyrillic ? 'ru' : 'en'}/QR-code.png`);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalAndroid, setVisibleModalAndroid] = useState(false);
    const androidIcon = <img
        className="btn-download-icon-android"
        src={AndroidIcon}
        alt='app-img'
    />
    const iosIcon = <img
        className="btn-download-icon-ios"
        src={IosIcon}
        alt='app-img'
    />
    const [appAndroidUrl, setAppAndroidUrl] = useState("");
    const {langIdFromMainSite} = appStore;
    const userLoggedInCookie = getCookie("user_logged_in");
    const [appIosUrl, setAppIosUrl] = useState("");
    const [appIosUrlSecret, setAppIosUrlSecret] = useState("");
    const [appIosUrlSecret, setAppIosUrlSecret] = useState("");

    const gatsbySettingsFull = {
        placeholder: 'blurred',
        quality: 60,
        layout: 'fullWidth',
    };

    const gatsbySettingsFixed = {
        placeholder: 'blurred',
        quality: 60,
    };


    let testPic =require(`./img/Smartphonetest.png`);



    if (lang === 'en') {
        setCookie('lang', 2)
    }else {
        setCookie('lang', 1)
    }

    if (brandName === 'Secret') {
        lang === 'ru' ? testPic = require(`./img/Secret/SmartphonetestSecret.png`) : testPic = require(`./img/Secret/SmartphonetestSecretEN.png`)
    } else {
        lang === 'ru' ? testPic = require(`./img/Smartphonetest.png`) : testPic = require(`./img/SmartphonetestEN.png`)
    }

    let slideIos1 = require(`.//img/${isLangCyrillic ? 'ru' : 'en'}/ios-app1.png`);
    let slideIos2 = require(`./img/${isLangCyrillic ? 'ru' : 'en'}/ios-app2.png`);

    if (brandName === 'Secret') {
        lang === 'ru' ? slideIos1 = require(`./img/ru/ios-app-Secret.png`) : slideIos1 = require(`./img/en/ios-app-Secret.png`)
    }

    if (brandName === 'Secret') {
        lang === 'ru' ? slideIos1 = require(`./img/ru/ios-app-Secret-1.png`) : slideIos1 = require(`./img/en/ios-app-Secret-1.png`)
    }

    if (brandName === 'Secret') {
        lang === 'ru' ? slideIos2 = require(`./img/ru/ios-app-Secret-2.png`) : slideIos2 = require(`./img/en/ios-app-Secret-2.png`)
    }

    let slideAndroid = require(`.//img/${isLangCyrillic ? 'ru' : 'en'}/android-app-Secret-Secret.png`);

    if (brandName === 'Secret') {
        lang === 'ru' ? slideAndroid = require(`./img/ru/ios-app-Secret-2.png`) : slideAndroid = require(`./img/en/ios-app-Secret-2.png`)
    } else {
        lang === 'ru' ? slideAndroid = require(`./img/android-app-Secret-Secret.png`) : slideAndroid = require(`./img/android-app-Secret-Secret.png`)
    }
    if (brandName === 'Secret') {
        lang === 'ru' ? slideAndroid = require(`./img/Secret/android-app-Secret.png`) : slideAndroid = require(`./img/Secret/android-app-Secret.png`)
    }

    const modalHandler = () => {
        setVisibleModal(!visibleModal);
    };
    const modalHandlerAndroid = () => {
        setVisibleModalAndroid(!visibleModalAndroid);
    };


    const {translation} = require(`../../../translations/${landingName}/translation`);
    const modalTitle = getLang(translation, brandName, lang, 'tutorialsHeaderText');

    if (RequireCSS(location.pathname)) require('./scss/style.scss');

    const handleModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    const ontutorialsBtnClick = () => {
        settutorialsClick(tutorialsClick + 1);
        handleModal();
    }

    const handleOnClickSwitcher = (value) => {
        const idx = lights.findIndex((item)=> item === value);
        if(idx === -1){
            setLights([...lights, value])
        } else {
            setLights([...lights.slice(0, idx), ...lights.slice(idx+1)])
        }
    }

    !IS_SERVER && useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        setIsLangCyrillic(defineIsLangCyrillic(lang));
        setIsDirRTL(defineIsDirRTL(lang));
        setAppIosUrl(getAppIosUrl());
        setAppIosUrlSecret(getAppIosUrlSecret());
        setAppIosUrlSecret(getAppIosUrlSecret());
        setAppAndroidUrl(getAppAndroidUrl());

        if (brandName === BRANDS.Secret) {
            throwParamsToSite(
                undefined,
                undefined,
                undefined,
                false,
                false,
                'a[href*="/line"]');
            throwParamsToSite(
                undefined,
                undefined,
                undefined,
                false,
                false,
                '.site-logo');
        }
    }, []);

    useEffect(() => {
        !IS_SERVER && setIsUserLoggedIn(userLoggedInCookie === '1');
    }, []);

    useLogForClicktutorials(tutorialsClick, imprintHash);

    useEffect(() => {
        setSupportCommunicationMeans(defineSupportCommunicationMeans(brandName));
    }, [brandName])

    useEffect(() => {
        setCountryData(appStore.getCountryDataByName(defineCountryTextCode(lang)));
    }, [appStore.CountryDataList]);

    useEffect(() => {
        if (countryData) {
            if (lang === 'en') {
                setCountryDataLangId(2);
            } else {
                setCountryDataLangId(countryData.lang_id)
            }
        }
    }, [countryData]);

    useEffect(() => {
        if (countryData && countryDataLangId) {
            throwParamsToSite(
                undefined,
                countryData.id,
                langIdFromMainSite || countryDataLangId,
                false,
                !browser().mobile && !isUserLoggedIn,
                'a[href*="/line"]');
            throwParamsToSite(
                undefined,
                countryData.id,
                langIdFromMainSite || countryDataLangId,
                false,
                false,
                '.site-logo');
        }
    }, [countryData, countryDataLangId]);

    const qrSecret = brandName === 'Secret' ? <QRCodeSVG value={appIosUrl} size={130}/> : null
    const qrSecret = brandName === 'Secret' ? <QRCodeSVG value={appIosUrlSecret} size={130}/> : null
    const qrSecret = brandName === 'Secret' ? <QRCodeSVG value={appIosUrlSecret} size={130}/> : null

    let iosAppLink ='';

    if (brandName === BRANDS.Secret) {
        iosAppLink = appIosUrl
    } else if (brandName === BRANDS.Secret) {
        iosAppLink = appIosUrlSecret
    } else {
        iosAppLink = appIosUrlSecret
    }

    return (
        <>
            <Helmet>
                <html lang={langAttr} dir={isDirRTL ? "rtl" : "ltr"}/>
                <title>{getLang(translation, brandName, lang, 'siteTitle')}</title>
            </Helmet>
            <div className={`body-wrapper body-wrapper-${lang} landing_${landingName}`}>
                {!browser().mobile ?
                    <StaticImage
                    src='./img/bg-secret-app.jpg'
                    alt='bg'
                    className='bg-secret-app'
                    {...gatsbySettingsFull}
                    />
                        :
                    <StaticImage
                    src='./img/bg-secret-app-mobile.jpg'
                    alt='bg'
                    className='bg-secret-app'
                    {...gatsbySettingsFull}
                    />
                }
                
                <Header
                    layout
                    positionLogo='center'
                    id={`header-${brandName}`}
                    hasTextSince={landingName === 'secret-for-app' && brandName === BRANDS.Secret && !IS_SERVER && window.innerWidth > 1024 && !browser().mobile}
                    textSinceTranslation={getLang(translation, brandName, lang, 'textSince')}
                    hastutorials={landingName === 'secret-for-app' && brandName === BRANDS.Secret}
                    secretId={secret?.[brandName]}
                    langId={2}
                    lang={lang}
                    hasDropDownLangList
                >
                <div className="header-btns">
                <DropDownLangList/>
                    <button className={`header-wrapper__tutorials-btn header-wrapper__tutorials-btn_${brandName}`}
                            onClick={ontutorialsBtnClick}>
                        <a href={ontutorialsBtnClick}>{getLang(translation, brandName, lang, 'tutorialsBtnText')}</a>
                    </button>
                    {/* {hasDropDownLangList && <DropDownLangList/>} */}
                    
                </div>
                </Header>
                <main className={`main main_${brandName} main_${landingName}`}>
                    <div className="main-wrapper layout">
                        <div className={`main-wrapper__content main-wrapper__content_${brandName}`}>
                            <div className={`title-block title_${brandName} title_${landingName}`}>
                                <div className="wow animate__animated animate__fadeInLeftBig" data-wow-duration="1s">
                                    <p className='content__title'>{getLang(translation, brandName, lang, 'titleLine1')}</p>
                                    <p className='content__subtitle'>
                                        {getLang(translation, brandName, lang, 'subtitleLine1')}
                                    </p>
                                    <p className='content__subtitle'>{getLang(translation, brandName, lang, 'subtitleLine2')}</p>
                                </div>
                            </div>
                            <div className="content__block">
                                <div className="content__col_left">
                                  <div className="content__bulbs">
                                      <div className={`content__bulb ${lights.includes(1) || (browser().mobile && window.innerWidth <= 992) ? 'content__bulb-on' : 'content__bulb-off'}`}>
                                          {browser().mobile && window.innerWidth <= 400 ?
                                            <div className="content__bulb-lights">
                                              <StaticImage
                                                src='./img/bulb-light.png'
                                                alt='light'
                                                className='light'
                                                {...gatsbySettingsFixed}
                                              />
                                            </div>
                                            :
                                            <div className="content__bulb-img">
                                                <StaticImage
                                                  src='./img/Bulb-OFF.png'
                                                  alt='bg'
                                                  className='bulb bulb-off'
                                                  {...gatsbySettingsFixed}
                                                />
                                                <StaticImage
                                                  src='./img/Bulb-ON.png'
                                                  alt='bg'
                                                  className='bulb bulb-on'
                                                  {...gatsbySettingsFixed}
                                                />

                                            </div>
                                          }
                                          {!browser().mobile || window.innerWidth >= 993 ?
                                            <div className='content__bulb-switchers'>
                                                <button onClick={()=>handleOnClickSwitcher(1)}>
                                                    <div className="switch switch_1"/>
                                                </button>
                                                <div className="content__bulb__text">
                                                    <div className="content__bulb__tagline">
                                                        {getLang(translation, brandName, lang, 'bulbTagline1')}
                                                    </div>
                                                    <div className="content__bulb__sum">
                                                        {getLang(translation, brandName, lang, 'bulbSum')}
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className='content__step'>
                                                <div className="content__step__img content__step__img1">
                                                    <StaticImage
                                                      src='./img/icon-download.png'
                                                      alt='icon'
                                                      className='icon'
                                                      {...gatsbySettingsFixed}
                                                    />
                                                </div>
                                                <div className="content__step__text">
                                                    <p className='content__step__text_bold'>{getLang(translation, brandName, lang, 'conditionSpan1')}</p>
                                                    <p>{getLang(translation, brandName, lang, 'conditionText1')}</p>
                                                </div>
                                            </div>
                                          }
                                      </div>
                                      <div className={`content__bulb content__bulb_middle ${lights.includes(2) || (browser().mobile && window.innerWidth <= 993) ? 'content__bulb-on' : 'content__bulb-off'}`}>
                                          {browser().mobile && window.innerWidth <= 400 ?
                                            <div className="content__bulb-lights">

                                                  <StaticImage
                                                    src='./img/bulb-light.png'
                                                    alt='light'
                                                    className='light'
                                                    {...gatsbySettingsFixed}
                                                  />

                                            </div>
                                            :
                                            <div className="content__bulb-img">
                                                <StaticImage
                                                  src='./img/Bulb-OFF.png'
                                                  alt='bg'
                                                  className='bulb bulb-off'
                                                  {...gatsbySettingsFixed}
                                                />
                                                  <StaticImage
                                                    src='./img/Bulb-ON.png'
                                                    alt='bg'
                                                    className='bulb bulb-on'
                                                    {...gatsbySettingsFixed}
                                                  />

                                            </div>
                                          }
                                          {!browser().mobile || window.innerWidth >= 993 ?
                                            <div className='content__bulb-switchers'>
                                                <button onClick={()=>handleOnClickSwitcher(2)}>
                                                    <div className="switch switch_2"/>
                                                </button>
                                                <div className="content__bulb__text">
                                                    <div className="content__bulb__tagline">
                                                        {getLang(translation, brandName, lang, 'bulbTagline2')}
                                                    </div>
                                                    <div className="content__bulb__sum">
                                                        {getLang(translation, brandName, lang, 'bulbSum')}
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className='content__step'>
                                                <div className="content__step__img">
                                                    <StaticImage
                                                      src='./img/icon-registration.png'
                                                      alt='icon'
                                                      className='icon'
                                                      {...gatsbySettingsFixed}
                                                    />
                                                </div>
                                                <div className="content__step__text">
                                                    <p className='content__step__text_bold'>{getLang(translation, brandName, lang, 'conditionSpan2')}</p>
                                                    <p>{getLang(translation, brandName, lang, 'conditionText2')}</p>
                                                </div>
                                            </div>
                                          }
                                      </div>
                                      <div className={`content__bulb ${lights.includes(3) || (browser().mobile && window.innerWidth <= 993) ? 'content__bulb-on' : 'content__bulb-off'}`}>
                                          {browser().mobile && window.innerWidth <= 400 ?
                                            <div className="content__bulb-lights">
                                                  <StaticImage
                                                    src='./img/bulb-light.png'
                                                    alt='light'
                                                    className='light'
                                                    {...gatsbySettingsFixed}
                                                  />

                                            </div>
                                            :
                                            <div className="content__bulb-img">
                                                <StaticImage
                                                  src='./img/Bulb-OFF.png'
                                                  alt='bg'
                                                  className='bulb bulb-off'
                                                  {...gatsbySettingsFixed}
                                                />

                                                  <StaticImage
                                                    src='./img/Bulb-ON.png'
                                                    alt='bg'
                                                    className='bulb bulb-on'
                                                    {...gatsbySettingsFixed}
                                                  />

                                            </div>
                                          }
                                          {!browser().mobile || window.innerWidth >= 993 ?
                                            <div className='content__bulb-switchers'>
                                                <button onClick={()=>handleOnClickSwitcher(3)}>
                                                    <div className="switch switch_1"/>
                                                </button>
                                                <div className="content__bulb__text">
                                                    <div className="content__bulb__tagline">
                                                        {getLang(translation, brandName, lang, 'bulbTagline3')}
                                                    </div>
                                                    <div className="content__bulb__sum">
                                                        {getLang(translation, brandName, lang, 'bulbSum')}
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className='content__step'>
                                                <div className="content__step__img">
                                                    <StaticImage
                                                      src='./img/icon-change.png'
                                                      alt='icon'
                                                      className='icon'
                                                      {...gatsbySettingsFixed}
                                                    />
                                                </div>
                                                <div className="content__step__text">
                                                    <p className='content__step__text_bold'>{getLang(translation, brandName, lang, 'conditionSpan3')}</p>
                                                    <p>{getLang(translation, brandName, lang, 'conditionText3')}</p>
                                                </div>
                                            </div>
                                          }
                                          </div>
                                  </div>

                                    {browser().mobile && window.innerWidth <= 992 ?
                                      <>
                                          <p className='note'>{getLang(translation, brandName, lang, 'note1')}</p>
                                          <p className='note'>{getLang(translation, brandName, lang, 'note2')}</p>
                                      </>
                                      :
                                      ''
                                    }

<div className={`content__btns content__btns_${browser().safari === true ? 'safari' : ''} content__btns_${brandName} content__btns_secret`}>
                                        {window.innerWidth > 1024 && !browser().mobile ?
                                        <button className="content__btn_secret" >
                                            <a className="content__btn__text_secret" href='/ajax/mobile_app/download?secret_code=secret'>
                                            <div className="content__btn__text_secret">
                                                <p className='content__btn_download'>{getLang(translation, brandName, lang, 'secret')}</p>
                                                
                                            </div>
                                            </a>
                                        </button>
                                          :
                                        <a className="content__btn_ios content__btn_ios_secret" href='/ajax/mobile_app/download?secret_code=secret'>
                                            <div className="content__btn__text_secret">
                                                <p className='content__btn_secret'>{getLang(translation, brandName, lang, 'secret')}</p>
                                            </div>
                                        </a>
                                        }
                                        
                                    </div>

                                    <div className={`content__btns content__btns_${browser().safari === true ? 'safari' : ''} content__btns_${brandName}`}>
                                        {window.innerWidth > 1024 && !browser().mobile ?
                                        <button className="content__btn content__btn_ios" onClick={modalHandler}>
                                            <span className='content__btn__icon'>{iosIcon}</span>
                                            <div className="content__btn__text">
                                                <p className='content__btn_download'>{getLang(translation, brandName, lang, 'btnDownloadIOS')}</p>
                                                {window.innerWidth >= 1024 && !browser().mobile ?
                                                  <p>{getLang(translation, brandName, lang, 'qrCode')}</p>
                                                  :
                                                  ''
                                                }
                                            </div>
                                        </button>
                                          :
                                        <a className="content__btn content__btn_ios" href={iosAppLink}>
                                            <span className='content__btn__icon'>{iosIcon}</span>
                                            <div className="content__btn__text">
                                                <p className='content__btn_download'>{getLang(translation, brandName, lang, 'btnDownloadIOS')}</p>
                                            </div>
                                        </a>
                                        }
                                        {window.innerWidth > 1024 && !browser().mobile ?
                                          <button className="content__btn content__btn_android"
                                                  onClick={modalHandlerAndroid}>
                                              <span className='content__btn__icon'>{androidIcon}</span>
                                              <div className="content__btn__text">
                                                  <p
                                                    className='content__btn_download'>{getLang(translation, brandName, lang, 'btnDownloadAndroid')}</p>
                                                  {window.innerWidth >= 1024 && !browser().mobile ?
                                                    <p>{getLang(translation, brandName, lang, 'qrCode')}</p>
                                                    :
                                                    ''
                                                  }
                                              </div>
                                          </button>
                                          :
                                          <a className="content__btn content__btn_android" href={appAndroidUrl}>
                                              <span className='content__btn__icon'>{androidIcon}</span>
                                              <div className="content__btn__text">
                                                  <p
                                                    className='content__btn_download'>{getLang(translation, brandName, lang, 'btnDownloadAndroid')}</p>
                                                  {window.innerWidth >= 1024 && !browser().mobile ?
                                                    <p>{getLang(translation, brandName, lang, 'qrCode')}</p>
                                                    :
                                                    ''
                                                  }
                                              </div>
                                          </a>
                                        }
                                    </div>
                                </div>
                                <div className="content__col_right">
                                    <div className={`phone phone_${brandName}`}>
                                        <img
                                          alt='phone'
                                          src={testPic}
                                        />
                                    </div>
                                </div>
                            </div>
                            {!browser().mobile && window.innerWidth > 992 ?
                            <>
                                <p className='note'>{getLang(translation, brandName, lang, 'note1')}</p>
                                <p className='note'>{getLang(translation, brandName, lang, 'note2')}</p>
                            </>
                              :
                              ''
                            }
                        </div>

                    </div>

                </main>
                <Footer
                    id={`footer-${brandName}`}
                    className={`footer-${landingName}`}
                    layout
                    hasCopyright
                    secretString={getLang(translation, brandName, lang, 'secretString')}
                    rightString={getLang(translation, brandName, lang, 'rightString')}
                    hasPayments={false}
                    lang={lang}
                    links={links}
                    hasSocialLinks
                >
                    <SocialLinks links={socialLinks}/>
                <div className="footer-wrapper__support">
                    {getLang(translation, brandName, lang, 'supportText')} <a
                    dir="ltr" href={supportCommunicationMeans}><span
                    className="span">{getLang(translation, brandName, lang, 'supportSpan')}</span></a>
                </div>
                </Footer>
                <ModalApps visible={visibleModal} withHeader={false} onClose={modalHandler}>
                    <div className="modal-body">
                        <h2>{getLang(translation, brandName, lang, 'blockSubtitle')}</h2>
                        <div className="content_option">
                            <div className={`content_option__item_1 content_option__item_1-${brandName}`}>
                                <img
                                    src={slideIos1}
                                    className={`ios-modal__img ios-modal__img-${brandName} ios-modal__img-${lang}`}
                                    alt=""
                                />
                                <div className={`QR QR-${brandName} QR-${lang}`}>
                                    {qrSecret}
                                    {qrSecret}
                                    {qrSecret}
                                </div>
                                <div className={`modal-text modal-text-${brandName} modal-text-${lang}`}>
                                    <h6>{getLang(translation, brandName, lang, 'step1')}</h6>
                                    <p>{getLang(translation, brandName, lang, 'stepTextIos1')}</p>
                                    <div dir="ltr" className="block__btn">
                                        <a href={brandName === BRANDS.Secret ? "https://Secretname.com/ru/application/ios" : iosAppLink}
                                           className={`btn-download btn-download-${brandName}`}>{getLang(translation, brandName, lang, 'btnDownload')}
                                        </a>
                                    </div>
                                </div>

                            </div>
                            <div className={`content_option__item_2 content_option__item_2-${brandName}`}>
                                <img
                                    src={slideIos2}
                                    className={`ios-modal__img ios-modal__img-${brandName} `}
                                    alt=""
                                />
                                <div className={`QR QR-${brandName} QR-${lang}`}>
                                    {qrSecret}
                                    {qrSecret}
                                    {qrSecret}
                                </div>
                                <div className={`modal-text modal-text-${brandName} modal-text-${lang}`}>
                                    <h6>{getLang(translation, brandName, lang, 'step2')}</h6>
                                    <p>{getLang(translation, brandName, lang, 'stepTextIos2')}</p>
                                    <div dir="ltr" className="block__btn">
                                        <a href={brandName === BRANDS.Secret ? "https://Secretname.com/ru/application/ios" : iosAppLink}
                                           className={`btn-download btn-download-${brandName}`}>{getLang(translation, brandName, lang, 'btnDownload')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalApps>
                <ModalAppsAndroid visible={visibleModalAndroid} withHeader={false} onClose={modalHandlerAndroid}>
                    <div className="modal-body-android">
                        <h2>{getLang(translation, brandName, lang, 'blockSubtitleAndroid')}</h2>
                        <div className="content_option-android">
                            <div
                                className={`content_option__item_1-android content_option__item_1-android-${brandName}`}>
                                <img
                                    src={slideAndroid}
                                    className={`android-modal__img android-modal__img-${brandName} android-modal__img-${lang}`}
                                    alt=""
                                />
                                <div className={`QR QR-${brandName} QR-${lang}`}>
                                    <QRCodeSVG value={window.location.host + appAndroidUrl}
                                               size={130}/>
                                </div>
                                <div className={`modal-text modal-text-${brandName} modal-text-${lang}`}>
                                    <h6>{getLang(translation, brandName, lang, 'step1Android')}</h6>
                                    <p>{getLang(translation, brandName, lang, 'stepTextAndroid')}</p>
                                    <div dir="ltr" className="block__btn">
                                        <a href={appAndroidUrl}
                                           className={`btn-download btn-download-${brandName}`}>{getLang(translation, brandName, lang, 'btnDownload')}
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </ModalAppsAndroid>
                <Modal
                    onClose={handleModal}
                    visible={isModalVisible}
                    title={modalTitle.main}
                    subtitle={modalTitle.span}
                >
                    <div id="modal-tutorials">
                        <tutorialsText
                            brandName={brandName}
                            lang={lang}
                            landingName={landingName}
                        />
                    </div>
                </Modal>
            </div>
        </>
    );
}));

export default secretForApp;


