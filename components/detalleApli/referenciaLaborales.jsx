import React,{useEffect,useState} from 'react';
import styles from '../../styles/DetalleAplicante.module.css';
import axios from 'axios';
import {Url} from '../Url/URL';

const ProfessionalReferences=({data})=>{
    const [professionalReferences, setProfessionalReferences] = useState([])

    const{idSubscription} = data[0];

    useEffect(() => {
    
        axios.get(`${Url}ProfessionalReferences/${idSubscription}`).then((response)=>{
            setProfessionalReferences(response.data)
            
    });
    }, []);


    
    let num=1;

    return(
        
        <div className='container'>
            <div className='col-lg-12'>
                <div className='row'>
                    {professionalReferences.map((e)=>{
                        return(
                            <div className='row'>
                                    
                                
                                    <div >Referencia laboral número ({num})</div>
                                    <div className='col-lg-12'>
                                        <hr/>
                                    </div>
                                    <div className='col-lg-3'>
                                    <div className={styles.textTi}>Nombres y Apellidos: </div>
                                    <div  className={styles.textCColor}> {e.fullName}</div>
                                    </div>
                                    <div className='col-lg-3'>
                                    <div className={styles.textTi}>Teléfonos: </div>
                                    <div  className={styles.textCColor}> {e.landline}</div>
                                    </div>
                                    <div className='col-lg-3'>
                                    <div className={styles.textTi}>Profesión: </div>
                                    <div  className={styles.textCColor}>{e.profession}</div>
                                    </div>
                                    <div className='col-lg-3'>
                                    <div className={styles.textTi}>Relación: </div>
                                    <div  className={styles.textCColor}> {e.relationship}</div>
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

export default ProfessionalReferences