import Link from 'next/link'
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
//import api from '../pages/api/profile'
const Menu = () => {

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
    if(user.email ==='flormercedes@prodominicana.gob.do'||'johannapimentel@prodominicana.gob.do')
        { return(
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

  return (
    <div className="menu-bar">
            <div className="menu">
                    {/* <li className="search-box">
                    <i className='bx bx-search icon'></i>
                        <input type="text" placeholder="Search..."/>
                    </li> */}
                {/* <ul className="menu-links"> */}
                    <li className="nav-link">
                        <Link href="/Inicio">
                        <i className='bx bx-home-alt icon' ></i>
                        <span className="text nav-text">Inicio</span>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link href="/Categoria">
                        <i className='bx bx-list-ul icon'></i>
                        {/* <i className='bx bx-wallet icon' ></i> */}
                        <span className="text nav-text">Categoría</span>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link href="/Vacantes">
                        {/* <i className='bx bx-pie-chart-alt icon' ></i> */}
                        <i className='bx bx-bookmark icon'></i>
                        {/* <i class='bx bx-list-plus  icon' ></i> */}
                        <span className="text nav-text">Vacantes</span>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link href="/Registrados">
                        {/* <i className='bx bx-heart icon' ></i> */}
                        {/* <i class='bx bxs-color icon'></i> */}
                        <i className='bx bxs-user-plus icon'></i>
                        {/* <i class='bx bx-list-ol icon' ></i> */}
                        <span className="text nav-text">Registrados</span>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link href="/EstadoAplicante">
                        {/* <i className='bx bx-pie-chart-alt icon' ></i> */}
                        <i className='bx bxs-user-check icon'></i>
                        {/* <i class='bx bx-list-plus  icon' ></i> */}
                        <span className="text nav-text">Estado Aplicantes</span>
                        </Link>
                    </li>
                     <li className="nav-link">
                        <Link href="/Periodo">
                        {/* <i className='bx bx-pie-chart-alt icon' ></i> */}
                        <i className='bx bx-time-five icon' ></i>
                        {/* <i class='bx bx-list-plus  icon' ></i> */}
                        <span className="text nav-text">Periodos</span>
                        </Link>
                    </li>
                   
                   
                  
                    
                {/* </ul> */}
            </div>
            <div className="bottom-content">
                {registrarUsuario()}
                <li className="">
                    <a href="#">
                        <i className='bx bx-log-out icon' ></i>
                        <span className="text nav-text" onClick={()=>logout()}>Cerrar Sesión</span>
                    </a>
                </li>
                {/* <li className="mode">
                    <div className="moon-sun">
                        <i className='bx bx-moon icon moon' ></i>
                        <i className='bx bx-sun icon sun' ></i>
                    </div>
                    <span className="mode-text text">Dark Mode</span>

                    <div className="toggle-switch">
                        <span className="switch"></span>
                    </div>
                </li> */}
           </div>
        </div>
  )
}

export default Menu