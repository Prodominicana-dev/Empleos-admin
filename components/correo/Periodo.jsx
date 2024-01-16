import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Url} from '../Url/URL';

export const obtenerPeriodo = async (id) => {

    let Periodo = {
      registrationDate: '',
      status: ''
    };

  let Periodos=[];

    try {

      const response = await axios.get(`${Url}Period/${id}`);
      const periodo = response.data.slice(-2);

       Periodo = periodo.map(registro =>{ 

                    if(registro.status=="habilitado"){
                    return(
                
                              {
                                  registrationDate: registro.registrationDate,
                                  status: registro.status
                              }
                          )
                      }
            });




            Periodo.map(periodo=>{

                if(periodo!=undefined){
                    return(
                        Periodos=[...Periodos,periodo]
                    )
                }

            })
      
    } catch (error) {
      console.error('Error al obtener el periodo:', error);
    }
    
   const Period=Periodos[Periodos.length-1]


    return Period;
  };
  
  export const obtenerPuestoSolisitado = async (idJobOpening, idSubscription) => {

    let PuestoSolisitado = {
        id:0,
        idSubscription:0,
        idJobOpening:0,
        registrationDate: '',
        status: ''
    };

  let Puestos=[];

    try {

      const response = await axios.get(`${Url}PuestoSolicitado3/${idJobOpening}`);
      const periodo = response.data;

      PuestoSolisitado = periodo.map(registro =>{ 

                    if(registro.idSubscription == idSubscription){

                    return(
                              {
                                  id:registro.id,
                                  idSubscription:registro.idSubscription,
                                  idJobOpening:registro. idJobOpening,
                                  registrationDate: registro.registrationDate,
                                  status: registro.status
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
  
    const JobOpening = Puestos[Puestos.length-1];

    return JobOpening;
  };


  export const obtenerPuestoSolisitadoRechazador = async (idJobOpening) => {
    let PuestoSolisitado = {
        id:0,
        idSubscription:0,
        idJobOpening:0,
        registrationDate: '',
        status: ''
    };
 
    try {
      const response = await axios.get(`${Url}PuestoSolicitado3/${idJobOpening}`);

      const periodo = response.data;

      PuestoSolisitado = periodo.map(registro =>{ 
                    
                    return(
                
                              {
                                  id:registro.id,
                                  idSubscription:registro.idSubscription,
                                  idJobOpening:registro.idJobOpening,
                                  registrationDate: registro.registrationDate,
                                  status: registro.status
                              }
                          )

                }
            );

    } catch (error) {

      console.error('Error al obtener el puesto:', error);
      
    }
  
    return PuestoSolisitado;
  };

  export const EnviaremailRechazados = async (id) => {
     let email = {
        name:'',
        email:''
     };
   
       await axios.get(`${Url}Subscription/${id}`).then((res)=>{
             
             const periodo = res.data;
             email.email=periodo.email
             email.name=periodo.name
                //console.log(email)   
          
      }).catch (error=>{console.error('Error al obtener el email:', error);}) 
      
    
    return email;
    
  };