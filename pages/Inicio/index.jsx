
import Layout from '../../components/Layout'
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {

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


const bienvenida=()=>{
    if(user.Id!=null){
    return(
        <>
        <h1 className="text-6xl font-bold text-gray-900 line-height-2">
                            
            <span className="font-light block">BIENVENIDO</span>{user.username}
        </h1>
        </>
    )
}
}


  return (
       <Layout pagina='Inicio'>
       
           {/* <h1 className="heading">Desde Inicio</h1> */}

           <div
                    id="hero"
                    className="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
                    style={{ background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%,  #1B75BC 0%, #D0E9F9 100%)', clipPath: 'ellipse(150% 87% at 93% 13%)' }}
                >
                    <div className="mx-4 md:mx-8 mt-0 md:mt-4">
    
                        {bienvenida()}
                       
                    </div>
                    <div className="flex justify-content-center md:justify-content-end">
                         <img src="https://img.freepik.com/foto-gratis/co-trabajando-personas-trabajando-juntas_23-2149328346.jpg" alt="personas Image" className="w-9 md:w-auto" />
                    </div>
            </div> 
            
            <div>

            {/* <Categorias /> */}

            </div>
       </Layout>
  )
}