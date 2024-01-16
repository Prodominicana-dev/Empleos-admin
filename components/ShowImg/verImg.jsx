import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Url} from '../Url/URL';

const VerImg = ({name}) => {
    const [imgUrl, setImgUrl] = useState('');
  
    useEffect(() => {
      const obtenerImagen = async () => {
        try {
          const response = await axios.get(`${Url}VerImg/${name}`, {
            responseType: 'arraybuffer',
          });
  
          const contentType = response.headers['content-type'];
          const imgBlob = new Blob([response.data], { type: contentType });
          const url = URL.createObjectURL(imgBlob);
          
          setImgUrl(url);
        } catch (error) {
          console.error('Error al obtener la imagen:', error);
        }
      };
  
      obtenerImagen();
    }, []);
  
    return (
      <div>
        {imgUrl ? (
          <img className='mt-4' alt="Card" src={imgUrl} />
        ) : (
          <p>Cargando imagen...</p>
        )}
      </div>
    );
  };
  
  export default VerImg;