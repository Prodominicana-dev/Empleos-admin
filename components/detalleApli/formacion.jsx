
import React,{useEffect,useState} from 'react';
import styles from '../../styles/DetalleAplicante.module.css';
// import { parseISO, format } from 'date-fns';
import axios from 'axios';
import {Url} from '../Url/URL';


const Formacion=({data})=>{

    const [FormCom, setFormCom] = useState([])

    const{idSubscription} = data[0];

    useEffect(() => {
    
        axios.get(`${Url}Training/${idSubscription}`).then((response)=>{
            setFormCom(response.data)
            
    });
    }, []);

    const FromCo=()=>{
        let num=1;
        return(
            <>
            <div className='container'>
                <div className='col-lg-12'>
                    <div className='row'>
                        {FormCom.map((e)=>{

                        // const startDate= parseISO(e.startDate );
                        // const endDate= parseISO(e.endDate );

                            return(
                                <div className='row'>
                                         
                                        <div>Formación Complementaria número  ({num})</div>

                                        <div className='col-lg-12'>
                                            <hr/>
                                        </div>

                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Formación Complementaria: </div>
                                        <div  className={styles.textCColor}>{e.certificate}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Estado de la Certificación: </div>
                                        <div  className={styles.textCColor}>{e.certificateStatus}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Fecha de Inicio: </div>
                                        <div  className={styles.textCColor}>{e.startDate}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Fecha de término: </div>
                                        <div  className={styles.textCColor}> {e.endDate}</div>
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
        {FromCo()}
        </>
    )


}

export default Formacion