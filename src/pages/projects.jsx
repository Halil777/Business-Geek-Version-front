import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from "../App";
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { AxiosInstance } from '../common/AxiosInstance';
import SERVER_URL from '../common/Config';

// function Projects() {
//   const [slides, setSlides] = useState([
//     {
//       text: 'Slide 1',
//     },
//     {
//       text: 'Slide 2',
//     },
//     {
//       text: 'Slide 3',
//     },
//   ]);

//   return (
//     <Swiper
//       direction="vertical"
//       slides={slides}
//       onSwipe={(direction) => console.log(direction)}
//       mousewheel={true}
//       slidesPerView="1"
//       modules={[Pagination]}
//       pagination={{ clickable: true }}
//       scrollbar={{ draggable: true }}
//     >
//       {slides.map((slide, index) => (
//         <SwiperSlide style={{height:'50vh'}}>
//           <div key={index} className="swiper-slide">
//             {slide.text}
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }

function Projects() {
  let scroll = 0
  let fast = 50;
  const { t, lang } = useContext(AppContext);
  const [scrollIndex, setScrollIndex] = useState(1);
  const [scrollTime, setScrollTime] = useState(true);
  const [data, setData] = useState([
    {
      name: 'Tm Muse',
      image: '',
      body_tm: 'Mobile application for provision of information services in the field of culture, enterainment and leisure',
      body_en: 'Mobile application for provision of information services in the field of culture, enterainment and leisure',
      body_ru: 'Mobile application for provision of information services in the field of culture, enterainment and leisure',
    }
  ]);
  useEffect(() => {
    // const scrollF = (e) => {
    //   const projectEl = document.querySelector('.projects')
    //   if (!projectEl.contains(e.target)) {
    //     if (e.deltaY) {
    //       console.log("Hello")
    //     }
    //   }
    // }
    // document.addEventListener('wheel', function (e) {
    //   scrollF(e);
    // })

    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get('/projects');
        if (res.status) {
          setData(res.data.rows);
        }
      } catch ({ response }) {
        window.confirm(response.data.message);
      }
    }
    fetchData();


    document.querySelectorAll('.project_cart')[0].classList.add('active');

  }, [])

  const onSlideChange = (e) => {
    const els = document.querySelectorAll('.project_cart');
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove('active');
    }
    els[e.activeIndex].classList.add('active');
  }



  return (
    <motion.div className='projectsCon' initial={{ opacity: 0, transition: { duration: 10 } }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5 }}>
      <div className='projects'>
        <div className='projects_desktop'>
          <Swiper
            modules={[Mousewheel, Autoplay]}
            direction='vertical'
            lazy={true}
            slidesPerView={1}
            spaceBetween={10}
            className='desktopSlider'
            mousewheel={true}
            keyboard={{ enabled: true }}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
          >
            {
              data.length > 0 ?
                data.map((e, index) => {
                  return (
                    <SwiperSlide className='desktopSlide' key={index}>
                      <div className="section_con" >
                        <div className="section_texts">
                          <div className="section_texts_description">{e['body_' + lang]}</div>
                          <div className="section_texts_name">{e.name}</div>
                        </div>
                        <div className="section_bg" ><img src={e.image ? SERVER_URL + '/' + e.image : e.image} alt="" /></div>
                      </div>
                    </SwiperSlide>
                  )
                }) : ''
            }
          </Swiper>
        </div>

        <div className="projects_mobile">
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            lazy={true}
            slidesPerView={1.3}
            centeredSlides={true}
            onSlideChange={(e) => onSlideChange(e)}
            spaceBetween={10}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
          >
            {
              data.map((slider, i) => (
                <SwiperSlide key={i} className='project_cart_slide'>
                  <div className="project_cart">
                    <h1 className="project_cart_title">{slider.name}</h1>
                    <div className="project_cart_img">
                      <img src={slider.image ? SERVER_URL + '/' + slider.image : ''} alt="" />
                    </div>
                    <div className="project_cart_description">{slider['body_' + lang]}</div>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
      <div className="scroll_icon">
        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.8527 4.64582C12.0484 4.84073 12.0489 5.15731 11.854 5.35292L6.38902 10.8374C6.17408 11.0531 5.82477 11.0531 5.60982 10.8374L0.14484 5.35292C-0.0500734 5.15731 -0.0495088 4.84073 0.1461 4.64582C0.34171 4.4509 0.658292 4.45147 0.853206 4.64708L5.99942 9.81166L11.1456 4.64708C11.3406 4.45147 11.6571 4.4509 11.8527 4.64582ZM11.8527 0.645818C12.0484 0.840732 12.0489 1.15731 11.854 1.35292L6.38902 6.83741C6.17408 7.05312 5.82477 7.05312 5.60982 6.83741L0.14484 1.35292C-0.0500734 1.15731 -0.0495088 0.840731 0.1461 0.645817C0.34171 0.450903 0.658292 0.451467 0.853206 0.647077L5.99942 5.81166L11.1456 0.647077C11.3406 0.451468 11.6571 0.450904 11.8527 0.645818Z" fill="#B1AEAE" />
        </svg>
        <span>{t('scroll')}</span>
      </div>
    </motion.div >
  );
}

export default Projects;
