import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import apiConfig from '../config/apiConfig';

const useFetchNodes = (id) => {
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { url } = apiConfig;
        const data = await axios.get(`${url}/rules/${id}`);
        setApiData(data);
      } catch (error) {
        message.error(error.response.data);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  return { apiData };
};

export default useFetchNodes;
