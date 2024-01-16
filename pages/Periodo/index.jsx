import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import  Axios  from 'axios';
import Link from "next/link";
import Layout from 'component/components/Layout';
//import DatosSuscripcion from '../DatosSuscripcion/[index]';
//import { ProductService } from '../../../demo/service/ProductService';
import { parseISO, format } from 'date-fns';
import {Url} from '../../components/Url/URL';
import { useRouter } from 'next/router';
import NameBodyTemplate from '../../components/componetPeriod/NameBodyTemplate';

const ListaSuscripcion = () => {

    let emptySuscripcion = {
        id: 0,
        name: '',
        status:'',
        FechaRegistro:''
       
        //quantity: 0,
       // rating: 0,
       // inventoryStatus: 'INSTOCK'
    };

    const [periodos, setPeriodos] = useState(null);
   
    const [selectedPeriodos, setSelectedPeriodos] = useState(null);
    
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [user, setUser] = useState({
        Id:'',email:'',username:''
     })
     const router = useRouter();
    
    useEffect(() => {
    
        Axios.get('/api/profile').then((response)=>{
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
                <h1 className="text-3xl font-bold text-gray-900 line-height-2">
                                    
                    <span className="font-light block">{user.username}</span>Estás al Mando.
                </h1>
            )
        }
    }
   
    const url=Url+'Period';
    useEffect(() => {

        Axios.get(url).then((response)=>{
             setPeriodos(response.data)
             
    });



       
    }, []);

    

   
    //columna NombreVacante
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <NameBodyTemplate rowData={rowData}/>

            </>
        );
    };

    const EstadoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">status</span>
                {rowData.status}
            </>
        );
    };

    const FechaRegistroBodyTemplate = (rowData) => {
         const fecha= parseISO(rowData.registrationDate );

        return (
            <>
                <span className="p-column-title">Fecha de Registro</span>
                {format(fecha, 'dd/MM/yyyy HH:mm a')}
            </>
        );
    };

   

  

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between ">
            <h5 className="m-0">Periodos de Apertura y Cierre</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    

    return (
        <Layout pagina='Categorias'>
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" 
                    
                     right={Usuario}
                    ></Toolbar>

                    <DataTable
                        ref={dt}
                        value={periodos}
                        selection={selectedPeriodos}
                        onSelectionChange={(e) => setSelectedPeriodos(e.value)}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Periodos"
                        globalFilter={globalFilter}
                        emptyMessage="No hay datos de Periodos."
                        header={header}
                       
                    >
                      
                        <Column field="name" header="Nombre de la Vacante" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem',textAlign:'center' }}></Column> 
                        <Column field="status" header="Estado" sortable body={EstadoBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="registrationDate" header="Fecha" body={FechaRegistroBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                      
                        
                    </DataTable>

                   

                
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default ListaSuscripcion;