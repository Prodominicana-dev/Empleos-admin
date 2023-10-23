import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import  Axios  from 'axios';
import Layout from 'component/components/Layout';
import style from '../../styles/Vacante.module.css'
import Link from 'next/link';
import { TreeSelect } from 'primereact/treeselect';
import {Url} from '../../components/Url/URL';
//import { ProductService } from '../../../demo/service/ProductService';
import { useRouter } from 'next/router';
import { Badge } from 'primereact/badge';
import Aplicantes from '../aplicantes/[index]';
const ListaVacantes = () => {

    let emptyVacante = {
        Id: 0,
        NombreVacante: '',
        Responsabilidades: '',
        PerfilPuesto: '',
        Condicion: '',
        IdCategoria: 0,
        FechaRegistro: ''
        //quantity: 0,
       // rating: 0,
       // inventoryStatus: 'INSTOCK'
    };

    const [Vacantes, setVacantes] = useState(null);
    const [VacanteDialog, setVacanteDialog] = useState(false);
    const [deleteVacanteDialog, setDeleteVacanteDialog] = useState(false);
    const [deleteVacantesDialog, setDeleteVacantesDialog] = useState(false);
    const [Vacante, setVacante] = useState(emptyVacante);
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


   
    const url=`${Url}Vacantes`;
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

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setVacante(emptyVacante);
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
            if (Vacante.NombreVacante.trim()) {
            //let _Vacantes = [...Vacantes];
            let _Vacante = { ...Vacante };

            if (Vacante.Id) {

                 const body = {
                    NombreVacante:Vacante.NombreVacante,
                    Responsabilidades:Vacante.Responsabilidades,
                    PerfilPuesto:Vacante.PerfilPuesto,
                    Condicion:Vacante.Condicion,
                    IdCategoria:Vacante.IdCategoria
                 }
               
                console.log(body);

                let Periodo = {
                    IdVacante:Vacante.Id,
                    Estado:Vacante.Condicion
                }
                
                await Axios.put(`${url}/${Vacante.Id}`,body).then(async(res)=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Vacante actualizada', life: 3000 }); 
                             
                   
                    await Axios.get(url).then(async(response)=>{
                             setVacantes(response.data)
                             
                             
                             console.log(Periodo);
                           
                                await Axios.post(`${Url}Periodo`, Periodo).then(res=>{

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
                    IdVacante:0,
                    Estado:''
                }
                
                await Axios.post(url, _Vacante).then(async(res)=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Vacante Creada', life: 3000 });

                   
                    await Axios.get(url).then(async(response)=>{
                             setVacantes(response.data)

                             const data = response.data;

                            if (data.length > 0) {

                            const ultimoRegistro = data[data.length - 1];
                            console.log(ultimoRegistro);

                             Periodo.IdVacante = ultimoRegistro.Id;
                             Periodo.Estado=ultimoRegistro.Condicion;

                             console.log(Periodo);

                             if(Periodo.Estado != "deshabilitado"){
                                await Axios.post(`${Url}Periodo`, Periodo).then(res=>{

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
            setVacante(emptyVacante);
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
        console.log(Vacante.Id);
        Axios.delete(`${url}/${Vacante.Id}`).then((res)=>{

            setDeleteVacanteDialog(false);
            setVacante(emptyVacante);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Vacante borrada', life: 3000 });

            Axios.get(url).then((response)=>{
                setVacantes(response.data)
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
        setDeleteVacantesDialog(true);
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
        _Vacante['Condicion'] = e.value;
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
                <span className="p-column-title">NombreVacante</span>
                {rowData.NombreVacante}
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
    const RespBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title"> Responsabilidades</span>
                <div className={style.desbordamiento}>{rowData.Responsabilidades}</div>
            </>
        );
    };

    //columna perfilPuesto
    const PerfilBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">PerfilPuesto</span>
                <div className={style.desbordamiento}>{rowData.PerfilPuesto}</div>
                {/* <Rating value={rowData.rating} readOnly cancel={false} /> */}
            </>
        );
    };
      //columna Categoria
    const CategoriaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Categoria</span>
                {categoria.map((C)=>{
                    if(C.Id===rowData.IdCategoria){
                    return <div className={style.desbordamiento}>{C.Categoria}</div>
                    }
                })}
                
                {/* <Rating value={rowData.rating} readOnly cancel={false} /> */}
            </>
        );
    };

    //columna condicion.
    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Condicion</span>
                {/* {rowData.Condicion} */}
                <span className={`product-badge status-${rowData.Condicion}`}>{rowData.Condicion}</span>
            </>
        );
    };


    useEffect(() => {
        cargarAplicantes();
      }, []);
    
      const cargarAplicantes = async () => {
        try {

          const response = await Axios.get(`${Url}PuestoSolicitado`);

          let conteo={};

          response.data.forEach((aplicante) => {

            if(aplicante.Estado=="None"){

                if(conteo[aplicante.IdVacante] === undefined){

                conteo[aplicante.IdVacante] = 1;

                 }else{

                    conteo[aplicante.IdVacante]++;
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
                <div className='col-lg-12'>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editVacante(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded className="mr-2" onClick={() => confirmDeleteVacante(rowData)} />
                <Link href={`/aplicantes/${rowData.Id}`}>
                
                  <Button icon="pi pi-user" rounded severity="info" className="mr-2" aria-label="User" >
                  {aplicante[rowData.Id] !== undefined ? (
                <Badge value={aplicante[rowData.Id]} />
              ) : (
                <Badge value={0} />
              )}
                    
                    </Button>
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
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column> */}
                        {/* <Column field="Id" header="Id" sortable body={IdBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column> */}
                        <Column field="NombreVacante" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                        {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column> */}
                        <Column field=" Responsabilidades" header=" Responsabilidades" sortable body={RespBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="PerfilPuesto" header="Perfil del Puesto" body={PerfilBodyTemplate} sortable></Column>
                        <Column field="Categoria" header="Categoría" body={CategoriaBodyTemplate} sortable></Column>
                        <Column field="Condicion" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={VacanteDialog} style={{ width: '850px' }} header="Vacante Details" modal className="p-fluid" footer={VacanteDialogFooter} onHide={hideDialog}>
                        {/* {product.image && <img src={`/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
                        <div className="field">
                            <label htmlFor="NombreVacante">Nombre</label>
                            <InputText id="NombreVacante" value={Vacante.NombreVacante} onChange={(e) => onInputChange(e, 'NombreVacante')} required autoFocus className={classNames({ 'p-invalid': submitted && !Vacante.NombreVacante })} />
                            {submitted && !Vacante.NombreVacante && <small className="p-invalid">El nombre es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="Responsabilidades">Responsabilidades</label>
                            <InputTextarea id="Responsabilidades" value={Vacante.Responsabilidades} onChange={(e) => onInputChange(e, 'Responsabilidades')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="PerfilPuesto">Perfil del Puesto</label>
                            <InputTextarea id="PerfilPuesto" value={Vacante.PerfilPuesto} onChange={(e) => onInputChange(e, 'PerfilPuesto')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                        <Form.Group  className="mb-3 col-lg-4" controlId="formFile">
                                <Form.Label className='control-label required'>Categoría:</Form.Label>
                                <Form.Select  required name="IdCategoria" aria-label="Default select example"
                                onChange={(e)=>{onInputChange(e,"IdCategoria")}}>
                                <option value={Vacante.IdCategoria||''}>{Vacante.IdCategoria!=0 ? categoria.map((C)=>{if(Vacante.IdCategoria===C.Id){return C.Categoria}}):'Selecciona'}</option>
                                {categoria.map((C)=>(
                                    <option key={C.Id} value={C.Id}>{C.Categoria}</option>
                                ))} 
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Este campo es requerido.</Form.Control.Feedback>
                        </Form.Group>
                        </div>
                        <div className="field">
                            <label className="mb-3">Condicion</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="Condicion1" name="Condicion" value="habilitado" onChange={onCondicionChange} checked={Vacante.Condicion === 'habilitado'} />
                                    <label htmlFor="Condicion1">Habilitado</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="Condicion2" name="Condicion" value="deshabilitado" onChange={onCondicionChange} checked={Vacante.Condicion === 'deshabilitado'} />
                                    <label htmlFor="Condicion2">Deshabilitado</label>
                                </div>
                                {/* <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                                    <label htmlFor="category4">Fitness</label>
                                </div> */}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            {/* <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                            </div> */}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteVacanteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteVacanteDialogFooter} onHide={hideDeleteVacanteDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Vacante && (
                                <span>
                                    ¿Estás segura de que quieres eliminar <b>{Vacante.NombreVacante}</b>?
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