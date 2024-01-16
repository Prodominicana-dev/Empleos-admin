import React,{useEffect,useState} from 'react';
import styles from '../../styles/DetalleAplicante.module.css';
import axios from 'axios';
import {Url} from '../Url/URL';

const JobOpening =({data})=>{
    const [jobOpening, setJobOpening] = useState([])


    useEffect(() => {
    
        axios.get(`${Url}JobOpening/${data}`).then((response)=>{
            setJobOpening(response.data)
            
    });
    }, []);

    const Apli=()=>{
        // let num=1;
         return(
             <>
             <div className='container'>
                 <div className='col-lg-12'>
                     <div className='row'>
                        
                                 <div className='row'>
                                          <div className='col-lg-12'>
                                             <hr/>
                                         </div> 
                                         <div className='col-lg-3'>
                                         <div className={styles.textTi}>Nombre del Puesto: </div>
                                             <div className={styles.textCo}> {jobOpening.name}</div>
                                         </div>
                                         <div className='col-lg-3'>
                                         <div className={styles.textTi}>Responsabilidades del puesto</div>
                                             <div className={styles.textCo}> {jobOpening.responsibilities}</div>
                                         </div>
                                         <div className='col-lg-3'>
                                         <div className={styles.textTi}>Requerimientos del Puesto: </div>
                                             <div className={styles.textCo}> {jobOpening.profile}</div>
                                         </div>
                                         <div className='col-lg-12'>
                                             <hr/>
                                         </div>
                                         
                                 </div>
                        
                     </div>
 
                 </div>
 
             </div>
             </>
         )
     }
    return(
        <>
        {Apli()}
        </>
    )
}
export default JobOpening