import React,{useEffect,useState,useRef} from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import Layout from 'component/components/Layout';
import axios from 'axios';
import { Toolbar } from 'primereact/toolbar';
import Link from "next/link";
import Perfil from '../../components/detalleApli/perfil'
import Educacion from '../../components/detalleApli/educacion'
import Formacion from '../../components/detalleApli/formacion'
import Language from '../../components/detalleApli/idioma'
import PersonalReferences from '../../components/detalleApli/referenciaPersonales'
import ProfessionalReferences from '../../components/detalleApli/referenciaLaborales'
import JobOpening from '../../components/detalleApli/jobOpening'
import WorkExperience from '../../components/detalleApli/experienciaLaboral';
import { Button } from 'primereact/button';
import PdfViewer from '../../components/showPdf/PdfViewer';
import MostrarImg from '../../components/ShowImg/ImgViewer'
// import ImagenPerf from '../../components/Imagen/imagerPerf';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';
//.........................
import { obtenerPeriodo,obtenerPuestoSolisitado,obtenerPuestoSolisitadoRechazador,EnviaremailRechazados } from '../../components/correo/Periodo';
//........................
import {Url} from '../../components/Url/URL';
//.........................
// import styles from '../../styles/DetalleAplicante.module.css'
//.........................
import { useRouter } from 'next/router';
//...........................
//import { parseISO, format } from 'date-fns';
const Detalle = ({data,Vacante}) => {

    //const [imagen, setImagen] = useState([])
    const [perfil, setPerfil] = useState([])
    // const [exLab, setExLab] = useState([])
    // const [educacion, setEducacion] = useState([])
    // const [FormCom, setFormCom] = useState([])
    // const [Idioma, setIdioma] = useState([])
    // const [RePer, setRePer] = useState([])
    // const [RefLab, setRefLab] = useState([])
    const [dialog, setDialog] = useState(false);
    // const [aplica, setAplica] = useState([])
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
   

   const{idSubscription,name,lastName,email }=data[0];



    // let Data={perfil,RefLab,RePer,Idioma,exLab,educacion,FormCom,aplica,imagen};
      
    // const PdfGeneratorButton= async()=>{
     
    //     //  axios.post(`/api/PDF/CuriiPdf`,data.data).then((response)=>{
          
    //     try {
    //         const response = await axios.post(Url+'CrearPdf',Data,{
    //             responseType: 'blob',
    //         });
    //         // Maneja la respuesta, puede ser una descarga directa o un enlace de descarga
          

    //         // Crear URL del blob para descargar el archivo
    //         const url = URL.createObjectURL(new Blob([response.data]));

    //         // Crear un enlace temporal y hacer clic en él para iniciar la descarga
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = `${perfil.Nombre} ${Apellidos} (Perfil).pdf`;
    //         link.click();

    //         // Liberar el objeto URL después de la descarga
    //         URL.revokeObjectURL(url);
    //       } catch (error) {
    //         console.error('Error al generar el PDF:', error);
    //       }
    // }
    
    useEffect(() => {
    
        axios.get(`${Url}PuestoSolicitado/${idSubscription}`).then((response)=>{

            console.log(idSubscription)
            console.log(Vacante)
            if(response.data!=undefined){
                const Data=response.data.filter((Item) => Item.idSubscription == idSubscription && Item.idJobOpening == Vacante && Item.Estado !='None');
                console.log('jojo',Data.slice(-1))
            setSeleccionado(Data.slice(-1)[0])
            }
    });
    }, []);

    
    const confirmacionAplicante = async()=>{
         const recargar= async()=>{
            setTimeout(() => {
                window.location.reload();
              }, 4000);
         }

        const obtenerInformacion = async (idJobOpening,idSubscription) => {
        
            const periodo = await obtenerPeriodo(idJobOpening);
            const PuestoSolisitado = await obtenerPuestoSolisitado(idJobOpening,idSubscription);
            const PuestoRechazados = await  obtenerPuestoSolisitadoRechazador(idJobOpening);

            let aplicanteAcep = {
                idSubscription:idSubscription,
                idJobOpening:Number(idJobOpening),
                status:'Aceptado'
            }

            if(periodo.registrationDate < PuestoSolisitado.registrationDate){

                await axios.put(`${Url}updatePositionAppliedFor/${PuestoSolisitado.id}`, aplicanteAcep).then(res=>{
                    setDialog(false);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Aplicante Aceptado', life: 9000 });
                }).catch(error=>{
                  console.log(error.message);
                })
            
            }

            PuestoRechazados.map(async(rechazados,indice)=>{

                if(indice < PuestoRechazados.length - 1){
                if(periodo.registrationDate < rechazados.registrationDate){
                    if(rechazados.id != PuestoSolisitado.id){

                        let aplicanteRech = {
                            idSubscription:rechazados.idSubscription,
                            idJobOpening:rechazados.idJobOpening,
                            status:'Rechazado'
                        }

                        await axios.put(`${Url}updatePositionAppliedFor/${rechazados.id}`, aplicanteRech).then(res=>{

                        }).catch(error=>{
                          console.log(error.message);
                        })
                    }
                }
            }else{
                if(periodo.registrationDate < rechazados.registrationDate){
                    if(rechazados.id != PuestoSolisitado.id){

                        let aplicanteRech = {
                            idSubscription:rechazados.idSubscription,
                            idJobOpening:rechazados.idJobOpening,
                            status:'Rechazado'
                        }

                        await axios.put(`${Url}updatePositionAppliedFor/${rechazados.Id}`, aplicanteRech).then(res=>{
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
                if(periodo.registrationDate < rechazados.registrationDate){
                    if(rechazados.id != PuestoSolisitado.id){
                         
                        let email = await EnviaremailRechazados(rechazados.idSubscription);

                        await axios.post(`${Url}Correo`,email ).then(res=>{

                        }).catch(error=>{
                          console.log(error.message);
                        })
                    }
                }
            }else{
                if(periodo.registrationDate < rechazados.registrationDate){
                    if(rechazados.id != PuestoSolisitado.id){
                         
                        let email = await EnviaremailRechazados(rechazados.idSubscription);

                        await axios.post(`${Url}Correo`,email ).then(res=>{
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
          
          
          
          obtenerInformacion(Vacante,idSubscription);

          console.log(Vacante,idSubscription)

       
    }
//..............................................................
const rechazarAplicante = async()=>{
    const recargar= async()=>{
       setTimeout(() => {
           window.location.reload();
         }, 4000);
    }
const obtenerInformacion = async (idJobOpening,idSubscription) => {
        
    const periodo = await obtenerPeriodo(idJobOpening);
    const PuestoSolisitado = await obtenerPuestoSolisitado(idJobOpening,idSubscription);
    const PuestoRechazados = await  obtenerPuestoSolisitadoRechazador(idJobOpening);

    let aplicanteAcep = {
        idSubscription:idSubscription,
        idJobOpening:Number(idJobOpening),
        status:'Rechazado'
    }

    if(periodo.registrationDate < PuestoSolisitado.registrationDate){

        await axios.put(`${Url}updatePositionAppliedFor/${PuestoSolisitado.id}`, aplicanteAcep).then(res=>{
            setDialog(false);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Aplicante Aceptado', life: 9000 });
        }).catch(error=>{
          console.log(error.message);
        })
    
    }

    // PuestoRechazados.map(async(rechazados,indice)=>{

    //     if(indice < PuestoRechazados.length - 1){
    //     if(periodo.registrationDate < rechazados.registrationDate){
    //         if(rechazados.id != PuestoSolisitado.id){

    //             let aplicanteRech = {
    //                 idSubscription:rechazados.idSubscription,
    //                 idJobOpening:rechazados.idJobOpening,
    //                 status:'Rechazado'
    //             }

    //             await axios.put(`${Url}PuestoSolicitado/${rechazados.id}`, aplicanteRech).then(res=>{

    //             }).catch(error=>{
    //               console.log(error.message);
    //             })
    //         }
    //     }
    // }else{
    //     if(periodo.registrationDate < rechazados.registrationDate){
    //         if(rechazados.id != PuestoSolisitado.id){

    //             let aplicanteRech = {
    //                 idSubscription:rechazados.idSubscription,
    //                 idJobOpening:rechazados.idJobOpening,
    //                 status:'Rechazado'
    //             }

    //             await axios.put(`${Url}PuestoSolicitado/${rechazados.Id}`, aplicanteRech).then(res=>{
    //                 toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Los demás aplicantes han sido rechazados', life: 9000 });
    //             }).catch(error=>{
    //               console.log(error.message);
    //             })
    //         }
    //     }
    // }
    // })
  
    

        
    
        if(periodo.registrationDate < rechazados.registrationDate){
            
                 
                let email = await EnviaremailRechazados(aplicanteAcep.idSubscription);

                await axios.post(`${Url}Correo`,email ).then(res=>{
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Correos enviados a rechazados', life: 9000 });
                }).catch(error=>{
                  console.log(error.message);
                })
            
        }
     

   await recargar();

  };
  
  
  
  obtenerInformacion(Vacante,idSubscription);

  console.log(Vacante,idSubscription)
}
//............................................................
const aceptarAplicante = async()=>{
    const recargar= async()=>{
       setTimeout(() => {
           window.location.reload();
         }, 4000);
    }
const obtenerInformacion = async (idJobOpening,idSubscription) => {
        
    const periodo = await obtenerPeriodo(idJobOpening);
    const PuestoSolisitado = await obtenerPuestoSolisitado(idJobOpening,idSubscription);
    // const PuestoRechazados = await  obtenerPuestoSolisitadoRechazador(idJobOpening);

    let aplicanteAcep = {
        idSubscription:idSubscription,
        idJobOpening:Number(idJobOpening),
        status:'Aceptado',
        registrationDate:PuestoSolisitado.registrationDate
    }

    if(periodo.registrationDate < PuestoSolisitado.registrationDate){

        await axios.put(`${Url}updatePositionAppliedFor/${PuestoSolisitado.id}`,aplicanteAcep).then(res=>{
            console.log(res)
            setDialog(false);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Aplicante Aceptado', life: 9000 });
        }).catch(error=>{
          console.log('Error al actualizar el estado ',error);
        })
    
    }

    
  
    // PuestoRechazados.map(async(rechazados,indice)=>{

    //     if(indice < PuestoRechazados.length - 1){
    //     if(periodo.registrationDate < rechazados.registrationDate){
    //         if(rechazados.id != PuestoSolisitado.id){
                 
    //             let email = await EnviarCorreoRechazados(rechazados.idSubscription);

    //             await axios.post(`${Url}Correo`,email ).then(res=>{

    //             }).catch(error=>{
    //               console.log(error.message);
    //             })
    //         }
    //     }
    // }else{
    //     if(periodo.registrationDate < rechazados.registrationDate){
    //         if(rechazados.id != PuestoSolisitado.id){
                 
    //             let email = await EnviarCorreoRechazados(rechazados.idSubscription);

    //             await axios.post(`${Url}Correo`,email ).then(res=>{
    //                 toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Correos enviados a rechazados', life: 9000 });
    //             }).catch(error=>{
    //               console.log(error.message);
    //             })
    //         }
    //     }
    // }
    // })  

    await recargar();

  };
  
  
  
  obtenerInformacion(Vacante,idSubscription);

  console.log(Vacante,idSubscription)
}
//............................................................
    const hideDialog = () => {
        setDialog(false);
    };

    const DialogFooter = (
        <>
            
            <Button label="Seleccionar Aplicante" icon="pi pi-check" text 
            onClick={aceptarAplicante} 
            />
            {/* <Button label="Rechazar Aplicante" icon="pi pi-check" text 
            onClick={rechazarAplicante} 
            /> */}
            <Button label="Seleccionar y rechazar a los demás" icon="pi pi-check pi-times" text 
            onClick={confirmacionAplicante} 
            />
             
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
           
        </>
    );
 
    const selecAplicante=()=>{
        setDialog(true);
    }

    const leftToolbarTemplate=()=>{
             console.log(Seleccionado)
            if(Seleccionado !=null && Seleccionado.status ==='Aceptado'){
                return(
                    <>
                            <Message className='mr-3' severity="success" text="Aplicante Seleccionado" />
                            {/* <Button className='mr-3' severity="success" outlined  rounded  onClick={selecAplicante}>Seleccionar Aplicante</Button> */}
                            {/* <Button severity="secondary" outlined rounded  onClick={PdfGeneratorButton}>Generar PDF</Button> */}
                            {Usuario()}
                    </>
                )
            }else if(Seleccionado !=null && Seleccionado.status ==='Rechazado'){
                return(
                    <>
                            <Message className='mr-3' severity="error" text="Aplicante Rechazado" />
                            {/* <Button severity="secondary" outlined rounded  onClick={PdfGeneratorButton}>Generar PDF</Button> */}
                            {Usuario()}
                    </>
                )
            }else{
                return(
                    <>
                            <Button className='mr-3' severity="success" outlined  rounded  onClick={selecAplicante}>Seleccionar Aplicante</Button>
                            {/* <Button severity="secondary" outlined rounded  onClick={PdfGeneratorButton}>Generar PDF</Button> */}
                            {Usuario()}
                    </>
                )
            }
    }

    const headerSuscriptor=()=>
    (
            <div>
                <div><h2>{name} {lastName}</h2></div>
                <div><h5>{email}</h5></div>
            </div>
    );
    //............................................................
    const estiloDiv ={
        backgroundColor: '#f0f0f0',
        padding: '10px', /* Agrega un relleno al contenido dentro del div */
        borderRadius: '5px',
        width: 'auto'
      }
   //...................................................
    const backButton=()=>{
        return(
            <>
            <div className="d-flex justify-content-end">
                    <Link href={Seleccionado !=null && Seleccionado.status ==='Aceptado'?  `/EstadoAplicante/`:`/aplicantes/${Vacante}`}>
    
                        <Button className='mb-2 p-button-rounded'  icon="pi pi-arrow-left" severity="warning" type='button' style={estiloDiv}></Button>
    
                    </Link>
                </div>
            </>
        )
    }

  return (
    <Layout pagina='Detalles Aplicante'>
    <div className="mb-8">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" 
                    //left={leftToolbarTemplate} 
                    left={backButton} 
                    right={leftToolbarTemplate}
                    ></Toolbar>
                    <Toolbar className="mb-4" 
                    //left={leftToolbarTemplate} 
                    left={headerSuscriptor} 
                    // right={leftToolbarTemplate}
                    ></Toolbar>
            <Accordion multiple activeIndex={[0,1]}>
                <AccordionTab header="Imagen Perfil">
                 <MostrarImg idSubscription={idSubscription}/> 
                </AccordionTab>
                <AccordionTab header="Documentos">
                 <PdfViewer idSubscription={idSubscription}/> 
                </AccordionTab>
                <AccordionTab header="Puesto Solicitado">
                <JobOpening data={Vacante}/>
                {/* {Apli()} */}
                </AccordionTab>
                <AccordionTab header="Información perfil">
                <Perfil data={data}/>
                </AccordionTab>
                <AccordionTab header="Experiencia Laboral">
                <WorkExperience data={data}/>
                    {/* {ExpLab()} */}
                </AccordionTab>

                <AccordionTab header="Educación">
                <Educacion data={data}/>
                    {/* {Educ()} */}
                </AccordionTab>

                <AccordionTab header="Formación Complementaria">
                <Formacion data={data}/>
                    {/* {FromCo()} */}
                </AccordionTab>

                <AccordionTab header="Idioma">
                <Language data={data}/>
                   {/* {Idiom()} */}
                </AccordionTab>

                <AccordionTab header="Referencias personales">
                <PersonalReferences data={data}/>
                   {/* {RefPer()} */}
                </AccordionTab>

                <AccordionTab header="Referencias laborales">
                <ProfessionalReferences data={data}/>
                   {/* {RefLa()} */}
                </AccordionTab>

            </Accordion>
        </div>



        <Dialog visible={dialog} style={{ width: '450px' }} header="Confirm" modal footer={DialogFooter} onHide={hideDialog}>
            <div className="flex align-items-center justify-content-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {perfil && (
                    <span>
                        Está  Seguro de Seleccionar al Aplicante: <b>{perfil.name}</b> <b>{perfil.lastName}</b>?
                    </span>
                )}
            </div>
        </Dialog>

        </Layout>
  )
}

export async function getServerSideProps({ query }) {

    const { index, Vacante } = query;
    const url = `${Url}Profile/${index}`;
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