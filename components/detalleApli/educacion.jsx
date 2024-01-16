import React,{useEffect,useState} from 'react';
import styles from '../../styles/DetalleAplicante.module.css';
// import { parseISO, format } from 'date-fns';
import axios from 'axios';
import {Url} from '../Url/URL';

const Educacion=({data})=>{

    const [educacion, setEducacion] = useState([])

    const{  idSubscription} = data[0];

    useEffect(() => {
    
        axios.get(`${Url}Education/${idSubscription}`).then((response)=>{
            setEducacion(response.data)
            
    });
    }, []);






    const Educ=()=>{

        let num=1;

        return(
            <>
            <div className='container'>
                <div className='col-lg-12'>
                    <div className='row'>
                        {educacion.map((e)=>{

                            // const issueDate= parseISO(e.issueDate);
                            // const startStudy= parseISO(e.startStudy);
                            // const endStudy= parseISO(e.endStudy);
                            return(
                                <div className='row'>
                                        
                                        <div>Educación número ({num})</div>
                                        <div className='col-lg-12'>
                                            <hr/>
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Preparación Académica: </div>
                                        <div  className={styles.textCColor}> {e.academicPreparation}</div>
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Institución: </div>
                                        <div  className={styles.textCColor}>{e.institution}</div>
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Área de Estudio: </div>
                                        <div  className={styles.textCColor}> {e.fieldStudy}</div>
                                        </div>
                                        <div className='col-lg-12'>
                                            {/* <hr/> */}
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Título Otorgado: </div>
                                        <div  className={styles.textCColor}> {e.degreeAwarded}</div>
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Estado de Estudios: </div>
                                        <div  className={styles.textCColor}> {e.studyStatus}</div>
                                        </div>

                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Fecha de Expedición: </div>
                                        <div  className={styles.textCColor}> {e.issueDate}</div>
                                        </div>
                                        <div className='col-lg-12'>
                                            {/* <hr/> */}
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Año de inicio de estudios: </div>
                                        <div  className={styles.textCColor}> {e.startStudy}</div>
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Año de término de estudios: </div>
                                        <div  className={styles.textCColor}> {e.endStudy}</div>
                                        </div>
                                      
                                        <div className='col-lg-12'>
                                            <hr/>
                                        </div>
                                        
                                        <div className='col-lg-12' style={{visibility:'hidden',display: 'none'}}>
                                        {num++}
                                        </div>
                                        
                                </div>


                            )
                           
                        })}
                    </div>

                </div>

            </div>
            </>
        )
    }




    return(
        <>
        {Educ()}
        </>
    )
}
export default Educacion