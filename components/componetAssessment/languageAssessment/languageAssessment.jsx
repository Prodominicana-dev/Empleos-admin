import { Button } from 'primereact/button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { LanguageJson } from './idiomas';
import Select from '../../Select/SelectComp';

const LanguageAssesment = ({Languages,index,error,setError,setLanguage,elimiLanguage,eliminarLanguage}) => {


   






    //............................................
               const onFormLanguageChangeS = (Value, name,index) => {
                const {value}=Value;
               
                const val = (value) || '';
              
               
                setLanguage((prevLanguage) => {
                  const nuevosLanguage = [...prevLanguage];
                  nuevosLanguage[index][name] = val;
                  return nuevosLanguage;
                });
               
                setError({
                        ...error[index],
                        [`${name}`]: null,
                      });
              
              };

            

             
    //...................................................................

              const Language = LanguageJson.map((item) => ({
                label: item.name,
                value: item.name
              }));
              const nivel =[
                {label:'Nada',value:'1'},
                {label:'Básico',value:'2'},
                {label:'Intermedio',value:'3'},
                {label:'Avanzado',value:'4'}
              ]

  return (

        
    
        <div className='container'>
            <div className='col-lg-12 row'>
            
        
            <Form.Group  className="mb-3 col-lg-4 form-control-lg" controlId="formFile">
                    <Form.Label className='control-label required'>Idiomas:</Form.Label>

                    <Select error={error[index]?.language}  name="language" value={Languages.language} onInputChangeS={(e)=>{onFormLanguageChangeS(e,'language',index);}} option={Language} />
                            
                
            </Form.Group>

            
            <Form.Group  className="mb-3 col-lg-4 form-control-lg" controlId="formFile">
                    <Form.Label className='control-label required'>Nivel:</Form.Label>
                    <Select error={error[index]?.answerLan}  name="answerLan" value={Languages.answerLan} onInputChangeS={(e)=>{onFormLanguageChangeS(e,'answerLan',index);}} option={nivel} />
                
            </Form.Group>
               
            <div className="d-flex justify-content-end">
                <Button className='mb-2 p-button-rounded'  icon="pi pi-trash" severity="warning" onClick={(event) => {eliminarLanguage(event, index);elimiLanguage(event, index)}}></Button>
            
            </div>
            <hr/>
           
       </div>
    </div>
  )}
   export default LanguageAssesment