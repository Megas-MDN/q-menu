import axios from 'axios';
const URL = import.meta.env.VITE_URL;

const baseAuth = (tkn = '') => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: tkn,
    },
  };
};

const appRequest = async ({ method, url, data, auth }) => {
  const nAuth = auth ? baseAuth(auth) : baseAuth();
  try {
    const response = await axios({
      method,
      url: `${URL}${url}`,
      data,
      ...nAuth,
    });

    return response.data;
  } catch (error) {
    return { message: error.message, error: true };
  }
};

const getApi = async ({ url = '', data = {}, auth = '' } = {}) =>
  appRequest({ method: 'GET', url, data, auth });

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

const postApi = async ({ url = '', data = {}, auth }) =>
  appRequest({
    method: 'POST',
    url,
    data,
    auth,
  });

export default { getApi, deleteApi, putApi, postApi };
