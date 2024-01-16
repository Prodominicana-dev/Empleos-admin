
import {Url} from '../../components/Url/URL';
import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';

import { Button } from 'primereact/button';
import  Axios  from 'axios';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import Layout from 'component/components/Layout';
import {PostPutAssessment} from '../../components/PostPut/PostPerfil'
import {PostPutLanguage} from '../../components/PostPut/PostPerfil'
import {DeleteLanguage} from '../../components/PostPut/PostPerfil'
import {PostPutKnowledge} from '../../components/PostPut/PostPerfil'
import {DeleteKnowledge} from '../../components/PostPut/PostPerfil'
import {PostPutProfileParticulars} from '../../components/PostPut/PostPerfil'
import {DeleteProfileParticulars} from '../../components/PostPut/PostPerfil'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


//import ProfileParticulars from '../../components/componetAssessment/ProfileParticulars'
import KnowledgeAssessment from '../../components/componetAssessment/Knowledge'
import PerfilAssessment from '../../components/componetAssessment/perfilAssessment'
import LanguageAssesment from '../../components/componetAssessment/languageAssessment/languageAssessment';
const Assessment=({data})=>{

    let datosAssessment={

        idJobOpening:'0',
        sex:'',
        edad:'',
        workExperience:'',
        education:''
        }

//...................................
    const [Assessment,setAssessment]=useState(datosAssessment);
    const [errorAss, setErrorAss] = useState({});
    const [elimLanguage, setElimLanguage] = useState([]);
    const [language, setLanguage] = useState([]);
    const [elimKnowledge, setElimKnowledge] = useState([]);
    const [Knowledge, setKnowledge] = useState([]);
    const [elimProfileParticulars, setElimProfileParticulars] = useState([]);
    const [profileParticulars, setProfileParticulars] = useState([]);
    const [ErrorLanguage, setErrorLanguage] = useState({});
    const [ErrorKnowledge, setErrorKnowledge] = useState({});
    const [ErrorprofileParticulars, setErrorprofileParticulars] = useState({});
    
//...................................
    const toast = useRef(null);
//...............................

    const [user, setUser] = useState({
        Id:'',email:'',username:''
     })
     const router = useRouter();


     const {id,name}=data
    
    useEffect(() => {
    
        Axios.get('/api/profile').then((response)=>{
            if(response.data != undefined){
                setUser(response.data)  
            }else{
                router.push('/');
            }
           
    });
    }, []);
// validate.........................................
    const validateLanguage = (arr) => {
        const newError = [];
        
        arr.forEach((item, index) => {
          const itemErrors = {}; // Objeto para almacenar errores específicos del elemento
      
          for (const key in item) {
            if (!item[key]) {
              itemErrors[key] = 'Por favor, selecciona una opción.';
            }
          }
      
          newError[index] = itemErrors; // Agregar los errores del elemento al array de errores
        });
      
        setErrorLanguage(newError); // Actualizar el estado de errores
      };

      const validateKnowledge = (arr) => {
        const newError = [];
        
        arr.forEach((item, index) => {
          const itemErrors = {}; // Objeto para almacenar errores específicos del elemento
      
          for (const key in item) {
            if (!item[key]) {
              itemErrors[key] = 'Por favor, selecciona una opción.';
            }
          }
      
          newError[index] = itemErrors; // Agregar los errores del elemento al array de errores
        });
      
        setErrorKnowledge(newError); // Actualizar el estado de errores
      };

      const validateprofileParticulars = (arr) => {
        const newError = [];
        
        arr.forEach((item, index) => {
          const itemErrors = {}; // Objeto para almacenar errores específicos del elemento
      
          for (const key in item) {
            if (!item[key]) {
              itemErrors[key] = 'Por favor, selecciona una opción.';
            }
          }
      
          newError[index] = itemErrors; // Agregar los errores del elemento al array de errores
        });
      
        setErrorprofileParticulars(newError); // Actualizar el estado de errores
      };
//................................................
const actializarPage=()=>{
    setAssessment(Assessment);
    setLanguage(language)
    setKnowledge(Knowledge)
    setProfileParticulars(profileParticulars)
}
//................................................
const handleSubmit = async(event)=>{
    event.preventDefault();


    Assessment.idJobOpening = id;
    let Data =[...language.concat(Knowledge).concat(profileParticulars),Assessment]
    const algunCampoVacio = Data.some(objeto => {
        return Object.values(objeto).some(value => value === '');
      });
     
if(algunCampoVacio){

            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Campo requerido por llenar', life: 6000 })

            //Validacion Select.........................
            const newError = {};
                      
            for (const name in Assessment) {
              if (!Assessment[name]) {
                newError[name] = 'Por favor, selecciona una opción.';
                setErrorAss(newError);
                // return;
              }
            }  

           
           
            validateKnowledge(Knowledge);
            validateprofileParticulars(profileParticulars);
            validateLanguage(language);
                
    }
    else
    {
        

          PostPutLanguage(language);
          DeleteLanguage(elimLanguage);
          PostPutKnowledge(Knowledge);
          DeleteKnowledge(elimKnowledge);
          PostPutProfileParticulars(profileParticulars);
          DeleteProfileParticulars(elimProfileParticulars);
          PostPutAssessment(Assessment);

          actializarPage();

          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Evaluación para la vacante: Desarrollador. Fue guardada', life: 8000 });
          router.push(`/assessment/${id}`);
    }
}
//Language....................
useEffect(() => {
    const obtenerlanguage = async () => {
      try {
        const response = await Axios.get(`${Url}LanguageAssessment/${id}`);
        console.log(response.data)
        setLanguage(response.data);
      } catch (error) {
        console.error('Error al obtener Language Assessment:', error);
      }
    };

    obtenerlanguage();
  }, []);


const eliminarLanguage = (event,index) => {
    event.preventDefault();
    const nuevosLanguage = [...language];
    nuevosLanguage.splice(index, 1);
    setLanguage(nuevosLanguage);
  };
  
  const elimiLanguage=(event, index)=>{
    event.preventDefault();
    
    const eliminarLanguage = language[index];
  
    let eliminaridio = [...elimLanguage];
  
    eliminaridio.push(eliminarLanguage);
    
    setElimLanguage(eliminaridio);
  }
  
  const agregarFormLanguage = (event) => {
    event.preventDefault()
    setLanguage((prevLanguage) =>[...prevLanguage, {
      
        idJobOpening: Assessment.idJobOpening || id,
        language:'',
        answerLan:''
    }]);
  };
//...............................................
//Knowledge....................
useEffect(() => {
    const obtenerKnowledge = async () => {
      try {
        const response = await Axios.get(`${Url}KnowledgeAssessment/${id}`);
        console.log(response.data)
        setKnowledge(response.data);
      } catch (error) {
        console.error('Error al obtener Knowledge Assessment:', error);
      }
    };

    obtenerKnowledge();
  }, []);


const eliminarKnowledge = (event,index) => {
    event.preventDefault();
    const nuevosKnowledge = [...Knowledge];
    nuevosKnowledge.splice(index, 1);
    setKnowledge(nuevosKnowledge);
  };
  
  const elimiKnowledge=(event, index)=>{
    event.preventDefault();
    
    const eliminarKnowledge = Knowledge[index];
  
    let eliminaridio = [...elimKnowledge];
  
    eliminaridio.push(eliminarKnowledge);
    
    setElimKnowledge(eliminaridio);
  }
  
  const agregarFormKnowledge = (event) => {
    event.preventDefault()
    setKnowledge((prevKnowledge) =>[...prevKnowledge, {
      
        idJobOpening: Assessment.idJobOpening || id,
        knowledge:'',
        answerKnow:''
    }]);
  };

  //Knowledge....................
useEffect(() => {
    const obtenerProfileParticulars = async () => {
      try {
        const response = await Axios.get(`${Url}ProfileParticulars/${id}`);
        console.log(response.data)
        setProfileParticulars(response.data);
      } catch (error) {
        console.error('Error al obtener Profile Particulars:', error);
      }
    };

    obtenerProfileParticulars();
  }, []);


const eliminarProfileParticulars = (event,index) => {
    event.preventDefault();
    const nuevosProfileParticulars = [...profileParticulars];
    nuevosProfileParticulars.splice(index, 1);
    setProfileParticulars(nuevosProfileParticulars);
  };
  
  const elimiProfileParticulars=(event, index)=>{
    event.preventDefault();
    
    const eliminarProfileParticulars = profileParticulars[index];
  
    let eliminaridio = [...elimProfileParticulars];
  
    eliminaridio.push(eliminarProfileParticulars);
    
    setElimProfileParticulars(eliminaridio);
  }
  
  const agregarFormProfileParticulars = (event) => {
    event.preventDefault()
    setProfileParticulars((prevProfileParticulars) =>[...prevProfileParticulars, {
      
        idJobOpening: Assessment.idJobOpening || id,
        ask :'',
        answerProf:''
    }]);
  };
//...............................................
    const Usuario=()=>{

        if(user.Id!=null){
        return(
            <h1 className="text-3xl font-bold text-gray-900 line-height-2">
                                
                <span className="font-light block">{user.username}</span>Estás al Mando.
            </h1>
        )
    }
}

const leftToolbarTemplate = () => {
    return (
     
            <div className="text-3xl font-bold text-gray-900 line-height-2">
                Evaluación de la Vacante: <span className="font-light block">{name}</span>
              
            </div>
       
    );
};


const backButton=()=>{
    return(
        <>
        <div className="d-flex justify-content-end">
                <Link href={`/Vacantes`}>

                    <Button className='mb-2 p-button-rounded'  icon="pi pi-arrow-left" severity="warning" type='button' style={{ backgroundColor: 'yellow' }}></Button>

                </Link>
            </div>
        </>
    )
}



    return(
        <Layout pagina='Assessment'>
            <Toast ref={toast} />
                    <Toolbar className="mb-4" 
                    left={backButton}
                    right={Usuario}
                    ></Toolbar>

                    <Toolbar className="mb-4" 
                    left={leftToolbarTemplate} 
                    ></Toolbar>
          <Form 
            // noValidate validated={validated} 
          >


            <div>
                <PerfilAssessment Assessment={Assessment} setAssessment={setAssessment} error={errorAss} setError={setErrorAss} id={id} />
            </div>
            
            <hr/>
             <div>Idiomas:</div>
            <div className='mt-3 card'>
                <div className='container'>
                { language.map((languages, index) => (
                    
                    <LanguageAssesment key={index} Languages={languages} elimLanguage={elimLanguage}  elimiLanguage={elimiLanguage} eliminarLanguage={eliminarLanguage} index={index}  error={ErrorLanguage} setError={setErrorLanguage} setLanguage={setLanguage} />
            
                        
                    ))}
                    <div className='mb-2'>
                        <a href="#"  className="btn btn-primary rounded-circle" onClick={agregarFormLanguage}><FontAwesomeIcon icon={faPlus} /></a>
                    </div>

                    </div>
            </div>
             
            <hr/>
            <div>Conocimientos variados:</div>
            <div className='mt-3 card'>
                <div className='container'>
                { Knowledge.map((Knowledges, index) => (
                    
                    <KnowledgeAssessment key={index} Knowledges={Knowledges} elimKnowledge={elimKnowledge}  elimiKnowledge={elimiKnowledge} eliminarKnowledge={eliminarKnowledge} index={index}  error={ErrorKnowledge} setError={setErrorKnowledge} setKnowledge={setKnowledge} />

                        
                    ))}
                    <div className='mb-2'>
                        <a href="#"  className="btn btn-primary rounded-circle" onClick={agregarFormKnowledge}><FontAwesomeIcon icon={faPlus} /></a>
                    </div>

                </div>
            </div>

            {/* <hr/>
            <div>Particulares del perfil:</div>
            <div className='mt-3 card'>
                <div className='container'>
                { profileParticulars.map((profileParticulars, index) => (
                    
                    <ProfileParticulars key={index} ProfileParticulars={profileParticulars} elimProfileParticulars={elimProfileParticulars}  elimiProfileParticulars={elimiProfileParticulars} eliminarProfileParticulars={eliminarProfileParticulars} index={index}  error={ErrorprofileParticulars} setError={setErrorprofileParticulars} setProfileParticulars={setProfileParticulars} />

                        
                    ))}
                    <div className='mb-2'>
                        <a href="#"  className="btn btn-primary rounded-circle" onClick={agregarFormProfileParticulars}><FontAwesomeIcon icon={faPlus} /></a>
                    </div>

                </div>
            </div> */}





            <div className="d-flex justify-content-end mb-5">
                <Button className="mt-5 " label="Guardar" rounded text raised style={{height:'42px',width:'120px',fontSize:'19px'}} onClick={handleSubmit}></Button>
            </div>
         </Form>

        </Layout>
    )
}


export async function getServerSideProps({query:{index}}){
   
    const url = `${Url}JobOpening/${index}`;
   
  
    const res = await fetch(url)
    const data = await res.json()
  
    
    return{
      props:{
            data
      }
    }
  
  }
export default Assessment