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
        Categoria: '',
       
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

    const url=`${Url}Categoria`;
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
            if (Suscripcion.Categoria.trim()) {
            //let _Vacantes = [...Vacantes];
            let _Suscripcion = { ...Suscripcion };

            if (Suscripcion.Id) {

                 const body = {
                    Nombre:Suscripcion.Categoria,
                   
                 }
               
                console.log(body);
                
                
                await Axios.put(`${url}/${Categoria.Id}`,body).then(res=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categoría actualizada', life: 3000 }); 
                             
                   
                        Axios.get(url).then((response)=>{
                             setSuscripciones(response.data)
                             //console.log(response.data)
                        });

                }).catch(error=>{
                  console.log(error.message);
                })





                
               
            } else {
                
                
                await Axios.post(url, _Suscripcion).then(res=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categoría creada', life: 3000 });

                   
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
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categoría borrada', life: 3000 });

            Axios.get(url).then((response)=>{
                setSuscripciones(response.data)
                //console.log(response.data)
           });


        }).catch(error=>{
            console.log(error.message);
          })


       
    };

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
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categoría borrada', life: 3000 });
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
                    <Button label="Nueva Categoría" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
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
                <span className="p-column-title text-center">Categoria</span>
                {rowData.Categoria}
            </>
        );
    };

    //Botones actualizar y eliminar de la tabla.
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-1 " onClick={() => editSuscripcion(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded className="mr-0 " onClick={() => confirmDeleteSuscripcion(rowData)} />

                {/* <Link href={`/pages/DatosSuscripcion/${rowData.Id}`}>
                    <Button icon="pi pi-eye" severity="secondary"></Button>
                </Link>  */}
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between ">
            <h5 className="m-0">Categorías:</h5>
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
        <Layout pagina='Categorias'>
        <div className="grid crud-demo mb-8">
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
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Categorías"
                        
                        globalFilter={globalFilter}
                        emptyMessage="No hay dato de Categorías"
                        header={header}
                        //responsiveLayout="scroll"
                    >
                       
                        <Column field="Categoria" header="Categoría" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem',textAlign:'center' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '1rem' }}></Column>
                    </DataTable>

                    <Dialog visible={SuscripcionDialog} style={{ width: '850px' }} header="Suscripcion Details" modal className="p-fluid" footer={SuscripcionDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="Nombre">Categoria</label>
                            <InputText id="Nombre" value={Suscripcion.Categoria} onChange={(e) => onInputChange(e, 'Categoria')} required autoFocus className={classNames({ 'p-invalid': submitted && !Suscripcion.Categoria })} />
                            {submitted && !Suscripcion.Categoria && <small className="p-invalid">El Categoria es requerido.</small>}
                        </div>

                       
                    </Dialog>

                    <Dialog visible={deleteSuscripcionDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSuscripcionDialogFooter} onHide={hideDeleteSuscripcionDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Suscripcion && (
                                <span>
                                    Are you sure you want to delete <b>{Suscripcion.Nombre}</b>?
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