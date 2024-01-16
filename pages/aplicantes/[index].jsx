import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import  Axios  from 'axios';
import Link from "next/link";
import Layout from 'component/components/Layout';
import {Url} from '../../components/Url/URL';
import { useRouter } from 'next/router';
//import { filter } from 'core-js/core/array';
const Aplicantes = ({data,dataPositionAppliedFor}) => {

    
    const {id,name} = data
     

    const Idsubscription = dataPositionAppliedFor.id
    let emptySubscription = {
        id: 0,
        name: '',
        email: '',
        password :'',
        registrationDate : ''
    };

    const [Subscriptions, setSubscriptions] = useState(dataPositionAppliedFor);
    const [SubscriptionDialog, setSubscriptionDialog] = useState(false);
    const [deleteSubscriptionDialog, setDeleteSubscriptionDialog] = useState(false);
    const [deleteSubscriptionsDialog, setDeleteSubscriptionsDialog] = useState(false);
    const [Subscription, setSubscription] = useState(emptySubscription);
    const [selectedSubscriptions, setSelectedSubscriptions] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
//..........................................

const [ProfileAnswer, setProfileAnswer] = useState(null);
const [LanguageAnswer, setLanguageAnswer] = useState([]);
const [KnowledgeAnswer, setKnowledgeAnswer] = useState([]);
const [ParticularsAnswer, setParticularsAnswer] = useState([]);
//.......................................................
const [Period, setPeriod] = useState([]);





//........................................
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




   
    const url=`${Url}PositionAppliedForGet/${id}`;

    const hideDialog = () => {
        setSubmitted(false);
        setSubscriptionDialog(false);
    };
    
    const hideDeleteSubscriptionDialog = () => {
        setDeleteSubscriptionDialog(false);
    };

    const hideDeleteSubscriptionsDialog = () => {
        setDeleteSubscriptionsDialog(false);
    };

    const saveSubscription = async()=>{

            setSubmitted(true);
            if (Subscription.name.trim()) {
            //let _Vacantes = [...Vacantes];
            let _Subscription = { ...Subscription };

            if (Subscription.id) {

                 const body = {
                    name:Subscription.name,
                    email:Subscription.email,
                    password :Subscription.password
                 }
               
                console.log(body);
                
                
                await Axios.put(`${url}/${Subscription.id}`,body).then(res=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Subscription Updated', life: 3000 }); 
                             
                   
                        Axios.get(url).then((response)=>{
                             setSubscriptions(response.data)
                             //console.log(response.data)
                        });

                }).catch(error=>{
                  console.log(error.message);
                })





                
               
            } else {
                
                
                await Axios.post(url, _Subscription).then(res=>{

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Subscription Created', life: 3000 });

                   
                        Axios.get(url).then((response)=>{
                             setSubscriptions(response.data)
                             //console.log(response.data)
                        });

                }).catch(error=>{
                  console.log(error.message);
                })
               
               
            }

            setSubscriptionDialog(false);
            setSubscription(emptySubscription);
          }
     }


       

      

    

    

    const deleteSubscription = () => {
       
        console.log(Subscription.id);
        Axios.delete(`${url}/${Subscription.id}`).then((res)=>{

            setDeleteSubscriptionDialog(false);
            setSubscription(emptySubscription);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Subscription Deleted', life: 3000 });

            Axios.get(url).then((response)=>{
                setSubscriptions(response.data)
                //console.log(response.data)
           });


        }).catch(error=>{
            console.log(error.message);
          })


       
    };
    //....................................................
    const estiloDiv ={
        backgroundColor: '#f0f0f0',
        padding: '10px', /* Agrega un relleno al contenido dentro del div */
        borderRadius: '5px',
        width: 'auto'
      }
   //...................................................
  

    const backButton=()=>{
        return(
            <>
            <div className="d-flex justify-content-end">
                    <Link href={`/Vacantes`}>
    
                        <Button className='mb-2 p-button-rounded'  icon="pi pi-arrow-left" severity="warning" type='button' style={estiloDiv}></Button>
    
                    </Link>
                </div>
            </>
        )
    }

    

    const deleteSelectedSubscriptions = () => {
        let _Subscriptions = Subscriptions.filter((val) => !selectedSubscriptions.includes(val));
        setSubscriptions(_Subscriptions);
        setDeleteSubscriptionsDialog(false);
        setSelectedSubscriptions(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Aplicante borrado', life: 3000 });
    };

   

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _Subscription = { ...Subscription };
        _Subscription[`${name}`] = val;

        setSubscription(_Subscription);
    };

   

   

    

    


    //columna nameVacante
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
                <span className="p-column-title">Email</span>
                {rowData.email}
               
            </>
        );
    };

    


    //Botones actualizar y eliminar de la tabla.
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                

                <Link href={`/DetalleAplicante/${rowData.id}?Vacante=${id}`}>
                    <Button icon="pi pi-eye" severity="secondary"></Button>
                </Link> 

                {/* <Link href={`/answerAssessment/${rowData.id}?Vacante=${id}`}>
                    <Button icon="pi pi-bookmark" severity="info" className="ml-2" ></Button>
                </Link>  */}
            </>
        );
    };










    const header = (
        <div className="text-5xl font-bold text-gray-900 line-height-2">
            <h5 className="m-0">Aplicantes a: {name}.</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const SubscriptionDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveSubscription} />
        </>
    );
    const deleteSubscriptionDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteSubscriptionDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSubscription} />
        </>
    );
    const deleteSubscriptionsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteSubscriptionsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedSubscriptions} />
        </>
    );

    return (
        <Layout pagina='Registros'>
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" 
                    left={backButton} 
                    right={Usuario}
                    ></Toolbar>

                    <DataTable
                        ref={dt}
                        value={Subscriptions}
                        selection={selectedSubscriptions}
                        onSelectionChange={(e) => setSelectedSubscriptions(e.value)}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Vacantes"
                        globalFilter={globalFilter}
                        emptyMessage="No hay datos de aplicantes."
                        header={header}
                        //responsiveLayout="scroll"
                    >
                       
                        <Column field="name" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem',textAlign:'center' }}></Column> 
                        <Column field="email" header="Correo Electrónico" body={EmailBodyTemplate} sortable></Column>
                        <Column field="id" header="Evaluación" body={AssessmentAnswer} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={SubscriptionDialog} style={{ width: '850px' }} header="Subscription Details" modal className="p-fluid" footer={SubscriptionDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">name</label>
                            <InputText id="name" value={Subscription.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !Subscription.name })} />
                            {submitted && !Subscription.name && <small className="p-invalid">El name es requerido.</small>}
                        </div>

                        

                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={Subscription.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !Subscription.email })} />
                            {submitted && !Subscription.email && <small className="p-invalid">El Email es requerido.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <InputText id="password" value={Subscription.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !Subscription.password })} />
                            {submitted && !Subscription.password && <small className="p-invalid">El Correo Electronico es requerido.</small>}
                        </div>
                      
                    </Dialog>

                    <Dialog visible={deleteSubscriptionDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSubscriptionDialogFooter} onHide={hideDeleteSubscriptionDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Subscription && (
                                <span>
                                    Are you sure you want to delete <b>{Subscription.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteSubscriptionsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSubscriptionsDialogFooter} onHide={hideDeleteSubscriptionsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Subscription && <span>Are you sure you want to delete the selected Subscriptions?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
        </Layout>
    );
};



export async function getServerSideProps({query:{index}}){
   
    const responsePositionAppliedFor = await Axios.get(`${Url}PositionAppliedForGet/${index}`);
    const dataPositionAppliedFor= responsePositionAppliedFor.data; 
    
//..........................................................

    const url = `${Url}JobOpening/${index}`;
    const res = await fetch(url)
    const data = await res.json()
  
    
    return{
      props:{
            data,
            dataPositionAppliedFor
      }
    }
  
  }

export default Aplicantes