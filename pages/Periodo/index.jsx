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
const ListaSuscripcion = () => {

    let emptySuscripcion = {
        Id: 0,
        NombreVacante: '',
        Estado:'',
        FechaRegistro:''
       
        //quantity: 0,
       // rating: 0,
       // inventoryStatus: 'INSTOCK'
    };

    const [Suscripciones, setSuscripciones] = useState(null);
   
    const [selectedSuscripciones, setSelectedSuscripciones] = useState(null);
    
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
   
    const url=Url+'Periodo';
    useEffect(() => {

        Axios.get(url).then((response)=>{
             setSuscripciones(response.data)
             
    });



       
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

   
    //columna NombreVacante
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title text-center">Nombre Vacante</span>
                {rowData.NombreVacante}
            </>
        );
    };

    const EstadoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Estado</span>
                {rowData.Estado}
            </>
        );
    };

    const FechaRegistroBodyTemplate = (rowData) => {
         const fecha= parseISO(rowData.FechaRegistro);

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
                    // left={leftToolbarTemplate} 
                     right={Usuario}
                    ></Toolbar>

                    <DataTable
                        ref={dt}
                        value={Suscripciones}
                        selection={selectedSuscripciones}
                        onSelectionChange={(e) => setSelectedSuscripciones(e.value)}
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
                        //responsiveLayout="scroll"
                    >
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column> */}
                        {/* <Column field="" header="" sortable headerStyle={{ minWidth: '15rem' }}></Column> */}
                        <Column field="NombreVacante" header="Nombre de Vacante" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem',textAlign:'center' }}></Column> 
                        <Column field="Estado" header="Estado" sortable body={EstadoBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="FechaRegistro" header="Fecha" body={FechaRegistroBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                      
                        {/* <Column body={actionBodyTemplate} headerStyle={{ minWidth: '1rem' }}></Column> */}
                    </DataTable>

                   

                
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default ListaSuscripcion;