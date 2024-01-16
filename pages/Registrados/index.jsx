import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import  Axios  from 'axios';
import Layout from 'component/components/Layout';
import {Url} from '../../components/Url/URL';
import { useRouter } from 'next/router';
const ListaSuscripcion = () => {

    let emptySuscripcion = {
        id: undefined,
        name: '',
        email: '',
        password: '',
        registrationDate: ''
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


    const url = Url+'Subscription';
    useEffect(() => {

        Axios.get(url).then((response)=>{
             setSuscripciones(response.data)
             
    });


    }, []);

    
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

    const saveSuscripcion = async()=>{

            setSubmitted(true);
            if (Suscripcion.name.trim()) {
            let _Suscripcion = { ...Suscripcion };

            if (Suscripcion.id) {

                 const body = {
                    name:Suscripcion.name,
                    email:Suscripcion.email,
                    password:Suscripcion.password
                 }
               
                console.log(body);
                
                
                await Axios.put(`${url}/${Suscripcion.id}`,body).then(res=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Suscripcion Updated', life: 3000 }); 
                             
                   
                        Axios.get(url).then((response)=>{
                             setSuscripciones(response.data)
                        });

                }).catch(error=>{
                  console.log(error.message);
                })

            } else {
                
                await Axios.post(url, _Suscripcion).then(res=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Suscripcion Created', life: 3000 });

                   
                        Axios.get(url).then((response)=>{
                             setSuscripciones(response.data)
                        });

                }).catch(error=>{
                  console.log(error.message);
                })
               
            }

            setSuscripcionDialog(false);
            setSuscripcion(emptySuscripcion);
          }
     }


       

      

    const editSuscripcion = (Suscripcion) => {
        setSuscripcion({ ...Suscripcion });
        setSuscripcionDialog(true);
    };

    const confirmDeleteSuscripcion = (Suscripcion) => {
        setSuscripcion(Suscripcion);
        setDeleteSuscripcionDialog(true);
    };

    const deleteSuscripcion = () => {
        
        console.log(Suscripcion.id);
        Axios.delete(`${url}/${Suscripcion.id}`).then((res)=>{

            setDeleteSuscripcionDialog(false);
            setSuscripcion(emptySuscripcion);

            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Suscripcion Deleted', life: 3000 });

            Axios.get(url).then((response)=>{
                setSuscripciones(response.data)
           });


        }).catch(error=>{
            console.log(error.message);
          })


       
    };

    const deleteSelectedSuscripciones = () => {
        let _Suscripciones = Suscripciones.filter((val) => !selectedSuscripciones.includes(val));
        setSuscripciones(_Suscripciones);
        setDeleteSuscripcionesDialog(false);
        setSelectedSuscripciones(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Suscripciones Deleted', life: 3000 });
    };

   

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _Suscripcion = { ...Suscripcion };
        _Suscripcion[`${name}`] = val;

        setSuscripcion(_Suscripcion);
    };

    

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo Registrado" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                  
                </div>
            </React.Fragment>
        );
    };

   



    //columna NombreVacante
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">name</span>
                {rowData.name}
            </>
        );
    };

    

    //columna perfilPuesto
    const EmailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">email</span>
                {rowData.email}
            </>
        );
    };

   

    

    //Botones actualizar y eliminar de la tabla.
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editSuscripcion(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded className="mr-2" onClick={() => confirmDeleteSuscripcion(rowData)} />

                
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between ">
            <h5 className="m-0">Registrado:</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const SuscripcionDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" text onClick={saveSuscripcion} />
        </>
    );
    const deleteSuscripcionDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteSuscripcionDialog} />
            <Button label="Si" icon="pi pi-check" text onClick={deleteSuscripcion} />
        </>
    );
    const deleteSuscripcionesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteSuscripcionesDialog} />
            <Button label="Si" icon="pi pi-check" text onClick={deleteSelectedSuscripciones} />
        </>
    );

    return (
        <Layout pagina='Registros'>
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" 
                    left={leftToolbarTemplate} 
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
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registrados"
                        globalFilter={globalFilter}
                        emptyMessage="No hay datos de registrados."
                        header={header}
                       >

                        <Column field="name" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem',textAlign:'center' }}></Column> 
                        <Column field="email" header="Correo Electronico" body={EmailBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={SuscripcionDialog} style={{ width: '850px' }} header="Suscripcion Details" modal className="p-fluid" footer={SuscripcionDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={Suscripcion.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !Suscripcion.name })} />
                            {submitted && !Suscripcion.name && <small className="p-invalid">El nombre es requerido.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={Suscripcion.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !Suscripcion.email })} />
                            {submitted && !Suscripcion.email && <small className="p-invalid">El Email es requerido.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <InputText id="password" value={Suscripcion.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !Suscripcion.password })} />
                            {submitted && !Suscripcion.password && <small className="p-invalid">El Correo Electronico es requerido.</small>}
                        </div>
                      
                    </Dialog>

                    <Dialog visible={deleteSuscripcionDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSuscripcionDialogFooter} onHide={hideDeleteSuscripcionDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Suscripcion && (
                                <span>
                                    ¿Estás segura de que quieres eliminar <b>{Suscripcion.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteSuscripcionesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSuscripcionesDialogFooter} onHide={hideDeleteSuscripcionesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Suscripcion && <span>Are you sure you want to delete the selected Suscripciones?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default ListaSuscripcion;