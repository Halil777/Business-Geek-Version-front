import React from 'react';
import { Route, Routes, useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "../pages/layout";

// Pages
import About from '../pages/About/about';
import Main from '../pages/index';
import Projects from "../pages/projects"
import News from "../pages/News"
import Contact from "../pages/Contact"
import Service from "../pages/Service"
import OneNews from "../pages/OneNews";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Main />}/>
        <Route path={"/about"} element={<About />}/>
        <Route path={"/service"} element={<Service />}/>
        <Route path={"/projects"} element={<Projects />}/>
        <Route path={"/news"} element={<News />}/>
        <Route path={"/contactUs"} element={<Contact />}/>
        <Route path={"/oneNews"} element={<OneNews />}/>
      </Route>
    </Routes>
  );
}

export default AnimatedRoutes;
