import Link from 'next/link'
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
//import api from '../pages/api/profile'
const Menu = () => {
    const [enlaceActivo, setEnlaceActivo] = useState('');

   
    const router = useRouter();
    const [user, setUser] = useState({
        Id:'',email:'',username:''
     })

    useEffect(() => {

        axios.get('/api/profile').then((response)=>{
            if(response.data != undefined&&response.data.error!='token invalido'){
                console.log(response.data)
                setUser(response.data)  
            }else{
                router.push('/');
            } 
    });
    }, []);
//console.log(user.username)

   const registrarUsuario =()=>{
    if(user.email ==='Admin@Email.com')
        { 
            return(
            <li className="">
                <a href="/Registro">
                    <i className='bx bx-body icon' ></i>
                    <span className="text nav-text">Registrar Usuario</span>
                </a>
            </li>
        )  
        }else{
            return(
                
                <></>
            )  
        }
   }


   const logout= async()=>{
    const response = await axios.post('/api/auth/logout')
   
      router.push('/');
    
  }

  const handleEnlaceClick = (enlace) => {
    setEnlaceActivo(enlace);
  };
  const enlaces = [
    { ruta: '/Inicio', icono: 'bx bx-home-alt', texto: 'Inicio' },
    { ruta: '/Categoria', icono: 'bx bx-list-ul', texto: 'Categoría' },
    { ruta: '/Vacantes', icono: 'bx bx-bookmark', texto: 'Vacantes' },
    { ruta: '/EstadoAplicante', icono: 'bx bxs-user-check', texto: 'Estado Aplicantes' },
    // Agrega más enlaces según sea necesario
  ];
  return (
    <div className="menu-bar">
        <style>
            {`.nav-link.active {
                background-color: #2196F3; 
                }
                `}
        </style>
        <div className="menu">
        {enlaces.map((enlace) => (
          <li key={enlace.ruta} className={`nav-link ${router.pathname === enlace.ruta ? 'active' : ''}`}>
            <Link href={enlace.ruta}>
              
                <i className={`icon ${enlace.icono}`}></i>

                <span className="text nav-text">{enlace.texto}</span>
              
            </Link>
          </li>
        ))}
      </div>
            <div className="bottom-content">
                {registrarUsuario()}
                <li className="">
                    <a href="#">
                        <i className='bx bx-log-out icon' ></i>
                        <span className="text nav-text" onClick={()=>logout()}>Cerrar Sesión</span>
                    </a>
                </li>
               
           </div>
        </div>
  )
}

export default Menu