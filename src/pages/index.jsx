// import i18n, { changeLanguage } from "i18next";
import React, { useContext, useEffect, useState } from "react";
import { AxiosInstance } from "../common/AxiosInstance";
import { AppContext } from "../App";
import { motion, transform } from "framer-motion";

function Index() {
  const { lang } = useContext(AppContext)
  const [services, setServices] = useState([]);
  const [inter, setInter] = useState();
  const [data, setData] = useState({
    text_tm: '',
    text_ru: '',
    text_en: '',
  });

  // const services = ['Web Developer', 'Back Developer', 'App Developre', "Design", 'Front developer']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get('/main');
        if (res.status === 200) {
          setData(res.data);
        }
      } catch ({ response }) {
        window.confirm(response.data.message);
      }
      try {
        const res = await AxiosInstance.get('/services');
        if (res.status === 200) {
          setServices(res.data);
        }
      } catch ({ response }) {
        window.confirm(response.data.message);
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    clearInterval(inter)
    if (services.length) {
      const button = document.querySelector('.img-cube');
      const text1 = document.querySelector('.text1');
      const text2 = document.querySelector('.text2');
      let bool = true;
      let index = 0;
      let deg = 0;
      text1.textContent = services[index]['name_' + lang];
      index += 1;
      const info = text1.getBoundingClientRect();
      if (window.innerWidth > 640) {
        button.style.width = info.width + 40 + 'px';
      } else {
        button.style.height = info.height+'px';
      }
      const stop = setInterval(() => {
        const sWidth = window.innerWidth;
        if (bool) {
          text2.textContent = services[index]['name_' + lang];
          bool = !bool
          const info = text2.getBoundingClientRect();
          button.querySelector('.bottom').style.translateY = info.height + 'px';
          if (sWidth > 640) {
            button.style.width = info.width + 40 + 'px';
          } else {
            button.style.height = info.height+'px';
          }
        } else {
          text1.textContent = services[index]['name_' + lang];
          bool = !bool
          const info = text1.getBoundingClientRect();
          if (sWidth > 640) {
            button.style.width = info.width + 40 + 'px';
          } else {
            button.style.height = info.height+'px';
          }
        }
        if (index === services.length - 1) {
          index = -1;
        }
        index += 1;
        deg += 180;
        if (deg === 360) {
          deg = 0;
        }
        button.style.transform = `rotateX(${deg}deg)`
      }, 4000)
      setInter(stop);
    }
  }, [lang, services])

  return (
    <motion.div className='index' initial={{ opacity: 0, transition: { duration: 10 } }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5 }}>
      <div className="mobile_logo">
        <img src="/img/gs 1.svg" alt="logo" />
      </div>
      <div className="index_name">Geek Space Turkmenistan</div>
      <div className="index_main">
        <div className="index_main_button">
          <div className="img-cube" >
            <div className="front">
              <div className="text1"></div>
            </div>
            <div className="middle"><div></div></div>
            <div className="bottom">
              <div className="text2"></div>
            </div>
          </div>

        </div>
        <h1 className="index_main_title">{data['text_' + lang]}</h1>
      </div>
    </motion.div>

  );
}

export default Index;
