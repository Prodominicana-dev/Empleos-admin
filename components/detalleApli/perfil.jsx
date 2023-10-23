import React from 'react'
import styles from '../../styles/DetalleAplicante.module.css'
import { parseISO, format } from 'date-fns';

const Perfil = ({data}) => {
    

    const{  IdSuscripcion,
            Nombre, 
            Apellidos, 
            Email, Movil, 
            TelefonoFijo, 
            PaisNacimiento, 
            Nacionalidad, 
            Sexo, 
            FechaNacimiento, 
            TipoDocumento, 
            NumeroDocumento, 
            EstadoCivil, 
            Provincia, 
            TieneLicenCondicir, 
            PosseVehiculo, 
            ParienteTrabajo,
            ParentescoEmergente, 
            NombreParentesco,
            TelefonoParentesco, 
            SuleldoAspira,
            preguntaEmpleado, 
            PreguntaPariente} = data;


            const fecha= parseISO(FechaNacimiento);


 const perf=()=>{
    return (
            <div className='container'>
            <div className='col-lg-12'>
                <div className='row'>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Nombre: </div>
                        <div  className={styles.textCColor}> {Nombre}</div >
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Apellidos: </div>
                    <div  className={styles.textCColor}>{Apellidos}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Correo: </div>
                    <div  className={styles.textCColor}> {Email}</div>
                    </div>
                    
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Teléfono móvil: </div>
                    <div  className={styles.textCColor}> {Movil}</div>
                    </div>
                    
                   
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Teléfono fijo: </div>
                    <div  className={styles.textCColor}> {TelefonoFijo}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>País de nacimiento: </div>
                    <div  className={styles.textCColor}> {PaisNacimiento}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Nacionalidad: </div>
                    <div  className={styles.textCColor}> {Nacionalidad}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Sexo: </div>
                    <div  className={styles.textCColor}> {Sexo}</div>
                    </div>

                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Fecha de nacimiento: </div>
                    <div  className={styles.textCColor}> {format(fecha, 'dd/MM/yyyy')}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Tipo de documento: </div>
                    <div  className={styles.textCColor}> {TipoDocumento}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Número de documento: </div>
                    <div  className={styles.textCColor}> {NumeroDocumento}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Estado civil: </div>
                    <div  className={styles.textCColor}> {EstadoCivil}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Provincia: </div>
                    <div  className={styles.textCColor}>{Provincia}</div>
                    </div>
                    
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>¿Tiene licencia de conducir?: </div>
                    <div  className={styles.textCColor}> {TieneLicenCondicir}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>¿Posee vehículo?: </div>
                    <div  className={styles.textCColor}> {PosseVehiculo}</div>
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
                    <div  className={styles.textCColor}> {ParentescoEmergente}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Nombre: </div>
                    <div  className={styles.textCColor}>{NombreParentesco}</div>
                    </div>
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>Teléfono: </div>
                    <div  className={styles.textCColor}> {TelefonoParentesco}</div>
                    </div>
        
                    <div>Parentesco:</div>
        
                    <div className='col-lg-12'>
                        <hr/>
                    </div>

                    <div className='col-lg-12 mb-3'>
                    <div className={styles.textTi}>¿Posee usted parentesco (familiaridad) con algún colaborador de la institución?: </div>
                    <div  className={styles.textCColor}> {ParienteTrabajo}</div>
                    </div>
                    
                    <div>Preguntas:</div>
                    <div className='col-lg-12'>
                        <hr/>
                    </div>
        
                    <div className='col-lg-3 mb-3'>
                    <div className={styles.textTi}>¿Sueldo al que aspira?: </div>
                    <div  className={styles.textCColor}> {SuleldoAspira}</div>
                    </div>
                    <div className='col-lg-12'>
                        {/* <hr/> */}
                    </div>
                    <div className='col-lg-12 mb-3'>
                    <div className={styles.textTi}>¿Desempeña o ha desempeñado durante los últimos 3 años una posición en la administración pública o ha sido catalogado como una persona políticamente expuesta? </div>
                    <div  className={styles.textCColor}> {preguntaEmpleado}</div>
                    </div>
                    <div className='col-lg-12'>
                        {/* <hr/> */}
                    </div>
                    <div className='col-lg-12 mb-3'>
                    <div className={styles.textTi}>¿Tiene usted algún pariente hasta el segundo grado de afinidad o consanguinidad (padre, madre, hijos, cónyuge, hermanos) que desempeña o ha desempeñado durante los últimos 3 años una posición en Administración Pública o ha sido catalogado como una persona políticamente expuesta?</div>
                    <div  className={styles.textCColor}> {PreguntaPariente}</div>
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