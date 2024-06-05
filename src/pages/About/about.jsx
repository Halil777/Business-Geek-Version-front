import{useContext,useState,useEffect} from 'react';
import { AppContext } from '../../App';
import ReactSwiper from '../../components/ReactSwiper';
import { motion } from "framer-motion";
import { AxiosInstance } from '../../common/AxiosInstance';
import SERVER_URL from '../../common/Config'



const options = null;

function About(){
  const {t,lang} = useContext(AppContext)
  const [slides,setSlides] = useState([])
  const [data, setData] = useState([
    {
      body_en:'',
      body_tm:'',
      body_ru:'',
      image:''
    },
    {
      body_en:'',
      body_tm:'',
      body_ru:'',
      image:''
    },
  ]);
  
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await AxiosInstance.get('/about-us');
        setData(res.data)
      } catch ({response}) {
        window.confirm(response.data.message);
      }
    }
    fetchData();
  },[])

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await AxiosInstance.get('/about-us/members');
        if(res.status === 200){
          setSlides(res.data);
        }
      } catch ({response}) {
        window.confirm(response.data.message);
      }
    }
    fetchData();
  },[])

  return (
    <motion.div className='about' initial={{opacity:0, transition:{duration:10} }} animate={{opacity:1}} exit={{opacity:0 }} transition={{duration:.5}}>
    <div className='about'>
      <div className="about_content">
        <div className="about_content_con">
          <div className="about_content_text">{data[0]['body_'+lang]}</div>
          <div className="about_content_img"><img src={data[0].image ? SERVER_URL+'/'+data[0].image : ''}  alt="surat 1"/></div>
        </div>
        <div className="about_content_con">
          <div className="about_content_img"><img src={data[1].image ? SERVER_URL+'/'+data[1].image : ''}  alt="surat 2"/></div>
          <div className="about_content_text">{data[1]['body_'+lang]}</div>
        </div>
      </div>

      <div className="about_workers">
        <h1 className="about_workers_title">{t('teamMembers')}</h1>
        <div className="about_workers_con">
          {slides.length > 4 ? <ReactSwiper slides={slides}/> : ''}
        </div>
      </div>
    </div>
    </motion.div>
  )
}


export default About;