import React, {useContext, useRef,useEffect,useState} from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

const Sidebar = (props)=>{
  let location = window.location.pathname;
  const [menuOpen,setMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const ref = useRef(null);

  const openMenu = ()=>{
    setMenuOpen(!menuOpen);
    if(!menuOpen){
      document.querySelector('.sidebar').classList.add('open')
    }else{
      document.querySelector('.sidebar').classList.remove('open')
    }

  }
  
  const {t,changeLanguage,projectsPageAnimation} = useContext(AppContext)
  function changeLang(lang,id){
    changeLanguage(lang);
    const langEls = document.querySelectorAll('.languages div')
    for(let i = 0; i<langEls.length;i++){
      langEls[i].classList.remove('active');
    }
    langEls[id].classList.add('active')
  }

  function activeLang(){
    const lang = localStorage.getItem('lang');
    return lang
  }

  const changeActive = (index)=>{
    let els = document.querySelectorAll(".sidebar_lists_list");
    for(let i = 0; i<els.length; i++){
      els[i].classList.remove('active');
    }
    if(index!==null){
      els[index].classList.add('active');
    }
    openMenu();
  }

  useEffect(()=>{
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setMenuOpen(false);
        document.querySelector('.sidebar').classList.remove('open')
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[ref])

  useEffect(() => {
    const path = window.location.pathname;
    if(path === '/'){
      setShowLogo(false);
    }
    else{
      setShowLogo(true);
    }
  }, [window.location.pathname])

  return (
    <div className='sidebar' ref={ref}>
      <div className="mobileMenuIcons">
        {
          showLogo ? 
          <Link to={'/'} className="mobileHeaderLogo"><img src="/img/logo.png" alt="Logo" /></Link>
          :<Link to={'/'} className="mobileHeaderLogo"></Link>
        }
        <svg onClick={openMenu} style={{display:menuOpen ? 'none' : ''}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 18.25C22 18.6642 21.6642 19 21.25 19L5.75 19C5.33579 19 5 18.6642 5 18.25C5 17.8358 5.33579 17.5 5.75 17.5L21.25 17.5C21.6642 17.5 22 17.8358 22 18.25ZM22 5.25C22 5.66421 21.6642 6 21.25 6L10.75 6C10.3358 6 10 5.66421 10 5.25C10 4.83579 10.3358 4.5 10.75 4.5L21.25 4.5C21.6642 4.5 22 4.83579 22 5.25ZM21.25 12.5C21.6642 12.5 22 12.1642 22 11.75C22 11.3358 21.6642 11 21.25 11L2.75 11C2.33579 11 2 11.3358 2 11.75C2 12.1642 2.33579 12.5 2.75 12.5L21.25 12.5Z" fill="#B1AEAE"/>
        </svg>
        <svg onClick={openMenu} style={{display:menuOpen ? '' : 'none'}} width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.397052 0.553788L0.46967 0.46967C0.735936 0.203403 1.1526 0.179197 1.44621 0.397052L1.53033 0.46967L8 6.939L14.4697 0.46967C14.7626 0.176777 15.2374 0.176777 15.5303 0.46967C15.8232 0.762563 15.8232 1.23744 15.5303 1.53033L9.061 8L15.5303 14.4697C15.7966 14.7359 15.8208 15.1526 15.6029 15.4462L15.5303 15.5303C15.2641 15.7966 14.8474 15.8208 14.5538 15.6029L14.4697 15.5303L8 9.061L1.53033 15.5303C1.23744 15.8232 0.762563 15.8232 0.46967 15.5303C0.176777 15.2374 0.176777 14.7626 0.46967 14.4697L6.939 8L0.46967 1.53033C0.203403 1.26406 0.179197 0.8474 0.397052 0.553788L0.46967 0.46967L0.397052 0.553788Z" fill="#B1AEAE"/>
        </svg>
      </div>
      <div className="sidebar_logo_con">
        <div className="sidebar_logo">
          <Link to={'/'} onClick={()=>changeActive(null)}><img src="/img/logo.png" alt="Logo" /></Link>
        </div>
      </div>
      <div className="sidebar_lists">
        <div className="sidebar_left_line"></div>
        <div className="sidebar_lists_con">
          <div className={`sidebar_lists_list ${location === '/about' ? 'active' : ''}`}>
            <span className="out"><span className="in"></span></span>
            <Link onClick={()=>changeActive(0)} to="/about" className='list_text'>{t('about')}</Link>
          </div>
          <div className={`sidebar_lists_list ${location === '/service' ? 'active' : ''}`}>
            <span className="out"><span className="in"></span></span>
            <Link onClick={()=>changeActive(1)} to="/service" className='list_text'>{t('service')}</Link>
          </div>
          <div className={`sidebar_lists_list ${location === '/projects' ? 'active' : ''}`}>
            <span className="out"><span className="in"></span></span>
            <Link onClick={()=>changeActive(2)} to="/projects" className='list_text'>{t('projects')}</Link>
          </div>
          <div className={`sidebar_lists_list ${location === '/news' ? 'active' : ''}`}>
            <span className="out"><span className="in"></span></span>
            <Link onClick={()=>changeActive(3)} to="/news" className='list_text'>{t('news')}</Link>
          </div>
          <div className={`sidebar_lists_list ${location === '/contactUs' ? 'active' : ''}`}>
            <span className="out"><span className="in"></span></span>
            <Link onClick={()=>changeActive(4)} to="/contactUs" className='list_text'>{t('contact')}</Link>
          </div>
          <div className="sidebar_lists_language">
            <span id='language'>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM10 1.25C10.8211 1.25 11.7585 1.98781 12.5272 3.63518C12.7991 4.21773 13.0353 4.88723 13.2258 5.625H6.77421C6.96465 4.88723 7.20091 4.21773 7.47277 3.63518C8.24154 1.98781 9.17894 1.25 10 1.25ZM6.34004 3.10657C5.99455 3.84692 5.70623 4.6962 5.48664 5.625H2.42059C3.46618 3.81749 5.13978 2.41872 7.14302 1.72704C6.84121 2.14027 6.57285 2.60771 6.34004 3.10657ZM5.24081 6.875C5.08404 7.8604 5 8.91167 5 10C5 11.0883 5.08404 12.1396 5.24081 13.125H1.82454C1.45335 12.1545 1.25 11.101 1.25 10C1.25 8.899 1.45335 7.8455 1.82454 6.875H5.24081ZM5.48664 14.375C5.70623 15.3038 5.99455 16.1531 6.34004 16.8934C6.57285 17.3923 6.84121 17.8597 7.14302 18.273C5.13978 17.5813 3.46618 16.1825 2.42059 14.375H5.48664ZM6.77421 14.375H13.2258C13.0353 15.1128 12.7991 15.7823 12.5272 16.3648C11.7585 18.0122 10.8211 18.75 10 18.75C9.17894 18.75 8.24154 18.0122 7.47277 16.3648C7.20091 15.7823 6.96465 15.1128 6.77421 14.375ZM13.4923 13.125H6.50771C6.34181 12.1566 6.25 11.1041 6.25 10C6.25 8.89586 6.34181 7.8434 6.50771 6.875H13.4923C13.6582 7.8434 13.75 8.89586 13.75 10C13.75 11.1041 13.6582 12.1566 13.4923 13.125ZM14.5134 14.375H17.5794C16.5338 16.1825 14.8602 17.5813 12.857 18.273C13.1588 17.8597 13.4272 17.3923 13.66 16.8934C14.0055 16.1531 14.2938 15.3038 14.5134 14.375ZM18.1755 13.125H14.7592C14.916 12.1396 15 11.0883 15 10C15 8.91167 14.916 7.8604 14.7592 6.875H18.1755C18.5467 7.8455 18.75 8.899 18.75 10C18.75 11.101 18.5467 12.1545 18.1755 13.125ZM12.857 1.72704C14.8602 2.41872 16.5338 3.81749 17.5794 5.625H14.5134C14.2938 4.6962 14.0055 3.84692 13.66 3.10657C13.4272 2.60771 13.1588 2.14027 12.857 1.72704Z" fill="#B1AEAE"/>
              </svg>
            </span>

            <div className="languages">
              <div onClick={()=>changeLang('tm',0)} className={activeLang()==='tm' ? 'active' : ''}>Tm</div>
              <div onClick={()=>changeLang('en',1)} className={activeLang()==='en' ? 'active' : ''}>En</div>
              <div onClick={()=>changeLang('ru',2)} className={activeLang()==='ru' ? 'active' : ''}>Ru</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;