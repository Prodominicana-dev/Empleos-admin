import React,{useEffect,useState} from 'react';
import styles from '../../styles/DetalleAplicante.module.css';
// import { parseISO, format } from 'date-fns';
import axios from 'axios';
import {Url} from '../Url/URL';
import { formatPhoneNumber } from '../phone/phone';

const WorkExperience =({data})=>{
    const [workExperience, setWorkExperience] = useState([])

    const{idSubscription} = data[0];

    useEffect(() => {
    
        axios.get(`${Url}WorkExperience/${idSubscription}`).then((response)=>{
            setWorkExperience(response.data)
            
    });
    }, []);

    const ExpLab=()=>{
        let num=1;

        

        return(
            <>
            <div className='container'>
                <div className='col-lg-12'>
                    <div className='row'>
                        {workExperience.map((e)=>{

                        // const startDate= parseISO(e.startDate);
                        // const endDate= parseISO(e.endDate);

                            return(
                                <div className='row'>
                                        
                                        <div>Experiencia laboral número ({num})</div>
                                        <div className='col-lg-12 mb-4'>
                                            <hr/>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Fecha inicial: </div>
                                        <div  className={styles.textCColor}> {e.startDate}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Fecha final: </div>
                                        <div  className={styles.textCColor}>  {e.endDate}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Nombre de la compañía: </div>
                                        <div  className={styles.textCColor}> {e.companyName}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Puesto: </div>
                                        <div  className={styles.textCColor}> {e.position}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Salario: </div>
                                        <div  className={styles.textCColor}>{e.salary}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Área del puesto: </div>
                                        <div  className={styles.textCColor}>{e.jobArea}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Industria: </div>
                                        <div  className={styles.textCColor}> {e.industry}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Supervisor: </div>
                                        <div  className={styles.textCColor}> {e.supervisor}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Funciones y logros: </div>
                                        <div  className={styles.textCColor}>{e.responsibilitiesAchievements}</div>
                                        </div>

                                       

                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Teléfono: </div>
                                        <div  className={styles.textCColor}>{formatPhoneNumber(e.phoneNumber)}</div>
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
        {ExpLab()}
        </>
    )
}
export default WorkExperience