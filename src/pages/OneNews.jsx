import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AxiosInstance } from '../common/AxiosInstance';
import SERVER_URL from '../common/Config';
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import { createElement } from 'react';

function OneNews() {
  const [data, setData] = useState(null);
  const [news, setNews] = useState([]);
  const { lang } = useContext(AppContext);

  useEffect(() => {
    document.querySelectorAll('.sidebar_lists_list')[3].classList.add('active');

    const fetchData = async () => {
      const id = window.location.search.split('=')[1];
      try {
        const res = await AxiosInstance.get('news/' + id)
        if (res.status === 200) {
          setData(res.data);
          const el = document.createElement('a');
          el.setAttribute('href','#top');
          el.click();
        }
      } catch ({ response }) {
        window.confirm(response.data.message);
      }
    }
    fetchData();
    console.log("Hello")
  }, [window.location.search])

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const res = await AxiosInstance.get('news?limit=3')
        if (res.status === 200) {
          setNews(res.data);
        }
      } catch ({ response }) {
        window.confirm(response.data.message);
      }
    }
    fetchData2();
  }, [])

  return (
    <motion.div className='oneNews' initial={{ opacity: 0, transition: { duration: 10 } }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5 }}>
      <div className="oneNews_title" id='top'>{data ? data['header_' + lang] : ''}</div>
      <div className="oneNews_date">{data ? data.createdAt.split('T')[0] : ''}</div>
      {
        data ?
          <div className="oneNews_image">
            {
              data.images.length ?
                <img src={data ? SERVER_URL + '/' + data.images[0].image : ''} alt="" />
                :
                <video src={SERVER_URL + '/' + data.video[0].video} controls></video>
            }
          </div>
          : ''
      }
      <div className="oneNews_definitions" style={{ whiteSpace: 'pre-line' }}>{data ? data['body_' + lang] : ''}</div>
      <div className="oneNews_images">
        {
          news.map((img, i) => {
            return (
              <Link to={`/oneNews?id=${img.news_id}`} key={i}>
                {
                  img.images.length ?
                    <img key={i} src={news.length ? SERVER_URL + '/' + img.images[0].image : ''} alt="" />
                    :
                    <video src={SERVER_URL + '/' + img.video[0].video}></video>
                }
              </Link>
            )
          })
        }
      </div>
    </motion.div>
  );
}

export default OneNews;
