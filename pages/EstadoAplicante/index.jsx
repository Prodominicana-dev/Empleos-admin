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
import {Url} from '../../components/Url/URL';
import { useRouter } from 'next/router';
import { parseISO, format } from 'date-fns';
const ListaSuscripcion = () => {

    let emptySuscripcion = {
        Id: 0,
        IdVacante:0,
        Nombre: '',
        NombreVacante:'',
        FechaRegistro:'',
        Estado:''
        
    };

    const [Suscripciones, setSuscripciones] = useState(null);
    const [SuscripcionDialog, setSuscripcionDialog] = useState(false);
    const [deleteSuscripcionDialog, setDeleteSuscripcionDialog] = useState(false);
    const [deleteSuscripcionesDialog, setDeleteSuscripcionesDialog] = useState(false);
    const [Suscripcion, setSuscripcion] = useState(emptySuscripcion);
    const [selectedSuscripciones, setSelectedSuscripciones] = useState(null);
    const [submitted, setSubmitted] = useState(false);
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

                if(aplicante.Estado != "None"){
                
                    Data=[...Data,aplicante];
            
                }

            });  
            setSuscripciones(Data);
    });
    
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setSuscripcion(emptySuscripcion);
        setSubmitted(false);
        setSuscripcionDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setSuscripcionDialog(false);
    };

    const hideDeleteSuscripcionDialog = () => {
        setDeleteSuscripcionDialog(false);
    };

    const hideDeleteSuscripcionesDialog = () => {
        setDeleteSuscripcionesDialog(false);
    };
    
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                    {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedSuscripciones || !selectedSuscripciones.length} /> */}
                </div>
            </React.Fragment>
        );
    };

   

    

    const IdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.Id}
            </>
        );
    };


    //columna NombreVacante
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title text-center">Nombre</span>
                {rowData.Nombre}
            </>
        );
    };

   

    const NombreVacanteBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre de la Vacante</span>
                {formatCurrency(rowData.NombreVacante)}
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

    //columna Fecha solicitud
    const FechaSulicitud = (rowData) => {
        const fecha= parseISO(rowData.FechaRegistro);
        return (
            <>
                <span className="p-column-title">FechaSolicitud</span>
                {format(fecha, 'dd/MM/yyyy HH:mm a')}
                {/* <Rating value={rowData.rating} readOnly cancel={false} /> */}
            </>
        );
    };

    //Botones actualizar y eliminar de la tabla.
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Link href={`/DetalleAplicante/${rowData.Id}?Vacante=${rowData.IdVacante}`}>
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
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Aplicante"
                        globalFilter={globalFilter}
                        emptyMessage="No hay datos de estados de aplicante."
                        header={header}
                        //responsiveLayout="scroll"
                    >
                       
                        <Column field="Nombre" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem',textAlign:'center' }}></Column> 
                        <Column field="NombreVacante" header="Nombre de la Vacante" sortable body={NombreVacanteBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="Estado" header="Estado" body={EstadoBodyTemplate} sortable></Column>
                        <Column field="FechaRegistro" header="Fecha de Solicitud" body={FechaSulicitud} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '1rem' }}></Column>
                    </DataTable>

                   
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default ListaSuscripcion;