
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useRef, useState } from 'react';
import Select, { components } from 'react-select';

const PerfilPrueba = ({onInputChangeS,error,name,option,value}) => {



  const CustomOption = (props) => (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.data.label}
      </div>
    </components.Option>
  );

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      position: 'relative',
      maxHeight: '25px',
      border: `1px solid ${error ? 'red' : value ? 'green':'gray'}`,
      borderRadius: '4px',
      boxShadow: state.isFocused ? `0 0 0 1px ${error ? 'red' : value ? 'green':'gray'}` : 'none',
      '&:hover': {
        border: `1px solid ${error ? 'red' : value ? 'green':'gray'}`,
      },
    })
  };
  //const selectStyles = error ? selectStylesWithError : selectStylesDefault; 
  return (

    <div  
     style={{ position: 'relative' }}
    > 
   
        <Select   name={name} value={option.find(opt => opt.value === value)}  defaultValue={{label:'Selecciona',value:''}} options = {option} onChange={onInputChangeS}  components={{ Option: CustomOption }} styles={selectStyles} />
        {error && (
        <div style={{ position: 'absolute',right: '2.6vw', top: '13px' }}>
          <span
            style={{
              color: 'red',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              width: '12px',
              height: '12px',
              backgroundColor: 'white',
              border: '1px solid red',
            }}
          >
            !
          </span>
        </div>
      )}
      {!error && value && (
        <div style={{ position: 'absolute',right: '2.6vw', top: '8px' }}>
          <span
            style={{
              color: 'green',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              //borderRadius: '50%',
              //width: '12px',
              //height: '12px',
              backgroundColor: 'white',
              //border: '1px solid green',
            }}
          >
            ✓
          </span>
        </div>
      )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
       
    </div>
  )
}

export default PerfilPrueba