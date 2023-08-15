import axios from 'axios';
const URL = import.meta.env.VITE_URL;

const baseAuth = () => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: '',
    },
  };
};

const appRequest = async ({ method, url, data, auth = baseAuth() }) => {
  try {
    const response = await axios({
      method,
      url: `${URL}${url}`,
      data,
      ...auth,
    });

    return response.data;
  } catch (error) {
    return { message: error.message, error: true };
  }
};

const getApi = async ({ url = '', data = {} } = {}) =>
  appRequest({ method: 'GET', url, data });

const deleteApi = async ({ url, data, auth }) =>
  appRequest({ method: 'DELETE', url, data, auth });

const putApi = async ({ url, data, auth }) => {
  return appRequest({
    method: 'PUT',
    url,
    data,
    auth,
  });
};

const postApi = async ({ url = '', data = {} }) =>
  appRequest({
    method: 'POST',
    url,
    data,
  });

export default { getApi, deleteApi, putApi, postApi };
