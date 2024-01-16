import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';
import  Axios  from 'axios';
import Link from "next/link";
import Layout from 'component/components/Layout';
import {Url} from '../../components/Url/URL';
import { useRouter } from 'next/router';
import { parseISO, format } from 'date-fns';


import NameBodyTemplate from '../../components/componetEstadoAplicante/NameBodyTemplate';
import NameJobOpeningBodyTemplate from '../../components/componetEstadoAplicante/nameJobOpeningBodyTemplate';

const ListaSuscripcion = () => {

   

    const [Suscripciones, setSuscripciones] = useState(null);
    const [data, setData] = useState(null);
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
   
    const url=Url+'PuestoSolicitado01';

    useEffect(() => {

        let Data=[];

        Axios.get(url).then((response)=>{

            response.data.forEach((aplicante) => {

                if(aplicante.status != "None"){
                
                    Data=[...Data,aplicante];
            
                }
                console.log('Datos',Data)
            });  
            setSuscripciones(Data);
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

   

    const NombreVacanteBodyTemplate = (rowData) => {
        return (
            <>
                
                <NameJobOpeningBodyTemplate rowData={rowData}/>
            </>
        );
    };

    
    const EstadoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Estado</span>
                {rowData.status}
            </>
        );
    };

    //columna Fecha solicitud
    const FechaSulicitud = (rowData) => {
        const fecha= parseISO(rowData.registrationDate);
        return (
            <>
                <span className="p-column-title">FechaSolicitud</span>
                {format(fecha, 'dd/MM/yyyy HH:mm a')}
            </>
        );
    };

    //Botones actualizar y eliminar de la tabla.
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Link href={`/DetalleAplicante/${rowData.idSubscription}?Vacante=${rowData.idJobOpening }`}>
                <Button icon="pi pi-user" severity="info" aria-label="User" />
                </Link> 
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between ">
            <h5 className="m-0">Estado Aplicantes</h5>
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
                        value={Suscripciones}
                        selection={selectedSuscripciones}
                        onSelectionChange={(e) => setSelectedSuscripciones(e.value)}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Aplicante"
                        globalFilter={globalFilter}
                        emptyMessage="No hay datos de estados de aplicante."
                        header={header}
                       
                    >
                       
                        <Column field="name" header="Nombre del Aplicante" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem',textAlign:'center' }}></Column> 
                        <Column field="name" header="Nombre de la Vacante" sortable body={NombreVacanteBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="status" header="Estado" body={EstadoBodyTemplate} sortable></Column>
                        <Column field="registrationDate" header="Fecha de Solicitud" body={FechaSulicitud} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '1rem' }}></Column>
                    </DataTable>

                   
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default ListaSuscripcion;