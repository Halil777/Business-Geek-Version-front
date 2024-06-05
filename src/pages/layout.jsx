import React,{useState} from 'react';
import {Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useEffect } from 'react';



function Layout() {

  return (
    <div className='layout'>
      <Sidebar />
      <div className='container'>
        <Outlet/>

      </div>
    </div>
  );
}

export default Layout;