import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import  Axios  from 'axios';
import Layout from 'component/components/Layout';
import style from '../../styles/Vacante.module.css'
import Link from 'next/link';
import {Url} from '../../components/Url/URL';
//import { ProductService } from '../../../demo/service/ProductService';
import { useRouter } from 'next/router';
import { Badge } from 'primereact/badge';
// import Aplicantes from '../aplicantes/[index]';
const ListaVacantes = () => {

    let emptyJobOpening = {
        id: undefined,
        name: '',
        responsibilities: '',
        profile: '',
        status: '',
        idCategory: 0,
        registrationDate: '',
    };

    const [Vacantes, setVacantes] = useState(null);
    const [VacanteDialog, setVacanteDialog] = useState(false);
    const [deleteVacanteDialog, setDeleteVacanteDialog] = useState(false);
    const [deleteVacantesDialog, setDeleteVacantesDialog] = useState(false);
    const [Vacante, setVacante] = useState(emptyJobOpening);
    const [selectedVacantes, setSelectedVacantes] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [categoria, setCategoria] = useState([]);
    const [aplicante, setAplicante] = useState(0);
    const [datosCargados, setDatosCargados] = useState(false);

    
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


   
    const url=`${Url}JobOpening`;
    useEffect(() => {

        Axios.get(url).then((response)=>{
             setVacantes(response.data)
             
    });
    }, []);



   

    useEffect(() => {

        Axios.get(`${Url}Categoria`).then((response)=>{
            console.log(response.data)
            setCategoria(response.data)
             
    });
    }, []);


    const openNew = () => {
        setVacante(emptyJobOpening);
        setSubmitted(false);
        setVacanteDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setVacanteDialog(false);
    };

    const hideDeleteVacanteDialog = () => {
        setDeleteVacanteDialog(false);
    };

    const hideDeleteVacantesDialog = () => {
        setDeleteVacantesDialog(false);
    };

    const saveVacante = async()=>{

            setSubmitted(true);
            if (Vacante.name.trim()) {

            let _Vacante = { ...Vacante };

            if (Vacante.id) {

                 const body = {
                    name:Vacante.name,
                    responsibilities:Vacante.responsibilities,
                    profile :Vacante.profile ,
                    status:Vacante.status,
                    idCategory:Vacante.idCategory
                 }
               
                console.log(body);

                let Periodo = {
                    idJobOpening:Vacante.id,
                    status:Vacante.status
                }
                
                await Axios.put(`${url}/${Vacante.id}`,body).then(async(res)=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Vacante actualizada', life: 3000 }); 
                             
                   
                    await Axios.get(url).then(async(response)=>{
                             setVacantes(response.data)
                             
                             
                             console.log(Periodo);
                           
                                await Axios.post(`${Url}Period`, Periodo).then(res=>{

                                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Periodo Creado', life: 3000 });

                                }).catch(error=>{
                                console.log(error.message);
                                })
                            
                           
                        });

                }).catch(error=>{
                  console.log(error.message);
                })

            } else {

                let Periodo = {
                    idJobOpening:0,
                    status:''
                }

                console.log(_Vacante)

                await Axios.post(url, _Vacante).then(async(res)=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Vacante Creada', life: 3000 });

                   
                    await Axios.get(url).then(async(response)=>{
                             setVacantes(response.data)

                             const data = response.data;

                            if (data.length > 0) {

                            const ultimoRegistro = data[data.length - 1];
                            console.log(ultimoRegistro);

                             Periodo.idJobOpening = ultimoRegistro.id;
                             Periodo.status=ultimoRegistro.status;

                             console.log(Periodo);

                             if(Periodo.status != "deshabilitado"){
                                await Axios.post(`${Url}Period`, Periodo).then(res=>{

                                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Periodo Creado', life: 3000 });

                                }).catch(error=>{
                                console.log(error.message);
                                })
                             }
                            }
                        });

                }).catch(error=>{
                  console.log(error.message);
                })

                 //console.log(Periodo);
                //.................................................
               
            }

            setVacanteDialog(false);
            setVacante(emptyJobOpening);
          }
     }

    const editVacante = (Vacante) => {
        setVacante({ ...Vacante });
        setVacanteDialog(true);
    };

    const confirmDeleteVacante = (Vacante) => {
        setVacante(Vacante);
        setDeleteVacanteDialog(true);
    };

    const deleteVacante = () => {
        // let _Vacantes = Vacantes.filter((val) => val.Id !== Vacante.Id);
        // setVacantes(_Vacantes);
        console.log(Vacante.id);
        Axios.delete(`${url}/${Vacante.id}`).then((res)=>{

            setDeleteVacanteDialog(false);
            setVacante(emptyJobOpening);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Vacante borrada', life: 3000 });

            Axios.get(url).then((response)=>{
                setVacantes(response.data)
                //console.log(response.data)
           });


        }).catch(error=>{
            console.log(error.message);
          })

    };


    const deleteSelectedVacantes = () => {
        let _Vacantes = Vacantes.filter((val) => !selectedVacantes.includes(val));
        setVacantes(_Vacantes);
        setDeleteVacantesDialog(false);
        setSelectedVacantes(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Vacantes borrada', life: 3000 });
    };

    const onCondicionChange = (e) => {
        let _Vacante = { ...Vacante };
        _Vacante['status'] = e.value;
        setVacante(_Vacante);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _Vacante = { ...Vacante };
        _Vacante[`${name}`] = val;

        setVacante(_Vacante);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nueva Vacante" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                    {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedVacantes || !selectedVacantes.length} /> */}
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

    //columna Resp
    const RespBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">responsibilities</span>
                <div className={style.desbordamiento}>{rowData.responsibilities}</div>
            </>
        );
    };

    //columna perfilPuesto
    const PerfilBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">profile</span>
                <div className={style.desbordamiento}>{rowData.profile}</div>
            </>
        );
    };
      //columna Categoria
    const CategoriaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {categoria.map((C)=>{
                    if(C.id===rowData.idCategory){
                    return <div className={style.desbordamiento}>{C.category}</div>
                    }
                })}
                
               
            </>
        );
    };

    //columna condicion.
    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">status</span>
               
                <span className={`product-badge status-${rowData.status}`}>{rowData.status}</span>
            </>
        );
    };
    useEffect(() => {
        cargarAplicantes();
      }, []);
    
      const cargarAplicantes = async () => {
        try {
          const response = await Axios.get(`${Url}PuestoSolicitado`);
          console.log(response.data)
          let conteo={};

          response.data.forEach((aplicante) => {

            if(aplicante.status=="None"){

                if(conteo[aplicante.idJobOpening] === undefined){

                conteo[aplicante.idJobOpening] = 1;

                 }else{

                    conteo[aplicante.idJobOpening]++;
                 }
        
        }
          });
         
          setAplicante(conteo);
        } catch (error) {
          console.error('Error al cargar los datos de aplicantes:', error);
        }
      };
  
    const actionBodyTemplate =(rowData) => {
       
        return(
            <>
                <div className='col-lg-12 row'>
                    <div className=''>
                        <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editVacante(rowData)}  />
                        <Button icon="pi pi-trash" severity="warning" rounded className="mr-2" onClick={() => confirmDeleteVacante(rowData)}  />


                       
                    </div>

                        <Link className='mr-2' href={`/aplicantes/${rowData.id}`} passHref>
                        <Button icon="pi pi-user" rounded severity="info" className="mt-2"  style={{width:'60%'}} >
                        {aplicante[rowData.id] !== undefined ? (
                                <Badge value={aplicante[rowData.id]} />
                            ) : (
                                <Badge value={0} />
                            )}
                            
                        </Button>
                        </Link>

                        <Link href={`/assessment/${rowData.id}`} passHref>
                        <Button icon="pi pi-bookmark"  severity="info" className="mt-2" style={{width:'60%'}} ></Button>
                        </Link>


                </div>
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between ">
            <h5 className="m-0">Vacantes</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const VacanteDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" text onClick={saveVacante} />
        </>
    );
    const deleteVacanteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteVacanteDialog} />
            <Button label="Si" icon="pi pi-check" text onClick={deleteVacante} />
        </>
    );
    const deleteVacantesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteVacantesDialog} />
            <Button label="Si" icon="pi pi-check" text onClick={deleteSelectedVacantes} />
        </>
    );

    return (
        <Layout pagina='Vacantes'>
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
                        value={Vacantes}
                        selection={selectedVacantes}
                        onSelectionChange={(e) => setSelectedVacantes(e.value)}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Vacantes"
                        globalFilter={globalFilter}
                        emptyMessage="No hay datos de vacantes."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        
                        <Column field="name" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="responsibilities" header=" Responsabilidades" sortable body={RespBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="profile" header="Perfil del Puesto" body={PerfilBodyTemplate} sortable headerStyle={{ minWidth: '1rem' }}></Column>
                        <Column field="category" header="Categoría" body={CategoriaBodyTemplate} sortable headerStyle={{ minWidth: '5rem' }}></Column>
                        <Column field="status" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ height: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={VacanteDialog} style={{ width: '850px' }} header="Vacante Details" modal className="p-fluid" footer={VacanteDialogFooter} onHide={hideDialog}>
                       
                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={Vacante.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !Vacante.name })} />
                            {submitted && !Vacante.name && <small className="p-invalid">El nombre es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="responsibilities">Responsabilidades</label>
                            <InputTextarea id="responsibilities" value={Vacante.responsibilities} onChange={(e) => onInputChange(e, 'responsibilities')} required rows={3} cols={20} />
                            {submitted && !Vacante.responsibilities && <small className="p-invalid">La Responsabilidad es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="profile">Perfil del Puesto</label>
                            <InputTextarea id="profile" value={Vacante.profile} onChange={(e) => onInputChange(e, 'profile')} required rows={3} cols={20} />
                            {submitted && !Vacante.profile && <small className="p-invalid">El Perfil del Puesto es requerido.</small>}
                        </div>
                        <div className="field">
                        <Form.Group  className="mb-3 col-lg-4" controlId="formFile">
                                <Form.Label className='control-label required'>Categoría:</Form.Label>
                                <Form.Select  required name="idCategory" aria-label="Default select example"
                                onChange={(e)=>{onInputChange(e,"idCategory")}}>
                                <option value={Vacante.idCategory||''}>{Vacante.idCategory!=0 ? categoria.map((C)=>{if(Vacante.idCategory===C.id){return C.category}}):'Selecciona'}</option>
                                {categoria.map((C)=>(
                                    <option key={C.id} value={C.id}>{C.category}</option>
                                ))} 
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Este campo es requerido.</Form.Control.Feedback>
                        </Form.Group>
                        </div>
                        <div className="field">
                            <label className="mb-3">Condicion</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="Condicion1" name="status" value="habilitado" onChange={onCondicionChange} checked={Vacante.status === 'habilitado'} />
                                    <label htmlFor="Condicion1">Habilitado</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="Condicion2" name="status" value="deshabilitado" onChange={onCondicionChange} checked={Vacante.status === 'deshabilitado'} />
                                    <label htmlFor="Condicion2">Deshabilitado</label>
                                </div>
                                
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteVacanteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteVacanteDialogFooter} onHide={hideDeleteVacanteDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Vacante && (
                                <span>
                                    ¿Estás segura de que quieres eliminar <b>{Vacante.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteVacantesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteVacantesDialogFooter} onHide={hideDeleteVacantesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Vacante && <span>Are you sure you want to delete the selected Vacantes?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default ListaVacantes;