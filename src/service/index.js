import docs from '../db/index';

const getAllRestaurants = async () => docs;

const login = async ({ email, password }) => {
  const res = docs.find((r) => r.email === email && r.password === password);

  return { error: !res, restaurant: res, token: 'qwert-1234-wxyz' };
};

const getMenu = async ({ restaurant }) => {
  const res = docs.find((r) => r.route === restaurant);
  return { error: !res, menu: res?.menu || [] };
};

export default { getAllRestaurants, login, getMenu };
