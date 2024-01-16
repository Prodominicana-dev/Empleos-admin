
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Link from 'next/link';

//bootstrap....
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

import {Url} from '../Url/URL';
const Categorias = () => {

const [categorias, setCategorias] = useState([])


//Consulta.......
const url=`${Url}Categoria`;
useEffect(() => {

    axios.get(url).then((response)=>{
        setCategorias(response.data)
         
});
}, []);

const getCategorias=()=>{
    return(
        <>
         <div className='container'>
            <div className='col-lg-12'>
                <div className='row'>
                        {categorias.map((categoria)=>(
                    
                            <div className='col-lg-3 '>
                            <Link key={categoria.Id} style={{textDecoration:'none'}} href="nosotros">  
                                <Card className='mb-5'>
                                    <Card.Img className='mt-0' variant="top" style={{padding:'4rem'}} src="https://hunty.com/wp-content/uploads/3-pasos-para-empezar-a-buscar-vacantes-de-trabajo.jpg" />
                                    <Card.Body>
                                        <h2 className='text-center mb-5 text-muted'>{categoria.Categoria}</h2>
                                        
                                    </Card.Body>
                                </Card>
                            </Link> 
                        </div> 
                    
                        ))}
                </div>
            </div>
        </div>
        </>
    )

}


  return (
    <>
    <div className='container'>
        <hr className='mb-5 mt-8'/>
        <div className=' mb-5 mt-8'>
            <div className='text-center mb-5 mt-5'>
                    <h1>Categorias</h1>
            </div>
            <div>
                {getCategorias()}
            </div>
        </div>
    </div>
    </>
  )
}

export default Categorias