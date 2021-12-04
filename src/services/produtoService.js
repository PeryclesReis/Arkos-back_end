const prodModel = require('../models/produtoModel');

const produtos = async () => {
  const data = await prodModel.produtos();

  return data;
}

module.exports = {
  produtos,
};
