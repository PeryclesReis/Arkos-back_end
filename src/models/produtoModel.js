const axios = require('axios');

const produtos = async () => {
  const { data } = await axios('https://fakestoreapi.com/products')
    .then(res => res);
  return data;
}

module.exports = {
  produtos
};
