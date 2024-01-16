import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {Url} from '../Url/URL';

const MostrarPDF = ({idSubscription}) => {
    const [archivos, setArchivos] = useState([]);

    useEffect(() => {
      const obtenerArchivos = async () => {
        try {
          const response = await axios.get(`${Url}MostrarPdf/${idSubscription}`);
          const files =response.data;


          console.log('aquiiiFile',files)
          setArchivos(files);
        } catch (error) {
          console.error('Error al obtener la lista de archivos:', error);
        }
      };
  
      obtenerArchivos();
    }, []);

    const handleMostrarPDF = async (fileName) => {
      try {
        const response = await axios.get(`${Url}VerPdf/${fileName}`, {
          responseType: 'blob', // Configura el tipo de respuesta a 'blob'
        });
    
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Abre una nueva ventana con el PDF y le asigna un nombre
        const newWindow = window.open(pdfUrl,fileName);

        newWindow.name = fileName; // Establece el nombre de la pestaña
      } catch (error) {
        console.error('Error al mostrar el PDF:', error);
      }
    };

    const getDocument = async () => {
      try {
        const response = await axios.get(`${Url}MostrarPdf/${idSubscription}`);
        setArchivos(response.data); // Actualiza la lista de documentos en el estado
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
      }
    };
    
    const handleDeleteFile = async (id) => {
      try {
        const confirmarEliminacion = window.confirm('¿Estás seguro de que deseas eliminar este documento?');
        
        if (confirmarEliminacion) {
        await axios.delete(`${Url}Document/${id}`);
        console.log('Documento eliminado:', id);
        getDocument();
        }
      } catch (error) {
        console.error('Error al eliminar el documento:', error);
      }
    };

    const header = (
        <img className='mt-4' alt="Card" src='/img/pdf.png'   />
    );
    const footer=({name,id})=> (
    
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button  icon="pi pi-eye" onClick={() => handleMostrarPDF(name) } type="button"/>
            {/* <Button  icon="pi pi-trash" className="p-button-outlined p-button-secondary p-button-danger" onClick={() => handleDeleteFile(id)} type="button"/>  */}
        </div>
    
    );
    






  return (
    <div>
  <div className='container'>
    <div className='col-lg-12'>
       {/* <div>
        <p>
        Aquí puedes guardar documentos como tu curriculum vitae, tus diplomados, etc. pero todo en PDF.
        </p>
       </div>
    <hr/> */}


      <div className='row'>
        {archivos.map((Name, index) => {
          const cadena = Name.name;
          let despuesDelPunto = "";
          const partes = cadena.split('.');
          if (partes.length > 1) {
            despuesDelPunto = partes[0].trim(); 
          }

          return (
            <div key={index} className="col-lg-2">
             <Card title='' subTitle='' footer={()=>footer(Name)} header={header} className="mr-2 mt-2 row" >
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

export default MostrarPDF;
