import React from 'react'
import styles from '../../styles/DetalleAplicante.module.css'

const Perfil = ({data}) => {
    

    const{  
            name, 
            lastName, 
            email, 
            mobile, 
            landline, 
            countryBirth, 
            nationality, 
            sex, 
            birthDate, 
            documentType, 
            documentNumber, 
            civilStatus, 
            province, 
            driverLicense, 
            ownsVehicle, 
            relationship,
            relationshipWork, 
            relationshipName,
            relationshipLandline, 
            salaryDesired,
            Question, 
            relationshipQuestion

        } = data[0];


           


 const perf=()=>{
    return (
            <div className='container'>
            <div className='col-lg-12'>
                <div className='row'>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Nombre: </div>
                        <div  className={styles.textCColor}> {name}</div >
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Apellidos: </div>
                    <div  className={styles.textCColor}>{lastName}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Correo: </div>
                    <div  className={styles.textCColor}> {email}</div>
                    </div>
                    
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Teléfono móvil: </div>
                    <div  className={styles.textCColor}> {mobile}</div>
                    </div>
                    
                   
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Teléfono fijo: </div>
                    <div  className={styles.textCColor}> {landline}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>País de nacimiento: </div>
                    <div  className={styles.textCColor}> {countryBirth}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Nacionalidad: </div>
                    <div  className={styles.textCColor}> {nationality}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Sexo: </div>
                    <div  className={styles.textCColor}> {sex}</div>
                    </div>

                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Fecha de nacimiento: </div>
                    <div  className={styles.textCColor}> {birthDate}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Tipo de documento: </div>
                    <div  className={styles.textCColor}> {documentType}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Número de documento: </div>
                    <div  className={styles.textCColor}> {documentNumber}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Estado civil: </div>
                    <div  className={styles.textCColor}> {civilStatus}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Provincia: </div>
                    <div  className={styles.textCColor}>{province}</div>
                    </div>
                    
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>¿Tiene licencia de conducir?: </div>
                    <div  className={styles.textCColor}> {driverLicense}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>¿Posee vehículo?: </div>
                    <div  className={styles.textCColor}> {ownsVehicle}</div>
                    </div>
        
                    <div className='col-lg-12'>
                        {/* <hr/> */}
                    </div>
        
                    <div>Parentesco en caso de emergencia:</div>
        
                    <div className='col-lg-12'>
                        <hr/>
                    </div>
        
                    
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>¿Tiene a quien llamar en caso de emergencia?: </div>
                    <div  className={styles.textCColor}> {relationship}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Nombre: </div>
                    <div  className={styles.textCColor}>{relationshipName}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Teléfono: </div>
                    <div  className={styles.textCColor}> {relationshipLandline}</div>
                    </div>
        
                    <div>Parentesco:</div>
        
                    <div className='col-lg-12'>
                        <hr/>
                    </div>

                    <div className='col-lg-12 mb-3'>
                    <div className={styles.textTi}>¿Posee usted parentesco (familiaridad) con algún colaborador de la institución?: </div>
                    <div  className={styles.textCColor}> {relationshipWork}</div>
                    </div>
                    
                    <div>Preguntas:</div>
                    <div className='col-lg-12'>
                        <hr/>
                    </div>
        
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>¿Sueldo al que aspira?: </div>
                    <div  className={styles.textCColor}> {salaryDesired}</div>
                    </div>
                    <div className='col-lg-12'>
                        {/* <hr/> */}
                    </div>
                    <div className='col-lg-12 mb-3'>
                    <div className={styles.textTi}>¿Desempeña o ha desempeñado durante los últimos 3 años una posición en la administración pública o ha sido catalogado como una persona políticamente expuesta? </div>
                    <div  className={styles.textCColor}> {Question}</div>
                    </div>
                    <div className='col-lg-12'>
                        {/* <hr/> */}
                    </div>
                    <div className='col-lg-12 mb-3'>
                    <div className={styles.textTi}>¿Tiene usted algún pariente hasta el segundo grado de afinidad o consanguinidad (padre, madre, hijos, cónyuge, hermanos) que desempeña o ha desempeñado durante los últimos 3 años una posición en Administración Pública o ha sido catalogado como una persona políticamente expuesta?</div>
                    <div  className={styles.textCColor}> {relationshipQuestion}</div>
                    </div>
                    <div className='col-lg-12'>
                        {/* <hr/> */}
                    </div>
                </div>
            </div>
        </div>
    )
}


  
  return (
        <>
            {perf()}
        </>
  )
}

export default Perfil