import docs from '../db/index';
import fetchService from './fetchService';

const getAllRestaurants = async () => docs;

const login = async ({ email, password }) => {
  // const res = docs.find((r) => r.email === email && r.password === password);
  const res = await fetchService.postApi({
    url: '/login',
    data: { email, password },
  });

  return { error: !res, ...res };
};

const getMenu = async ({ restaurant }) => {
  const res = await fetchService.getApi({ url: `/${restaurant}/menu` });
  console.log(res);
  return { error: !res, menu: res?.menu || [], message: res.message };
};

const sendRequest = async ({ restaurant, table, cart }) => {
  const res = await fetchService.postApi({
    url: `/${restaurant}/${table}`,
    data: { command: cart, date: new Date() },
  });
  return res;
};

export default { getAllRestaurants, login, getMenu, sendRequest };
