import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from "../App";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { AxiosInstance } from '../common/AxiosInstance';
import SERVER_URL from '../common/Config';

function Service() {
  const { lang } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [zIndex, setZIndex] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get('/services');
        if (res.status === 200) {
          setData(res.data);
        }
      } catch ({ response }) {
        window.confirm(response.data.message);
      }
    }
    fetchData();

    document.addEventListener('mousedown', (event) => {
      const carts = document.querySelectorAll('.service_cart');
      let bool = true;
      carts.forEach(cart => {
        console.log(cart.contains(event.target));
        if(cart.contains(event.target)){
          bool = false;
        }
      });
      if(bool){
        setOpenId(null);
      }
    })
  }, [])

  useEffect(() => {
    const carts = document.querySelectorAll('.service_cart');

    for (let i = 0; i < carts.length; i++) {
      carts[i].classList.remove('active');
      carts[i].classList.remove('active2');
    }

    if (openId !== null) {
      if ((openId + 1) % 3 === 0) {
        carts[openId].classList.add('active2')
      } else {
        carts[openId].classList.add('active')
      }
      carts[openId].style.zIndex = zIndex;
      setZIndex(zIndex + 1);
    }

  }, [openId])

  const replaceWithBr = (el) => {
    return el.replace((/\n/g, "<br />"));
  }

  return (
    <motion.div className='service' initial={{ opacity: 0, transition: { duration: 10 } }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5 }}>
      <div className="service_desktop">
        <div className="service_cart_con">
          {
            data.map((hyzmat, i) => {
              return (
                <div key={i} className={`service_cart`}>
                  <div className="service_cart_main" onClick={() => { setOpenId( openId === i ? null : i) }}>
                    <div className="main_small_icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 1C1.89543 1 1 1.89543 1 3V11C1 12.1046 1.89543 13 3 13H11C12.1046 13 13 12.1046 13 11V8.5C13 8.22386 13.2239 8 13.5 8C13.7761 8 14 8.22386 14 8.5V11C14 12.6569 12.6569 14 11 14H3C1.34315 14 0 12.6569 0 11V3C0 1.34315 1.34315 0 3 0H5.5C5.77614 0 6 0.223858 6 0.5C6 0.776142 5.77614 1 5.5 1H3ZM8 0.5C8 0.223858 8.22386 0 8.5 0H13.5C13.7761 0 14 0.223858 14 0.5V5.5C14 5.77614 13.7761 6 13.5 6C13.2239 6 13 5.77614 13 5.5V1.70711L8.85355 5.85355C8.65829 6.04882 8.34171 6.04882 8.14645 5.85355C7.95118 5.65829 7.95118 5.34171 8.14645 5.14645L12.2929 1H8.5C8.22386 1 8 0.776142 8 0.5Z" fill="#B1AEAE" />
                      </svg>
                    </div>
                    <div className="main_big_icon">
                      <img src={SERVER_URL + '/' + hyzmat.image} alt="" />
                    </div>
                    <div className="main_name">{hyzmat['name_' + lang]}</div>
                  </div>
                  <div className="service_cart_info" onClick={() => { setOpenId(null) }} >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.0885911 0.215694L0.146447 0.146447C0.320013 -0.0271197 0.589437 -0.046405 0.784306 0.0885911L0.853553 0.146447L6 5.293L11.1464 0.146447C11.32 -0.0271197 11.5894 -0.046405 11.7843 0.0885911L11.8536 0.146447C12.0271 0.320013 12.0464 0.589437 11.9114 0.784306L11.8536 0.853553L6.707 6L11.8536 11.1464C12.0271 11.32 12.0464 11.5894 11.9114 11.7843L11.8536 11.8536C11.68 12.0271 11.4106 12.0464 11.2157 11.9114L11.1464 11.8536L6 6.707L0.853553 11.8536C0.679987 12.0271 0.410563 12.0464 0.215694 11.9114L0.146447 11.8536C-0.0271197 11.68 -0.046405 11.4106 0.0885911 11.2157L0.146447 11.1464L5.293 6L0.146447 0.853553C-0.0271197 0.679987 -0.046405 0.410563 0.0885911 0.215694L0.146447 0.146447L0.0885911 0.215694Z" fill="#B1AEAE" />
                    </svg>
                    <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: replaceWithBr(hyzmat['body_' + lang]) }}></div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="service_mobile">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination
          lazy={true}
          slidesPerView={1}
          loop={true}
          spaceBetween={50}
        >
          {data.map((hyzmat, i) => {
            return (
              <SwiperSlide className='mobile_slider_slide' key={i}>
                <div className="service_mobile_cart">
                  <div className="cart_title">{hyzmat['name_' + lang]}</div>
                  <div className='cart_img'>
                    <img src={SERVER_URL + '/' + hyzmat.image} alt="" />
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap' }} className="cart_definition" dangerouslySetInnerHTML={{ __html: replaceWithBr(hyzmat['body_' + lang]) }}></div>
                </div>
              </SwiperSlide>
            )
          })
          }
        </Swiper>
      </div>
    </motion.div>
  );
}

export default Service;
