//import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
//import AppConfig from '../../../layout/AppConfig';
//import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
//import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import  Axios  from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

//...........
import {Url} from '../../components/Url/URL';

const Registro = () => {

    let registro={
        NombreCompleto:'',
        Correo:'',
        // Movil:'',
        password:''
    }

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
   const [errNombre, setErrNombre] = useState(null);
   const [errEmail, setErrEmail] = useState(null);
   const [errPassword, setErrPassword] = useState(null);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(nombre==''||email==''||password==''){
            if(nombre==''){
                setErrNombre('Este campo es requerido');
            }
            if(email==''){
                setErrEmail('Este campo es requerido')
            }
            // if(movil==''){
            //     setErrMovil('Este campo es requerido')
            // }
            if(password==''){
                setErrPassword('Este campo es requerido')
            }

            return;
        }
        // Validar si las contraseñas coinciden
        if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden.');
          return;
        }
          // Validar la contraseña
        const regex = /^(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        const esValidaContrasena = regex.test(password);
         console.log(esValidaContrasena)
        if(!esValidaContrasena){
            setError('La contraseña debe tener al menos 6 caracteres y contener al menos un carácter especial.');
            return;
        }else{

        registro.NombreCompleto=nombre;
        registro.Correo=email;
        registro.password=password;
        console.log(registro)

          // Realizar la solicitud HTTP POST utilizando Axios
        
           await Axios.post(`${Url}Usuario`,registro).then(res=>{

           //toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Informacion Perfil Enviado', life: 3000 });
           
           console.log('Registro Enviado');

           router.push('/Inicio');

           }).catch (error=>{
                   console.error('Error al subir el registro', error);
                   setError('Ocurrió un error al registrar los datos',error);
           })
          // Manejar errores en caso de que la solicitud falle

    }

          
        }
    
 
   const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden'
    , { 'p-input-filled':'filled' }
);

    return (
        <Layout pagina='Registrar'>
        <div 
        // className={containerClassName}
        >
            <div className="flex flex-column align-items-center justify-content-center">
              
                {/* <img src={`https://prodominicana.gob.do/Imagenes/PD-Logo-RGB-CEI%20Icon.png`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" /> */}
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 100%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                           
                            <span className="text-600 font-medium">Registrar Usuario</span>
                            {/* {error && <Alert variant="danger">{error}</Alert>} */}
                        </div>

                        <div>
                        <label htmlFor="nombre" className="block text-900 text-xl font-medium mb-2 control-label required">
                                Nombre completo
                            </label>
                            <InputText inputid="nombre" type="text" placeholder="Nombre y Apellido" className="w-full md:w-30rem mb-3 " style={{ padding: '1rem' }} value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            <div  className='mt-1 text-right' style={{color:'#ED265E'}}>{errNombre}</div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2 control-label required">
                               Correo electrónico
                            </label>
                            <InputText inputid="email1" type="text" placeholder="Correo" className="w-full md:w-30rem mb-3 " style={{ padding: '1rem' }} value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <div  className='mt-1 text-right' style={{color:'#ED265E'}}>{errEmail}</div>
                            {/* <label htmlFor="movil" className="block text-900 text-xl font-medium mb-2">
                                Telefono movil
                            </label>
                            <InputText inputid="movil" type="text" placeholder="Movil" className="w-full md:w-30rem mb-3" style={{ padding: '1rem' }} value={movil}
                                       onChange={(e) => setMovil(e.target.value)}
                                       required />
                                <div  className='mt-1 text-right' style={{color:'#ED265E'}}>{errMovil}</div> */}
                            
                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2 control-label required">
                                Contraseña
                            </label>
                            <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Contraseña" toggleMask className="w-full mb-3" inputClassName="w-full p-3 md:w-30rem" ></Password>
                            
                            <div  className='mt-1 text-right' style={{color:'#ED265E'}}>{errPassword}</div>


                            <label htmlFor="Confpassword1" className="block text-900 font-medium text-xl mb-2">
                                Confirmar Contraseña
                            </label>
                            <Password inputid="Confpassword1" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar Contraseña" toggleMask className="w-full mb-2" inputClassName="w-full p-3 md:w-30rem"></Password>
                            <div className="flex align-items-center justify-content-between mb-5 gap-1">
                            <div className=" " style={{color:"#ED265E",fontSize:'10px',width:'30rem'}}>{error}</div>
                            </div>
                            <Button label="Registrarme" className="w-full p-3 text-xl" onClick={handleSubmit}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default Registro;
