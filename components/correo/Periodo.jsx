import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Url} from '../Url/URL';

export const obtenerPeriodo = async (Id) => {

    let Periodos = {
      Fecha: '',
      Estado: ''
    };

  let Periodoss=[];

    try {

      const response = await axios.get(`${Url}Periodo/${Id}`);
      const periodo = response.data.slice(-2);

       Periodos = periodo.map(registro =>{ 

                    if(registro.Estado=="habilitado"){
                    return(
                
                              {
                                  Fecha: registro.FechaRegistro,
                                  Estado: registro.Estado
                              }
                          )
                      }
            });




            Periodos.map(periodo=>{

                if(periodo!=undefined){
                    return(
                        Periodoss=[...Periodoss,periodo]
                    )
                }

            })
      
    } catch (error) {
      console.error('Error al obtener el periodo:', error);
    }
    
   const periodo01=Periodoss[Periodoss.length-1]


    return periodo01;
  };
  
  export const obtenerPuestoSolisitado = async (IdVacante,IdSuscripcion) => {

    let PuestoSolisitado = {
        Id:0,
        IdSuscripcion:0,
        IdVacante:0,
        Fecha: '',
        Estado: ''
    };

  let Puestos=[];

    try {

      const response = await axios.get(`${Url}PuestoSolicitado3/${IdVacante}`);
      const periodo = response.data;

      PuestoSolisitado = periodo.map(registro =>{ 

                    if(registro.IdSuscripcion == IdSuscripcion){

                    return(
                              {
                                  Id:registro.Id,
                                  IdSuscripcion:registro.IdSuscripcion,
                                  IdVacante:registro.IdVacante,
                                  Fecha: registro.FechaRegistro,
                                  Estado: registro.Estado
                              }
                          )
                }
            });
        
            PuestoSolisitado.map(puesto=>{

                if(puesto!=undefined){

                    return(
                        Puestos=[...Puestos,puesto]
                    )

                }

            })
      
    } catch (error) {

      console.error('Error al obtener el periodo:', error);

    }
  
    const Puestoss = Puestos[Puestos.length-1];

    return Puestoss;
  };


  export const obtenerPuestoSolisitadoRechazador = async (IdVacante) => {
    let PuestoSolisitado = {
        Id:0,
        IdSuscripcion:0,
        IdVacante:0,
        Fecha: '',
        Estado: ''
    };
 
    try {
      const response = await axios.get(`${Url}PuestoSolicitado3/${IdVacante}`);

      const periodo = response.data;

      PuestoSolisitado = periodo.map(registro =>{ 
                    
                    return(
                
                              {
                                  Id:registro.Id,
                                  IdSuscripcion:registro.IdSuscripcion,
                                  IdVacante:registro.IdVacante,
                                  Fecha: registro.FechaRegistro,
                                  Estado: registro.Estado
                              }
                          )

                }
            );

    } catch (error) {

      console.error('Error al obtener el puesto:', error);
      
    }
  
    return PuestoSolisitado;
  };

  export const EnviarCorreoRechazados = async (Id) => {
     let Correo = {
        Nombre:'',
        Correo:''
     };
   
       await axios.get(`${Url}Suscripcion/${Id}`).then((res)=>{
             
             const periodo = res.data;
             Correo.Correo=periodo.Email
             Correo.Nombre=periodo.Nombre
                //console.log(Correo)   
          
      }).catch (error=>{console.error('Error al obtener el Correo:', error);}) 
      
    
    return Correo;
    
  };