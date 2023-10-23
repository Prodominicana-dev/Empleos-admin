
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import  Axios  from 'axios';
//...........
import {Url} from '../components/Url/URL';


const LoginPage = (data) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorr, setIcorr] = useState(null)
    const [ValidEmail, setValidEmail] = useState(null)
    const [ValidPass, setValidPass] = useState(null)
    
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled':'filled' });





    const login = async()=>{
  
        if(email==''||password==''){
            if(email==''){
                setValidEmail('Este campo es requerido')
            }
            if(password==''){
                setValidPass('Este campo es requerido')
            }
            
            return;
        }

        try{
            const response = await Axios.post(`${Url}loginUsuario`,{
                    Correo:email,
                    password:password
            });

            if (response.status === 200) {
              
                const response1 = await Axios.post("/api/auth/login",response.data)
               
                router.push('/Inicio');

            }
           
        }catch (error){

            console.error('Error al realizar la solicitud:', error);
            setIcorr('Correo electrónico o contraseña incorrecta')
        } 
    }

    return (
        // <Layout pagina='Login'>
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                {/* <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" /> */}
                {/* <img src={`https://prodominicana.gob.do/Imagenes/PD-Logo-RGB-CEI%20Icon.png`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" /> */}
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-2">
                          
                            <span className="text-600 font-medium">Iniciar sesión</span>
                           
                        </div>
                          <div className='text-center'>
                          <span className="" style={{color:'#ED265E'}}>{incorr}</span>
                          </div>
                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2 control-label required">
                              Correo electrónico
                            </label>
                            <InputText inputid="email1" type="text" required placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full md:w-30rem mb-2" style={{ padding: '1rem' }} />
                             <div  className='mt-1 text-right' style={{color:'#ED265E'}}>{ValidEmail}</div>
                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2 control-label required">
                              Contraseña
                            </label>
                            <Password inputid="password1" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" toggleMask className="w-full mb-2" inputClassName="w-full p-3 md:w-30rem"></Password>
                            <div  className='mt-1 text-right' style={{color:'#ED265E'}}>{ValidPass}</div>
                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                              
                                
                            </div>
                            <Button label="Entrar" className="w-full p-3 text-xl" onClick={login}></Button>
                            <hr className='mt-3'/>
                            <div className='mt-1 text-right'>
                            {/* <Link  
                                 className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}
                                
                                 href='/registro'>
                                    Registrarme
                            </Link> */}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </Layout>
    );
};

// export async function getServerSideProps({query:{index}}){
   
//     const url = `http://localhost:3001/Vacantes/${index}`;
   
  
//     const res = await fetch(url)
//     const data = await res.json()
  
//       return{
//         props:{
//           data
//         }
//       }
    
//     }


export default LoginPage;






























