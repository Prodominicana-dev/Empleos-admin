import {Url} from '../../components/Url/URL';
import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Select from '../Select/SelectComp';
import  Axios from 'axios';
const PerfilAssessment=({id,Assessment,setAssessment, error,setError})=>{





    

    useEffect(() => {
        const obtenerArchivos = async () => {
          try {
            const response = await Axios.get(`${Url}ProfileAssessment/${id}`);
            const data =response.data;
            if(data[0]!=undefined){
            setAssessment(data[0]);
            }
          } catch (error) {
            console.error('Error al obtener Assessment:', error);
          }
        };
    
        obtenerArchivos();
      }, []);
//....................................................
 
 const onInputChange = (e, name,) => {
              
    let val = (e.target && e.target.value) || '';
    let _Assessment = { ...Assessment };
    _Assessment[`${name}`] =  val.toString();
    setAssessment(_Assessment);

    setError({
        ...error,
        [`${name}`]: null,
      });


};
//....................................................
      const onInputChangeS = (Value,name) => {
        const {value}=Value;
        const val = (value) || '';

       
        console.log(val +" "+name)
        
        let _Assessment = { ...Assessment };
        _Assessment[`${name}`] =  val.toString();
        setAssessment(_Assessment);

       
        setError({
                ...error,
                [`${name}`]: null,
              });
        
       };

  //.............................................
  const Sex = [
    {label:'Masculino',value:'Masculino'},
    {label:'Femenino',value:'Femenino'},
]
const WorkExperienc = [
    {label:'No requerida',value:'1'},
    {label:'1-2 Años',value:'2'},
    {label:'3-5 Años',value:'3'},
    {label:'Más de 5 años',value:'4'},
]

const Education = [
    {label:'Estudiante',value:'1'},
    {label:'Técnico',value:'2'},
    {label:'Licenciatura',value:'3'},
    {label:'Postgrado',value:'4'}, 
]

    return(
        

    <div className='card'>
        <div className='container'>
        <div className='col-lg-12'>
        <div className='row'>
            
            <Form.Group  className="mb-3 col-lg-4 form-control-lg" controlId="formFile">
                        <Form.Label className='control-label required'>Edad:</Form.Label>
                        <Form.Control  required type="text" name="edad" 
                        value= {Assessment.edad || ''}
                        onChange={(e)=>{onInputChange(e, 'edad')}} style={{ height: '40px' }}/>
                         <Form.Control.Feedback type="valiud">
                    {error.edad && 
                        (
                            <div >
                              <span
                                style={{
                                  color: 'red',
                                  fontSize: '20px',
                                  display: 'flex',
                                  alignItems: 'left',
                                  justifyContent: 'left',
                                  width: 'auto',
                                  height: '22px',
                                }}
                              >
                                Este campo es requerido
                              </span>
                            </div>
                          )}
                    </Form.Control.Feedback>
            </Form.Group>




                <Form.Group  className="mb-3 col-lg-4 form-control-lg" controlId="formFile">
                        <Form.Label className='control-label required'>Sexo:</Form.Label>

                        <Select error={error.sex}  name="sex" value={Assessment.sex} onInputChangeS={(e)=>{onInputChangeS(e,'sex')}} option={Sex}/>
                    
                </Form.Group>
                <Form.Group  className="mb-3 col-lg-4 form-control-lg" controlId="formFile">
                        <Form.Label className='control-label required'>Experiencia en el área:</Form.Label>

                        <Select error={error.workExperience}  name="workExperience" value={Assessment.workExperience} onInputChangeS={(e)=>{onInputChangeS(e,'workExperience')}} option={WorkExperienc}/>
                     
                </Form.Group>

                <Form.Group  className="mb-3 col-lg-4 form-control-lg" controlId="formFile">
                        <Form.Label className='control-label required'>Especificar grado instrucción:</Form.Label>

                        <Select error={error.education}  name="education" value={Assessment.education} onInputChangeS={(e)=>{onInputChangeS(e,'education')}} option={Education}/>
                      
                </Form.Group>
                
                </div>

                </div>
                </div>

        </div>
    )
}

export default PerfilAssessment