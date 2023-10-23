import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {Url} from '../Url/URL';

const MostrarPDF = ({IdSuscripcion}) => {
    const [archivos, setArchivos] = useState([]);

    useEffect(() => {
      const obtenerArchivos = async () => {
        try {
          const response = await axios.get(`${Url}MostrarPdf/${IdSuscripcion}`);
          setArchivos(response.data);
        } catch (error) {
          console.error('Error al obtener la lista de archivos:', error);
        }
      };
  
      obtenerArchivos();
    }, []);

    const handleMostrarPDF = async (nombre) => {
        const pdfPath = `${Url}VerPdf/${nombre}`;
        window.open(pdfPath, '_blank');
      };


    const header = (
        <img className='mt-4' alt="Card" src='/img/pdf.png' />
    );
    const footer=(nombre)=> (
    
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Ver"  onClick={() => handleMostrarPDF(nombre) }/>
            {/* // <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" /> */}
        </div>
    
    );
    






  return (
    <div>
     
      <div className='container'>
            <div className='col-lg-12'>
                <div className='row'>
                {archivos.map((nombreArchivo, index) => {

                          const cadena = nombreArchivo.Nombre;
                          let despuesDelPunto = "";
                          const partes = cadena.split('.');
                          if (partes.length > 1) {
                            despuesDelPunto = partes[1].trim(); 
                            
                          }

                  return(
                    <div key={index} className="col-lg-3">
                        <Card title='' subTitle='' footer={()=>footer(nombreArchivo.Nombre)} header={header} className="mr-2 mt-2 row">
                            <p className='text-center'>{despuesDelPunto}</p>
                        </Card>
                    </div>
               )})}
            </div>
        </div>
       </div>
    </div>
  );
};

export default MostrarPDF;
