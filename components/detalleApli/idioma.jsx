import React,{useEffect,useState} from 'react';
import styles from '../../styles/DetalleAplicante.module.css';
import axios from 'axios';
import {Url} from '../Url/URL';

const Laguage=({data})=>{

    const [language, setLanguage] = useState([])

    const{idSubscription} = data[0];

    useEffect(() => {
    
        axios.get(`${Url}Language/${idSubscription}`).then((response)=>{
            setLanguage(response.data)
            
    });
    }, []);


    const Idiom=()=>{
        let num=1;
        return(
            <>
            <div className='container'>
                <div className='col-lg-12'>
                    <div className='row'>
                        {language.map((e)=>{
                            return(
                                <div className='row'>
                                        
                                        <div>Idioma número  ({num})</div>
                                        <div className='col-lg-12'>
                                            <hr/>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Idioma: </div>
                                        <div  className={styles.textCColor}> {e.language}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Nombre de la institución: </div>
                                        <div  className={styles.textCColor}> {e.institutionName}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Nivel de conversación: </div>
                                        <div  className={styles.textCColor}> {e.conversationLevel}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Nivel de lectura: </div>
                                        <div  className={styles.textCColor}> {e.readingLevel}</div>
                                        
                                        </div>
                                        
                                       

                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Nivel de escritura: </div>
                                        <div  className={styles.textCColor}>{e.writingLevel}</div>
                                        
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Capacidad de traducir: </div>
                                        <div  className={styles.textCColor}>{e.translationAbility}</div>
                                        
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
        </>
    )

}
export default Laguage