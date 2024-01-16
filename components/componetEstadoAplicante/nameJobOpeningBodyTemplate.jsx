import { useState, useEffect } from 'react';
import Axios from 'axios';
import {Url} from '../../components/Url/URL';
const NameJobOpeningBodyTemplate = ({rowData}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    Axios.get(`${Url}JobOpening/${rowData.idJobOpening}`)
      .then((res) => {
        const data = res.data;
        setName(data.name);
        console.log('Valor de name:', data.name);
      })
      .catch((error) => {
        console.error('Error al obtener el nombre:', error);
      });
  }, [rowData.idJobOpening]);

  return (
    <>
      <span className="p-column-title text-center">Nombre Vacante</span>
      {name}
    </>
  );
};

export default NameJobOpeningBodyTemplate;