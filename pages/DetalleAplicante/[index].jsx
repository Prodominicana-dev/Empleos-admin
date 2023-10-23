import React,{useEffect,useState,useRef} from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import Layout from 'component/components/Layout';
import axios from 'axios';
import { Toolbar } from 'primereact/toolbar';
import Perfil from '../../components/detalleApli/perfil'
import { Button } from 'primereact/button';
import PdfViewer from '../../components/pdf/PdfViewer';
import ImagenPerf from '../../components/Imagen/imagerPerf';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';
//.........................
import { obtenerPeriodo,obtenerPuestoSolisitado,obtenerPuestoSolisitadoRechazador,EnviarCorreoRechazados } from '../../components/correo/Periodo';
//import { parseISO, format } from 'date-fns';
//........................
import {Url} from '../../components/Url/URL';
//.........................
import styles from '../../styles/DetalleAplicante.module.css'
//.........................
import { useRouter } from 'next/router';
//...........................
import { parseISO, format } from 'date-fns';
const Detalle = ({data,Vacante}) => {

    const [imagen, setImagen] = useState([])
    const [perfil, setPerfil] = useState([])
    const [exLab, setExLab] = useState([])
    const [educacion, setEducacion] = useState([])
    const [FormCom, setFormCom] = useState([])
    const [Idioma, setIdioma] = useState([])
    const [RePer, setRePer] = useState([])
    const [RefLab, setRefLab] = useState([])
    const [deleteSuscripcionDialog, setDeleteSuscripcionDialog] = useState(false);
    const [aplica, setAplica] = useState([])
    const [Seleccionado, setSeleccionado] = useState([])
    const toast = useRef(null);


    const [user, setUser] = useState({
        Id:'',email:'',username:''
     })
     const router = useRouter();
    
    useEffect(() => {
    
        axios.get('/api/profile').then((response)=>{
            if(response.data != undefined){
                setUser(response.data)  
            }else{
                router.push('/');
            }
           
    });
    }, []);
    
    
    const Usuario=()=>{
    
            if(user.Id!=null){
            return(
                <h1 className="text-3xl font-bold text-gray-900 line-height-2 ml-8">
                                    
                    <span className="font-light block">{user.username}</span>Estás al Mando.
                </h1>
            )
        }
    }



    useEffect(() => {
        setPerfil(data);
    }, []);
   

   const{IdSuscripcion,
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
         Municipio, 
         Calle, 
         Sector, 
         EdificioNumero, 
         TieneLicenCondicir, 
         PosseVehiculo, 
         ParentescoEmergente, 
         NombreParentesco,
         TelefonoParentesco, 
         SuleldoAspira,
         preguntaEmpleado, 
         PreguntaPariente}=data;



    let Data={perfil,RefLab,RePer,Idioma,exLab,educacion,FormCom,aplica,imagen};
      
    const PdfGeneratorButton= async()=>{
     
        //  axios.post(`/api/PDF/CuriiPdf`,data.data).then((response)=>{
          
        try {
            const response = await axios.post(Url+'CrearPdf',Data,{
                responseType: 'blob',
            });
            // Maneja la respuesta, puede ser una descarga directa o un enlace de descarga
          

            // Crear URL del blob para descargar el archivo
            const url = URL.createObjectURL(new Blob([response.data]));

            // Crear un enlace temporal y hacer clic en él para iniciar la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = `${perfil.Nombre} ${Apellidos} (Perfil).pdf`;
            link.click();

            // Liberar el objeto URL después de la descarga
            URL.revokeObjectURL(url);
          } catch (error) {
            console.error('Error al generar el PDF:', error);
          }
    }
    useEffect(() => {
    
        axios.get(`${Url}MostrarImagen/${IdSuscripcion}`).then((response)=>{
            setImagen(response.data)
            
    });
    }, []);
    
    useEffect(() => {
    
        axios.get(`${Url}ExperienciaLaboralExterna/${IdSuscripcion}`).then((response)=>{
            setExLab(response.data)
            
    });
    }, []);

    useEffect(() => {
    
        axios.get(`${Url}Educacion/${IdSuscripcion}`).then((response)=>{
            setEducacion(response.data)
            
    });
    }, []);

    useEffect(() => {
    
        axios.get(`${Url}DiplCurSeminSert/${IdSuscripcion}`).then((response)=>{
            setFormCom(response.data)
            
    });
    }, []);

    useEffect(() => {
    
        axios.get(`${Url}Idioma/${IdSuscripcion}`).then((response)=>{
            setIdioma(response.data)
            
    });
    }, []);

    useEffect(() => {
    
        axios.get(`${Url}Vacantes/${Vacante}`).then((response)=>{
            setAplica(response.data[0])
            
    });
    }, []);
              
    useEffect(() => {
    
        axios.get(`${Url}ReferenciasPersonales/${IdSuscripcion}`).then((response)=>{
            setRePer(response.data)
            
    });
    }, []);

    useEffect(() => {
    
        axios.get(`${Url}ReferenciasLaborales/${IdSuscripcion}`).then((response)=>{
            setRefLab(response.data)
            
    });
    }, []);

    useEffect(() => {
    
        axios.get(`${Url}PuestoSolicitado/${IdSuscripcion}`).then((response)=>{

           
            console.log(IdSuscripcion)
            console.log(Vacante)
            if(response.data!=undefined){
                const Data=response.data.filter((Item) => Item.IdSuscripcion == IdSuscripcion && Item.IdVacante == Vacante && Item.Estado !='None');
                console.log(Data.slice(-1))
            setSeleccionado(Data.slice(-1)[0])
            }
    });
    }, []);

    const ExpLab=()=>{
        let num=1;
        return(
            <>
            <div className='container'>
                <div className='col-lg-12'>
                    <div className='row'>
                        {exLab.map((exl)=>{

                        const fechaIn= parseISO(exl.FechaInicial);
                        const fechaTer= parseISO(exl.FechaFinal);

                            return(
                                <div className='row'>
                                        
                                        <div>Experiencia laboral número ({num})</div>
                                        <div className='col-lg-12 mb-4'>
                                            <hr/>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Fecha inicial: </div>
                                        <div  className={styles.textCColor}> {format(fechaIn, 'dd/MM/yyyy')}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Fecha final: </div>
                                        <div  className={styles.textCColor}>  {format(fechaTer, 'dd/MM/yyyy')}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Nombre de la compañía: </div>
                                        <div  className={styles.textCColor}> {exl.NombreCompania}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Puesto: </div>
                                        <div  className={styles.textCColor}> {exl.Puesto}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Salario: </div>
                                        <div  className={styles.textCColor}>{exl.Salario}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Área del puesto: </div>
                                        <div  className={styles.textCColor}>{exl.AreaPuesto}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Industria: </div>
                                        <div  className={styles.textCColor}> {exl.Industria}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Supervisor: </div>
                                        <div  className={styles.textCColor}> {exl.Supervisor}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Funciones y logros: </div>
                                        <div  className={styles.textCColor}>{exl.FuncionesLogros}</div>
                                        </div>

                                       

                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Teléfono: </div>
                                        <div  className={styles.textCColor}>{exl.Telefono}</div>
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

    const Educ=()=>{
        let num=1;
        return(
            <>
            <div className='container'>
                <div className='col-lg-12'>
                    <div className='row'>
                        {educacion.map((exl)=>{

                            const fechaExp= parseISO(exl.FechaExpedicion);
                            const fechaIn= parseISO(exl.InicioEstudio);
                            const fechaTer= parseISO(exl.TerminoEstudio);
                            return(
                                <div className='row'>
                                        
                                        <div>Educación número ({num})</div>
                                        <div className='col-lg-12'>
                                            <hr/>
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Preparación Académica: </div>
                                        <div  className={styles.textCColor}> {exl.PreparacionAcademica}</div>
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Institución: </div>
                                        <div  className={styles.textCColor}>{exl.Institución}</div>
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Área de Estudio: </div>
                                        <div  className={styles.textCColor}> {exl.AreaEstudio}</div>
                                        </div>
                                        <div className='col-lg-12'>
                                            {/* <hr/> */}
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Título Otorgado: </div>
                                        <div  className={styles.textCColor}> {exl.TituloOtorgado}</div>
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Estado de Estudios: </div>
                                        <div  className={styles.textCColor}> {exl.EstadoEstudio}</div>
                                        </div>

                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Fecha de Expedición: </div>
                                        <div  className={styles.textCColor}> {format(fechaExp, 'dd/MM/yyyy')}</div>
                                        </div>
                                        <div className='col-lg-12'>
                                            {/* <hr/> */}
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Año de inicio de estudios: </div>
                                        <div  className={styles.textCColor}> {format(fechaIn, 'dd/MM/yyyy')}</div>
                                        </div>
                                        <div className='col-lg-4 mb-4'>
                                        <div className={styles.textTi}>Año de término de estudios: </div>
                                        <div  className={styles.textCColor}> {format(fechaTer, 'dd/MM/yyyy')}</div>
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

    const FromCo=()=>{
        let num=1;
        return(
            <>
            <div className='container'>
                <div className='col-lg-12'>
                    <div className='row'>
                        {FormCom.map((exl)=>{

                        const fechaIn= parseISO(exl.FechaInicio);
                        const fechaTer= parseISO(exl.FechaFinal);

                            return(
                                <div className='row'>
                                         
                                        <div>Formación Complementaria número  ({num})</div>

                                        <div className='col-lg-12'>
                                            <hr/>
                                        </div>

                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Formación Complementaria: </div>
                                        <div  className={styles.textCColor}>{exl.Certificado}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Estado de la Certificación: </div>
                                        <div  className={styles.textCColor}>{exl.EstadoCerti}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Fecha de Inicio: </div>
                                        <div  className={styles.textCColor}>{format(fechaIn, 'dd/MM/yyyy')}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Fecha de término: </div>
                                        <div  className={styles.textCColor}> {format(fechaTer, 'dd/MM/yyyy')}</div>
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

    const Idiom=()=>{
        let num=1;
        return(
            <>
            <div className='container'>
                <div className='col-lg-12'>
                    <div className='row'>
                        {Idioma.map((exl)=>{
                            return(
                                <div className='row'>
                                        
                                        <div>Idioma número  ({num})</div>
                                        <div className='col-lg-12'>
                                            <hr/>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Idioma: </div>
                                        <div  className={styles.textCColor}> {exl.Idioma}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Nombre de la institución: </div>
                                        <div  className={styles.textCColor}> {exl.NombreInstitucion}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Nivel de conversación: </div>
                                        <div  className={styles.textCColor}> {exl.NivelConversacion}</div>
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Nivel de lectura: </div>
                                        <div  className={styles.textCColor}> {exl.NivelLectura}</div>
                                        
                                        </div>
                                        
                                       

                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Nivel de escritura: </div>
                                        <div  className={styles.textCColor}>{exl.NivelEscritura}</div>
                                        
                                        </div>
                                        <div className='col-lg-3 mb-4'>
                                        <div className={styles.textTi}>Capacidad de traducir: </div>
                                        <div  className={styles.textCColor}>{exl.CapacidadTraducir}</div>
                                        
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

    const RefPer=()=>{
        let num=1;
        return(
            <>
            <div className='container'>
                <div className='col-lg-12'>
                    <div className='row'>
                        {RePer.map((exl)=>{
                            return(
                                <div className='row'>
                                         
                                        <div>Referencia personal número ({num})</div>
                                        <div className='col-lg-12'>
                                            <hr/>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Nombres y Apellidos: </div>
                                        <div  className={styles.textCColor}> {exl.NombreCompleto}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Teléfonos: </div>
                                        <div  className={styles.textCColor}>{exl.Telefono}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Ocupación: </div>
                                        <div  className={styles.textCColor}> {exl.Ocupacion}</div>
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

    const RefLa=()=>{
        let num=1;
        return(
            <>
            <div className='container'>
                <div className='col-lg-12'>
                    <div className='row'>
                        {RefLab.map((exl)=>{
                            return(
                                <div className='row'>
                                        
                                    
                                        <div >Referencia laboral número ({num})</div>
                                        <div className='col-lg-12'>
                                            <hr/>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Nombres y Apellidos: </div>
                                        <div  className={styles.textCColor}> {exl.NombreCompleto}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Teléfonos: </div>
                                        <div  className={styles.textCColor}> {exl.Telefono}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Profesión: </div>
                                        <div  className={styles.textCColor}>{exl.Profesion}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Relación: </div>
                                        <div  className={styles.textCColor}> {exl.Relacion}</div>
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
                                            <div className={styles.textCo}> {aplica.NombreVacante}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Responsabilidades del puesto</div>
                                            <div className={styles.textCo}> {aplica.Responsabilidades}</div>
                                        </div>
                                        <div className='col-lg-3'>
                                        <div className={styles.textTi}>Requerimientos del Puesto: </div>
                                            <div className={styles.textCo}> {aplica.PerfilPuesto}</div>
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

    const confirmacionAplicante = async()=>{
         const recargar= async()=>{
            setTimeout(() => {
                window.location.reload();
              }, 4000);
         }

        const obtenerInformacion = async (IdVacante,IdSuscripcion) => {
        
            const periodo = await obtenerPeriodo(IdVacante);
            const PuestoSolisitado = await obtenerPuestoSolisitado(IdVacante,IdSuscripcion);
            const PuestoRechazados = await  obtenerPuestoSolisitadoRechazador(IdVacante);

            let aplicanteAcep = {
                IdSuscripcion:IdSuscripcion,
                IdVacante:IdVacante,
                Estado:'Aceptado'
            }

            if(periodo.Fecha < PuestoSolisitado.Fecha){

                await axios.put(`${Url}PuestoSolicitado/${PuestoSolisitado.Id}`, aplicanteAcep).then(res=>{
                    setDeleteSuscripcionDialog(false);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Aplicante Aceptado', life: 9000 });
                }).catch(error=>{
                  console.log(error.message);
                })
            
            }

            PuestoRechazados.map(async(rechazados,indice)=>{

                if(indice < PuestoRechazados.length - 1){
                if(periodo.Fecha < rechazados.Fecha){
                    if(rechazados.Id != PuestoSolisitado.Id){

                        let aplicanteRech = {
                            IdSuscripcion:rechazados.IdSuscripcion,
                            IdVacante:rechazados.IdVacante,
                            Estado:'Rechazado'
                        }

                        await axios.put(`${Url}PuestoSolicitado/${rechazados.Id}`, aplicanteRech).then(res=>{

                        }).catch(error=>{
                          console.log(error.message);
                        })
                    }
                }
            }else{
                if(periodo.Fecha < rechazados.Fecha){
                    if(rechazados.Id != PuestoSolisitado.Id){

                        let aplicanteRech = {
                            IdSuscripcion:rechazados.IdSuscripcion,
                            IdVacante:rechazados.IdVacante,
                            Estado:'Rechazado'
                        }

                        await axios.put(`${Url}PuestoSolicitado/${rechazados.Id}`, aplicanteRech).then(res=>{
                            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Los demás aplicantes han sido rechazados', life: 9000 });
                        }).catch(error=>{
                          console.log(error.message);
                        })
                    }
                }
            }
            })
          
            PuestoRechazados.map(async(rechazados,indice)=>{

                if(indice < PuestoRechazados.length - 1){
                if(periodo.Fecha < rechazados.Fecha){
                    if(rechazados.Id != PuestoSolisitado.Id){
                         
                        let Correo = await EnviarCorreoRechazados(rechazados.IdSuscripcion);

                        await axios.post(`${Url}Correo`,Correo ).then(res=>{

                        }).catch(error=>{
                          console.log(error.message);
                        })
                    }
                }
            }else{
                if(periodo.Fecha < rechazados.Fecha){
                    if(rechazados.Id != PuestoSolisitado.Id){
                         
                        let Correo = await EnviarCorreoRechazados(rechazados.IdSuscripcion);

                        await axios.post(`${Url}Correo`,Correo ).then(res=>{
                            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Correos enviados a rechazados', life: 9000 });
                        }).catch(error=>{
                          console.log(error.message);
                        })
                    }
                }
            }
            })  

           await recargar();

          };
          
          
          
          obtenerInformacion(Vacante,IdSuscripcion);
console.log(Vacante,IdSuscripcion)

       

      




    }

    const hideDeleteSuscripcionDialog = () => {
        setDeleteSuscripcionDialog(false);
    };

    const deleteSuscripcionDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteSuscripcionDialog} />
            <Button label="Yes" icon="pi pi-check" text 
            onClick={confirmacionAplicante} 
            />
        </>
    );
 
    const selecAplicante=()=>{
        setDeleteSuscripcionDialog(true);
    }

    const leftToolbarTemplate=()=>{
             console.log(Seleccionado)
            if(Seleccionado !=null && Seleccionado.Estado ==='Aceptado'){
                return(
                    <>
                            <Message className='mr-3' severity="success" text="Aplicante Seleccionado" />
                            {/* <Button className='mr-3' severity="success" outlined  rounded  onClick={selecAplicante}>Seleccionar Aplicante</Button> */}
                            <Button severity="secondary" outlined rounded  onClick={PdfGeneratorButton}>Generar PDF</Button>
                            {Usuario()}
                    </>
                )
            }else if(Seleccionado !=null && Seleccionado.Estado ==='Rechazado'){
                return(
                    <>
                            <Message className='mr-3' severity="error" text="Aplicante Rechazado" />
                            <Button severity="secondary" outlined rounded  onClick={PdfGeneratorButton}>Generar PDF</Button>
                            {Usuario()}
                    </>
                )
            }else{
                return(
                    <>
                            <Button className='mr-3' severity="success" outlined  rounded  onClick={selecAplicante}>Seleccionar Aplicante</Button>
                            <Button severity="secondary" outlined rounded  onClick={PdfGeneratorButton}>Generar PDF</Button>
                            {Usuario()}
                    </>
                )
            }
    }

    const headerSuscriptor=()=>
    (
            <div>
                <div><h2>{Nombre} {Apellidos}</h2></div>
                <div><h5>{Email}</h5></div>
            </div>
    );


  return (
    <Layout pagina='Detalles Aplicante'>
    <div className="mb-8">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" 
                    //left={leftToolbarTemplate} 
                    left={headerSuscriptor} 
                    right={leftToolbarTemplate}
                    ></Toolbar>
            <Accordion multiple activeIndex={[0,1]}>
                <AccordionTab header="Imagen Perfil">
                 <ImagenPerf IdSuscripcion={IdSuscripcion}/> 
                </AccordionTab>
                <AccordionTab header="Documentos">
                 <PdfViewer IdSuscripcion={IdSuscripcion}/> 
                </AccordionTab>
                <AccordionTab header="Puesto Solicitado">
                {Apli()}
                </AccordionTab>
                <AccordionTab header="Información perfil">
                <Perfil data={data}/>
                </AccordionTab>
                <AccordionTab header="Experiencia Laboral">
                    {ExpLab()}
                </AccordionTab>
                <AccordionTab header="Educación">
                    {Educ()}
                </AccordionTab>
                <AccordionTab header="Formación Complementaria">
                    {FromCo()}
                </AccordionTab>
                <AccordionTab header="Idioma">
                   {Idiom()}
                </AccordionTab>
                <AccordionTab header="Referencias personales">
                   {RefPer()}
                </AccordionTab>
                <AccordionTab header="Referencias laborales">
                   {RefLa()}
                </AccordionTab>
            </Accordion>
        </div>



        <Dialog visible={deleteSuscripcionDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSuscripcionDialogFooter} onHide={hideDeleteSuscripcionDialog}>
            <div className="flex align-items-center justify-content-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {perfil && (
                    <span>
                        Esta Seguro de Seleccionar al Aplicante: <b>{perfil.Nombre}</b> <b>{perfil.Apellidos}</b>?
                    </span>
                )}
            </div>
        </Dialog>

        </Layout>
  )
}

export async function getServerSideProps({ query }) {
    const { index, Vacante } = query;
  
    const url = `${Url}InformePerfil/${index}`;
  
    const res = await fetch(url);
    const data = await res.json();
  
    return {
      props: {
        data,
        Vacante
      }
    };
  }
  
export default Detalle