import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { AxiosInstance } from '../common/AxiosInstance';
import SERVER_URL from '../common/Config';



function News() {
  const { t, lang } = useContext(AppContext)
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [newsHas, setNewsHas] = useState(true);
  const limit = 10

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get(`/news?limit=${limit}&offset=${page * limit}`);
        if (res.status === 200) {
          setData(res.data);
          setNewsHas(res.data.length < limit ? false : true)
        }
      } catch ({ response }) {
        window.confirm(response.data.message);
      }
    }
    fetchData();
  }, []);

  const loadMore = async (localPage) => {
    setPage(localPage);
    try {
      const res = await AxiosInstance.get(`/news?limit=${limit}&offset=${localPage * limit}`);
      if (res.status === 200) {
        if (res.data.length < limit) {
          setNewsHas(false);
        }
        const a = [...data, ...res.data]
        setData(a);
      }
    } catch ({ response }) {
      window.confirm(response.data.message);
    }
  }

  return (
    <motion.div className='news' initial={{ opacity: 0, transition: { duration: 10 } }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5 }}>
      <div className="news_main">
        {
          data.length ?
            <div className="news_main_image">
              {
                data[0].images.length ?
                  <img src={data.length ? SERVER_URL + '/' + data[0].images[0].image : ''} alt="" />
                  : <video src={SERVER_URL + '/' + data[0].video[0].video}></video>
              }
            </div>

            : ''
        }
        <div className="news_main_content">
          <div className="content_top">
            <h1 className="content_top_title">{data.length ? data[0]['header_' + lang] : ''}</h1>
            <div className="content_top_description" style={{ whiteSpace: 'pre-line' }}>{data.length ? data[0]['body_' + lang] : ""}</div>
          </div>
          <div className="content_bottom">
            <Link to={data.length ? `/oneNews?id=${data[0].news_id}` : ''}>
              <button>{t('moreDetails')}</button>
            </Link>
            <div className="date">{data.length ? data[0].createdAt.split('T')[0] : ''}</div>
          </div>
        </div>
      </div>

      <div className="news_con">
        {data.length ?
          data.map((news, i) => {
            if (i > 0) {
              return (
                <Link to={`/oneNews?id=${news.news_id}`} className="newsAll_news" key={i}>
                  <div className="newsAll_news_img">
                    {
                      news.images.length ? 
                      <img src={SERVER_URL + '/' + news.images[0].image} alt="" />
                      :
                      <video src={SERVER_URL + '/' + news.video[0].video}></video>
                    }
                  </div>
                  <div className="newsAll_news_date"><span></span> {data.length ? news.createdAt.split('T')[0] : ''}</div>
                  <div className="newsAll_news_title">{data.length ? news['header_' + lang] : ''}</div>
                </Link>
              )
            }
          }) : ''
        }
      </div>


      <div className='news_load_con' style={newsHas ? { display: 'flex' } : { display: 'none' }}>
        <button className='news_load' onClick={() => { loadMore(page + 1) }}>
          {t('load')}
        </button>
      </div>
    </motion.div>
  );
}

export default News;
