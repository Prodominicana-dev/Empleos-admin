import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Header.module.css'

import React, { useContext, useRef,useEffect, useState } from 'react';
//estilo bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//estilo primereact
//import { StyleClass } from 'primereact/styleclass';
//import { classNames } from 'primereact/utils';
//import { Ripple } from 'primereact/ripple';
//import { Button } from 'primereact/button';
//import { IconName } from "react-icons/bi";




const Header = () => {

 
 

  return (
    <header>
    <div className="image-text">
        <span className="image">
        <img src={`https://prodominicana.gob.do/Imagenes/PD-Logo-RGB-CEI%20Icon.png`} alt="Prodominicana Logo" height="50" className="mr-0 lg:mr-2" />
        </span>
        <div className="text header-text">
            <span className="name">PRODOMINICANA</span>
            <span className="profession">EMPLEOS</span>
        </div>
    </div>

    <i className='bx bx-chevron-right toggle'></i>
</header>
  )
}

export default Header