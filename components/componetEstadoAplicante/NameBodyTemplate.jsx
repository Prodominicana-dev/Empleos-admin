import { useState, useEffect } from 'react';
import Axios from 'axios';
import {Url} from '../../components/Url/URL';
const NameBodyTemplate = ({rowData}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    Axios.get(`${Url}Subscription/${rowData.idSubscription}`)
      .then((res) => {
        const data = res.data;
        setName(data.name);
        console.log('Valor de name:', data.name);
      })
      .catch((error) => {
        console.error('Error al obtener el nombre:', error);
      });
  }, [rowData.idSubscription]);

  return (
    <>
      <span className="p-column-title text-center">Nombre</span>
      {name}
    </>
  );
};

export default NameBodyTemplate;