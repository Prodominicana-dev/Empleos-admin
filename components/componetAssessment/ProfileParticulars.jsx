import { Button } from 'primereact/button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Select from '../Select/SelectComp';


const ProfileParticulars = ({ProfileParticulars,index,error,setError,setProfileParticulars,elimiProfileParticulars,eliminarProfileParticulars}) => {


   






    //............................................
               const onFormProfileParticularsChangeS = (Value, name,index) => {
                const {value}=Value;
               
                const val = (value) || '';
                setProfileParticulars((prevProfileParticulars) => {
                  const nuevosProfileParticulars = [...prevProfileParticulars];
                  nuevosProfileParticulars[index][name] = val;
                  return nuevosProfileParticulars;
                });
               
                setError({
                        ...error[index],
                        [`${name}`]: null,
                      });
              
              };

     //.................................................................
     const onFormProfileParticularsChange = (e, name,) => {
        const val = e.target.value;
        const index = e.target.dataset.index;
      
        setProfileParticulars((prevProfileParticulars) => {
          const nuevosProfileParticulars = [...prevProfileParticulars];
          nuevosProfileParticulars[index][name] = val;
          return nuevosProfileParticulars;
        });
      };       

             
    //...................................................................

            
              const nivel =[
                {label:'Si',value:'Si'},
                {label:'No',value:'No'}
              ]

  return (

        
    
        <div className='container'>
            <div className='col-lg-12 row'>
            
        
            <Form.Group  className="mb-3 col-lg-8 form-control-lg" controlId="formFile">
            <Form.Label className='control-label required'>Pregunta particulares sobre el perfil:</Form.Label>
            <Form.Control 
                    required
                    type="text"   
                    name='ask' 
                    onChange={(e)=>{onFormProfileParticularsChange(e,"ask")}}
                    value={ProfileParticulars.ask || ''} 
                    data-index={index}
                    style={{ height: '40px' }}
                    />
                    <Form.Control.Feedback type="valiud">
                    {error[index]?.ask && 
                        (
                            <div >
                              <span
                                style={{
                                  color: 'red',
                                  fontSize: '20px',
                                  display: 'flex',
                                  alignItems: 'left',
                                  justifyContent: 'left',
                                  width: 'auto',
                                  height: '22px',
                                }}
                              >
                                 Por favor, escriba una pregunta.
                              </span>
                            </div>
                          )}
                    </Form.Control.Feedback>
                    
                   
            </Form.Group>

            
            <Form.Group  className="mb-3 col-lg-4 form-control-lg" controlId="formFile">
                    <Form.Label className='control-label required'>Respuesta:</Form.Label>
                    <Select error={error[index]?.answerProf}  name="answerProf" value={ProfileParticulars.answerProf} onInputChangeS={(e)=>{onFormProfileParticularsChangeS(e,'answerProf',index);}} option={nivel} />
                
            </Form.Group>
               
            <div className="d-flex justify-content-end">
                
                <Button className='mb-2 p-button-rounded'  icon="pi pi-trash" severity="warning" onClick={(event) => {eliminarProfileParticulars(event, index);elimiProfileParticulars(event, index)}}></Button>
            
            </div>
            <hr/>
           
       </div>
    </div>
  )}
   export default ProfileParticulars