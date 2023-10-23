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
const ListaSuscripcion = () => {

    let emptySuscripcion = {
        Id: 0,
        Nombre: '',
        //Movil: '',
        Email: '',
        password: '',
        FechaRegistro: ''
        //quantity: 0,
       // rating: 0,
       // inventoryStatus: 'INSTOCK'
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


    const url = Url+'Suscripcion';
    useEffect(() => {

        Axios.get(url).then((response)=>{
             setSuscripciones(response.data)
             
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

    const saveSuscripcion = async()=>{

            setSubmitted(true);
            if (Suscripcion.Nombre.trim()) {
            //let _Vacantes = [...Vacantes];
            let _Suscripcion = { ...Suscripcion };

            if (Suscripcion.Id) {

                 const body = {
                    Nombre:Suscripcion.Nombre,
                    //Movil:Suscripcion.Movil,
                    Email:Suscripcion.Email,
                    password:Suscripcion.password
                 }
               
                console.log(body);
                
                
                await Axios.put(`${url}/${Suscripcion.Id}`,body).then(res=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Suscripcion Updated', life: 3000 }); 
                             
                   
                        Axios.get(url).then((response)=>{
                             setSuscripciones(response.data)
                             //console.log(response.data)
                        });

                }).catch(error=>{
                  console.log(error.message);
                })





                
               
            } else {
                
                
                await Axios.post(url, _Suscripcion).then(res=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Suscripcion Created', life: 3000 });

                   
                        Axios.get(url).then((response)=>{
                             setSuscripciones(response.data)
                             //console.log(response.data)
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
        // let _Vacantes = Vacantes.filter((val) => val.Id !== Vacante.Id);
        // setVacantes(_Vacantes);
        console.log(Suscripcion.Id);
        Axios.delete(`${url}/${Suscripcion.Id}`).then((res)=>{

            setDeleteSuscripcionDialog(false);
            setSuscripcion(emptySuscripcion);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Suscripcion Deleted', life: 3000 });

            Axios.get(url).then((response)=>{
                setSuscripciones(response.data)
                //console.log(response.data)
           });


        }).catch(error=>{
            console.log(error.message);
          })


       
    };

    // const findIndexById = (id) => {
    //     let index = -1;
    //     for (let i = 0; i < Vacantes.length; i++) {
    //         if (Vacantes[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // };

    // const createId = () => {
    //     let Id = '';
    //     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         Id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return Id;
    // };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteSuscripcionesDialog(true);
    };

    const deleteSelectedSuscripciones = () => {
        let _Suscripciones = Suscripciones.filter((val) => !selectedSuscripciones.includes(val));
        setSuscripciones(_Suscripciones);
        setDeleteSuscripcionesDialog(false);
        setSelectedSuscripciones(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Suscripciones Deleted', life: 3000 });
    };

    const onCondicionChange = (e) => {
        let _Suscripcion = { ...Suscripcion };
        _Suscripcion['Condicion'] = e.value;
        setVacante(_Suscripcion);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _Suscripcion = { ...Suscripcion };
        _Suscripcion[`${name}`] = val;

        setSuscripcion(_Suscripcion);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _Suscripcion = { ...Suscripcion };
        _Suscripcion[`${name}`] = val;

        setSuscripcion(_Suscripcion);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo Registrado" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                    {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedSuscripciones || !selectedSuscripciones.length} /> */}
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" /> */}
                {/* <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} /> */}
            </React.Fragment>
        );
    };

    //columna Id
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
                <span className="p-column-title">Nombre</span>
                {rowData.Nombre}
            </>
        );
    };

    // const imageBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Image</span>
    //             <img src={`/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
    //         </>
    //     );
    // };

    // const priceBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Price</span>
    //             {formatCurrency(rowData.price)}
    //         </>
    //     );
    // };

    //columna Resp
    // const MovilBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Movil</span>
    //             {rowData.Movil}
    //         </>
    //     );
    // };

    //columna perfilPuesto
    const EmailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.Email}
                {/* <Rating value={rowData.rating} readOnly cancel={false} /> */}
            </>
        );
    };

    const PassBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Password</span>
                {rowData.password}
                {/* <Rating value={rowData.rating} readOnly cancel={false} /> */}
            </>
        );
    };

    //columna condicion.
    // const statusBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Condicion</span>
    //             {/* {rowData.Condicion} */}
    //             <span className={`product-badge status-${rowData.Condicion}`}>{rowData.Condicion}</span>
    //         </>
    //     );
    // };

    //Botones actualizar y eliminar de la tabla.
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editSuscripcion(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded className="mr-2" onClick={() => confirmDeleteSuscripcion(rowData)} />

                {/* <Link href={`/pages/DatosSuscripcion/${rowData.Id}`}>
                    <Button icon="pi pi-eye" severity="secondary"></Button>
                </Link>  */}
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
                        //responsiveLayout="scroll"
                    >
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="Id" header="Id" sortable body={IdBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column> */}
                        <Column field="Nombre" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem',textAlign:'center' }}></Column> 
                        {/* <Column field="Movil" header="Movil" sortable body={MovilBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column> */}
                        <Column field="Email" header="Correo Electronico" body={EmailBodyTemplate} sortable></Column>
                        {/* <Column field="password" header="Password" body={PassBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column> */}
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={SuscripcionDialog} style={{ width: '850px' }} header="Suscripcion Details" modal className="p-fluid" footer={SuscripcionDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="Nombre">Nombre</label>
                            <InputText id="Nombre" value={Suscripcion.Nombre} onChange={(e) => onInputChange(e, 'Nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !Suscripcion.Nombre })} />
                            {submitted && !Suscripcion.Nombre && <small className="p-invalid">El nombre es requerido.</small>}
                        </div>

                        {/* <div className="field">
                            <label htmlFor="Movil">Movil</label>
                            <InputText id="Movil" value={Suscripcion.Movil} onChange={(e) => onInputChange(e, 'Movil')} required autoFocus className={classNames({ 'p-invalid': submitted && !Suscripcion.Movil })} />
                            {submitted && !Suscripcion.Movil && <small className="p-invalid">El Movil es requerido.</small>}
                        </div> */}

                        <div className="field">
                            <label htmlFor="Email">Email</label>
                            <InputText id="Email" value={Suscripcion.Email} onChange={(e) => onInputChange(e, 'Email')} required autoFocus className={classNames({ 'p-invalid': submitted && !Suscripcion.Email })} />
                            {submitted && !Suscripcion.Email && <small className="p-invalid">El Email es requerido.</small>}
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
                                    ¿Estás segura de que quieres eliminar <b>{Suscripcion.Nombre}</b>?
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