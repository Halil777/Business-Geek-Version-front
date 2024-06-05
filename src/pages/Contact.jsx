import React, {useContext,useState} from 'react';
import { AppContext } from '../App';
import {motion} from "framer-motion";
import { AxiosInstance } from '../common/AxiosInstance';

function Contact() {
  const [loading,setLoading] = useState(false);
  const [alert,setAlert] = useState(false);
  const [alert2,setAlert2] = useState(false);
  const [data,setData] = useState({
    name:'',
    email:'',
    text:'',
  })

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const sendData = async()=>{
    if(data.name && data.email && data.text){
      setLoading(true);
      try {
        const res = await AxiosInstance.post('/contact-us',data);
        if(res.status === 200){
          setData({
            name:'',
            email:'',
            text:'',
          })
  
          setAlert(true);
          const stop = setInterval(()=>{
            setAlert(false)
            clearInterval(stop)
          },2000);
        }
      } catch ({response}) {
        window.confirm(response.data.message);
        setLoading(false);
      }
      setLoading(false);
    }else{
      setAlert2(true);
      const stop = setInterval(()=>{
        setAlert2(false);
        clearInterval(stop);
      },2000)
    }
  }
  function free(){};


  const {t} = useContext(AppContext);
  return (
    <motion.div className='contact' initial={{opacity:0, transition:{duration:10} }} animate={{opacity:1}} exit={{opacity:0 }} transition={{duration:.5}}>
      <div className="contact_content">
        <div className="contact_content_left">
          <div className="left_title">{t('contact')}</div>
          <div className="left_form">
            <div className="left_form_icon">
              <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.77175 0.438987L3.84834 0.09498C4.85716 -0.227371 5.93501 0.293579 6.36703 1.31232L7.22677 3.33967C7.60142 4.22312 7.39352 5.26203 6.71279 5.90815L4.81847 7.70616C4.93535 8.78164 5.29686 9.84064 5.903 10.8832C6.50914 11.9257 7.26616 12.7905 8.17407 13.4776L10.4493 12.7189C11.3117 12.4313 12.2509 12.7618 12.7799 13.539L14.0122 15.3495C14.6271 16.2529 14.5165 17.4993 13.7535 18.2653L12.9358 19.0862C12.1219 19.9033 10.9593 20.1997 9.88393 19.8643C7.34507 19.0723 5.01076 16.7211 2.88098 12.8107C0.748113 8.89448 -0.00463623 5.57189 0.622736 2.84289C0.886732 1.69457 1.70425 0.780091 2.77175 0.438987Z" fill="#FED010"/>
              </svg>
            </div>
            <div className="left_form_info">+993 65 626535</div>
          </div>
          <div className="left_form">
            <div className="left_form_icon">
              <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.99946 3.51126C1.09768 4.08885 0.5 5.09963 0.5 6.25V12.25C0.5 15.1495 2.85051 17.5 5.75 17.5H14.75C15.9004 17.5 16.9112 16.9023 17.4887 16.0005L5.75 16C3.67893 16 2 14.3211 2 12.25L1.99946 3.51126ZM3 4.11V11.75C3 13.483 4.35645 14.8992 6.06558 14.9949L6.25 15H17.75C19.483 15 20.8992 13.6435 20.9949 11.9344L21 11.75V4.11L12.3493 8.66369C12.1307 8.77877 11.8693 8.77877 11.6507 8.66369L3 4.11ZM17.75 0H6.25C4.72532 0 3.44586 1.0499 3.09515 2.46618L12 7.15246L20.9049 2.46618C20.5688 1.10891 19.3797 0.088128 17.9393 0.00541878L17.75 0Z" fill="#FED010"/>
              </svg>
            </div>
            <div className="left_form_info">business@geekspace.dev</div>
          </div>
          <div className="left_form">
            <div className="left_form_icon">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.49984 0.357977V12.823L2.18016 15.8614C1.71245 16.1902 1.07871 15.8947 1.00577 15.3523L0.99884 15.2478V4.61531C0.99884 4.40599 1.08619 4.20791 1.23696 4.06714L1.31752 4.00175L6.49984 0.357977ZM18.9943 0.647796L19.0012 0.752285V11.3848C19.0012 11.5941 18.9138 11.7922 18.7631 11.933L18.6825 11.9984L13.4998 15.64V3.17398L17.8199 0.138721C18.2876 -0.190072 18.9213 0.105455 18.9943 0.647796ZM7.99984 0.358977L11.9998 3.17098V15.638L7.99984 12.824V0.358977Z" fill="#FED010"/>
              </svg>
            </div>
            <div className="left_form_info">{t('location')}</div>
          </div>
        </div>
        <div className="contact_content_right">
          <div className="right_form_input">
            <label htmlFor="name">
              <span className='text'>{t('name')}</span>
              <div className="input">
                <span>
                  <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 7C9.32843 7 10 7.67157 10 8.5V9C10 10.9714 8.14049 13 5 13C1.85951 13 0 10.9714 0 9V8.5C0 7.67157 0.671573 7 1.5 7H8.5ZM8.5 8H1.5C1.22386 8 1 8.22386 1 8.5V9C1 10.4376 2.43216 12 5 12C7.56784 12 9 10.4376 9 9V8.5C9 8.22386 8.77614 8 8.5 8ZM5 0.5C6.51878 0.5 7.75 1.73122 7.75 3.25C7.75 4.76878 6.51878 6 5 6C3.48122 6 2.25 4.76878 2.25 3.25C2.25 1.73122 3.48122 0.5 5 0.5ZM5 1.5C4.0335 1.5 3.25 2.2835 3.25 3.25C3.25 4.2165 4.0335 5 5 5C5.9665 5 6.75 4.2165 6.75 3.25C6.75 2.2835 5.9665 1.5 5 1.5Z" fill="#B1AEAE"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  id='name' 
                  autoComplete='off'
                  value={data.name} 
                  onChange={handleChange('name')}
                />
              </div>
            </label>
          </div>
          <div className="right_form_input">
            <label htmlFor="email">
              <span className='text'>{t('email')}</span>
              <div className="input">
                <span>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3.03807V8C0 9.10457 0.895431 10 2 10H10C11.1046 10 12 9.10457 12 8V2C12 0.895431 11.1046 0 10 0H2C0.895431 0 0 0.89543 0 2V3.03807C0 3.03804 0 3.03809 0 3.03807ZM2 1H10C10.5523 1 11 1.44772 11 2V2.73987L6.0001 5.43212L1 2.73976V2C1 1.44772 1.44772 1 2 1ZM1 3.87552L5.76305 6.44024C5.91104 6.51992 6.08916 6.51992 6.23715 6.44024L11 3.87562V8C11 8.55229 10.5523 9 10 9H2C1.44772 9 1 8.55228 1 8V3.87552Z" fill="#B1AEAE"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  autoComplete='off' 
                  id='email'
                  value={data.email} 
                  onChange={handleChange('email')}
                />
              </div>
            </label>
          </div>
          <div className="right_form_input">
            <label htmlFor="message">
              <span className='text'>{t('message')}</span>
              <div className="textInput">
                <span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2699 1.00003C11.2932 -0.0262708 12.955 -0.027512 13.9798 0.997259C15.0024 2.01986 15.0037 3.67745 13.9826 4.70159L6.51349 12.1931C6.35605 12.351 6.16539 12.4718 5.95537 12.5467L1.98644 13.963C1.38975 14.1759 0.814199 13.5989 1.02865 13.0028L2.45406 9.0404C2.52859 8.83322 2.64782 8.645 2.80327 8.48908L10.2699 1.00003ZM13.2727 1.70437C12.6389 1.07053 11.611 1.0713 10.9781 1.70608L10.1968 2.48969L12.4897 4.78258L13.2744 3.99554C13.906 3.3621 13.9052 2.33686 13.2727 1.70437ZM11.7837 5.49075L9.49078 3.19785L3.51143 9.19513C3.45961 9.2471 3.41987 9.30984 3.39503 9.3789L2.14874 12.8433L5.61929 11.6049C5.68929 11.5799 5.75285 11.5396 5.80533 11.487L11.7837 5.49075ZM8.85787 0.999939H1.50002C1.22388 0.999939 1.00002 1.2238 1.00002 1.49994C1.00002 1.77608 1.22388 1.99994 1.50002 1.99994H7.86085L8.85787 0.999939ZM6.86384 2.99994H1.50002C1.22388 2.99994 1.00002 3.2238 1.00002 3.49994C1.00002 3.77608 1.22388 3.99994 1.50002 3.99994H5.86683L6.86384 2.99994ZM4.86982 4.99994H1.50002C1.22388 4.99994 1.00002 5.2238 1.00002 5.49994C1.00002 5.77608 1.22388 5.99994 1.50002 5.99994H3.8728L4.86982 4.99994Z" fill="#B1AEAE"/>
                  </svg>
                </span>
                <textarea 
                  name="" 
                  id="message"
                  value={data.text} 
                  onChange={handleChange('text')}
                  >
                </textarea>
              </div>
            </label>
          </div>

          <button onClick={!loading ? sendData : free} style={{cursor:'pointer'}}>{!loading ? t('send') : t('loading')}</button>
        </div>
      </div>

      <div className="contact_footer">Geek Space Turkmenistan</div>
      <div className="contact_alert" style={{opacity: alert ? '1' : '0', transition:'0.5s'}}>
        {t('sent')}
      </div>
      <div className="contact_alert2" style={{opacity: alert2 ? '1' : '0', transition:'0.5s'}}>
        {t('fill')}!
      </div>
      
    </motion.div>
  );
}

export default Contact;
