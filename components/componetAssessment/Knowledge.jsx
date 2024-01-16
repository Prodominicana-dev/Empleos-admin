import { Button } from 'primereact/button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Select from '../Select/SelectComp';
import { DataCetificate } from '../DataLIstas/DataFormacion';


const KnowledgeAssessment = ({Knowledges,index,error,setError,setKnowledge,elimiKnowledge,eliminarKnowledge}) => {


   






    //............................................
               const onFormKnowledgeChangeS = (Value, name,index) => {
                const {value}=Value;
               
                const val = (value) || '';
              
               
                setKnowledge((prevKnowledge) => {
                  const nuevosKnowledge = [...prevKnowledge];
                  nuevosKnowledge[index][name] = val;
                  return nuevosKnowledge;
                });
               
                setError({
                        ...error[index],
                        [`${name}`]: null,
                      });
              
              };

     //.................................................................
     const todasLasOpciones = DataCetificate.flatMap(category => [
      { label: category.label, value: category.label, isDisabled: true }, // Agregar isDisabled a las categorías
      ...category.options
    ]);       

             
    //...................................................................

            //   const Language = LanguageJson.map((item) => ({
            //     label: item.name,
            //     value: item.name
            //   }));
              const nivel =[
                {label:'Nada',value:'1'},
                {label:'Básico',value:'2'},
                {label:'Intermedio',value:'3'},
                {label:'Avanzado',value:'4'}
              ]

  return (

        
    
        <div className='container'>
            <div className='col-lg-12 row'>
            
        
            <Form.Group  className="mb-3 col-lg-8 form-control-lg" controlId="formFile">
            <Form.Label className='control-label required'>Conocimientos variados:</Form.Label>
            <Select error={error[index]?.knowledge}  name="knowledge" value={Knowledges.knowledge} onInputChangeS={(e)=>{onFormKnowledgeChangeS(e,'knowledge',index);}} option={todasLasOpciones} />
            {/* <Form.Control 
                    required
                    type="text"   
                    name='knowledge' 
                    onChange={(e)=>{onFormKnowledgeChange(e,"knowledge")}}
                    value={Knowledges.knowledge || ''} 
                    data-index={index}
                    style={{ height: '40px' }}
                    />
                   <Form.Control.Feedback type="valiud">
                    {error[index]?.knowledge && 
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
                               Este campo es requerido
                              </span>
                            </div>
                          )}
                    </Form.Control.Feedback> */}
            </Form.Group>

            
            <Form.Group  className="mb-3 col-lg-4 form-control-lg" controlId="formFile">
                    <Form.Label className='control-label required'>Nivel:</Form.Label>
                    <Select error={error[index]?.answerKnow}  name="answerKnow" value={Knowledges.answerKnow} onInputChangeS={(e)=>{onFormKnowledgeChangeS(e,'answerKnow',index);}} option={nivel} />
                
            </Form.Group>
               
            <div className="d-flex justify-content-end">
                <Button className='mb-2 p-button-rounded'  icon="pi pi-trash" severity="warning" onClick={(event) => {eliminarKnowledge(event, index);elimiKnowledge(event, index)}}></Button>
            
            </div>
            <hr/>
           
       </div>
    </div>
  )}
   export default KnowledgeAssessment