import React,{useEffect,useState} from 'react';
import styles from '../../styles/DetalleAplicante.module.css';
import axios from 'axios';
import {Url} from '../Url/URL';
import { formatPhoneNumber } from '../phone/phone';
const PersonalReferences =({data})=>{
    const [personalReferences, setPersonalReferences] = useState([])

    const{  idSubscription} = data[0];

    useEffect(() => {
    
        axios.get(`${Url}PersonalReferences/${idSubscription}`).then((response)=>{
            setPersonalReferences(response.data)
            
    });
    }, []);




  
        let num=1;
        return(
            
            <div className='container'>
                <div className='col-lg-12'>
                    <div className='row'>
                        {personalReferences.map((e)=>{
                            return(
                                <div className='row'>
                                         
                                        <div>Referencia personal número ({num})</div>
                                        <div className='col-lg-12'>
                                            <hr/>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Nombres y Apellidos: </div>
                                        <div  className={styles.textCColor}> {e.fullName}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Teléfono: </div>
                                        <div  className={styles.textCColor}>{formatPhoneNumber(e.landline)}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Ocupación: </div>
                                        <div  className={styles.textCColor}> {e.occupation}</div>
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
            
        )
    
}
export default PersonalReferences