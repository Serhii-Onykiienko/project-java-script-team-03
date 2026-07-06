import axios from 'axios';

const BASE_URL = 'https://wedding-photographer.b.goit.study/api';

export const createOrder = async data => {

  const response = await axios.post(`${BASE_URL}/orders`, data);

  return response.data;
};