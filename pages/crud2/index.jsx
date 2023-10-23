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
import Layout from '../../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

import Axios from 'axios'
//import { ProductService } from '../../../demo/service/ProductService';

const Crud2 = () => {
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

     const [Vacantes, setVacantes] = useState([]);
    // const [productDialog, setProductDialog] = useState(false);
    // const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    // const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    // const [product, setProduct] = useState(emptyProduct);
    // const [selectedProducts, setSelectedProducts] = useState(null);
    // const [submitted, setSubmitted] = useState(false);
    // const [globalFilter, setGlobalFilter] = useState(null);
    // const toast = useRef(null);
    // const dt = useRef(null);

    const url='http://localhost:3001/vacantes';
    useEffect(() => {
        Axios.get(url).then((response)=>{
             setVacantes(response.data)
    });


        //ProductService.getProducts().then((data) => setProducts(data));
    }, []);

    
    return (
        <Layout pagina='crud 2'>
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    {/* <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}
                    <DataTable 
                    value={Vacantes} 
                    paginator rows={10} 
                    dataKey="Id" 
                    //filters={filters} 
                    filterDisplay="row" 
                    //loading={loading}
                    globalFilterFields={['NombreVacante', 'Responsabilidades', 'PerfilPuesto','Condicion', 'FechaRegistro']} 
                    //header={header} 
                    emptyMessage="No customers found.">
                        <Column field="NombreVacante" header="NombreVacante" filter filterPlaceholder="Search by NombreVacante" style={{ minWidth: '12rem' }} />
                        <Column header="Responsabilidades" filterField="Responsabilidades" style={{ minWidth: '12rem' }}  filter filterPlaceholder="Search by Responsabilidades" />
                        <Column header="Perfil" filterField="PerfilPuesto" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                            filter  />
                        <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }}  filter  />
                        <Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }}  filter  />
                    </DataTable>
                   
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default Crud2;