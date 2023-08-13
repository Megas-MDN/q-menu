import docs from '../db/index';
import fetchService from './fetchService';

const getAllRestaurants = async () => docs;

const login = async ({ email, password }) => {
  // const res = docs.find((r) => r.email === email && r.password === password);
  const res = await fetchService.postApi({
    url: '/login',
    data: { email, password },
  });
  console.log(res);
  return { error: !res, ...res };
};

const getMenu = async ({ restaurant }) => {
  const res = docs.find((r) => r.route === restaurant);
  return { error: !res, menu: res?.menu || [] };
};

const sendRequest = async ({ table, cart }) => {
  // post na api new order
  // send emit to fetch orders
  return { table, cart };
};

export default { getAllRestaurants, login, getMenu, sendRequest };
