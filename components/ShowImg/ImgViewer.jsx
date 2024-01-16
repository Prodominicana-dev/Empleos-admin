import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {Url} from '../Url/URL';
import VerImg from '../../components/ShowImg/verImg'

const MostrarImg = ({idSubscription}) => {
    const [Img, setImg] = useState([]);
   
    //..........................................
    useEffect(() => {
      const obtenerImg = async () => {
        try {
          const response = await axios.get(`${Url}MostrarImg/${idSubscription}`);
          const Img =response.data;


          console.log('aquiiiFile',Img)
          setImg(Img);
        } catch (error) {
          console.error('Error al obtener la lista de Img:', error);
        }
      };
  
      obtenerImg();
    }, []);
   //..................................................
    const handleMostrarImg = async (name) => {
      try {
        const response = await axios.get(`${Url}VerImg/${name}`, {
          responseType: 'arraybuffer', // Configura el tipo de respuesta a 'arraybuffer'
        });
    
        const ImgBlob = new Blob([response.data], { type: response.headers['content-type'] });
        const ImgUrl = URL.createObjectURL(ImgBlob);

        

        window.open(ImgUrl, '_blank');
      } catch (error) {
        console.error('Error al mostrar la imagen:', error);
      }
    };

 
   

    const header = (name) => {
     console.log('imagen aqui',name)
    
        return (
          <div>
            <VerImg  name={name}/>
          </div>
        );
      
    };



    const getImg = async () => {
      try {
        const response = await axios.get(`${Url}MostrarImg/${idSubscription}`);
        setImg(response.data); // Actualiza la lista de documentos en el estado
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
      }
    };

    const handleDeleteImg = async (id) => {
      try {
        const confirmarEliminacion = window.confirm('¿Estás seguro de que deseas eliminar esta imagen ?');
        
        if (confirmarEliminacion) {
        await axios.delete(`${Url}Imagen/${id}`);
        console.log('Imagen eliminado:', id);
        getImg();
        }
      } catch (error) {
        console.error('Error al eliminar la Imagen:', error);
      }
    };







    const footer=({name,id})=> (
    
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button  icon="pi pi-eye" onClick={() => handleMostrarImg(name) } type="button"/>
            {/* <Button  icon="pi pi-trash" className="p-button-outlined p-button-secondary p-button-danger" onClick={() => handleDeleteImg(id)} type="button"/>  */}
        </div>
    
    );
    






  return (
    <div>
  <div className='container'>
    <div className='col-lg-12'>
       {/* <div>
        <p>
        Aquí puedes guardar tu Imagen de Perfil la cual verá recursos humanos.
        </p>
       </div>
    <hr/> */}


      <div className='row'>
        {Img.map((Name, index) => {
          const cadena = Name.name;
          let despuesDelPunto = "";
          const partes = cadena.split('_');
          if (partes.length > 1) {
            despuesDelPunto = partes[1].trim(); 
          }

          return (
            <div key={index} className="col-lg-2">
             <Card title='' subTitle='' footer={()=>footer(Name)} header={()=>header(Name.name)} className="mr-2 mt-2 row" >
                <p className='text-center' style={{ fontSize: '12px' }}>{despuesDelPunto}</p>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>
  );
};

export default MostrarImg;
