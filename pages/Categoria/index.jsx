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

const ListaCategory = () => {




    let emptyCategory = {
        id: undefined,
        category: ''
    };

    const [Categorys, setCategorys] = useState(null);
    const [CategoryDialog, setCategoryDialog] = useState(false);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
    const [deleteCategorysDialog, setDeleteCategorysDialog] = useState(false);
    const [Category, setCategory] = useState(emptyCategory);
    const [selectedCategorys, setSelectedCategorys] = useState(null);
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
             setCategorys(response.data)
             
    });



       
    }, []);

    

    const openNew = () => {
        setCategory(emptyCategory);
        setSubmitted(false);
        setCategoryDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCategoryDialog(false);
    };

    const hideDeleteCategoryDialog = () => {
        setDeleteCategoryDialog(false);
    };

    const hideDeleteCategorysDialog = () => {
        setDeleteCategorysDialog(false);
    };

    const saveCategory = async()=>{

            setSubmitted(true);

            if (Category.category.trim()) {
            let _Category = { ...Category };

            if (Category.id) {

                 const body = {
                    category:Category.category
                 }
               
                console.log(body);
                
                
                await Axios.put(`${url}/${Category.id}`,body).then(res=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categoría actualizada', life: 3000 }); 
                             
                   
                        Axios.get(url).then((response)=>{
                             setCategorys(response.data)
                             console.log(response.data)
                        });

                }).catch(error=>{
                  console.log(error.message);
                })

            } else {
                
                // const Categoria = _Category.categoria;

                await Axios.post(url, _Category).then(res=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categoría creada', life: 3000 });

                        Axios.get(url).then((response)=>{
                             setCategorys(response.data)
                             console.log(response.data)
                        });

                }).catch(error=>{
                  console.log(error.message);
                })
               
            }

            setCategoryDialog(false);
            setCategory(emptyCategory);
          }
     }

    const editCategory = (Category) => {
        setCategory({ ...Category });
        setCategoryDialog(true);
    };

    const confirmDeleteCategory = (Category) => {
        setCategory(Category);
        setDeleteCategoryDialog(true);
    };

    const deleteCategory = () => {
        
        console.log(Category.id);
        Axios.delete(`${url}/${Category.id}`).then((res)=>{

            setDeleteCategoryDialog(false);
            setCategory(emptyCategory);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categoría borrada', life: 3000 });

            Axios.get(url).then((response)=>{
                setCategorys(response.data)

           });

        }).catch(error=>{
            console.log(error.message);
          })

    };

   

    const deleteSelectedCategorys = () => {
        let _Categorys = Categorys.filter((val) => !selectedCategorys.includes(val));
        setCategorys(_Categorys);
        setDeleteCategorysDialog(false);
        setSelectedCategorys(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categoría borrada', life: 3000 });
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _Category = { ...Category };
        _Category[`${name}`] = val;

        setCategory(_Category);
    };

   
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nueva Categoría" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                    
                </div>
            </React.Fragment>
        );
    };

   
    //columna NombreVacante
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title text-center">Categoria</span>
                {rowData.category}
            </>
        );
    };

    //Botones actualizar y eliminar de la tabla.
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-1 " onClick={() => editCategory(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded className="mr-0 " onClick={() => confirmDeleteCategory(rowData)} />

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

    const CategoryDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" text onClick={saveCategory} />
        </>
    );
    const deleteCategoryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteCategoryDialog} />
            <Button label="Si" icon="pi pi-check" text onClick={deleteCategory} />
        </>
    );
    const deleteCategorysDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteCategorysDialog} />
            <Button label="Si" icon="pi pi-check" text onClick={deleteSelectedCategorys} />
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
                        value={Categorys}
                        selection={selectedCategorys}
                        onSelectionChange={(e) => setSelectedCategorys(e.value)}
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
                       
                        <Column field="category" header="Categoría" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem',textAlign:'center' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '1rem' }}></Column>
                    </DataTable>

                    <Dialog visible={CategoryDialog} style={{ width: '850px' }} header="Category Details" modal className="p-fluid" footer={CategoryDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="Nombre">Categoria</label>
                            <InputText id="Nombre" value={Category.category} onChange={(e) => onInputChange(e, 'category')} required autoFocus className={classNames({ 'p-invalid': submitted && !Category.category })} />
                            {submitted && !Category.category && <small className="p-invalid">El Categoria es requerido.</small>}
                        </div>

                       
                    </Dialog>

                    <Dialog visible={deleteCategoryDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCategoryDialogFooter} onHide={hideDeleteCategoryDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Category && (
                                <span>
                                    Are you sure you want to delete <b>{Category.category}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCategorysDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCategorysDialogFooter} onHide={hideDeleteCategorysDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Category && <span>Are you sure you want to delete the selected Categoryes?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default ListaCategory;