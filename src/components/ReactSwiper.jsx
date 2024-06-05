import React, {useState, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import SERVER_URL from '../common/Config'
import 'swiper/css';
import 'swiper/css/navigation';

function ReactSwiper({slides}) {
  const [slide, setSlide] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(5);

  useEffect(()=>{
    function showSlides(){
      const windowSize = window.innerWidth;
      if(windowSize < 641){
        setSlidesPerView(1);
        const slidesClass = document.querySelectorAll('.boxes_box');
        for(let i = 0; i<slidesClass.length; i++){
          slidesClass[i].classList.add('active');
        }
      }
      else if(windowSize < 1001){
        setSlidesPerView(3);
        document.querySelector('.swiper-button-next').click();
      }
    }
    showSlides();
  })

  const onSlideChange = (e)=>{
    if(slidesPerView > 1){
      let removeIndex = Math.floor((slidesPerView-1)/2);
  
      setSlide(e);
  
      const {activeIndex,slides} = e;
  
      for(let i = 0; i<slides.length; i++){
        slides[i].querySelector('.boxes_box').classList.remove('active');
      }
      slides[activeIndex + removeIndex].querySelector('.boxes_box').classList.add('active');
    }
  }

  const slideClick = (i)=>{

  }


  return (
    <div className='slider'>
      <Swiper
        modules={[Navigation,Autoplay]}
        navigation
        lazy={true}
        slidesPerView={slidesPerView}
        loop={true}
        spaceBetween={50}
        speed={1000}
        onSlideChange={(e) => onSlideChange(e)}
        initialSlide={4}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
      >
        {
          slides.map((slide,i)=>(
            <SwiperSlide onClick={()=> slideClick(i)} className='slider_slide' key={i}>
              <div className="boxes_box">
                <div className="boxes_box_image"><img src={SERVER_URL +'/'+ slide.image} alt="" /></div>
                <div className="info">
                  <div className="boxes_box_name">{slide.name}</div>
                  <div className="boxes_box_major">{slide.job}</div>
                  <div className="boxes_box_email">{slide.email}</div>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}

export default ReactSwiper;
