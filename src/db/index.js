const item01 = {
  id: 'ecfc5',
  name: 'item01',
  pic: 'https://static.expressodelivery.com.br/imagens/produtos/354466/240/Expresso-Delivery_6a3c4cf3c11b6bad264e449b2a0e8226.jpeg',
  ingredients: {
    ingred01: true,
    ingred02: true,
    ingred03: true,
  },
  price: 12.5,
};

const item02 = {
  id: '1f237',
  name: 'item02',
  pic: 'https://static.expressodelivery.com.br/imagens/produtos/352799/240/Expresso-Delivery_6d6d444b50d757945f5fb309374416d7.jpeg',
  ingredients: {
    ingred01: true,
    ingred02: true,
    ingred03: true,
  },
  price: 10.0,
};

const item03 = {
  id: 'cc94d3',
  name: 'item03',
  pic: 'https://static.expressodelivery.com.br/imagens/produtos/352815/240/Expresso-Delivery_e19aad2cb90a5c9c19ff5df81a6eba08.jpeg',
  ingredients: {
    ingred01: true,
    ingred02: true,
    ingred03: true,
  },
  price: 5.2,
};

const item04 = {
  id: '5d6461',
  name: 'drink 01',
  pic: 'https://static.expressodelivery.com.br/imagens/produtos/352803/240/Expresso-Delivery_9b185d6c53085623ce9cf949bd608e1f.jpeg',
  ingredients: {},
  price: 7.5,
};

const item05 = {
  id: '95a034',
  name: 'drink 02',
  pic: 'https://static.expressodelivery.com.br/imagens/produtos/235/180/Expresso-Delivery_3ca5f8b4ad6d53c62db6d764957ee85a.jpg',
  ingredients: {},
  price: 5,
};

// items 01 - 05

const command01 = [item01, item05];
const command02 = [item03, item04];
const command03 = [item01, item02, item02, item05, item05];
const command04 = [item01, item01, item04, item05];

// coomand 01 - 05

const table01 = {
  hash: 'xyz-1234',
  commands: [command01, command03, command03],
};
const table02 = { hash: 'xyz-4567', commands: [] };
const table03 = {
  hash: 'xyz-8901',
  commands: [command01, command01, command04, command02],
};

// table 01 - 03

const restaurant = {
  menu: [item01, item02, item03, item04, item05],
  tables: [table01, table02, table03],
};

// restaurant 01 - 05

const restaurant01 = {
  name: 'Restaurante One',
  route: 'restaurante-one',
  email: 'restaurante_one@test.com',
  password: '123456',
  ...restaurant,
};

const restaurant02 = {
  name: 'Restaurante Two',
  route: 'restaurante-two',
  email: 'restaurante_two@test.com',
  password: '123456',
  ...restaurant,
};

const restaurant03 = {
  name: 'Restaurante Three',
  route: 'restaurante-three',
  email: 'restaurante_three@test.com',
  password: '123456',
  ...restaurant,
};

export default [restaurant01, restaurant02, restaurant03];
